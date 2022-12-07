//get around EQ self signed certificate
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0


const fetch = require("node-fetch")
const webRTC = require('wrtc')
let log = console.log

////////////////////////////////////////////////////////
///// crypto ///////////////////////////////////////////
////////////////////////////////////////////////////////

require("google-closure-library");
goog.require("goog.crypt.Sha1");

let sha1 = function (input) {
    var hasher = new goog.crypt.Sha1();
    hasher.update(string_to_bytes(input));
    return (bytes_to_hexstring(hasher.digest()));
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

//short delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//Get data from the rendezvous server
//This returns when the user has sent the code from the Companion App
//This is recursive (which might not be the best way of doing this)
async function getFromRendezvous(rendezvouscode, rendezvousServer) {

    let result = await fetch(`https://${rendezvousServer}/rendezvous/${rendezvouscode}`)
    let data = await result.text()

    if (data.trim().length === 0) {
        await delay(2000)
        log('Polling rendezvous server...')
        return await getFromRendezvous(rendezvouscode, rendezvousServer)
    } else {
        data = await JSON.parse(data)
        return data
    }

};

//This processes the data from the rendezvous server and creates and object with lots of 
//apparently useful information (Not sure how useful but hopefully it will be revealed soon)
async function processRendezvousData(json, replcode, rendezvouscode) {

    let rs = {
        'state': 0,     // Is the connection to the Repl Up
        'url': null,                       // The url of the repl (Companion) when known
        'baseurl': null,                   // URL used to upload assets
        'replcode': replcode,                  // The six digit code used for rendezvous
        'rendezvouscode': rendezvouscode,            // Code used for Rendezvous (hash of replcode)
        'dialog': null,                    // The Dialog Box with the code and QR Code
        'count': 0,                        // Count of number of reads from rendezvous server
        'didversioncheck': false,
        'isUSB': false,                     // True if using a USB connection
        'rendezvous2': 'https://rendezvous.appinventor.mit.edu/rendezvous2/',
        'iceservers': {
            'iceServers': [{
                'urls': ['turn:turn.appinventor.mit.edu:3478'],
                'username': 'oh',
                'credential': 'boy'
            }]
        }
    };

    rs.url = 'http://' + json.ipaddr + ':8001/_newblocks';
    rs.rurl = 'http://' + json.ipaddr + ':8001/_values';
    rs.versionurl = 'http://' + json.ipaddr + ':8001/_getversion';
    rs.baseurl = 'http://' + json.ipaddr + ':8001/';
    rs.android = !(new RegExp('^i(pad)?os$').test((json.os || 'Android').toLowerCase()));
    rs.hasfetchassets = rs.android;
    rs.didversioncheck = true;
    // We are checking it here, so don't check it later
    // via HTTP because we may be using webrtc and there is no
    // HTTP
    rs.webrtc = json.webrtc;
    rs.useproxy = json.useproxy;

    // Let's see if the Rendezvous server gave us a second level to contact
    // as well as a list of ice servers to override our defaults

    if (json.rendezvous2) {
        rs.rendezvous2 = json.rendezvous2;
    }
    if (json.iceservers) {
        let serverlist = [];
        for (let i = 0; i < json.iceservers.length; i++) {
            serverlist.push({
                'urls': [json.iceservers[i].server],
                'username': json.iceservers[i].username,
                'credential': json.iceservers[i].password
            });
        }
        rs.iceservers = { 'iceServers': serverlist };
    }

    rs.version = json.version;
    rs.installer = json.installer;

    return rs
}


/////////////////////////////////////////////////////////
//// WEB RTC CONNECTION /////////////////////////////////
/////////////////////////////////////////////////////////


let webrtcpeer
let webrtcdata
async function createRTCOffer(data) {

    webrtcpeer = new webRTC.RTCPeerConnection(data.iceservers);
    webrtcdata = webrtcpeer.createDataChannel('data');

    let description = await webrtcpeer.createOffer()
    description = fixchrome89(description)
    let offerResponse = await fetch(data.rendezvous2,
        {
            method: 'POST',
            body: JSON.stringify(
                {
                    'key': data.replcode + '-s',
                    'webrtc': true,
                    'offer': description
                }
            )
        })
    webrtcpeer.setLocalDescription(description)

    function fixchrome89(desc) {
        var sdp = desc.sdp;
        sdp = sdp.replace("a=extmap-allow-mixed\r\n", "")
        desc.sdp = sdp;
        return desc;
    };

    let response = await offerResponse.text()
    if (response === "OK") {
        return response
    } else {
        return "error"
    }

}


async function collectRTCCandidates(rs) {
    let result = await fetch(rs.rendezvous2 + rs.replcode + '-r');
    let data = await result.json()
    return data

}


async function echoRTCCandidates(data, candidates) {
    for (let i = 0; i < candidates.length; i++) {
        let echo = await fetch(data.rendezvous2,
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        'key': data.replcode + '-s',
                        'webrtc': true,
                        'nonce': Math.floor(Math.random() * 10000) + 1,
                        'candidate': candidates[i]
                    }
                )
            }
        )
        console.log(await echo.text())
    }
    return "OK"
}

async function echoRTCCandidatesBulk(data, candidates) {
    let bulk = []
    for (let i = 0; i < candidates.length; i++) {
        let b = {
            'key': data.replcode + '-r',
            'webrtc': true,
            'nonce': Math.floor(Math.random() * 10000) + 1,
            'candidate': candidates[i]
        }
        bulk.push(b)
    }

    console.log(data.rendezvous2 + data.replcode + '-r')
    let echo = await fetch(data.rendezvous2 + data.replcode + '-r',
        {
            method: 'POST',
            body: JSON.stringify(bulk)
        }
    )

    console.log("-----------------")
    let result = await echo.text()
    console.log(result)
    return result


}


async function main() {

    let replcode = genCode()
    log(`AI Companion Code: ${replcode}`)
    
    //set up the rendezvous at the server
    let rendezvouscode = sha1(replcode);
    let rendezvousServer = 'rendezvous.appinventor.mit.edu'
    let rendezvousData = await getFromRendezvous(rendezvouscode, rendezvousServer)
    let rsData = await processRendezvousData(rendezvousData, replcode, rendezvouscode)
    
    //setup to establish th ertc connection
    //need to send the offer next
    let webRTCOfferResponse = await createRTCOffer(rsData)
    if (webRTCOfferResponse === 'error') {
        console.log("Connection to companion error. Crashing out.")
        process.exit(65)
    }

    //now send candiates with the nonce (app inventor online sends this multiple times)
    await delay(5000) //so rendezvous server can get all candidates
    let webRTCCandidates = await collectRTCCandidates(rsData)

    console.log(webRTCCandidates)
    let returnRTCCandidates = await echoRTCCandidates(rsData, webRTCCandidates)
    let returnRTCCandidatesBULK = await echoRTCCandidatesBulk(rsData, webRTCCandidates)

    

    //send the candidates back to rendevous2


    //now add the candidates to the ice server listings
    /*let nonces=[]
    for (let i=0; i< webRTCCandidates.length; i++){
        let candidate = webRTCCandidates[i]
        if (candidate.first === true) {continue}
        //if (candidate.candidate.candidate === undefined) {continue}
        if (nonces.indexOf(candidate.nonce)==-1){
            nonces.push(candidate.nonce)
            console.log(candidate.candidate)
            webrtcpeer.addIceCandidate(candidate.candidate).catch((e) => {
                console.log(`Failure during addIceCandidate(): ${e.name}`);
              });
        }
    }
    */


    //let webRTCStart = await startWebRTC(rsData)
    //console.log("WebRTCStart")
    //console.log(webRTCStart)


    //  console.log(rData)
}


main()