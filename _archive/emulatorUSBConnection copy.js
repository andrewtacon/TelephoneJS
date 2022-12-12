//https://github.com/mit-cml/appinventor-sources/blob/b69b808c712abfaf7eb15d43f7bd77b1db43e001/appinventor/blocklyeditor/src/replmgr.js

////////////////////////////////////////////
///// THIS IS THE SETUP ////////////////////
////////////////////////////////////////////

const fetch = require('node-fetch');
const fs = require('fs');
const security = require("./security")

////////////////////////////////////////////
///// Logging //////////////////////////////
////////////////////////////////////////////

const logger = require("./logger")
const log = logger.log
const debug = logger.debug

/////////////////////////////////////////////
//// ADB Comms //////////////////////////////
/////////////////////////////////////////////

const adb = require("./adbController");


/////////////////////////////////////////////
////// USB DEVICE CONTROL CODE //////////////
/////////////////////////////////////////////

async function launchUSBDevice() {
    //check if can already connect
    let isOn = await fetch('http://localhost:8004/ucheck/')
    res = await isOn.json()
    if (res.status === 'OK') {
        return 'connected'
    }

    //this launches the device
    let turnOn = await fetch('http://localhost:8004/start/')
    return turnOn
}


//check status of the usb device
async function checkUSBDeviceStatus() {
    log("Connecting to usb device... Please wait...")

    let res = { status: "NO" }
    while (res.status !== 'OK') {
        await delay(1000)
        let isOn = await fetch('http://localhost:8004/utest/')
        res = await isOn.json()
    }

    log("Connected!")
    return res
}



/////////////////////////////////////////////
////// EMULATOR CONTROL CODE ////////////////
/////////////////////////////////////////////

async function launchEmulator() {
    //check if can already connect
    let isOn = await fetch('http://localhost:8004/echeck/')
    res = await isOn.json()
    if (res.status === 'OK') {
        return 'connected'
    }

    //this launches the emulator
    let turnOn = await fetch('http://localhost:8004/start/')
    return turnOn
}


//check status of the emulator and get the device
async function checkEmulatorStatus() {
    log("Connecting to emulator... Please wait...")

    let res = { status: "NO" }
    while (res.status !== 'OK') {
        await delay(1000)
        let isOn = await fetch('http://localhost:8004/echeck/')
        res = await isOn.json()
    }

    log("Connected!")
    return res
}

////////////////////////////////////////////////////
//// Universal control signals /////////////////////
////////////////////////////////////////////////////

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//get the device and start the REPL
async function startRepl(device) {
    log(device)
    let connect = await fetch("http://localhost:8004/replstart/" + device)
    return connect
}

async function getVersion() {
    let res = { version: "" }
    while (res.version === '') {
        await delay(1000)
        try {
            let version = await fetch('http://localhost:8001/_getversion')
            res = await version.json()
        } catch (error) {
            //expect a connection reset error
            //and fail quietly
            debug("getVersion error")
            debug(error)
        }
    }

    return res
}

async function getValues() {
    let values = await fetch('http://localhost:8001/_values')
    let res = await values.json()
    log("Ready to upload.")
    return res
}


let messageQueue = []
function enqueueMessage(payload) {
    if (messageQueue.indexOf(payload) === -1) {
        messageQueue.push(payload)
    }
}

async function sendMessage(payload) {
    try {
        let answer = await fetch('http://localhost:8001/_newblocks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload
        });

        let a = await answer
        return a.json()
    } catch (error) {
        //if an error then message not got through so
        //reload message
        log("Message send failed: requeuing")
        debug(error)
        messageQueue.unshift(lastMessageSent)
        return
    }
}


async function deviceReset(device) {
    let connect = await fetch("http://localhost:8004/reset/")
    return connect
}


////Need to keep track of the sequence number (the amount of data sent to the emulator)
////The emulator keeps track of this value and increments it each time new data is sent
////If the sent message doesn't match the expected sequence number (allows an off by one error)
////then the data is rejected.
////These functions store the last used sequence number in a file so that it is loaded for the next
////run of the script. It also resets it to 1 when the emulator starts or is reset.

////The file is now the fallback code. The system now polls the device using adb to see what the emulator
////thinks is the correct sequence number and matches that.

let seq = 1

function resetSequenceNumber() {
    fs.writeFileSync("sequence.info", "1")
    seq = 1
}

function updateSequenceNumber(value) {
    fs.writeFileSync("sequence.info", value + "")
}

function loadSequenceNumber() {
    let value = fs.readFileSync("sequence.info", "utf-8")
    seq = parseInt(value)
}

//this is -2 for blocks - No idea what it really does. But it works for now
//I think it is -1 when you send in an empty and a new value when you add individual blocks live (but that doesn't happen in this implementation)
const blockid = -2


//build the message to send - layer in the hmac and extra information
function buildMessage(message) {
    var encoder = new goog.Uri.QueryData();
    encoder.add('mac', security.hmac(message + seq + blockid));
    encoder.add('seq', seq++);
    encoder.add('code', message);
    encoder.add('blockid', blockid);
    return encoder.toString();
}


////////////////////////////////////////////////////////////////////////
//// Asset Handling - load all the images etc into the emulator  ///////
//// before running ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

async function loadAssets() {

    //get known assets
    let devices = await adb.devices()
    let files = await adb.getFiles(devices)
    let assetList = JSON.parse(fs.readFileSync("assets.list", "utf8"))

    for (let i = 0; i < assetList.length; i++) {
        let asset = assetList[i]

        if (files.includes(asset)) {
            console.log(`"${asset}" found on device - skipping upload.`)
            continue
        }

        let url = `http://127.0.0.1:8001/?filename=${asset}`

        if (!fs.existsSync(asset)) {
            log(`"${asset}" not found in folder.`)
            continue
        }

        log(`Loading "${asset} onto device.`)


        //run an OPTIONS request
        const options = await fetch(url, {
            method: 'OPTIONS'
        });
        let optionReturn = await options


        //run a PUT request and send the file
        const stats = fs.statSync(asset);
        const fileSizeInBytes = stats.size;

        // You can pass any of the 3 objects below as body
        let readStream = fs.createReadStream(asset);

        const put = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-length": fileSizeInBytes
            },
            body: readStream // Here, stringContent or bufferContent would also work
        });
        let putReturn = await put


    }

}





//////////////////////////////////////////////////////////////
/// WHERE THE MAGIC HAPPENS - RUN THE SEQUENCE TO LOAD ///////
//////////////////////////////////////////////////////////////


//main function - runs once, async so that it can wait for thinsg to happen
async function main(isEmulator = true) {

    //if selected hard reset or there is no tracking file for the sequence number
    //then reset the emulator hard
    let args = process.argv
    if (args[args.length - 1] === 'h') {
        resetSequenceNumber()
        await deviceReset()
    }

    if (isEmulator) {
        let state = await launchEmulator()
        console.log(state)

        //for testing - if already connected then assume everything is good
        if (state !== 'connected') {
            resetSequenceNumber()
            let status = await checkEmulatorStatus()
            await startRepl(status.device)
            await getVersion()
            await getValues()

            //then also log the last time the emulator was started
        } else {
            loadSequenceNumber() //load sequence number from file so it matches last sent value to emulator
        }
    } else {
        let state = await checkUSBDeviceStatus()
        console.log(state)

        //for testing - if already connected then assume everything is good
        if (state !== 'connected') {
            let status = await checkUSBDeviceStatus()
            await startRepl(status.device)
            await getVersion()
            await getValues()

            //then also log the last time the emulator was started
        }
    }



    await loadScreen(currentScreen, true)
    setInterval(listener, 1000)
}




let yail = []
let currentScreen = "screen1.xml"
let firstLoad = true
function pushNewData(data) {
    log("New data incoming.")
    yail = data
    //if (triggerRefresh) {
    //  console.log('Refresh triggered for '+currentScreen)
    loadScreen(currentScreen, firstLoad)
    //}
}


function loadData(data) {
    yail = data
    debug("Initial data")
    debug(yail)
}

async function loadScreen(screen, firstLoad = true) {


    //this is default system code that seems to need to be sent so the emulator
    //actually runs code in the first place
    let system1 = `
(define-syntax protect-enum   
    (lambda (x)     
        (syntax-case x ()       
            ((_ enum-value number-value)         
                (if (< com.google.appinventor.components.common.YaVersion:BLOCKS_LANGUAGE_VERSION 34)           
                #'number-value           
                #'enum-value)
            )
        )
    )
)
(clear-current-form)`

    //need to have a yail maker here

    //this reads the generated yail code and loads it into the program
    let system2 = yail[screen]

    if (system2 === undefined) {
        console.log("Message error")
        console.log(yail)
        console.log(screen)
        console.log(system2)
        return
    }

    //send first message so things load
    if (!firstLoad) {
        system2 = "(clear-current-form)" + system2
    } else {
        system2 = system1 + system2

        // let msg = buildMessage(system1)
        // sendMessage(msg)
    }

    //send the actual yail program code
    msg = buildMessage(system2)
    //sendMessage(msg)
    enqueueMessage(msg)

    //store updated sequence number for next run
    updateSequenceNumber(seq)
    debug(`Message Number: ${seq}`)

    firstLoad = false
    log("Message sent to emulator")

    //need to load the assets associated with the item
    await loadAssets()

}



let ableToSend = true
let awaitingValues = false
let lastMessageSent //need to keep this incase it fails due to the sequence numbers being out of sync in code and on device
async function listener() {

    try {
        //send the message from the queue and prevent future message until all clear
        if (ableToSend && messageQueue.length > 0) {
            await sendMessage(messageQueue[0])
            lastMessageSent = messageQueue.shift()
            ableToSend = false
        }
        debug(adb.sequence, ableToSend, seq)

        //check sequence sent versus adb emulator required and match up. if out of sync then resend last message as probably failed
        //if (!ableToSend || (ableToSend && adb.sequence.incoming !== adb.sequence.computed)) {
        if (adb.sequence.incoming !== adb.sequence.computed) {
            console.log("sequence error correction")
            seq = adb.sequence.computed
            adb.sequence.incoming = adb.sequence.computed
            updateSequenceNumber(seq)

            debug(seq)
            //      ableToSend = true
            messageQueue.unshift(lastMessageSent)
        }
        //}

        if (!awaitingValues) {
            awaitingValues = true
            let values = await fetch('http://localhost:8001/_values')
            let res = await values.json()
            awaitingValues = false
            debug(res)
            try {
                if (res.status === "OK") {
                    ableToSend = true
                }
                if (res.values) {
                    for (let i = 0; i < res.values.length; i++) {
                        //code to change screen based on event sent from emulator
                        if (res.values[i].type === 'pushScreen') {
                            log(`Loading "${res.values[i].screen}"`)
                            await loadScreen(res.values[i].screen, false)
                            break //take that QCAA
                        }

                        //reset ability to send messages if get an OK on the return
                        if (res.values[i].type === 'return' && res.values[i].status === 'OK') {
                            ableToSend = true
                        }
                        //console.log("**** "+JSON.stringify(res.values[i]))
                    }
                }

            } catch (error) {
                debug("Inner listener error")
                debug(error)

            }
        }

    } catch (error) {
        //this could occur because of some type of timout or something so ignoring
        log("Awaiting values error. Retrying soon.")
        debug("Outer listener error")
        debug(error)
    }
}






//make it so - Captain Jean L. Picard
//main()

exports.run = main
exports.update = pushNewData
exports.load = loadData

