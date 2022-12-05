
let log = console.log
const fetch = require('node-fetch');

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
        console.log(res)
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




//////////////////////////////////////////////////////////////
/// WHERE THE MAGIC HAPPENS - RUN THE SEQUENCE TO LOAD ///////
//////////////////////////////////////////////////////////////


//main function - runs once, async so that it can wait for thinsg to happen
async function main(isEmulator = false) {

    let state =  await checkUSBDeviceStatus()
    console.log(state)

    //for testing - if already connected then assume everything is good
    if (state !== 'connected') {
        let status =  await checkUSBDeviceStatus()
        await startRepl(status.device)
        await getVersion()
        await getValues()

        //then also log the last time the emulator was started
    } 

}


main()