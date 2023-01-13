//these are all the elements that can be added to the user interface
//the runTimeName is the case sensitive version for the YAIL code
//attributes are the allowable attributes for code - they are written in camelcase to match the case expectations 
//and sensitivity of javascript - in MIT app inventor some of these are "designer only", but you can in fact change them 
//whilst running 
//designer attributs are for the XML designer only
//blocks attributes are read/write in code
//blocks read only are read only in code
//blocks write only and write only in code
//events are allowable events for that particular components
//methods are allowable methods for that particular component

const ELEMENTS = {
    "screen": {
        "runTimeName": "Screen",
        "attributes": ["aboutScreen", "alignHorizontal", "alignVertical", "backgroundColor",
            "backgroundImage", "bigDefaultText", "closeScreenAnimation", "highContrast", "openScreenAnimation",
            "screenOrientation", "scrollable", "showStatusBar", "title", "titleVisible"
        ],
        "designerAttributes": ["accentColor", "appName", "blocksToolkit", "defaultFileScope", "icon",
            "primaryColor", "primaryColorDark", "showListsAsJson", "theme",
            "versionCode", "versionName", "name", "script", "style", "sizing", "tutorialURL", "class"],
        "blocksAttributes": [],
        "blocksReadOnly": ["platform", "platformVersion", "height", "width"],  //text, text, number, number
        "blocksWriteOnly": [],
        "events": ["backPressed", "errorOccured", "initialize", "otherScreenClosed", "permissionDenied", "permissionGranted", "screenOrientationChanged"],
        "methods": ["askForPermission", "hideKeyboard"]
    },

    //start UI elements
    "button": {
        "runTimeName": "Button",
        "attributes": ["backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize",
             "image", "showFeedback", "text", "visible", "textColor"],
        "designerAttributes": ["fontTypeface", "shape", "textAlignment", "class", "id", "name", "column", "row"],
        "blocksAttributes": ["width","height"],
        "blocksReadOnly": [],
        "blocksWriteOnly": ["heightPercent", "widthPercent"],
        "events": ["click", "gotFocus", "longClick", "lostFocus", "touchDown", "touchUp"],
        "methods": []
    },
    "checkbox": {
        "runTimeName": "CheckBox",
        "attributes": ["text", "backgroundColor", "checked", "enabled",  "fontSize", 
            "height", "width", "visible", "textColor", "textAlignment"],
        "designerAttributes": ["fontTypeface","fontBold", "fontItalic","class", "id", "name", "column", "row"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["changed", "gotFocus", "lostFocus"],
        "methods": []
    },
    "datepicker": {
        "runTimeName": "DatePicker",
        "attributes": ["text", "backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "height",
            "width", "image", "shape", "showFeedback", "visible", "textColor"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["day", "instant", "month", "monthInText", "year"],
        //number,  ? , number, text, year
        "blocksWriteOnly": [],
        "events": ["afterDateSet", "gotFocus", "lostFocus", "touchDown", "touchUp"],
        "methods": ["launchPicker", "setDateToDisplay", "setDateToDisplayFromInstant"]

    },
    "image": {
        "runTimeName": "Image",
        "attributes": ["alternateText", "clickable", "height", "width", "picture", "rotationAngle", "scalePictureToFit",
            "visible"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": ["scaling"], //number
        "blocksReadOnly": [],
        "blocksWriteOnly": ["animation"],  //text ScrollRightSlow, ScrollRight, ScrollRightFast, ScrollLeftSlow, ScrollLeft, ScrollLeftFast, Stop
        "events": ["click"],
        "methods": []

    },
    "label": {
        "runTimeName": "Label",
        "attributes": ["text", "backgroundColor", "fontBold", "fontItalic", "fontSize", "fontTypeface", "HTMLFormat", "hasMargins",
            "height", "width", "textAlignment", "visible", "textColor"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["HTMLContent"], //text
        "blocksWriteOnly": [],
        "events": [],
        "methods": []

    },
    "listpicker": {
        "runTimeName": "ListPicker",
        "attributes": ["backgroundColor", "elementsFromString", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "image",
            "height", "width", "itemBackgroundColor", "itemTextColor", "selection", "shape", "showFeedback",
            "showFilterBar", "textAlignment", "visible", "textColor"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": ["elements", "selectionIndex"],  //list, number
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["afterPicking", "beforePicking", "gotFocus", "lostFocus", "touchDown", "touchUp"],
        "methods": ["open"]

    },
    "listview": {
        "runTimeName": "ListView",
        "attributes": ["backgroundColor", "elementsFromString", "fontSizeDetail", "fontTypeface", "fontTypefaceDetail", "height",
            "width", "imageHeight", "imageWidth", "listData", "listViewLayout", "orientation", "selection", "selectionColor", "showFilterBar",
            "textColor", "textColorDetail", "textsize", "visible"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": ["elements", "selectionIndex"],   //list, number
        "blocksReadOnly": ["selectionDetailText"],   //text
        "blocksWriteOnly": [],
        "events": ["afterPicking"],
        "methods": ["createElement", "getDetailText", "getImageName", "getMainText", "refresh"]

    },
    "notifier": {
        "runTimeName": "Notifier",
        "attributes": ["backgroundColor", "textColor", "notifierLength"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["afterChoosing", "afterTextInput", "choosingCanceled", "textInputCanceled"],
        "methods": ["dismissProgressDialog", "logError", "logInfo", "logWarning", "showAlert", "showChooseDialog", "showMessageDialog", "showPasswordDialog", "showProgressDialog", "showTextDialog"]

    },
    "password": {
        "runTimeName": "PasswordTextBox",
        "attributes": ["text", "backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "height",
            "width", "hint", "numbersOnly", "textAlignment", "visible", "textColor"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": ["passwordvisible"],  //bool
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["gotFocus", "lostFocus"],
        "methods": ["requestFocus"]

    },
    "slider": {
        "runTimeName": "Slider",
        "attributes": ["colorLeft", "colorRight", "width", "maxValue", "minValue", "thumbenabled", "thumbposition"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["positionChanged"],
        "methods": []

    },
    "spinner": {
        "runTimeName": "Spinner",
        "attributes": ["elementsFromString", "width", "prompt", "selection", "visible"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": ["elements", "selectionIndex"], //list, number
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["afterSelecting"],
        "methods": []

    },
    "switch": {
        "runTimeName": "Switch",
        "attributes": ["text", "backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "height",
            "width", "on", "textColor", "thumbColorActive", "thumbColorInactive", 'trackColorActive', 'trackColorInactive', "visible"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["changed", "gotFocus", "lostFocus"],
        "methods": []

    },
    "textbox": {
        "runTimeName": "TextBox",
        "attributes": ["text", "backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "height",
            "width", "multiLine", "numbersOnly", "readOnly", "textAlignment", "visible", "textColor"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["gotFocus", "lostFocus"],
        "methods": ["hideKeyboard", "requestFocus"]

    },
    'timepicker': {
        "runTimeName": "TimePicker",
        "attributes": ["text", "backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "height",
            "width", "image", "shape", "showFeedback", "visible", "textAlignment", "textColor"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["hour", "instant", "minute"],  //number,?, number
        "blocksWriteOnly": [],
        "events": ["afterTimeSet", "gotFocus", "lostFocus", "touchDown", "touchUp"],
        "methods": ["launchPicker", "setTimeToDisplay", "setTimeToDisplayForInstant"]

    },
    'webview': {
        "runTimeName": "WebViewer",
        "attributes": ["followLinks", "height", "width", "homeUrl", "ignoreSslErrors", "promptForPermission", "usesLocation",
            "visible"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": ["webViewString"],  //text
        "blocksReadOnly": ["currentPageTitle", "currentUrl"], //text, text
        "blocksWriteOnly": [],
        "events": ["beforePageLoad", "errorOccured", "pageLoaded", "webViewStringChange"],
        "methods": ["canGoBack", "canGoForward", "clearCache", "clearCookies", "clearLocations", "goBack", "goForward", "goHome", "goToUrl", "reload", "runJavascript", "stopLoading"]

    },
    //start layout elements
    "hbox": {
        "runTimeName": "HorizontalArrangement",
        "attributes": ["width", "height", "backgroundColor", "image", "visible"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": [],
        "methods": []

    },
    "vbox": {
        "runTimeName": "VerticalArrangement",
        "attributes": ["width", "height", "backgroundColor", "image", "visible"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": [],
        "methods": []

    },
    "hscrollbox": {
        "runTimeName": "HorizontalScrollArrangement",
        "attributes": ["width", "height", "backgroundColor", "image", "visible"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": [],
        "methods": []

    },
    "vscrollbox": {
        "runTimeName": "VerticalScrollArrangement",
        "attributes": ["width", "height", "backgroundColor", "image", "visible"],
        "designerAttributes": ["class", "id", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": [],
        "methods": []

    },
    "table": {
        "runTimeName": "TableArrangement",
        "attributes": ["width", "height", "visible"],
        "designerAttributes": ["class", "id", "columns", "rows", "column", "row", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": [],
        "methods": []

    },
    //start media elements
    "camcorder": {
        "runTimeName": "Camcorder",
        "attributes": [],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["afterRecording"],
        "methods": ["recordVideo"]

    },
    "camera": {
        "runTimeName": "Camera",
        "attributes": [],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["afterPicture"],
        "methods": ["takePicture"]

    },
    "imagepicker": {
        "runTimeName": "ImagePicker",
        "attributes": ["backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "height", "width",
            "image", "shape", "showFeedback", "text", "textAlignment", "textColor", "visible"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["selection"], //text
        "blocksWriteOnly": [],
        "events": ["afterPicking", "beforePicking", "gotFocus", "lostFocus", "touchDown", "touchUp"],
        "methods": ["open"]

    },

    "player": {
        "runTimeName": "Player",
        "attributes": ["loop", "playOnlyInForeground", "source", "volume"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["isPlaying"], //bool
        "blocksWriteOnly": [],
        "events": ["completed", "otherPlayerStarted"],
        "methods": ["pause", "start", "stop", "vibrate"]

    },
    "sound": {
        "runTimeName": "Sound",
        "attributes": ["minimumInterval", "source"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": [],
        "methods": ["pause", "play", "resume", "stop", "vibrate"]

    },
    "soundrecorder": {
        "runTimeName": "SoundRecorder",
        "attributes": ["savedRecording"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["afterSoundRecorded", "startedRecording", "stoppedRecording"],
        "methods": ["start", "stop"]

    },
    "speechrecognizer": {
        "runTimeName": "SpeechRecognizer",
        "attributes": ["useLegacy"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["language"], //text
        "blocksReadOnly": ["result"], //text
        "blocksWriteOnly": [],
        "events": ["afterGettingText", "beforeGettingText"],
        "methods": ["getText", "stop"]

    },
    "texttospeech": {
        "runTimeName": "TextToSpeech",
        "attributes": ["country", "language", "pitch", "speechRate"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["availableCountries", "availableLanguages", "result"], //list, list, text
        "blocksWriteOnly": [],
        "events": ["afterSpeaking", "beforeSpeaking"],
        "methods": ["speak"]

    },
    "translator": {
        "runTimeName": "Translator",
        "attributes": [],
        "designerAttributes": ["class", "id", "apiKey", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["gotTranslation"],
        "methods": ["requestTranslation"]

    },
    "videoplayer": {
        "runTimeName": "VideoPlayer",
        "attributes": ["height", "width", "source", "visible", "volume"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["fullScreen"],  //bool
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["completed"],
        "methods": ["getDuration", "pause", "seekTo", "start", "stop"]

    },
    //start drawing and animation elements
    "canvas": {
        "runTimeName": "Canvas",
        "attributes": ["backgroundColor", "backgroundImage", "extendMovesOutsideCanvas", "fontSize",
            "height", "width", "lineWidth", "paintColor", 'tapThreshold', 'textAlignment', 'visible'],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": ["backgroundImageinBase64"], //text
        "events": ["dragged", "flung", "touchDown", "touchUp", "touched"],
        "methods": ["clear", "drawArc", "drawCircle", "drawLine", "drawPoint", "drawShape", "drawText", "drawTextAtAngle", "getBackgroundPixelColor", "getPixelColor", "save", "saveAs", "setBackgroundPixelColor"]

    },
    "ball": {
        "runTimeName": "Ball",
        "attributes": ["enabled", "heading", "interval", "originAtCenter", "paintColor", "radius", "speed",
            "visible", "x", "y", "z"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["collidedWith", "dragged", "edgeReached", "flung", "noLongerCollidingWith", "touchDown", "touchUp", "touched"],
        "methods": ["bounce", "moveIntoBounds", "moveTo", "moveToPoint", "pointInDirection", "pointTowards"]

    },
    "imagesprite": {
        "runTimeName": "ImageSprite",
        "attributes": ["enabled", "heading", "height", "width", "interval", "picture", "rotates", "speed", "visible",
            "x", "y", "z"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["collidedWith", "dragged", "edgeReached", "Flung", "noLongerCollidingWith", "touchDown", "touchUp", "touched"],
        "methods": ["bounce", "moveIntoBounds", "moveTo", "moveToPoint", "pointInDirection", "pointTowards"]

    },
    //start Maps
    //43 things to go
    "map": {
        "runTimeName": "Map",
        "attributes": ["center", "centerFromString", "enablePan", "enableRotation", "enableZoom", "height", "width",
            "locationSensor", "mapType", "rotation", "scaleUnits", "showCompass", "showScale", "showUser", "showZoom", "visible",
            "zoomLevel"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["boundingBox", "features"], //list, list
        "blocksReadOnly": ["latitude", "longitude", "userLatitude", "userLongitude"], //number, number, number, number
        "blocksWriteOnly": [],
        "events": ["boundsChange", "doubleTapAtPoint", "featureClick", "featureDrag", "featureLongClick", "featureStartDrag", "featureStopDrag", "gotFeatures", "invalidPoint", "loadError", "longPressAtPoint", "ready", "tapAtPoint", "zoomChange"],
        "methods": ["createMarker", "featureFromDescription", "loadFromURL", "panTo", "save"]

    },
    "circle": {
        "runTimeName": "",
        "attributes": ["description", "draggable", "enableInfoBox", "fillColor", "fillOpacity", "latitude",
            "longitude", "radius", "strokeColor", "strokeWidth", "title", "visible"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["type"], //text
        "blocksWriteOnly": [],
        "events": ["click", "drag", "longClick", "startDrag", "stopDrag"],
        "methods": ["distanceToFeature", "distanceToPoint", "hideInfobox", "setLocation", "showInfobox"]

    },
    /*  "featurecollection": {      //there may be issues here - especially with url as the source of the data - unable to test
          "runTimeName": "FeatureCollection",
          "attributes": ["featuresfromgeojson", "source", "visible"],
            "r": [],
            "w": [],
            "rw": [],
            "rDesigner": [],
            "wDesigner": [],
            "rwDesigner": [],
            "rBlocks": [],
            "wBlocks": [],
            "rwBlocks": []      },*/
    "linestring": {
        "runTimeName": "LineString",
        "attributes": ["description", "draggable", "enableInfoBox", "pointsFromString", "strokeColor",
            "strokeOpacity", "strokeWidth", "title", "visible"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["points"], //list
        "blocksReadOnly": ["type"], //text
        "blocksWriteOnly": [],
        "events": ["click", "drag", "longClick", "startDrag", "stopDrag"],
        "methods": ["distanceToFeature", "distanceToPoint", "hidInfobox", "shoInfobox"]

    },
    "marker": {
        "runTimeName": "Marker",
        "attributes": ["anchorHorizontal", "anchorVertical", "description", "draggable", "enableInfoBox", "fillColor",
            "fillOpacity", "height", "width", "imageAsset", "latitude", "longitude", "strokeColor",
            "strokeOpacity", "strokeWidth", "title", "visible"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["type"],//text
        "blocksWriteOnly": [],
        "events": ["click", "drag", "longClick", "startDrag", "stopDrag"],
        "methods": ["bearingToFeature", "bearingToPoint", "distanceToFeature", "distanceToPoint", "hideInfobox", "setLocation", "showInfobox"]

    },
    "navigation": {
        "runTimeName": "Navigation",
        "attributes": ["endLatitude", "endLongitude", "language", "startLatitude",
            "startLongitude", "transportationMethod"],
        "designerAttributes": ["class", "id", "apiKey", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["responseContent"], //dictionary (object)
        "blocksWriteOnly": ["endLocation", "startLocation"], //component, component
        "events": ["gotDirections"],
        "methods": ["requestDirections"]

    },
    "polygon": {
        "runTimeName": "Polygon",
        "attributes": ["description", "draggable", "enableInfoBox", "fillColor", "fillOpacity", "holePointsFromString",
            "pointsFromString", "strokeColor", "strokeOpacity", "strokeWidth", "title", "visible"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["holePoints", "points"], //list, list
        "blocksReadOnly": ["type"], //text
        "blocksWriteOnly": [],
        "events": ["click", "drag", "longClick", "startDrag", "stopDrag"],
        "methods": ["centroid", "distanceToFeature", "distanceToPoint", "hideInfobox", "showInfobox"]

    },
    "rectangle": {
        "runTimeName": "Rectangle",
        "attributes": ["description", "draggable", "eastLongitude", "enableInfoBox", "fillColor", "fillOpacity",
            "northLatitude", "southLatitude", "strokeColor", "strokeOpacity", "strokeWidth", "title", "visible",
            "westLongitude"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["type"], //text
        "blocksWriteOnly": [],
        "events": ["click", "drag", "longClick", "startDrag", "stopDrag"],
        "methods": ["bounds", "center", "distanceToFeature", "distanceToPoint", "hideInfobox", "setCenter", "showInfobox"]

    },
    //ignoring charts - not sure how they work
    //start sensors
    "acceleronmeter": {
        "runTimeName": "AccelerometerSensor",
        "attributes": ["enabled", "legacyMode", "minimumInterval", "sensitivity"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["available", "XAccel", "YAccel", "ZAccel"], //bool, number, number, number
        "blocksWriteOnly": [],
        "events": ["accelerationChanged", "shaking"],
        "methods": []

    },
    "barcodescanner": {
        "runTimeName": "BarcodeScanner",
        "attributes": ["useExternalScanner"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["result"],  //text
        "blocksWriteOnly": [],
        "events": ["afterScan"],
        "methods": ["doScan"]

    },
    "barometer": {
        "runTimeName": "Barometer",
        "attributes": ["enabled", "refreshTime"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["airPressure", "available"], //number, bool
        "blocksWriteOnly": [],
        "events": ["airPressureChanged"],
        "methods": []

    },
    "clock": {
        "runTimeName": "Clock",
        "attributes": ["timerAlwaysFires", "timerEnabled", "timerInterval"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["timer"],
        "methods": ["addDays", "addDuration", "addHours", "addMinutes", "addMonths", "addSeconds", "addWeeks", "addYears", "dayOfMonth", "duration", "durationToDays", "durationToHours", "durationToMinutes", "durationToSeconds", "durationToWeeks", "formatDate", "formatDateTime", "formatTime", "getMillis", "hour", "makeDate", "makeInstant", "makeInstantFromMillis", "makeInstantFromParts", "makeTime", "minute", "month", "monthName", "now", "second", "systemTime", "weekday", "weekdayName", "year"]

    },
    "gyroscope": {
        "runTimeName": "GyroscopeSensor",
        "attributes": ["enabled"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["available", "XAngularVelocity", "YAngularVelocity", "ZAngularVelocity"],  //bool, number, number, number
        "blocksWriteOnly": [],
        "events": ["gyroscopeChanged"],
        "methods": []

    },
    "hygrometer": {
        "runTimeName": "Hygrometer",
        "attributes": ["enabled", "refreshTime"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["available", "humidity"], //bool, number
        "blocksWriteOnly": [],
        "events": ["humdityChanged"],
        "methods": []

    },
    "lightsensor": {
        "runTimeName": "LightSensor",
        "attributes": ["enabled", "refreshTime"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["available", "averageLux", "lux"], //bool, number,number
        "blocksWriteOnly": [],
        "events": ["lightChanged"],
        "methods": []

    },
    "locationSensor": {
        "runTimeName": "locationSensor",
        "attributes": ["distanceInterval", "enabled", "timeInterval"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["providerLocked", "providerName"], //bool, text
        "blocksReadOnly": ["accuracy", "altitude", "availableProviders", "currentAddress", "hasAccuracy", "hasAltitude", "hasLongitudeLatitude", "latitude", "longitude"],
        //number, number, list, text, bool bool, bool, number, number, 
        "blocksWriteOnly": [],
        "events": ["locationChanged", "statusChanged"],
        "methods": ["latitudeFromAddress", "longitudeFromAddress"]

    },
    "magneticfieldsensor": {
        "runTimeName": "MagneticFieldSensor",
        "attributes": ["enabled"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["absoluteStrength", "available", "maximumRange", "XStrength", "YStrength", "ZStrength"], //number, bool, number, number, number, number
        "blocksWriteOnly": [],
        "events": ["magneticChanged"],
        "methods": []

    },
    "nearfield": {
        "runTimeName": "NearField",
        "attributes": ["readMode"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["textToWrite"], //text
        "blocksReadOnly": ["lastMessage", "writetype"], //text, number
        "blocksWriteOnly": [],
        "events": ["tagRead", "tagWritten"],
        "methods": []

    },
    "orientationsensor": {
        "runTimeName": "OrientationSensor",
        "attributes": ["enabled"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["angle", "available", "azimuth", "magnitude", "pitch", "roll"],  //number, bool, number, number, number, number
        "blocksWriteOnly": [],
        "events": ["orientationChanged"],
        "methods": []

    },
    "pedometer": {
        "runTimeName": "Pedometer",
        "attributes": ["stopDetectionTimeout", "strideLength"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["distance", "elapsedTime", "simpleSteps", "walkSteps"],  //number, number, number, number
        "blocksWriteOnly": [],
        "events": ["simpleStep", "walkStep"],
        "methods": ["reset", "save", "start", "stop"]

    },
    "proximitysensor": {
        "runTimeName": "ProximitySensor",
        "attributes": ["enabled", "keepRunningWhenOnPause"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["available", "distance", "maximumRange"], //bool, number, number
        "blocksWriteOnly": [],
        "events": ["proximityChanged"],
        "methods": []

    },
    "thermometer": {
        "runTimeName": "Thermometer",
        "attributes": ["enabled", "refreshTime"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["available", "temperature"], //bool, number
        "blocksWriteOnly": [],
        "events": ["temperatureChanged"],
        "methods": []

    },
    //social and communication tools
    "contactpicker": {
        "runTimeName": "ContactPicker",
        "attributes": ["backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "height", "width", "shape",
            "showFeedback", "text", "textAlignment", "textColor", "visible"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["contactName", "contactUri", "emailAddress", "emailAddressList", "phoneNumber", "phoneNumberList", "picture"],
        //text, text, text, list, text, list, text
        "blocksWriteOnly": [],
        "events": ["afterPicking", "beforePicking", "gotFocus", "lostFocus", "touchDown", "touchUp"],
        "methods": ["open", "viewContact"]

    },
    "emailpicker": {
        "runTimeName": "EmailPicker",
        "attributes": ["backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "height", "width", "shape",
            "showFeedback", "hint", "text", "textAlignment", "textColor", "visible"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["gotFocus", "lostFocus"],
        "methods": ["requestFocus"]

    },
    "phonecall": {
        "runTimeName": "PhoneCall",
        "attributes": ["phoneNumber"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["incomingCallAnswered", "phoneCallEnded", "phoneCallStarted"],
        "methods": ["makePhoneCall", "makePhoneCallDirect"]

    },
    "phonenumberpicker": {
        "runTimeName": "PhoneNumberPicker",
        "attributes": ["backgroundColor", "enabled", "fontBold", "fontItalic", "fontSize", "fontTypeface", "height", "width",
            "image", "shape", "showFeedback", "text", "textAlignment", "textColor", "visible"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["contactName", "contactUri", "emailAddress", "emailAddressList", "phoneNumber", "phoneNumberList", "picture"],
        //text, text, text, list, text, list, text
        "blocksWriteOnly": [],
        "events": ["afterPicking", "beforePicking", "gotFocus", "lostFocus", "touchDown", "touchUp"],
        "methods": ["open", "viewContact"]

    },
    "sharing": {
        "runTimeName": "Sharing",
        "attributes": [],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": [],
        "methods": ["shareFile", "shareFileWithMessage", "shareMessage"]

    },
    "texting": {
        "runTimeName": "Texting",
        "attributes": ["googleVoiceEnabled", "message", "phoneNumber", "receivingEnabled"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["messageReceived"],
        "methods": ["sendMessage", "sendMessageDirect"]

    },
    "twitter": {
        "runTimeName": "Twitter",
        "attributes": ["consumerKey", "consumerSecret"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["directMessages", "followers", "friendTimeline", "mentions", "searchResults", "username"],
        //list, list , list, list, list, text
        "blocksWriteOnly": [],
        "events": ["directMessageReceived", "followersReceived", "friendTimelineReceived", "isAuthorized", "mentionsReceived", "searchSuccessful"],
        "methods": ["authorize", "checkAuthorized", "deAuthorize", "directMessage", "follow", "requestDirectMessage", "requestFollowers", "requestFriendTimeline", "requestMentions", "searchTwitter", "stopFollowing", "tweet", "tweetWithImage"]

    },
    //storage elements
    "clouddb": {
        "runTimeName": "CloudDB",
        "attributes": ["projectID", "redisPort", "redisServer", "token", "useSSL"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["cloudDBError", "dataChanged", "firstRemoved", "gotValue", "tagList", "updateDone"],
        "methods": ["appendValueToList", "clearTag", "cloudConnected", "getTagList", "getValue", "removeFirstFromList", "storeValue"]

    },
    "datafile": {
        "runTimeName": "DataFile",
        "attributes": ["defaultScope", "sourceFile"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["columnNames", "columns", "rows"],  //list, list, list
        "blocksWriteOnly": [],
        "events": [],
        "methods": ["readFile"]

    },
    "file": {
        "runTimeName": "File",
        "attributes": ["defaultScope", "readPermission", "writePermission"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["scope"],   //filescope
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["afterFileSaved", "gotText"],
        "methods": ["appendToFile", "copyFile", "delete", "exists", "isDirectory", "listDirectory", "makeDirectory", "makeFullPath", "moveFile", "readFrom", "removeDirectory", "saveFile"]

    },
    "spreadsheet": {
        "runTimeName": "Spreadsheet",
        "attributes": ["credentialsJSON", "spreadsheetID"],
        "designerAttributes": ["class", "id", "name", "applicatioName"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["errorOccured", "finishAddCol", "finishedAddRow", "finishedClearRange", "finishedRemoveCol", "finishedRemoveRow", "finishedWriteCell", "finishedWriteCol", "finishedWriteRange", "finishedWriteRow", "gotCellData", "gotColData", "gotFilterResult", "gotRangeData", "gotRowData", "gotSheetData"],
        "methods": ["addCol", "addRow", "clearRange", "getCellReference", "getRangeReference", "readCell", "readCol", "readRange", "readRow", "readSheet", "readWithExactFilter", "readWithPartialFilter", "removeCol", "removeRow", "writeCell", "writeCol", "writeRange", "writeRow"]

    },
    "tinydb": {
        "runTimeName": "TinyDB",
        "attributes": ["namespace"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": [],
        "methods": ["clearAll", "clearTag", "getTags", "getValue", "storeValue"]

    },
    "tinywebdb": {
        "runTimeName": "TinyWebDB",
        "attributes": ["serviceURL"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["gotValue", "valueStored", "webServiceError"],
        "methods": ["getValue", "storeValue"]

    },
    //connectivity elements
    "activitystarter": {
        "runTimeName": "ActivityStarter",
        "attributes": ["action", "activityClass", "activityPackage", "dataType", "dataUri", "extraKey",
            "extraValue", "resultName"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["extras"],  //list
        "blocksReadOnly": ["result", "resultType", "resultUri"],  //list, text, text
        "blocksWriteOnly": [],
        "events": ["activityCanceled", "afterActivity"],
        "methods": ["resolveActivity", "startActivity"]

    },
    "bluetoothclient": {
        "runTimeName": "BluetoothClient",
        "attributes": ["characterEncoding", "delimiterByte", "disconnectOnError",
            "highByteFirst", "pollingRate", "secure"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["addressesAndNames", "available", "enabled", "isConnected"], //list, bool bool, bool
        "blocksWriteOnly": [],
        "events": [],
        "methods": ["bytesAvailableToReceive", "connect", "connectWithUUID", "disconnect", "isDevicePaired", "receiveSigned1ByteNumber", "receiveSigned2ByteNumber", "receiveSigned4ByteNumber", "receiveSignedBytes", "receiveText", "receiveUnsigned1ByteNumber", "receiveUnsigned2ByteNumber", "receiveUnsigned4ByteNumber", "receiveUnsignedBytes", "send1ByteNumber", "send2ByteNumber", "send4ByteNumber", "sendBytes", "sendText"]

    },
    "bluetoothserver": {
        "runTimeName": "BluetoothServer",
        "attributes": ["characterEncoding", "delimiterByte", "delimiter", "highByteFirst",
            "secure"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["available", "enabled", "isAccepting", "isConnected"],  //bool, bool, bool, bool
        "blocksWriteOnly": [],
        "events": ["connectionAccepted"],
        "methods": ["acceptConnection", "acceptConnectionWithUUID", "bytesAvailableToReceive", "disconnect", "receiveSigned1ByteNumber", "receiveSigned2ByteNumber", "receiveSigned4ByteNumber", "receiveSignedBytes", "receiveText", "receiveUnsigned1ByteNumber", "receiveUnsigned2ByteNumber", "receiveUnsigned4ByteNumber", "receiveUnsignedBytes", "send1ByteNumber", "send2ByteNumber", "send4ByteNumber", "sendBytes", "sendText"]

    },
    "serial": {
        "runTimeName": "Serial",
        "attributes": ["baudRate", "bufferSize"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": [],
        "blocksReadOnly": ["isInitialized", "isOpen"], //bool, bool
        "blocksWriteOnly": [],
        "events": [],
        "methods": ["closeSerial", "initializeSerial", "openSerial", "printSerial", "readSerial", "writeSerial"]

    },
    "web": {
        "runTimeName": "Web",
        "attributes": ["allowCookies", "responseFileName", "saveResponse", "timeout", "homeUrl"],
        "designerAttributes": ["class", "id", "name"],
        "blocksAttributes": ["requestHeaders"], //list
        "blocksReadOnly": [],
        "blocksWriteOnly": [],
        "events": ["gotFile", "gotText", "timedOut"],
        "methods": ["buildRequestData", "clearCookies", "delete", "get", "htmlTextDecode", "jsonEncodeObject", "jsonTextDecode", "jsonTextDecodeWithDictionaries", "patchFile", "patchtext", "patchTextWithEncoding", "postFile", "postText", "postTextWithEncoding", "putFile", "putText", "putTextWithEncoding", "uriDecode", "uriEncode", "XMLTextDecode", "XMLTextDecodeAsDictionary"]

    }

}


exports.ELEMENTS = ELEMENTS