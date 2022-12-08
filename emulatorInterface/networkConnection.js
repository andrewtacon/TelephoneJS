///to get around self-signed certificate on the school network

process.env ['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 

////////////////////////////////////////////////
/// MOST OF THIS CODE FROM MITS replmgr.js /////
////////////////////////////////////////////////
/// This is an extraction of the code needed ///
/// to create the webRTC connection. I know  ///
/// MIT stuffed it all together but this is  ///
/// the way that I think.                    ///
////////////////////////////////////////////////

let context;
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
console.log(`AI Companion Code: ${replcode}`)

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
    engine.resetcompanion();
};

webrtcisopen = false;
webrtcforcestop = false;


function debug(msg){

}


///run a poll to get get data from the rendezvous server
let poll = function () {

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

        })

};

webrtcpeer = new RTCPeerConnection(rs.iceservers);

webrtcpeer.oniceconnectionstatechange = function (evt) {
    let isFirefox = typeof InstallTrigger !== 'undefined';
//    console.log("oniceconnectionstatechange: evt.type = " + evt.type + " ice connection state = " +
  //      this.iceConnectionState);
    console.log("Network connection status: " + this.iceConnectionState)
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

webrtcdata.onopen = function () {
    webrtcisopen = true;
    //console.log('webrtc data connection open!');
    webrtcdata.onmessage = function (ev) {
        console.log("webrtc(onmessage): " + ev.data);
        let json = goog.json.parse(ev.data);
        if (json.status == 'OK') {
            context.processRetvals(json.values);
        }
    };
    // Ready to actually exchange data
    webrtcrunning = true;
    webrtcdata = webrtcdata; // For debugging

};

webrtcdata.onclose = function () {
    console.log("webrtc data closed");
    webrtcdata = null;
    webrtcstarting = false;
    webrtcrunning = false;
    webrtcpeer.close();
};

webrtcdata.onerror = function (err) {
    console.log("webrtc data error: " + err);
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

poll();

