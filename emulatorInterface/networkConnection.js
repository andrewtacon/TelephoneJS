///to get around self-signed certificate on the school network

//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

////////////////////////////////////////////////
/// MOST OF THIS CODE FROM MITS replmgr.js /////
////////////////////////////////////////////////
/// This is an extraction of the code needed ///
/// to create the webRTC connection. I know  ///
/// MIT stuffed it all together but this is  ///
/// the way that I think.                    ///
////////////////////////////////////////////////

let webrtcpeer;
let webrtcisopen = false;
let webrtcforcestop = false;
let webrtcdata;
let seennonce = {};

let fixchrome89 = function (desc) {
    let sdp = desc.sdp;
    sdp = sdp.replace("a=extmap-allow-mixed\r\n", "")
    desc.sdp = sdp;
    return desc;
};

const fetch = require("node-fetch")
const webRTC = require('wrtc')
let RTCPeerConnection = webRTC.RTCPeerConnection


const PROTECT_ENUM_ANDROID = "(define-syntax protect-enum " +
    "  (lambda (x) " +
    "    (syntax-case x () " +
    "      ((_ enum-value number-value) " +
    "        (if (< com.google.appinventor.components.common.YaVersion:BLOCKS_LANGUAGE_VERSION 34) " +
    "          #'number-value " +
    "          #'enum-value)))))";
const PROTECT_ENUM_IOS = "#f))(define-syntax protect-enum " +
    "(syntax-rules () ((_ enum-value number-value) " +
    "(if (equal? \"\" (yail:invoke (yail:invoke AIComponentKit.Form 'getActiveForm) 'VersionName)) " +
    "#'number-value #'enum-value))))(begin (begin #f";


////////////////////////////////////////////
///// Logging //////////////////////////////
////////////////////////////////////////////

const logger = require("./logger")
const log = logger.log
const debug = logger.debug


////////////////////////////////////////////
//// FILE OPERATIONS ///////////////////////
////////////////////////////////////////////

const fs = require('fs')

////////////////////////////////////////////
//// TO LOAD FILES OVER webrtc /////////////
////////////////////////////////////////////

const assetSideLoader = require("../assetSideLoader/assetSideLoader")
const assetSideLoaderIos = require("../assetSideLoader/assetSideLoaderIos")
const EventEmitter = require("events")
const dataReceived = new EventEmitter()

//////////////////////////////////////////////////////////////
//// FROM MIT replmngr.js ////////////////////////////////////
//////////////////////////////////////////////////////////////

//generate the connection code for the AI companion to be used at the rendezvous
function genCode() {
    let retval = '';
    for (let i = 0; i < 6; i++) {
        retval = retval + String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    return retval;
};

////////////////////////////////////

let replcode = genCode()
log(`AI Companion Code: ${replcode}`)

//set up the rendezvous at the server with encrypted code (essentially a shared secret)
let security = require('./security')
let rendezvouscode = security.sha1(replcode);

let rs = {
    'key': replcode,
    'state': 0,                         // Is the connection to the Repl Up
    'url': null,                        // The url of the repl (Companion) when known
    'baseurl': null,                    // URL used to upload assets
    'replcode': replcode,               // The six digit code used for rendezvous
    'rendezvouscode': rendezvouscode,   // Code used for Rendezvous (hash of replcode)
    'dialog': null,                     // The Dialog Box with the code and QR Code
    'count': 0,                         // Count of number of reads from rendezvous server
    'didversioncheck': false,
    'isUSB': false,                     // True if using a USB connection (which is handled elsewhere)
    'rendezvous2': 'https://rendezvous.appinventor.mit.edu/rendezvous2/',
    'iceservers': {
        'iceServers': [{
            'urls': ['turn:turn.appinventor.mit.edu:3478'],
            'username': 'oh',
            'credential': 'boy'
        }]
    }
};



let offer;
let haveoffer = false;
let connectionstate = "none";
let webrtcerror = function (doalert, msg) {
    log(msg)
    //    engine.resetcompanion();
};

webrtcisopen = false;
webrtcforcestop = false;
let webrtcCandidates = []
let targetIP
let targetPort
//ip address regexp
const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;


///run a poll to get get data from the rendezvous server
let poll = async function () {

    fetch(rs.rendezvous2 + rs.key + '-r')
        .then((data) => data.json())
        .then((data) => {

            let json = data;
            for (let i = 0; i < json.length; i++) {
                let hunk = json[i];
                let candidate = hunk['candidate'];
                offer = hunk['offer'];
                if (candidate && haveoffer) {
                    let nonce = hunk['nonce'];
                    if (!seennonce[nonce]) {
                        seennonce[nonce] = true;
                        debug("addIceCandidate: signalingState = " + webrtcpeer.signalingState +
                            " iceConnectionState = " + webrtcpeer.iceConnectionState);
                        debug("addIceCandidate: candidate = " + JSON.stringify(candidate));
                        webrtcpeer.addIceCandidate(candidate)["catch"](function (e) {
                            console.error(e);
                            webrtcerror(true, "Connection error\n" + e);
                        });

                        //  console.log(candidate)
                        let ip = candidate.candidate.split(" ")[4]
                        if (regexExp.test(ip) && candidate.candidate.indexOf('srflx') !== -1) {
                            webrtcCandidates.push(candidate)
                            //   console.log(candidate.candidate)
                        }

                    } else {
                        debug("Seen nonce " + nonce);
                    }
                } else if (offer) {
                    if (!haveoffer) {
                        haveoffer = true;
                        i = 0; // Start loop over (I hope)
                        webrtcpeer.setRemoteDescription(offer);
                    }
                }
            }
            if (!webrtcisopen && !webrtcforcestop) {
                setTimeout(poll, 1000); // Try again in one second
            }

            webrtcCandidates.sort((a, b) => {
                let aValue = parseInt(a.candidate.split(" ")[0].replace("candidate:", "").trim())
                let bValue = parseInt(b.candidate.split(" ")[0].replace("candidate:", "").trim())
                return bValue - aValue

            })

        })
};

webrtcpeer = new RTCPeerConnection(rs.iceservers);

webrtcpeer.oniceconnectionstatechange = function (evt) {
    let isFirefox = typeof InstallTrigger !== 'undefined';
    log("Network connection status: " + this.iceConnectionState)
    connectionstate = this.iceConnectionState;
    if ((connectionstate == "disconnected" && !isFirefox) ||
        connectionstate == "failed") {
        webrtcerror(true, "Web rtc connection closed");
    }

};

webrtcpeer.onsignalingstatechange = function (evt) {
    debug("onsignalingstatechange: evt.type = " + evt.type);
    debug("onsignalingstatechange: signalingstate = " + this.signalingState);
};

webrtcpeer.onicecandidate = function (evt) {
    if (evt.type == 'icecandidate') {
        fetch(rs.rendezvous2,
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        'key': rs.key + '-s',
                        'webrtc': true,
                        'nonce': Math.floor(Math.random() * 10000) + 1,
                        'candidate': evt.candidate
                    }
                )
            })
    }
};

webrtcdata = webrtcpeer.createDataChannel('data');

webrtcdata.onopen = async function () {
    webrtcisopen = true;
    log('Network data connection open!');

    //This is a crucial piece of machinery. It waits for messages from the device coming back in and
    //things happen as a response to those items.
    webrtcdata.onmessage = async function (ev) {

        let json = JSON.parse(ev.data);
       // console.log("event data")
       // console.log(json)
        let values = json.values[0]
        if (json.status == 'OK') {

            if (loadingAssets) {
                deviceFileList = json
                if (values.type === "pushScreen") {
                    if (values.screen === "AssetLoader") {
                        dataReceived.emit("screenok")
                    }
                } else {
                    dataReceived.emit("ok")
                }


            } else {

                if (values.type === "pushScreen") {
                    log(`Loading "${values.screen}"`)
                    senddata(yail[values.screen]);//, false)
                    screenStack.push(values.screen)
                } else if (values.type === 'popScreen') {
                    screenStack.pop()
                    last = screenStack[screenStack.length - 1]
                    senddata(yail[last]);//, false)
                    //this is to fake out the listener so it doesn't send the item on the stack before this and stuff things up
                    lastMessageSent = yail[screenStack[screenStack.length - 1]]
                }
                log(`Device returned OK for data.`)
            }

        } else {
            log("webrtc(onmessage): " + ev.data);
        }
    };
    // Ready to actually exchange data
    webrtcrunning = true;
    webrtcdata = webrtcdata; // For debugging

    let info = await fetch('https://rendezvous.appinventor.mit.edu/rendezvous/' + rendezvouscode)
    let d = await info.json()

    //this extracts the IP address of the companion device - work for devices on the same LAN
    //targetPort = 8001
    if (d.ipaddr.indexOf("Error") === -1 && targetIP === undefined) {
        targetIP = d.ipaddr
    }

    await loadAssets()

    setInterval(listener, 1000)

};



webrtcdata.onclose = function () {
    log("Network data connection closed.");
    webrtcdata = null;
    webrtcstarting = false;
    webrtcrunning = false;
    webrtcpeer.close();
};

webrtcdata.onerror = function (err) {
    log("Network data error: " + err);
    webrtcdata = null;
    webrtcstarting = false;
    webrtcrunning = false;
};

webrtcpeer.createOffer().then(function (desc) {
    offer = fixchrome89(desc);

    fetch(rs.rendezvous2,
        {
            method: 'POST',
            body: JSON.stringify(
                {
                    'key': rs.key + '-s',
                    'webrtc': true,
                    'offer': desc
                }
            )
        })
    webrtcpeer.setLocalDescription(desc);
});


//this sets for apple device
let isAndroid = true
function setApple() {
    isAndroid = false
    console.log("set as apple")
}



//This sends the data when a new screen needs to be loaded into the device
let sentMacros = false
function senddata(yailPayload) {
    log("Sending network data.")


    let blockid = -2
    let item = ""

    if (!sentMacros) {
        if (isAndroid) {
            transmit(PROTECT_ENUM_ANDROID);
            item = `(clear-current-form)` + yailPayload
            item = "(begin (require <com.google.youngandroid.runtime>) (process-repl-input " +
                blockid + " (begin " + item + ")))";

        } else {
            item = PROTECT_ENUM_IOS + `(clear-current-form)` + yailPayload
            item = "(begin (require <com.google.youngandroid.runtime>) (process-repl-input " +
                blockid + " (begin " + item + ")))";


        }
        sentMacros = true;
    } else {
        item = `(clear-current-form)` + yailPayload

        item = "(begin (require <com.google.youngandroid.runtime>) (process-repl-input " +
        blockid + " (begin " + item + ")))";
    
    }




    transmit(item);
}


//This holds the data for the different screens. It accepts a data insertion from the main index.js file. Index.js
//sends through new data when it detects that one of the screens or files has been changed.
let yail = []
let screenStack = ["Screen1"]
function loadData(data) {
    yail = data
    debug("Initial data")
    debug(yail)
}

function update(data) {
    log("New data incoming")
    yail = data
    senddata(yail[screenStack[screenStack.length - 1]])
}


//This checks for changes to the data for the current screen. If changes are detected after an update has occured,
//it sends the new data and triggers an update on the device.
let lastMessageSent = ""
async function listener() {
    if (yail[screenStack[screenStack.length - 1]] !== lastMessageSent && yail[screenStack[screenStack.length - 1]] !== undefined) {
        lastMessageSent = yail[screenStack[screenStack.length - 1]]
        senddata(lastMessageSent)
    }
}

//this is a bit of indirection. The listener is called to start after all the assets are
//confirmed as being loaded.
function startListener() {
    setInterval(listener, 1000)
}


function transmit(data) {
    //   console.log(data)
    webrtcdata.send(data)
}




/////////////////////////////////////////////////////
////This is where the assets are sent over webrtc ///
///////
let assetList = []
let loadingAssets = false;
let deviceFileList = []
let shouldDeleteAllFiles = false

function loadAssetList(sentAssets, deleteAll = false) {
    assetList = sentAssets
    shouldDeleteAllFiles = deleteAll
    console.log(`${assetList.length} assets required.`)
}

async function loadAssets() {

    loadingAssets = true

    if (isAndroid) {

        //to get the list of file on the device, you need to load a form and then run a "do it" to get the repl to spit out file list
        //change this line for apple devices
        let message1 = `(begin (require <com.google.youngandroid.runtime>) (process-repl-input -1 (begin (define-syntax protect-enum   (lambda (x)     (syntax-case x ()       ((_ enum-value number-value)         (if (< com.google.appinventor.components.common.YaVersion:BLOCKS_LANGUAGE_VERSION 34)           #'number-value           #'enum-value)))))(clear-current-form))))`
        let message2 = `(begin (require <com.google.youngandroid.runtime>) (process-repl-input -1 (begin (try-catch (let ((attempt (delay (set-form-name "Screen2")))) (force attempt)) (exception java.lang.Throwable 'notfound)))))`
        let message3 = `(begin (require <com.google.youngandroid.runtime>) (process-repl-input -1 (begin (rename-component "Screen1" "Screen2")(do-after-form-creation (set-and-coerce-property! 'Screen2 'AppName "loopback" 'text)(set-and-coerce-property! 'Screen2 'ShowListsAsJson #t 'boolean)(set-and-coerce-property! 'Screen2 'Sizing "Responsive" 'text)(set-and-coerce-property! 'Screen2 'Title "Screen2" 'text))(add-component Screen2 com.google.appinventor.components.runtime.File File1 ))))`
        let message4 = `(begin (require <com.google.youngandroid.runtime>) (process-repl-input -1 (begin (init-runtime))))`
        let message5 = `(begin (require <com.google.youngandroid.runtime>) (process-repl-input "{L1w@aaK%_8!!9_altvx" (begin (def g$name ""))))`
        let message6 = `(begin (require <com.google.youngandroid.runtime>) (process-repl-input -1 (begin (call-Initialize-of-components 'Screen2 'File1))))`

        transmit(message1);
        await new Promise(resolve => dataReceived.once("ok", resolve))
        transmit(message2);
        await new Promise(resolve => dataReceived.once("ok", resolve))
        transmit(message3);
        await new Promise(resolve => dataReceived.once("ok", resolve))
        transmit(message4);
        await new Promise(resolve => dataReceived.once("ok", resolve))
        transmit(message5);
        await new Promise(resolve => dataReceived.once("ok", resolve))
        transmit(message6);
        await new Promise(resolve => dataReceived.once("ok", resolve))

        let requestFileList = `(begin (require <com.google.youngandroid.runtime>) (process-repl-input "requestFileList" (begin (call-component-method-with-blocking-continuation 'File1 'ListDirectory (*list-for-runtime* (protect-enum (static-field com.google.appinventor.components.common.FileScope "App") "App")  "/assets/") '(com.google.appinventor.components.common.FileScopeEnum text)))))`
        transmit(requestFileList);
        await new Promise(resolve => dataReceived.once("ok", resolve))

        let files = JSON.parse(deviceFileList.values[0].value)

        if (shouldDeleteAllFiles) {

            //get the returned files
            if (files.indexOf("external_comps") !== -1) {
                files.splice(files.indexOf("external_comps"), 1)
            }

            console.log("Deleting all files on device.")
            console.log(files)

            for (let i = 0; i < files.length; i++) {
                let deleteFileCode = `(begin (require <com.google.youngandroid.runtime>) (process-repl-input "G1a[)k3GA/Z(n$R=;eZP" (begin (call-component-method 'File1 'Delete (*list-for-runtime* "/assets/${files[i]}") '(text)))))`
                transmit(deleteFileCode);
                await new Promise(resolve => dataReceived.once("ok", resolve))
            }
            files.length = 0

        }


        //remove anything already on device
        for (let i = assetList.length - 1; i >= 0; i--) {
            if (files.includes(assetList[i])) {
                console.log(`"${assetList[i]}" already on device. Skipping.`)
                assetList.splice(i, 1)
            }
        }

        //load any other assets
        if (assetList.length > 0) {
            console.log("Attempting to load assets.")
        }
        for (let i = 0; i < assetList.length; i++) {
            console.log("Asset: " + assetList[i])
            let schemeFragments = assetSideLoader.run(assetList[i])
            for (let j = 0; j < schemeFragments.length; j++) {
                transmit(schemeFragments[j]);
            }

            await new Promise(resolve => dataReceived.once("screenok", resolve))
        }

    } else {
        //iOS    

    }

    loadAssets = false
    return true
}





exports.load = loadData
exports.update = senddata
exports.run = poll
exports.loadAssetList = loadAssetList
exports.setApple = setApple