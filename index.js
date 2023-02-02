process.env ['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 

let emulatorInterface
let networkInterface
const generateYail = require("./yailMaker/yailMaker")
const fs = require('fs')
const readline = require("readline")
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

let yail = []
let assetList = []

const IS_EMULATOR = "emulator"
const IS_USB = "usb"
const IS_NET = 'net'
let mode = IS_NET

let log = console.log


//////////////////////////
/// BUILD TESTS HERE  ////
//////////////////////////

const helperMaker = require("./helpMaker/help")
//let buildTest = helperMaker.buildTest("clock")

/////////////////////////
// END TEST /////////////
/////////////////////////



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
fs.watch(__dirname, 'utf8', function (eventType, filename) {
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
        }
    }
}

setInterval(checkForChanges, 2000)


//this section sends off the connection data to the connection manager to instantiate the correct sending pathway

async function main(arg) {

    //let args = process.argv
    //for (let i = 0; i < args.length; i++) {
    //    args[i] = args[i].toLowerCase().trim()
    //}

    if (arg === 'net' || arg === "wifi") {
        //log("Network mode")
        mode = IS_NET
        networkInterface = require("./emulatorInterface/networkConnection")
        networkInterface.loadAssetList(assetList, false)
        networkInterface.run()
        networkInterface.load(yail)

    } else {
        emulatorInterface = require("./emulatorInterface/emulatorUSBConnection")
        emulatorInterface.load(yail)

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
   // console.clear()
    console.log("App Inventor JavaScript Tool\n")
    console.log("1. Connect to Emulator")
    console.log("2. Connect via USB")
    console.log("3. Connect via Wifi")
    console.log("X. Exit")
    console.log()
}

showMainMenu()
rl.question("Enter selection: ", response)

async function response(answer) {
    if (answer === "1") { await main() }
    if (answer === "2") { await main('usb') }
    if (answer === "3") { await main('wifi') }
    if (answer.toLowerCase() === 'x') { process.exit(0) }
    //  console.clear()
    //  showMainMenu()
    //  rl.question("Enter selection: ", response)
    rl.close()
}

