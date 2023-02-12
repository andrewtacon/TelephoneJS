const fs = require('fs')

//These are the properties that are associated with components
//the key is the value that the YAIL code requires (it is not case sensitive for the XML designs)
//the values are acceptable values for this particular element - they are used for the help file


const ATTRIBUTES = [
    "AboutScreen",
    "AbsoluteStrength",
    "AccentColor",
    "Accuracy",
    "Action",
    "ActivityClass",
    "ActivityPackage",
    "AddressesAndNames",
    "AirPressure",
    "AlignHorizontal",
    "AlignVertical",
    "AllowCookies",
    "AlternateText",
    "Altitude",
    "AnchorHorizontal",
    "AnchorVertical",
    "Angle",
    "Animation",
    "ApiKey",
    "AppName",
    "ApplicationName",
    "Available",
    "AvailableCountries",
    "AvailableLanguages",
    "AvailableProviders",
    "AverageLux",
    "Azimuth",
    "BackgroundColor",
    "BackgroundImage",
    "BackgroundImageinBase64",
    "BaudRate",
    "BigDefaultText",
    "BlocksToolkit",
    "BoundingBox",
    "BufferSize",
    "CenterFromString",
    "CharacterEncoding",
    "Checked",
    "Class",
    "Clickable",
    "CloseScreenAnimation",
    "ColorLeft",
    "ColorRight",
    "ColumnNames",
    "Columns",
    "ConsumerKey",
    "ConsumerSecret",
    "ContactName",
    "ContactUri",
    "Country",
    "CredentialsJson",
    "CurrentAddress",
    "CurrentPageTitle",
    "CurrentUrl",
    "DataType",
    "DataUri",
    "Day",
    "DefaultFileScope",
    "DefaultScope",
    "DelimiterByte",
    "Description",
    "DirectMessages",
    "DisconnectOnError",
    "Distance",
    "DistanceInterval",
    "Draggable",
    "EastLongitude",
    "ElapsedTime",
    "Elements",
    "ElementsFromString",
    "EmailAddress",
    "EmailAddressList",
    "EnableInfobox",
    "EnablePan",
    "EnableRotation",
    "EnableZoom",
    "Enabled",
    "EndLatitude",
    "EndLocation",
    "EndLongitude",
    "ExtendMovesOutsideCanvas",
    "ExtraKey",
    "ExtraValue",
    "Extras",
    "Features",
    "FeaturesFromGeoJSON",
    "FillColor",
    "FillOpacity",
    "FollowLinks",
    "Followers",
    "FontBold",
    "FontItalic",
    "FontSize",
    "FontSizeDetail",
    "FontTypeface",
    "FontTypefaceDetail",
    "FriendTimeline",
    "FullScreen",
    "GoogleVoiceEnabled",
    "HTMLContent",
    "HTMLFormat",
    "HasAccuracy",
    "HasAltitude",
    "HasLongitudeLatitude",
    "HasMargins",
    "Heading",
    "Height",
    "HeightPercent",
    "HighByteFirst",
    "HighContrast",
    "Hint",
    "HolePoints",
    "HolePointsFromString",
    "HomeUrl",
    "Hour",
    "Humidity",
    "Icon",
    "Id",
    "IgnoreSslErrors",
    "Image",
    "ImageAsset",
    "ImageHeight",
    "ImageWidth",
    "Instant",
    "Interval",
    "IsAccepting",
    "IsConnected",
    "IsInitialized",
    "IsOpen",
    "IsPlaying",
    "ItemBackgroundColor",
    "ItemTextColor",
    "KeepRunningWhenOnPause",
    "Language",
    "LastMessage",
    "Latitude",
    "LegacyMode",
    "LineWidth",
    "ListData",
    "ListViewLayout",
    "LocationSensor",
    "Longitude",
    "Loop",
    "Lux",
    "Magnitude",
    "MapType",
    "MaxValue",
    "MaximumRange",
    "Mentions",
    "Message",
    "MinValue",
    "MinimumInterval",
    "Minute",
    "Month",
    "MonthInText",
    "MultiLine",
    "Name",
    "Namespace",
    "NorthLatitude",
    "NotifierLength",
    "NumbersOnly",
    "On",
    "OpenScreenAnimation",
    "Orientation",
    "OriginAtCenter",
    "PaintColor",
    "PasswordVisible",
    "PhoneNumber",
    "PhoneNumberList",
    "Picture",
    "Pitch",
    "Platform",
    "PlatformVersion",
    "PlayOnlyInForeground",
    "Points",
    "PointsFromString",
    "PollingRate",
    "PrimaryColor",
    "PrimaryColorDark",
    "ProjectID",
    "Prompt",
    "PromptforPermission",
    "ProviderLocked",
    "ProviderName",
    "Radius",
    "ReadMode",
    "ReadOnly",
    "ReadPermission",
    "ReceivingEnabled",
    "RedisPort",
    "RedisServer",
    "RefreshTime",
    "RequestHeaders",
    "ResponseContent",
    "ResponseFileName",
    "Result",
    "ResultName",
    "ResultType",
    "ResultUri",
    "Roll",
    "Rotates",
    "Rotation",
    "RotationAngle",
    "Rows",
    "SaveResponse",
    "SavedRecording",
    "ScalePictureToFit",
    "ScaleUnits",
    "Scaling",
    "Scope",
    "ScreenOrientation",
    "Scrollable",
    "SearchResults",
    "Secure",
    "Selection",
    "SelectionColor",
    "SelectionDetailText",
    "SelectionIndex",
    "Sensitivity",
    "ServiceURL",
    "Shape",
    "ShowCompass",
    "ShowFeedback",
    "ShowFilterBar",
    "ShowListsAsJson",
    "ShowScale",
    "ShowStatusBar",
    "ShowUser",
    "ShowZoom",
    "SimpleSteps",
    "Sizing",
    "Source",
    "SourceFile",
    "SouthLatitude",
    "SpeechRate",
    "Speed",
    "SpreadsheetID",
    "StartLatitude",
    "StartLocation",
    "StartLongitude",
    "StopDetectionTimeout",
    "StrideLength",
    "StrokeColor",
    "StrokeOpacity",
    "StrokeWidth",
    "TapThreshold",
    "Temperature",
    "Text",
    "TextAlignment",
    "TextColor",
    "TextColorDetail",
    "TextSize",
    "TextToWrite",
    "Theme",
    "ThumbColorActive",
    "ThumbColorInactive",
    "ThumbEnabled",
    "ThumbPosition",
    "TimeInterval",
    "Timeout",
    "TimerAlwaysFires",
    "TimerEnabled",
    "TimerInterval",
    "Title",
    "TitleVisible",
    "Token",
    "TrackColorActive",
    "TrackColorInactive",
    "TransportationMethod",
    "TutorialURL",
    "Type",
    "Url",
    "UseExternalScanner",
    "UseLegacy",
    "UseSSL",
    "UserLatitude",
    "UserLongitude",
    "Username",
    "UsesLocation",
    "VersionCode",
    "VersionName",
    "Visible",
    "Volume",
    "WalkSteps",
    "WebViewString",
    "WestLongitude",
    "Width",
    "WidthPercent",
    "WritePermission",
    "WriteType",
    "X",
    "XAccel",
    "XAngularVelocity",
    "XStrength",
    "Y",
    "YAccel",
    "YAngularVelocity",
    "YStrength",
    "Year",
    "Z",
    "ZAccel",
    "ZAngularVelocity",
    "ZStrength",
    "ZoomLevel"
]




///////////////////////////////////////////////////////////////////////////////
//// This section adds the actual lines of code for the various parameters ////
//// Code only exists here is the propery can be WRITTEN TO by code or     ////
//// designer                                                              ////
///////////////////////////////////////////////////////////////////////////////

/*
Things missing:
    Component           Property
    ActivityStarter     Extras
    FeatureCollection   Features
    LineString          Points
    Map                 BoundingBox
    Map                 Features
    Polygon             HolePoints
    Polygon             Points
    Web                 RequestHeaders

*/


let useQuotesForText = false    //this switch allows the text methods to print with quotes for XML or be processing commands for the transpilation

function setAttribute(key, value, name, descriptor, useQuotes = true) {

    useQuotesForText = useQuotes

    switch (descriptor) {

        case "AboutScreen":
        case "Action":
        case "ActivityClass":
        case "ActivityPackage":
        case "AlternateText":
        case "Animation":
        case "ApiKey":
        case "ApplicationName":
        case "AppName":
        case "BackgroundImage":
        case "BackgroundImageinBase64":
        case "BlocksToolkit":
        case "CenterFromString":
        case "CharacterEncoding":
        case "ConsumerKey":
        case "ConsumerSecret":
        case "Country":
        case "CredentialsJson":
        case "CurrentUrl":
        case "CurrentPageTitle":
        case "DataType":
        case "DataUri":
        case "Description":
        case "ElementsFromString":
        case "EndLocation":
        case "ExtraKey":
        case "ExtraValue":
        case "Hint":
        case "HolePointsFromString":
        case "HomeUrl":
        case "HTMLContent":
        case "Icon":
        case "Image":
        case "ImageAsset":
        case "Language":
        case "Message":
        case "MonthInText":
        case "Namespace":
        case "Platform":
        case "PhoneNumber":
        case "Picture":
        case "PointsFromString": //this is array of arrays of x,y - should be a convience method to load these better//e.g. [[68.02222323204114,-127.02117919921876],[68.01142776369724,-126.99234008789064]]
        case "ProjectID":
        case "Prompt":
        case "ProviderName":
        case "RedisServer":
        case "ResponseFileName":
        case "ResultName":
        case "SavedRecording":

        case "Selection":
        case "ServiceURL":
        case "Source":
        case "SourceFile":
        case "SpreadsheetID":
        case "StartLocation":
        case "Text":
        case "TextToWrite":
        case "Title":
        case "Token":
        case "TutorialURL":
        case "Url":
        case "VersionName":
        case "WebViewString":
            return setText(key, value, name, descriptor)
            break;
        //start of default false cases for true/false
        case "Enabled":
        case "EnablePan":
        case "EnableZoom":
        case "FollowLinks":
        case "HasMargins":
        case "PromptForPermission":
        case "ReadMode":
        case "Rotates":
        case "Secure":
        case "ShowFeedback":
        case "ShowListsAsJson":
        case "ShowStatusBar":
        case "ThumbEnabled":
        case "TimerAlwaysFires":
        case "TimerEnabled":
        case "UseExternalScanner":
        case "UseLegacy":
        case "UseSSL":
        case "Visible":
        case "TitleVisible":
        //start of deafulat true cases
        case "AllowCookies":
        case "BigDefaultText":
        case "Checked":
        case "Clickable":
        case "DisconnectOnError":
        case "Draggable":
        case "EnableInfobox":
        case "EnableRotation":
        case "ExtendMovesOutsideCanvas":
        case "FontBold":
        case "FontItalic":
        case "FullScreen":
        case "GoogleVoiceEnabled":
        case "HighByteFirst":
        case "HighContrast":
        case "HTMLFormat":
        case "IgnoreSslErrors":
        case "KeepRunningWhenOnPause":
        case "LegacyMode":
        case "Loop":
        case "MultiLine":
        case "NumbersOnly":
        case "On":
        case "OriginAtCenter":
        case "PasswordVisible":
        case "PlayOnlyInForeground":
        case "PromptForPermission":
        case "ProviderLocked":
        case "ReadOnly":
        case "ReadPermission":
        case "SaveResponse":
        case "ScalePictureToFit":
        case "Scrollable":
        case "ShowCompass":
        case "ShowFilterBar":
        case "ShowScale":
        case "ShowUser":
        case "ShowZoom":
        case "UsesLocation":
        case "WritePermission":
            return setTrueFalse(key, value, name, descriptor)
            break;
        case "EastLongitude":
        case "EndLatitude":
        case "EndLongitude":
        case "FillOpacity":
        case "FontSize":
        case "FontSizeDetail":
        case "Heading":
        case "HeightPercent":
        case "Latitude": //should be a special method to test for latitude and longitude correctness
        case "LineWidth":
        case "Longitude":
        case "MaxValue":
        case "MinValue":
        case "NorthLatitude":
        case "PlatformVersion":
        case "Pitch":
        case "PollingRate":
        case "Radius": //there are cases where this should be an integer - hope this doesn't break anything
        case "Rotation":
        case "RotationAngle":
        case "Scaling":
        case "SouthLatitude":
        case "SpeechRate":
        case "Speed":
        case "StartLatitude":
        case "StartLongitude":
        case "StrideLength":
        case "StrokeOpacity":
        case "TextSize":
        case "ThumbPosition":
        case "Volume":
        case "WestLongitude":
        case "WidthPercent":
        case "X":
        case "Y":
        case "Z":

            return setFloat(key, value, name, descriptor)
            break;
        case "AccentColor":
        case "BackgroundColor":
        case "ColorLeft":
        case "ColorRight":
        case "FillColor":
        case "ItemBackgroundColor":
        case "ItemTextColor":
        case "PaintColor":
        case "PrimaryColor":
        case "PrimaryColorDark":
        case "SelectionColor":
        case "StrokeColor":
        case "TextColor":
        case "TextColorDetail":
        case "ThumbColorActive":
        case "ThumbColorInactive":
        case "TrackColorActive":
        case "TrackColorInactive":
            return setColor(key, value, name, descriptor)
            break;
        case "BaudRate":
        case "BufferSize":
        case "Column":
        case "Columns":
        case "Day":
        case "DelimiterByte":
        case "DistanceInterval": ///limit to 0, 1, 10, 100
        case "Hour":
        case "ImageHeight":
        case "ImageWidth":
        case "Interval":
        case "MinimumInterval":
        case "Minute":
        case "Month":
        case "RedisPort":
        case "RefreshTime":
        case "Row":
        case "Rows":
        case "SelectionIndex":
        case "StopDetectionTimeout":
        case "StrokeWidth":
        case "TapThreshold":
        case "TimeInterval": //limit to 0, 1000, 10000, 60000, 300000 //should have this as timerinterval so not confuse users
        case "Timeout":
        case "TimerInterval":
        case "VersionCode":
        case "Year":
        case "ZoomLevel":
            return setInteger(key, value, name, descriptor);
            break;
        case "Width":
        case "Height":
            return setDimensions(key, value, name, descriptor);
            break;
        case "LocationSensor":
            return setComponent(key, value, name, descriptor);
            break;
        case "FeaturesFromGeoJSON":
            return setGeoJSONData(key, value, name, descriptor)
            break;
        case "DefaultFileScope":
        case "DefaultScope":
        case "Scope":
            return setScope(key, value, name, descriptor)
            break;
        case "CloseScreenAnimation":
        case "OpenScreenAnimation":
            return fromTextList(key, value, name, ['default', 'fade', 'zoom', 'slidehorizontal', 'slidevertical', 'none'], descriptor)
            break;
        case "TransportationMethod":
            return fromTextList(key, value, name, ['driving', 'cycling', 'wheelchair'], "TransportationMethod")
            break;
        case "ScreenOrientation":
            return fromTextList(key, value, name, ['unspecified', 'landscape', 'portrait', 'sensor', 'user', 'behind', 'nosensor', 'fullsensor', 'reverselandscape', 'reverseportrait', 'sensorlandscape', 'sensorportrait'], "ScreenOrientation")
            break;
        case "Sizing":
            return fromTextList(key, value, name, ['fixed', 'responsive'], descriptor)
            break;
        case "Theme":
            return fromTextList(key, value, name, ['devicedefault', 'blacktitle', 'dark'], descriptor)
            break;
        case "FontTypeface":
            return fromList(key, value, name, ['sans serif', 'serif', 'monospace'], "FontTypeface")
            break;
        case "FontTypefaceDetail":
            return fromList(key, value, name, ['sans serif', 'serif', 'monospace'], "FontTypefaceDetail")
            break;
        case "Shape":
            return fromList(key, value, name, ['round', 'rectangle', 'oval'], "Shape")
            break;
        case "AlignVertical":
        case "AnchorVertical":
            return fromList(key, value, name, ['top', 'center', 'bottom'], descriptor)
            break;
        case "AlignHorizontal":
        case "AnchorHorizontal":
            return fromList(key, value, name, ['left', 'right', 'center'], descriptor)
            break;
        case "TextAlignment":
            return fromList(key, value, name, ['left', 'center', 'right'], "TextAlignment")
            break;
        case "Orientation":
            return fromList(key, value, name, ['horizontal', 'vertical'], "Orientation")
            break;
        case "NotifierLength":
            return fromList(key, value, name, ['short', 'long'], "NotifierLength")
            break;
        case "ListViewLayout":
            return fromList(key, value, name, ['text', 'text_detail', 'text_detail_horz', 'image_text', 'image_text_detail'], "ListViewLayout")
            break;
        case "MapType":
            let mapOrigValue = value
            value = value.replaceAll('"',"").toLowerCase().trim()
            value = value[0].toUpperCase() + value.substring(1)
            if (['Road', 'Aerial', 'Terrain'].includes(value)){
                return `(set-and-coerce-property! '${name} 'MapType (static-field com.google.appinventor.components.common.MapType "${value}") 'number)`
            } else {
                console.log(`MapType must be 'road', 'aerial' or 'terrain'. Invalid value of '${mapOrigValue}' supplied. Ignoring.`)
                return
            }
            break;
        case "ScaleUnits":
            let scaleOrigValue = value
            value = value.replaceAll('"',"").toLowerCase().trim()
            value = value[0].toUpperCase() + value.substring(1)
            if (['Metric', 'Imperial'].includes(value)){
                return `(set-and-coerce-property! '${name} 'ScaleUnits (static-field com.google.appinventor.components.common.ScaleUnits "${value}") 'number)`
            } else {
                console.log(`ScaleUnits must be 'metric', or 'imperial'. Invalid value of '${scaleOrigValue}' supplied. Ignoring.`)
                return
            }
            break;
            return fromList(key, value, name, ['metric', 'imperial'], "ScaleUnits")
            break;
        case "Sensitivity":
            return fromList(key, value, name, ['weak', 'moderate', 'strong'], "Sensitivity")
            break;
        case "ReceivingEnabled":
            return fromList(key, value, name, ['off', 'foreground', 'always'], "ReceivingEnabled")
            break;
        case "ListData":
            return loadListViewData(key, value, name, "ListData")
            break;
        case "Class":   //for CSS styling
        case "Id":      //for CSS styling
        case "Name":
        case "Script":
        case "Style":
            return ""
            break;

        case "Instant":
            return setInstant(key, value, name, descriptor)
        case "InstantInTime":
            return setInstantinTime(key, value, name, descriptor)

        case "Elements":
        case "Extras":
        case "RequestHeaders":      //web
        case "BoundingBox":         //map
        case "Features":            //map
        case "Points":              //linstring
        case "HolePoints":          //polygon
            return setFromObject(key, value, name, descriptor)


        ///These are the get only methods
        case "SelectionDetailText":
            return getProperty(key, value, name, descriptor)


        default:
            console.log(`Error: Unknown descriptor "${descriptor}". Ignoring.`)
            errors.push(descriptor)
    }

    return ""

}



/////////////////////////////////////////////////////////
/// These are the master GET methods ////////////////////
/////////////////////////////////////////////////////////

function getProperty(key, value, name, descriptor) {
    return `(get-property '${name} '${descriptor})`
}




/////////////////////////////////////////////////////////
//// These are the master parameter SET methods ////
/////////////////////////////////////////////////////////

function setText(key, value, name, descriptor) {

    /*if (descriptor === "Country") {
        value = value.toUpperCase()
        let countries = ["AUS", "AUT", "BEL", "BLZ", "BWA", "CAN", "CHE", "DEU", "ESP", "FRA", "GBR", "HKG", "IND", "IRL", "ITA", "JAM", "LIE", "LUX", "MCO", "MHL", "MLT", "NAM", "NZL", "PAK", "PHL", "SGP", "TTO", "USA", "VIR", "ZAF", "ZWE"]
        if (countries.indexOf(value) === -1) {
            console.log("Invalid country in speech recognizer. Ignoring.")
            return
        }
    }
    if (descriptor === "Language") {
        value = value.toLowerCase()
        let languages = ["en", "de", "es", "fr", "it"]
        if (languages.indexOf(value) === -1) {
            console.log("Invalid language in speech recognizer. Ignoring.")
            return
        }
    }*/

    if (useQuotesForText) {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'text)`
    } else {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'text)`
    }

}


function setTrueFalse(key, value, name, descriptor) {

    if (value === "#f") { //need to do this conversion for reloads
        value = false
    }
    if (value === "#t") {
        value = true
    }

    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    } else if (typeof value === "boolean") {
        value = value + ""
    }

    value = value.toLowerCase().trim()
    if (value === "false" || value === "f") {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} #f 'boolean)`
    } else if (value === "true" || value === "t") {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} #t 'boolean)`
    } else {
        console.log(`${descriptor} requires a value to "false"/"f" or "true"/"t". Setting to true.`)
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} #t 'boolean)`
    }
}




function setFloat(key, value, name, descriptor) {
    //this is to handle data coming from the transpiler

    let skipCheck = false
    if (typeof value === "string") {
        if (value.startsWith(`(call-yail-primitive - (*list-for-runtime*`) && value.endsWith(`) '(number ) "negate")`)) {
            skipCheck = true
        }

        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }

    if (!skipCheck) {
        value = parseFloat(value)
    }
    if (!isNaN(value) || skipCheck) {
        if (descriptor === "StokeOpacity") {
            if (value < 0) { value = 0 }
            if (value > 1) { value = 1 }
        } else if (descriptor.includes("Longitude")) {
            while (value < -180) { value += 360 }
            while (value > 180) { value -= 360 }
        } else if (descriptor.includes("Latitude")) {
            while (value < -90) { value += 180 }
            while (value > 90) { value -= 180 }
        }
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`
    } else {
        console.log(`${descriptor} requires a numerical value as input. Value given is ${value} of type ${typeof value}`)
    }
    return ""
}

function setInteger(key, value, name, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }


    value = parseInt(value)

    if (descriptor === "SelectionIndex") {
        value = value + 1
    }



    if (!isNaN(value)) {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`
    } else {
        console.log(`${descriptor} requires an integer value as input.`)
    }
    return ""
}



function setComponent(key, value, name, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }

    //somehow need to validate that the component actually exists.....
    return `\n\t(set-and-coerce-property! '${name} '${descriptor} (get-component ${value}) 'component)`
}

function fromList(key, value, name, options, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }

        let index = options.indexOf(value) + 1

        //special case
        if (descriptor === "TextAlignment" || descriptor === "ListViewLayout") { index-- }
        // if (descriptor === "Orientation") { if (index !== 1) { return ""} } //only send through request for horizonatal, vertical is default
        if (descriptor === "NotifierLength") { if (index !== 0) { return "" } } //only send through request for short, long is default
        if (descriptor === "ScaleUnits") { if (index === 0) { return "" } }
        if (descriptor === "Sensitivity") {
            console.log("Sensitivity", value, index)
            if (index === 2) { return "" }
        }


        return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${index} 'number)`
    }

    if (typeof value === "number") {
        let index = options.indexOf(value)
        if (index !== -1) {
            return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`
        }
    }

    console.log(`${descriptor} value of "${value}" is invalid for this descriptor.`)


    return ""
}

function setColor(key, value, name, descriptor) {
    //this is now going to be RGBA
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }

    //check for RGB

    if (value.length !== 8) {
        if (value.length === 6) {
            value = "FF" + value //assume full alpha and append to front
        } else {
            console.log(`Invalid colour for ${descriptor}. Must be 8 digit hexadecimal string. Found value does not have 8 characters - "${value}" ***`)
            return ""
        }
    } else {
        //convert from RGBA to ARGB (what the system expects)
        value = value.substring(6) + value.substring(0, 6)
    }

    value = value.toUpperCase()
    for (let i = 0; i < value.length; i++) {
        let ch = value[i];
        if ((ch < '0' || ch > '9') &&
            (ch < 'A' || ch > 'F')) {
            console.log(`Invalid colour for ${descriptor}. Must be 8 digit hexadecimal string. A non-valid hexadecimal character was found - "${ch}" ***`)
            return ""
        }
    }

    return `\n\t(set-and-coerce-property! '${name} '${descriptor} #x${value} 'number)`
}

function setDimensions(key, value, name, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    } else if (typeof value === "number") {
        value = value + ""
    }


    if (value === 'parent') {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} -2 'number)`
    }
    if (value.indexOf('%') !== -1) {  //handle percentage
        value = value.replaceAll("%", "").trim()
        value = parseInt(value)
        if (isNaN(value)) {
            console.log(`${descriptor} value set is invalid.`)
            return ""
        }
        if (value > 100) { value = 100 }
        if (value < 0) { value = 0 }
        value += 1000
        value = -value
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`
    } else { //pixels
        value = parseInt(value)
        if (isNaN(value)) {
            console.log(`${descriptor} value set is invalid.`)
            return ""
        }
        if (value < 0) { value = 0 }
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`
    }

}


function loadListViewData(key, value, name, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }


    //load the data from a CSV file 
    let file = fs.readFileSync(value, 'utf-8')
    let data = file.split("\n")

    let datalist = []

    while (typeof data[0] !== "undefined") {
        let d = data.shift()
        let line = d.split(",")
        let object = {}
        if (typeof line[0] !== 'undefined') { object.Text1 = line[0].trim() }
        if (typeof line[1] !== 'undefined') { object.Text2 = line[1].trim() }
        if (typeof line[2] !== 'undefined') { object.Image = line[2].trim() }
        datalist.push(object)
    }

    let outputText = JSON.stringify(datalist)
    outputText = outputText.replaceAll('"', '\\"')

    console.log(outputText)

    return `\n\t(set-and-coerce-property! '${name} '${descriptor} "${outputText}" 'text)`
}

function fromTextList(key, value, name, options, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }

    value = value.toLowerCase()
    if (descriptor === "TransportationMethod") {
        if (value === "driving") { value = "driving-car" }
        else if (value === "cycling-regular") { value = "cycling" }
        else if (value === "wheelchair") { }
        else {
            console.log(`Transportation method set to "Walking": either not supplied or invalid method given.`)
            return ""
        }
    } else if (descriptor === "CloseScreenAnimation" || descriptor === "OpenScreenAnimation") {
        if (options.indexOf(value) === -1) {
            console.log(`Invalid option given for Open/Close Screen Animation: setting to default.`)
            return ""
        }
    } else if (descriptor === "ScreenOrientation") {
        if (options.indexOf(value) === -1) {
            console.log(`Invalid option given for Screen Orientation: setting to default.`)
            return ""
        }
    } else if (descriptor === "Sizing") {
        value = value.toLowerCase()
        if (options.indexOf(value) === -1) {
            value = "Responsive"
            console.log(`Invalid option given for Sizing (of screen): setting to responsive.`)
        } else {
            value = value[0].toUpperCase() + value.substring(1)
        }
    } else {
        if (descriptor === "Theme") {
            if (value === "devicedefault") { value = "AppTheme.Light.DarkActionBar" }
            else if (value === "blacktitle") { value = "AppTheme.Light" }
            else if (value === "dark") { value = "AppTheme" }
            else {
                console.log("Invalid value for theme (of screen): setting to 'classic'.")
                return ""
            }
        }
    }

    return `\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'text)`
}

function setScope(key, value, name, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }

    value = value.toLowerCase()
    let options2 = ["app", "asset", "cache", "legacy", "private", "shared"]
    if (options2.indexOf(value) === -1) {
        console.log("Invalid default scope for data file. Ignoring.")
        return ""
    }
    value = value[0].toUpperCase() + value.substring(1)
    return `\n\t(set-and-coerce-property! '${name} '${descriptor} (static-field com.google.appinventor.components.common.FileScope "${value}") 'com.google.appinventor.components.common.FileScopeEnum)`
}

function setGeoJSONData(key, value, name, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }

    //TODO - load the data from the GeoJSON file, somehow apply 

}



function setInstant(key, value, name, descriptor) {
    return `(call-component-method '${name} 'SetDateToDisplayFromInstant (*list-for-runtime* ${value}) '(InstantInTime))`
}


function setInstantinTime(key, value, name, descriptor) {
    return `(call-component-method '${name} 'SetTimeToDisplayFromInstant (*list-for-runtime* ${value}) '(InstantInTime))`
}



function setFromObject(key, value, name, descriptor) {

    // value = JSON.stringify(value)

    return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'list)`

}




exports.setAttribute = setAttribute
exports.ATTRIBUTES = ATTRIBUTES





/*
//old true and false methods => combined into one so can use in the transpiler as well
function setFalse(key, value, name, descriptor) {
    value = value.toLowerCase().trim()
    if (value === "false" || value === "f") {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} #f 'boolean)`
    } else {
        console.log(`${descriptor} requires a value to "false" or "f" to change from default state.`)
    }

    return ""
}

function setTrue(key, value, name, descriptor) {
    value = value.toLowerCase().trim()
    if (value === "true" || value === "t") {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} #f 'boolean)`
    } else {
        console.log(`${descriptor} requires a value to "true" or "t" to change from default state.`)
    }

    return ""
}


*/


/*

//test code for missing arributes that can be written

let errors = []
for (let i = 0; i < ATTRIBUTES.length; i++) {
    //console.log(ATTRIBUTES[i])
    try {
        setAttribute("", "", "", ATTRIBUTES[i])
        
    } catch (error) {
        console.log("Caught error")
    }
}

let {ELEMENTS} = require("./elements")

let data = []
for (let i=0; i<errors.length; i++){
    let error = errors[i]

    for (const component of Object.keys(ELEMENTS)){
        for (const [property, value] of Object.entries(ELEMENTS[component].properties)){
            let p = property[0].toUpperCase() + property.substring(1)
            if (p === error) {
                let designerOnly = ELEMENTS[component].designerNoWrite.includes(property)
                let codeNoRead = ELEMENTS[component].codeNoRead.includes(property)
                let codeNoWrite = ELEMENTS[component].codeNoWrite.includes(property)
                data.push(`${component},${property}, ${value.type}, ${designerOnly}, ${codeNoRead}, ${codeNoWrite}`)
            }
        }
    }
}

data.sort()

fs.writeFileSync("missing.json", JSON.stringify(data))
console.log(data)


*/