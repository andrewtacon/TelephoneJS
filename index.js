const emulatorInterface = require("./emulatorInterface/emulatorUSBConnection")
const generateYail = require("./yailMaker/yailMaker")
const fs = require('fs')

let yail = []
let assetList = []

//this sections loads all the XML files into the structure and creates the initial asset list
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


//this sets up the folder watcher for any saved or changed files
let changedFiles = []
fs.watch(__dirname, 'utf8', function (eventType, filename) {
    if (filename===null) {return}
    if (filename.toLowerCase().endsWith(".xml")) {
        if (!changedFiles.includes(filename)) {
            changedFiles.push(filename)
        }
    }
})
emulatorInterface.load(yail)


function update(filename) {
    let data = generateYail.for(filename)
    yail[filename] = data.yail
    for (let i = 0; i < data.assetsList.length; i++) {
        if (!assetList.includes(data.assetsList[i])) {
            assetList.push(data.assetsList[i])
        }
    }
}

function checkForChanges() {
    let changesMade = false
    for (let i = changedFiles.length - 1; i >= 0; i--) {
        update(changedFiles[i])
        changedFiles.splice(i, 1)
        changesMade = true
    }
    if (changesMade) {
        console.log("Changes found. Updating.")
        emulatorInterface.update(yail)
    }
}

setInterval(checkForChanges, 2000)

const IS_EMULATOR = true
const IS_USB = false
emulatorInterface.run(IS_EMULATOR)