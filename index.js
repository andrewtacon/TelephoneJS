let emulatorInterface
let networkInterface
const generateYail = require("./yailMaker/yailMaker")
const fs = require('fs')

let yail = []
let assetList = []

const IS_EMULATOR = "emulator"
const IS_USB = "usb"
const IS_NET = 'net'
let mode = IS_NET

let log = console.log

console.clear()

//this sections loads all the XML files into the system as yail code and creates the initial asset list
let files = fs.readdirSync(__dirname)
files = files.filter(file => file.toLowerCase().endsWith(".xml"))

for (let i = 0; i < files.length; i++) {
    let data = generateYail.for(files[i])
    yail[files[i]] = data.yail
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
    if (filename.toLowerCase().endsWith(".js")) {
        filename = filename.replaceAll(".js", ".xml")
        changedFiles.push(filename)
    }
})


function update(filename) {
    let data = generateYail.for(filename)
    yail[filename] = data.yail
    for (let i = 0; i < data.assetsList.length; i++) {
        if (!assetList.includes(data.assetsList[i])) {
            assetList.push(data.assetsList[i])
        }
    }
}

//this checks to see if the files that have now been saved actually have any changes to them
//if so it updates the contents in the yail array and send it off to the connection manager for queuing and distribution
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

async function main() {

    let args = process.argv
    for (let i = 0; i < args.length; i++) {
        args[i] = args[i].toLowerCase().trim()
    }

    if (args.includes('net') || args.includes("wifi")) {
        log("Network mode")
        mode = IS_NET
        networkInterface = require("./emulatorInterface/networkConnection")
        networkInterface.run()
        networkInterface.load(yail)

    } else {
        emulatorInterface = require("./emulatorInterface/emulatorUSBConnection")
        emulatorInterface.load(yail)

        if (args.includes("usb")) {
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


main()