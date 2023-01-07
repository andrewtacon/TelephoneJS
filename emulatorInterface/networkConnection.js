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

            //This is an attempt to get the IP endpoitn address so can upload - it doesn't work (yet or maybe ever)
            // console.log(webrtcCandidates)
            /*            targetPort = 8001
                        if (webrtcCandidates.length > 0) {
                            console.log(webrtcCandidates)
            
                            let selectedCandidate = webrtcCandidates[0].candidate
                            let sc = selectedCandidate.split(' ')
                            console.log(sc)
                            targetIP = sc[4]            //raddr
                  //          targetPort = sc[11]
                        }*/



        })



};

webrtcpeer = new RTCPeerConnection(rs.iceservers);

webrtcpeer.oniceconnectionstatechange = function (evt) {
    let isFirefox = typeof InstallTrigger !== 'undefined';
    //    log("oniceconnectionstatechange: evt.type = " + evt.type + " ice connection state = " +
    //      this.iceConnectionState);
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
    webrtcdata.onmessage = async function (ev) {
        let json = JSON.parse(ev.data);
        if (json.status == 'OK') {
            let values = json.values[0]
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
    //can only upload assets on the same LAN
    if (targetIP !== undefined) {
        await loadAssets()
    }

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

//poll();



let sentMacros = false
function senddata(yailPayload) {
    log("Sending network data.")
    var PROTECT_ENUM_ANDROID = "(define-syntax protect-enum " +
        "  (lambda (x) " +
        "    (syntax-case x () " +
        "      ((_ enum-value number-value) " +
        "        (if (< com.google.appinventor.components.common.YaVersion:BLOCKS_LANGUAGE_VERSION 34) " +
        "          #'number-value " +
        "          #'enum-value)))))";
    var PROTECT_ENUM_IOS = "#f))(define-syntax protect-enum " +
        "(syntax-rules () ((_ enum-value number-value) " +
        "(if (equal? \"\" (yail:invoke (yail:invoke AIComponentKit.Form 'getActiveForm) 'VersionName)) " +
        "#'number-value #'enum-value))))(begin (begin #f";


    if (!sentMacros) {
        webrtcdata.send(PROTECT_ENUM_ANDROID);
        sentMacros = true;
    }

    let item = `(clear-current-form)` + yailPayload

    let blockid = -2
    item = "(begin (require <com.google.youngandroid.runtime>) (process-repl-input " +
        blockid + " (begin " + item + ")))";

    webrtcdata.send(item);
}


let yail = []
//let currentScreen = "screen1.xml"
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


let lastMessageSent = ""
async function listener() {

    if (yail[screenStack[screenStack.length - 1]] !== lastMessageSent && yail[screenStack[screenStack.length - 1]] !== undefined) {
        lastMessageSent = yail[screenStack[screenStack.length - 1]]
        senddata(lastMessageSent)
    }

}





exports.load = loadData
exports.update = senddata
exports.run = poll


//this does work - uploads the assets over normal httpd - doesn't use the webrtc channel for data upload
//must have an IP address to do this
//for MIT is downloads assets from their server and this is baked into the companion app so I don't know if there is a workaround here
//i think this is the only way to do this.
async function loadAssets() {

    let assetList = []

    for (let i = 0; i < assetList.length; i++) {
        let asset = assetList[i]


        //let url = `http://192.168.0.13:8001/?filename=${asset}`
        let url = `http://${targetIP}:${targetPort}/?filename=${asset}`


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
