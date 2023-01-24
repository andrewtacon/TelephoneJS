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
        description: "Returns true if the WebViewer can go back in the history list.",
        params: []
    },
    "canGoForward": {
        description: "Returns true if the WebViewer can go forward in the history list.",
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
    "clearCaches": {
        description: "Clear the internal webview cache, both ram and disk. This is useful when using the WebViewer to poll a page that may not be sending appropriate cache control headers.",
        params: []
    },
    "clearCookies": {
        description: "Clear the webview’s cookies. This is useful if you want to sign the user out of a website that uses them to store logins.",
        params: []
    },
    "clearLocations": {
        description: "Clear Stored Location permissions. When the geolocation API is used in the WebViewer, the end user is prompted on a per URL basis for whether or not permission should be granted to access their location. This function clears this information for all locations. As the permissions interface is not available on phones older then Eclair, this function is a no-op on older phones.",
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
        params: [
            { type: "string", name: "mainText", info: "" },
            { type: "string", name: "detailText", info: "" },
            { type: "string", name: "imageName", info: "" }
        ],
        tests: [
            "mainText", "detailText", "cat.png"
        ]
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
        description: "Dismisses the alert created by the ShowProgressDialog block",
        params: []
    },
    "displayDropdown": {
        description: "Displays the dropdown list for selection, same action as when the user clicks on the spinner.",
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
        description: "Get the Detail Text of a ListView element. @returns {string}",
        params: [
            { type: "number", name: "ListElementIndex", info: "" }
        ]
    },
    "getDuration": {
        description: "",
        params: []
    },
    "getImageName": {
        description: "Get the filename of the image of a ListView element that has been uploaded to Media. @returns {string}",
        params: [
            { type: "number", name: "ListElementIndex", info: "" }
        ]
    },
    "getMainText": {
        description: "Get the Main Text of a ListView element. @returns {string}",
        params: [
            { type: "number", name: "ListElementIndex", info: "" }
        ]
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
        description: "Go back to the previous page in the history list. Does nothing if there is no previous page.",
        params: []
    },
    "goForward": {
        description: "Go forward to the next page in the history list. Does nothing if there is no next page.",
        params: []
    },
    "goHome": {
        description: "Loads the page from the home URL. This happens automatically when home URL is changed.",
        params: []
    },
    "goToUrl": {
        description: "Load the page at the given URL.",
        params: [
            {
                type: "{string}",
                name: "url",
                info: "Address of page to load."
            }
        ],
        tests: [`"http://www.google.com"`]
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
        description: "Launches the DatePicker or TimePicker dialog. The AfterDateSet/AfterTimeSet event will be run after the user confirms their selection.",
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
        description: "Writes an error message to the Android system log. See the Google Android documentation for how to access the log.",
        params: [
            { type: "string", name: "errorMessage", info: "" }
        ],
        tests: [
            `"Test Error Message"`
        ]
    },
    "logInfo": {
        description: "Writes an information message to the Android log.",
        params: [
            { type: "string", name: "logMessage", info: "" }
        ],
        tests: [
            `"Test Log Message"`
        ]
    },
    "logWarning": {
        description: "Writes a warning message to the Android log. See the Google Android documentation for how to access the log.",
        params: [
            { type: "string", name: "warningMessage", info: "" }
        ],
        tests: [
            `"Test Warning Message"`
        ]
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
        description: "Opens the component, as though the user clicked on it.",
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
        description: "Suspends playing the media if it is playing.",
        params: []
    },
    "play": {
        description: "Plays the sound.",
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
        description: "Records a video, then raises the AfterRecording event.",
        params: []
    },
    "refresh": {
        description: "Reload the ListView to reflect any changes in the data.",
        params: []
    },
    "reload": {
        description: "Reload the current page.",
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
        description: "Request focus to current PasswordTextBox.",
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
        description: "Resumes playing the sound after a pause.",
        params: []
    },
    "runJavascript": {
        description: "Run JavaScript in the current page.",
        params: [{
            type: "{string}",
            name: "Javascript code",
            info: "The JavaScript code to run."
        }],
        tests: [`"alert('hello JS');"`]

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
        params: [{ type: "number", name: "year", info: "Valid year number." }, { type: "number", name: "month", info: "Numerical value from 1 to 12. 1-Jan, 2-Feb..." }, { type: "number", name: "day", info: "Day of month between 1 and 31 inclusive." }],
        tests: [1980, 2, 8]
    },
    "setDateToDisplayFromInstant": {
        description: "Allows the user to set the date from the instant to be displayed when the date picker opens.",
        params: [{ type: "instant", name: "instant", info: "" }],
        tests: []
    },
    "setLocation": {
        description: "",
        params: []
    },
    "setTimeToDisplay": {
        description: "Allows the user to set the time to be displayed when the TimePicker opens. Valid values for the hour field are 0-23 and 0-59 for the second field.",
        params: [
            { type: "number", name: "hour", info: "Hour number in 24 hour time (0 to 23)." },
            { type: "number", name: "minute", info: "Minute number (0-59 inclusive)." }
        ],
        tests: [
            15, 16
        ]
    },
    "setTimeToDisplayFromInstant": {
        description: "Allows the instant to set the hour and minute to be displayed when the TimePicker opens. Instants are used in Clock, DatePicker, and TimePicker components.",
        params: [{ type: "instant", name: "instant", info: "" }],
        tests: []
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
    "showInfobox": {
        description: "",
        params: []
    },
    "showAlert": {
        description: "Display a temporary notification.",
        params: [
            { type: "string", name: "notice", info: "" }
        ],
        tests: [
            `"Test Notice"`
        ]
    },
    "showChooseDialog": {
        description: "Shows a dialog box with two buttons, from which the user can choose. If cancelable is true there will be an additional CANCEL button. Pressing a button will raise the AfterChoosing event. The “choice” parameter to AfterChoosing will be the text on the button that was pressed, or “Cancel” if the CANCEL button was pressed. If canceled, the TextInputCanceled event will also run.",
        params: [
            { type: "string", name: "message", info: "" },
            { type: "string", name: "title", info: "" },
            { type: "string", name: "button1Text", info: "" },
            { type: "string", name: "button2Text", info: "" },
            { type: "boolean", name: "cancelable", info: "" }
        ],
        tests: [
            `"Choose Message"`, `"Choose Title"`, `"Button 1"`, `"Button 2"`, true
        ]
    },
    "showInfobox": {
        description: "",
        params: []
    },
    "showMessageDialog": {
        description: "Display an alert dialog with a single button that dismisses the alert.",
        params: [
            { type: "string", name: "message", info: "" },
            { type: "string", name: "title", info: "" },
            { type: "string", name: "buttonText", info: "" }
        ],
        tests: [
            `"Message"`, `"Title"`, `"Button Text"`
        ]
    },
    "showPasswordDialog": {
        description: "Shows a dialog box where the user can enter password (input is masked), after which the AfterTextInput event will be raised. If cancelable is true there will be an additional CANCEL button. The AfterTextInput and TextInputCanceled events behave the same way as described in ShowTextDialog.",
        params: [
            { type: "string", name: "message", info: "" },
            { type: "string", name: "title", info: "" },
            { type: "boolean", name: "cancelable", info: "" }
        ],
        tests: [
            `"Message"`, `"Title"`, true
        ]
    },
    "showProgressDialog": {
        description: "Shows a dialog box with an optional title and message (use empty strings if they are not wanted). This dialog box contains a spinning artifact to indicate that the program is working. It cannot be canceled by the user but must be dismissed by the App Inventor Program by using the DismissProgressDialog method.",
        params: [
            { type: "string", name: "message", info: "" },
            { type: "string", name: "title", info: "" }
        ],
        tests: [
            `"Message"`, `"Title"`
        ]
    },
    "showTextDialog": {
        description: "Shows a dialog box where the user can enter text, after which the AfterTextInput event will be raised. If cancelable is true there will be an additional CANCEL button. Entering text will raise the AfterTextInput event. The “response” parameter to AfterTextInput will be the text that was entered, or “Cancel” if the CANCEL button was pressed. If canceled, the TextInputCanceled event will also run.",
        params: [
            { type: "string", name: "message", info: "" },
            { type: "string", name: "title", info: "" },
            { type: "boolean", name: "cancelable", info: "" }
        ],
        tests: [
            `"Message"`, `"Title"`, true
        ]
    },
    "speak": {
        description: "",
        params: []
    },
    "start": {
        description: "If a recording component then starts recording, otherwise, plays the media. If it was previously paused, the playing is resumed. If it was previously stopped, it starts from the beginning.",
        params: []
    },
    "startActivity": {
        description: "",
        params: []
    },
    "stop": {
        description: "If a recording component, stops recording, otherwise, stops playing the media and seeks to the beginning of the song.",
        params: []
    },
    "stopFollowing": {
        description: "",
        params: []
    },
    "stopLoading": {
        description: "Stop loading a page.",
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
        description: "Takes a picture, then raises the AfterPicture event.",
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
        description: "Vibrates for specified number of milliseconds.",
        params: [
            {
                type: "{number}",
                name: "milliseconds",
                info: ""
            }
        ],
        tests: [500]
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
        events: { //name, then event code and samples
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
            },
            "button": {
                "Button have six events: click, gotFocus, longClick, lostFocus, touchDown, touchUp. All are accessed in the same manner.":
                    `
                button.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `

            },
            "checkbox": {
                "Checkboxes have three events: changed, gotFocus, lostFocus. All are accessed in the same manner.":
                    `
                button.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `
            },
            "datepicker": {
                "Datepickers have five events: afterDateSet, gotFocus, lostFocus, touchDown, touchUp All are accessed in the same manner.":
                    `
                datePicker.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `
            },
            "image": {
                "Images have one event: click.":
                    `
                image.addEventListener(
                    "click",
                    function () {
                        //Your code here
                    }
                )
                `
            },
            "listpicker": {
                "Listpickers have six events: afterPicking, beforePicking, gotFocus, lostFocus, touchDown, touchUp. All are accessed in the same manner.":
                    `
                listPicker.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `
            },
            "listview": {
                "Listviews have one events: afterPicking. Simple event to be raised after the an element has been chosen in the list. The selected element is available in the Selection property.":
                    `
                listview.addEventListener(
                    "afterPicking",
                    function () {
                        //Your code here
                    }
                )
                `
            },
            "notifier": {
                "afterChoosing: Event after the user has made a selection for ShowChooseDialog.": `
                notifier.addEventListener(
                    "afterChoosing",
                    function(choice){
                        //Your code
                    }
                )`,
                "afterTextInput: Event raised after the user has responded to ShowTextDialog.": `
                notifier.addEventListener(
                    "afterTextInput",
                    function(response){
                        //Your code
                    }
                )`,
                "choosingCanceled: Event raised when the user cancels choosing an option. ShowChooseDialog.": `
                notifier.addEventListener(
                    "choosingCanceled",
                    function(){
                        //Your code
                    }
                )`,
                "textInputCanceled: Event raised when the user cancels ShowPasswordDialog, or ShowTextDialog.": `
                notifier.addEventListener(
                    "textInputCanceled",
                    function(){
                        //Your code
                    }
                )`
            },
            "password": {
                "Password Text Boxes have two events: gotFocus & lostFocus. All are accessed in the same manner.":
                    `
                password.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `

            },
            "slider": {
                "Sliders have one event: positionChanged":
                    `
                slider.addEventListener(
                    "positionChanged",
                    function (thumbPosition) {
                        //Your code here
                    }
                )
                `

            },
            "spinner": {
                "Spinners have one event: afterSelecting":
                    `
                spinner.addEventListener(
                    "afterSelecting",
                    function (selection) {
                        //Your code here
                    }
                )
                `

            },
            "switch": {
                "Swicthes have three events: changed, gotFocus, lostFocus. They are all accessed the same way.":
                    `
                switch.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `

            },
            "textbox": {
                "Textboxes have two events: gotFocus & lostFocus. They are all accessed the same way.":
                    `
                textbox.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `

            },
            "timepicker": {
                "Timepickers have five events: afterTimeSet, gotFocus, lostFocus, touchDown, touchUp All are accessed in the same manner.":
                    `
                timePicker.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `
            },
            "webviewer": {
                "beforePageLoad - When a page is about to load this event is run.": `
                webviewer.addEventListener(
                    "beforePageLoad",
                    function(url){
                        //Your code
                    }
                )`,
                "errorOccured - When an error occurs this event is run.": `
                webviewer.addEventListener(
                    "errorOccured",
                    function(errorCode, description, failingUrl){
                        //Your code
                    }
                )`,
                "pageLoaded - When a page is finished loading this event is run.": `
                webviewer.addEventListener(
                    "pageLoaded",
                    function(url){
                        //Your code
                    }
                )`,
                "webViewStringChanged - Event that runs when the AppInventor.setWebViewString method is called from JavaScript. The new WebViewString is given by the value parameter.": `
                webviewer.addEventListener(
                    "webViewStringChanged",
                    function(value){
                        //Your code
                    }
                )`
            },
            "camcorder": {
                "Camcorders have one event: afterRecording":
                    `
                camcorder.addEventListener(
                    "afterRecording",
                    function (pathToRecording) {
                        //Your code here
                    }
                )
                `

            },
            "camera": {
                "Cameras have one event: afterPicture":
                    `
                camera.addEventListener(
                    "afterPicture",
                    function (pathToImage) {
                        //Your code here
                    }
                )
                `

            },
            "imagepicker": {
                "Imagepickers have six events: afterPicking, beforePicking, gotFocus, lostFocus, touchDown, touchUp. All are accessed in the same manner.":
                    `
                imagePicker.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `
            },
            "player": {
                "Players have two events: completed & otherPlayerStarted. All are accessed in the same manner.":
                    `
                player.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `
            },
            "soundrecorder": {
                "startedRecording & stoppedRecording:":
                    `
                player.addEventListener(
                    "eventName",
                    function () {
                        //Your code here
                    }
                )
                `,
                "afterSoundRecorded - Provides the location of the newly created sound.":
                    `
                player.addEventListener(
                    "afterSoundRecorded",
                    function (pathToFile) {
                        //Your code here
                    }
                )    
                `
            },

        }
    }
}

exports.METHODS = METHODS