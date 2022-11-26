//https://github.com/mit-cml/appinventor-sources/blob/b69b808c712abfaf7eb15d43f7bd77b1db43e001/appinventor/blocklyeditor/src/replmgr.js

////////////////////////////////////////////
///// THIS IS THE SETUP ////////////////////
////////////////////////////////////////////

const fetch = require('node-fetch');
const fs = require('fs');

require("google-closure-library");
goog.require("goog.crypt.Sha1");
goog.require("goog.crypt.Hmac")
goog.require("goog.Uri.QueryData")


/////////////////////////////////////////////
////// EMAULTOR CONTROL CODE ////////////////
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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//check status of the emulator and get the device
async function checkEmulatorStatus() {
    console.log("Connecting to emulator... Please wait...")

    let res = { status: "NO" }
    while (res.status !== 'OK') {
        await delay(1000)
        let isOn = await fetch('http://localhost:8004/echeck/')
        res = await isOn.json()
    }

    console.log("Connected!")
    return res
}

//get the device and start the REPL
async function startRepl(device) {
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
        }
    }

    return res
}

async function getValues() {
    let values = await fetch('http://localhost:8001/_values')
    let res = await values.json()
    console.log("Ready to upload.")
    return res
}


async function sendMessage(payload) {
    let answer = await fetch('http://localhost:8001/_newblocks?' + payload)
    let a = await answer.json()
    seq++
    return a
}


async function emulatorReset(device) {
    let connect = await fetch("http://localhost:8004/reset/")
    return connect
}

/////////////////////////////////////////
/// SEND MESSAGE HMAC HASHING CODE //////
/////////////////////////////////////////

let hmac = function (input) {
    var googhash = new goog.crypt.Hmac(new goog.crypt.Sha1(), string_to_bytes("emulator"), 64);
    return (bytes_to_hexstring(googhash.getHmac(string_to_bytes(input))));
};

let sha1 = function (input) {
    var hasher = new goog.crypt.Sha1();
    hasher.update(this.string_to_bytes(input));
    return (this.bytes_to_hexstring(hasher.digest()));
};

let string_to_bytes = function (input) {
    var z = [];
    for (var i = 0; i < input.length; i++)
        z.push(input.charCodeAt(i));
    return z;
};

let bytes_to_hexstring = function (input) {
    var z = [];
    for (var i = 0; i < input.length; i++)
        z.push(Number(256 + input[i]).toString(16).substring(1, 3));
    return z.join("");
};

//////////////////////////////////////////////
//// END HMAC CODE ///////////////////////////
//////////////////////////////////////////////

////Need to keep track of the sequence number (the amount of data sent to the emulator)
////The emulator keeps track of this value and increments it each time new data is sent
////If the sent message doesn't match the expected sequence number (allows an off by one error)
////then the data is rejected.
////These functions store the last used sequence number in a file so that it is loaded for the next
////run of the script. It also resets it to 1 when the emulator starts or is reset.

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
let blockid = -2

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
let system2 = fs.readFileSync("code.yail", "utf-8")

//build the message to send - layer in the hmac and extra information
function buildMessage(message) {
    var encoder = new goog.Uri.QueryData();
    encoder.add('mac', hmac(message + seq + blockid));
    encoder.add('seq', seq);
    encoder.add('code', message);
    encoder.add('blockid', blockid);
    return encoder.toString();
}


////////////////////////////////////////////////////////////////////////
//// Asset Hangdling - load all the images etc into the emulator ///////
//// before running ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

async function loadAssets() {

    let assetList = JSON.parse(fs.readFileSync("assets.list", "utf8"))

    for (let i = 0; i < assetList.length; i++) {
        let asset = assetList[i]
        console.log("LOADING:"+ asset)
        let url = `http://127.0.0.1:8001/?filename=${asset}`

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
async function main() {

    //if selected hard reset or there is no tracking file for the sequence number
    //then reset the emulator hard
    let args = process.argv
    if (args[args.length - 1] === 'h') {
        resetSequenceNumber()
        await emulatorReset()
    }

    let state = await launchEmulator()

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

    //need to load the assets associated with the item
    await loadAssets()

    //send first message so things load
    let msg = buildMessage(system1)
    sendMessage(msg)

    //send the actual yail program code
    msg = buildMessage(system2)
    sendMessage(msg)

    //store updated sequence number for next run
    updateSequenceNumber(seq)

}



//make it so - Captain Jean L. Picard
main()

