#!/usr/bin/env node
process.env ['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 

let emulatorInterface
let networkInterface
const generateYail = require("./yailMaker/yailMaker")
const fs = require('fs')
const hidefile = require("hidefile")
const readline = require("readline")
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

let yail = []
let assetList = []

const IS_EMULATOR = "emulator"
const IS_USB = "usb"
const IS_NET = 'net'
let mode = undefined

let log = console.log


//////////////////////////
/// BUILD TESTS HERE  ////
//////////////////////////

const helperMaker = require("./helpMaker/help")
//let buildTest = helperMaker.buildTest("featurecollection")

//////////////////////////
// END TESTS /////////////
//////////////////////////


///////////////////////////////////
/// CREATE HIDDEN FILES FOLDER ////
///////////////////////////////////

//create hidden folder
if (!fs.existsSync(".aijs")){
    fs.mkdirSync(".aijs")
    hidefile.hideSync(".aijs")
}

if (!fs.existsSync("screen1.xml")){
    placeholderProject()
}

//make VSCode hide the folder using settings (if available)
if (fs.existsSync(__dirname+"/.vscode/settings.json")){
    let settings = fs.readFileSync(__dirname+"/.vscode/settings.json", "utf-8").trim()
    settings = settings.replaceAll("\n","")
    settings = settings.replaceAll("\r","")
    while (settings.endsWith(",}")){
        settings = settings.substring(0, settings.length-2)+"}"
        console.log(settings)
    }

    let s = JSON.parse(settings)
    if (!s["files.exclude"]){
        s["files.exclude"]={}
    }
    ["files.exclude"]["**/.aijs"]=true
    fs.writeFileSync(__dirname+"/.vscode/settings.json", JSON.stringify(s))
}

///////////////////////////////////
/// END HIDDEN FOLDER /////////////
///////////////////////////////////



//this sections loads all the XML files into the system as yail code and creates the initial asset list
let files = fs.readdirSync(__dirname)
files = files.filter(file => file.toLowerCase().endsWith(".xml"))

for (let i = 0; i < files.length; i++) {
    let data = generateYail.for(files[i])

    //check for screen1 proper capitalistion otherwise first page won't load properly as it is already in the screenstack in the USB/emulator (case sensitivity of JS)
    if (data.screenName.toLowerCase() === "screen1") {
        data.screenName = "Screen1"
    }


    yail[data.screenName] = data.yail
    for (let i = 0; i < data.assetsList.length; i++) {
        if (!assetList.includes(data.assetsList[i])) {
            assetList.push(data.assetsList[i])
        }
    }
}

//emulatorInterface.load(yail)



//this sets up the folder watcher for any saved or changed files
//currently it watches all files - and refreshes if an xml file is changed or and js file with a matching xml file is changed
let changedFiles = []

fs.watch(".", 'utf8', function (eventType, filename) {
    if (filename === null) { return }
    if (filename.toLowerCase().endsWith(".xml")) {
        if (!changedFiles.includes(filename)) {
            changedFiles.push(filename)
        }
    }
    if (filename.toLowerCase().endsWith(".js") && !filename.includes("Helper")) {
        filename = filename.replaceAll(".js", ".xml")
        if (fs.existsSync(filename)) {
            if (!changedFiles.includes(filename)) {
                changedFiles.push(filename)
            }
        }
    }
})


function update(filename) {
    let data = generateYail.for(filename)

    //check for screen1 proper capitalistion otherwise first page won't load properly as it is already in the screenstack in the USB/emulator (case sensitivity of JS)
    if (data.screenName.toLowerCase() === "screen1") {
        data.screenName = "Screen1"
    }

    yail[data.screenName] = data.yail
    for (let i = 0; i < data.assetsList.length; i++) {
        if (!assetList.includes(data.assetsList[i])) {
            assetList.push(data.assetsList[i])
        }
    }
}

//this checks to see if the files that have now been saved actually have any changes to them
//if so it updates the contents in the yail array and send it off to the connection manager for queuing and distribution
let firstRun = true;
function checkForChanges() {

    let changesMade = false
    for (let i = changedFiles.length - 1; i >= 0; i--) {
        update(changedFiles[i])
        changedFiles.splice(i, 1)
        changesMade = true
    }
    if (changesMade) {
        console.log("Changes found. Updating.")
        if (mode !== IS_NET && emulatorInterface) {
            emulatorInterface.update(yail)
        } else if (mode === IS_NET && networkInterface) {
            networkInterface.update(yail)
        } else {
            console.clear()
            showMainMenu();
        }
    }
}

setInterval(checkForChanges, 2000)


//this section sends off the connection data to the connection manager to instantiate the correct sending pathway

async function main(arg, system) {

    //let args = process.argv
    //for (let i = 0; i < args.length; i++) {
    //    args[i] = args[i].toLowerCase().trim()
    //}

    if (arg === 'net' || arg === "wifi") {
        //log("Network mode")
        mode = IS_NET
        networkInterface = require("./emulatorInterface/networkConnection")
        if (system === "apple") {
            networkInterface.setApple()
        }
        networkInterface.loadAssetList(assetList, false)
        networkInterface.run()
        networkInterface.load(yail)

    } else {

        console.log(assetList)
        emulatorInterface = require("./emulatorInterface/emulatorUSBConnection")
        emulatorInterface.load(yail, assetList)

        if (arg === "usb") {
            log("USB mode")
            mode = IS_USB
            await emulatorInterface.run(IS_USB)
        } else {
            console.log("Emulator mode")
            mode = IS_EMULATOR
            await emulatorInterface.run(IS_EMULATOR)
        }


    }

}


//main()

function showMainMenu() {
    console.log("App Inventor JavaScript Tool\n")
    console.log("0. Initialize new project")
    console.log("1. Connect to Emulator (working OK)")
    console.log("2. Connect via USB (no issues)")
    console.log("3. Connect via Wifi - Android Devices (no issues)")
    console.log("4. Connect via Wifi - Apple Devices (has lots of issues - expect significant problems)")
    console.log("X. Exit")
    console.log()
    rl.question("Enter selection: ", response)

}

console.clear()
showMainMenu()

async function response(answer) {
    if (answer === "0") { initProject();  }    
    if (answer === "1") { await main() }
    if (answer === "2") { await main('usb') }
    if (answer === "3") { await main('wifi') }
    if (answer === "4") { await main('wifi', "apple") }
    if (answer.toLowerCase() === 'x') { process.exit(0) }
    //  console.clear()
    //  showMainMenu()
    //  rl.question("Enter selection: ", response)

}



function placeholderProject(){
    let xml = `
<screen name="screen1">
</screen>
        `
        fs.writeFileSync("screen1.xml", xml)
    
}





function initProject(){
    let xml = `
<screen script="screen1.js" name="screen1" AppName="myApp" Title="Great Title!" Scrollable="true">
    <button name="button" text="Press me!" />
    <label name="label" text="Hello World!" visible="false"/>
</screen>
    `
    fs.writeFileSync("screen1.xml", xml)

let js = `
require("../screen1Helper")

screen1.addEventListener(
    "initialize",
    function(){
        testbox.text = "Text Loaded 13."

    }
)

button.addEventListener(
    "click",
    function(){
        label.visible = true
    }
)
`

fs.writeFileSync("screen1.js", js)

let helperFile = helperMaker.run("screen1.xml", [])

}



