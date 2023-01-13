const METHODS = {
    "XMLTextDecode": {
        description: "",
        params: []
    },
    "XMLTextDecodeAsDictionary": {
        description: "",
        params: []
    },
    "acceptConnection": {
        description: "",
        params: []
    },
    "acceptConnectionWithUUID": {
        description: "",
        params: []
    },
    "addCol": {
        description: "",
        params: []
    },
    "addDays": {
        description: "",
        params: []
    },
    "addDuration": {
        description: "",
        params: []
    },
    "addHours": {
        description: "",
        params: []
    },
    "addMinutes": {
        description: "",
        params: []
    },
    "addMonths": {
        description: "",
        params: []
    },
    "addRow": {
        description: "",
        params: []
    },
    "addSeconds": {
        description: "",
        params: []
    },
    "addWeeks": {
        description: "",
        params: []
    },
    "addYears": {
        description: "",
        params: []
    },
    "appendToFile": {
        description: "",
        params: []
    },
    "appendValueToList": {
        description: "",
        params: []
    },
    "askForPermission": {
        description: "Ask the user to grant access to a sensitive permission, such as ACCESS_FINE_LOCATION. This block is typically used as part of a PermissionDenied event to ask for permission. If the user grants permission, the PermissionGranted event will be run. If the user denies permission, the PermissionDenied event will be run. Note: It is a best practice to only ask for permissions at the time they are needed, which App Inventor components will do when necessary. You should not use AskForPermission in your Initialize event unless access to that permission is critical to the behavior of your app and is needed up front, such as location services for a navigation app.",
        params: [
            {
                type: "{string}",
                name: "permissionName",
                info: "One of CoarseLocation, FineLocation, MockLocation, LocationExtraCommands, ReadExternalStorage, WriteExternalStorage, Camera, Audio, Vibrate, Internet, NearFieldCommunication, Bluetooth, BluetoothAdmin, WifiState, NetworkState, AccountManager, ManageAccounts, GetAccounts, ReadContacts, UseCredentials"
            }
        ],
        tests: [`"CoarseLocation"`]
    },
    "authorize": {
        description: "",
        params: []
    },
    "bearingToFeature": {
        description: "",
        params: []
    },
    "bearingToPoint": {
        description: "",
        params: []
    },
    "bounce": {
        description: "",
        params: []
    },
    "bounds": {
        description: "",
        params: []
    },
    "buildRequestData": {
        description: "",
        params: []
    },
    "bytesAvailableToReceive": {
        description: "",
        params: []
    },
    "canGoBack": {
        description: "",
        params: []
    },
    "canGoForward": {
        description: "",
        params: []
    },
    "center": {
        description: "",
        params: []
    },
    "centroid": {
        description: "",
        params: []
    },
    "checkAuthorized": {
        description: "",
        params: []
    },
    "clear": {
        description: "",
        params: []
    },
    "clearAll": {
        description: "",
        params: []
    },
    "clearCache": {
        description: "",
        params: []
    },
    "clearCookies": {
        description: "",
        params: []
    },
    "clearLocations": {
        description: "",
        params: []
    },
    "clearRange": {
        description: "",
        params: []
    },
    "clearTag": {
        description: "",
        params: []
    },
    "closeSerial": {
        description: "",
        params: []
    },
    "cloudConnected": {
        description: "",
        params: []
    },
    "connect": {
        description: "",
        params: []
    },
    "connectWithUUID": {
        description: "",
        params: []
    },
    "copyFile": {
        description: "",
        params: []
    },
    "createElement": {
        description: "Creates an element in a listview.",
        params: [{ type: "string", name: "mainText", info: "" }, { type: "string", name: "detailText", info: "" }, { type: "string", name: "imageName", info: "" }]
    },
    "createMarker": {
        description: "",
        params: []
    },
    "dayOfMonth": {
        description: "",
        params: []
    },
    "deAuthorize": {
        description: "",
        params: []
    },
    "delete": {
        description: "",
        params: []
    },
    "directMessage": {
        description: "",
        params: []
    },
    "disconnect": {
        description: "",
        params: []
    },
    "dismissProgressDialog": {
        description: "",
        params: []
    },
    "distanceToFeature": {
        description: "",
        params: []
    },
    "distanceToPoint": {
        description: "",
        params: []
    },
    "doScan": {
        description: "",
        params: []
    },
    "drawArc": {
        description: "",
        params: []
    },
    "drawCircle": {
        description: "",
        params: []
    },
    "drawLine": {
        description: "",
        params: []
    },
    "drawPoint": {
        description: "",
        params: []
    },
    "drawShape": {
        description: "",
        params: []
    },
    "drawText": {
        description: "",
        params: []
    },
    "drawTextAtAngle": {
        description: "",
        params: []
    },
    "duration": {
        description: "",
        params: []
    },
    "durationToDays": {
        description: "",
        params: []
    },
    "durationToHours": {
        description: "",
        params: []
    },
    "durationToMinutes": {
        description: "",
        params: []
    },
    "durationToSeconds": {
        description: "",
        params: []
    },
    "durationToWeeks": {
        description: "",
        params: []
    },
    "exists": {
        description: "",
        params: []
    },
    "featureFromDescription": {
        description: "",
        params: []
    },
    "follow": {
        description: "",
        params: []
    },
    "formatDate": {
        description: "",
        params: []
    },
    "formatDateTime": {
        description: "",
        params: []
    },
    "formatTime": {
        description: "",
        params: []
    },
    "get": {
        description: "",
        params: []
    },
    "getBackgroundPixelColor": {
        description: "",
        params: []
    },
    "getCellReference": {
        description: "",
        params: []
    },
    "getDetailText": {
        description: "",
        params: []
    },
    "getDuration": {
        description: "",
        params: []
    },
    "getImageName": {
        description: "",
        params: []
    },
    "getMainText": {
        description: "",
        params: []
    },
    "getMillis": {
        description: "",
        params: []
    },
    "getPixelColor": {
        description: "",
        params: []
    },
    "getRangeReference": {
        description: "",
        params: []
    },
    "getTagList": {
        description: "",
        params: []
    },
    "getTags": {
        description: "",
        params: []
    },
    "getText": {
        description: "",
        params: []
    },
    "getValue": {
        description: "",
        params: []
    },
    "goBack": {
        description: "",
        params: []
    },
    "goForward": {
        description: "",
        params: []
    },
    "goHome": {
        description: "",
        params: []
    },
    "goToUrl": {
        description: "",
        params: []
    },
    "hideInfobox": {
        description: "",
        params: []
    },
    "hideKeyboard": {
        description: "Hides the soft keyboard.",
        params: []
    },
    "hour": {
        description: "",
        params: []
    },
    "htmlTextDecode": {
        description: "",
        params: []
    },
    "initializeSerial": {
        description: "",
        params: []
    },
    "isDevicePaired": {
        description: "",
        params: []
    },
    "isDirectory": {
        description: "",
        params: []
    },
    "jsonEncodeObject": {
        description: "",
        params: []
    },
    "jsonTextDecode": {
        description: "",
        params: []
    },
    "jsonTextDecodeWithDictionaries": {
        description: "",
        params: []
    },
    "latitudeFromAddress": {
        description: "",
        params: []
    },
    "launchPicker": {
        description: "Launches the DatePicker dialog. The AfterDateSet event will be run after the user confirms their selection.",
        params: []
    },
    "listDirectory": {
        description: "",
        params: []
    },
    "loadFromURL": {
        description: "",
        params: []
    },
    "logError": {
        description: "",
        params: []
    },
    "logInfo": {
        description: "",
        params: []
    },
    "logWarning": {
        description: "",
        params: []
    },
    "longitudeFromAddress": {
        description: "",
        params: []
    },
    "makeDate": {
        description: "",
        params: []
    },
    "makeDirectory": {
        description: "",
        params: []
    },
    "makeFullPath": {
        description: "",
        params: []
    },
    "makeInstant": {
        description: "",
        params: []
    },
    "makeInstantFromMillis": {
        description: "",
        params: []
    },
    "makeInstantFromParts": {
        description: "",
        params: []
    },
    "makePhoneCall": {
        description: "",
        params: []
    },
    "makePhoneCallDirect": {
        description: "",
        params: []
    },
    "makeTime": {
        description: "",
        params: []
    },
    "minute": {
        description: "",
        params: []
    },
    "month": {
        description: "",
        params: []
    },
    "monthName": {
        description: "",
        params: []
    },
    "moveFile": {
        description: "",
        params: []
    },
    "moveIntoBounds": {
        description: "",
        params: []
    },
    "moveTo": {
        description: "",
        params: []
    },
    "moveToPoint": {
        description: "",
        params: []
    },
    "now": {
        description: "",
        params: []
    },
    "open": {
        description: "Opens the ListPicker, as though the user clicked on it.",
        params: []
    },
    "openSerial": {
        description: "",
        params: []
    },
    "panTo": {
        description: "",
        params: []
    },
    "patchFile": {
        description: "",
        params: []
    },
    "patchTextWithEncoding": {
        description: "",
        params: []
    },
    "patchtext": {
        description: "",
        params: []
    },
    "pause": {
        description: "",
        params: []
    },
    "play": {
        description: "",
        params: []
    },
    "pointInDirection": {
        description: "",
        params: []
    },
    "pointTowards": {
        description: "",
        params: []
    },
    "postFile": {
        description: "",
        params: []
    },
    "postText": {
        description: "",
        params: []
    },
    "postTextWithEncoding": {
        description: "",
        params: []
    },
    "printSerial": {
        description: "",
        params: []
    },
    "putFile": {
        description: "",
        params: []
    },
    "putText": {
        description: "",
        params: []
    },
    "putTextWithEncoding": {
        description: "",
        params: []
    },
    "readCell": {
        description: "",
        params: []
    },
    "readCol": {
        description: "",
        params: []
    },
    "readFile": {
        description: "",
        params: []
    },
    "readFrom": {
        description: "",
        params: []
    },
    "readRange": {
        description: "",
        params: []
    },
    "readRow": {
        description: "",
        params: []
    },
    "readSerial": {
        description: "",
        params: []
    },
    "readSheet": {
        description: "",
        params: []
    },
    "readWithExactFilter": {
        description: "",
        params: []
    },
    "readWithPartialFilter": {
        description: "",
        params: []
    },
    "receiveSigned1ByteNumber": {
        description: "",
        params: []
    },
    "receiveSigned2ByteNumber": {
        description: "",
        params: []
    },
    "receiveSigned4ByteNumber": {
        description: "",
        params: []
    },
    "receiveSignedBytes": {
        description: "",
        params: []
    },
    "receiveText": {
        description: "",
        params: []
    },
    "receiveUnsigned1ByteNumber": {
        description: "",
        params: []
    },
    "receiveUnsigned2ByteNumber": {
        description: "",
        params: []
    },
    "receiveUnsigned4ByteNumber": {
        description: "",
        params: []
    },
    "receiveUnsignedBytes": {
        description: "",
        params: []
    },
    "recordVideo": {
        description: "",
        params: []
    },
    "refresh": {
        description: "",
        params: []
    },
    "reload": {
        description: "",
        params: []
    },
    "removeCol": {
        description: "",
        params: []
    },
    "removeDirectory": {
        description: "",
        params: []
    },
    "removeFirstFromList": {
        description: "",
        params: []
    },
    "removeRow": {
        description: "",
        params: []
    },
    "requestDirectMessage": {
        description: "",
        params: []
    },
    "requestDirections": {
        description: "",
        params: []
    },
    "requestFocus": {
        description: "",
        params: []
    },
    "requestFollowers": {
        description: "",
        params: []
    },
    "requestFriendTimeline": {
        description: "",
        params: []
    },
    "requestMentions": {
        description: "",
        params: []
    },
    "requestTranslation": {
        description: "",
        params: []
    },
    "reset": {
        description: "",
        params: []
    },
    "resolveActivity": {
        description: "",
        params: []
    },
    "resume": {
        description: "",
        params: []
    },
    "runJavascript": {
        description: "",
        params: []
    },
    "save": {
        description: "",
        params: []
    },
    "saveAs": {
        description: "",
        params: []
    },
    "saveFile": {
        description: "",
        params: []
    },
    "searchTwitter": {
        description: "",
        params: []
    },
    "second": {
        description: "",
        params: []
    },
    "seekTo": {
        description: "",
        params: []
    },
    "send1ByteNumber": {
        description: "",
        params: []
    },
    "send2ByteNumber": {
        description: "",
        params: []
    },
    "send4ByteNumber": {
        description: "",
        params: []
    },
    "sendBytes": {
        description: "",
        params: []
    },
    "sendMessage": {
        description: "",
        params: []
    },
    "sendMessageDirect": {
        description: "",
        params: []
    },
    "sendText": {
        description: "",
        params: []
    },
    "setBackgroundPixelColor": {
        description: "",
        params: []
    },
    "setCenter": {
        description: "",
        params: []
    },
    "setDateToDisplay": {
        description: "Allows the user to set the date to be displayed when the date picker opens. Valid values for the month field are 1-12 and 1-31 for the day field.",
        params: [{ type: "number", name: "year", info: "Valid year number." }, { type: "number", name: "month", info: "Numerical value from 1 to 12. 1-Jan, 2-Feb..." }, { type: "number", name: "day", info: "Day of month between 1 and 31 inclusive." }]
    },
    "setDateToDisplayFromInstant": {
        description: "Allows the user to set the date from the instant to be displayed when the date picker opens.",
        params: [{ type: "instant", name: "instant", info: "" }]
    },
    "setLocation": {
        description: "",
        params: []
    },
    "setTimeToDisplay": {
        description: "",
        params: []
    },
    "setTimeToDisplayForInstant": {
        description: "",
        params: []
    },
    "shareFile": {
        description: "",
        params: []
    },
    "shareFileWithMessage": {
        description: "",
        params: []
    },
    "shareMessage": {
        description: "",
        params: []
    },
    "shoInfobox": {
        description: "",
        params: []
    },
    "showAlert": {
        description: "",
        params: []
    },
    "showChooseDialog": {
        description: "",
        params: []
    },
    "showInfobox": {
        description: "",
        params: []
    },
    "showMessageDialog": {
        description: "",
        params: []
    },
    "showPasswordDialog": {
        description: "",
        params: []
    },
    "showProgressDialog": {
        description: "",
        params: []
    },
    "showTextDialog": {
        description: "",
        params: []
    },
    "speak": {
        description: "",
        params: []
    },
    "start": {
        description: "",
        params: []
    },
    "startActivity": {
        description: "",
        params: []
    },
    "stop": {
        description: "",
        params: []
    },
    "stopFollowing": {
        description: "",
        params: []
    },
    "stopLoading": {
        description: "",
        params: []
    },
    "storeValue": {
        description: "",
        params: []
    },
    "systemTime": {
        description: "",
        params: []
    },
    "takePicture": {
        description: "",
        params: []
    },
    "tweet": {
        description: "",
        params: []
    },
    "tweetWithImage": {
        description: "",
        params: []
    },
    "uriDecode": {
        description: "",
        params: []
    },
    "uriEncode": {
        description: "",
        params: []
    },
    "vibrate": {
        description: "",
        params: []
    },
    "viewContact": {
        description: "",
        params: []
    },
    "weekday": {
        description: "",
        params: []
    },
    "weekdayName": {
        description: "",
        params: []
    },
    "writeCell": {
        description: "",
        params: []
    },
    "writeCol": {
        description: "",
        params: []
    },
    "writeRange": {
        description: "",
        params: []
    },
    "writeRow": {
        description: "",
        params: []
    },
    "writeSerial": {
        description: "",
        params: []
    },
    "year": [],
    "addEventListener": {
        description: "Add an event listener to the component.",
        params: [
            { type: "string", name: "eventName", info: "The name of the event to listener for." },
            { type: "function", name: "callbackFunction", info: "The function to run when event triggered. Some events have associated values." }
        ],
        events: {
            "screen": {
                "backPressed": `
                screenName.addEventListener(
                    "backPressed",
                    function(){
                        //Your code
                    }
                )`,
                "errorOccured": `
                screenName.addEventListener(
                    "errorOccured",
                    function(component, functionName, errorNumber, message){
                        //Your code
                    }
                )`,
                "initialize": `
                screenName.addEventListener(
                    "initialize",
                    function(){
                        //Your code
                    }
                )`,
                "otherScreenClosed": `
                screenName.addEventListener(
                    "otherScreenClosed",
                    function(otherScreenName, result){
                        //Your code
                    }
                )`,
                "permissionDenied": `
                screenName.addEventListener(
                    "permissionDenied",
                    function(component,functionName, permissionName){
                        //Your code
                    }
                )`,
                "permissionGranted": `
                screenName.addEventListener(
                    "permissionGranted",
                    function(permissionName){
                        //Your code
                    }
                )`,
                "screenOrientationChanged": `
                screenName.addEventListener(
                    "screenOrientationChanged",
                    function(){
                        //Your code
                    }
                )`
            }
        }
    }
}

exports.METHODS = METHODS