
//Attributes and their synonyms
//the key is the value that the YAIL code requires (it is not case sensitive for the XML designs)
//the values is the value the transpiler uses for javascript (it is case sensitive in the javascript)
//if there is no value then it cannot be changed programmatically in the code (well, you probably could, but the app inventor online version doesn't allow it)

const ATTRIBUTES = {
    "AboutScreen": [],
    "AbsoluteStrength": [],
    "AccentColor": [],
    "Accuracy": [],
    "Action": [],
    "ActivityClass": [],
    "ActivityPackage": [],
    "AddressesAndNames": [],
    "AirPressure": [],
    "AlignHorizontal": [],
    "AlignVertical": [],
    "AllowCookies": [],
    "AlternateText": [],
    "Altitude": [],
    "AnchorHorizontal": [],
    "AnchorVertical": [],
    "Angle": [],
    "Animation": [],
    "ApiKey": [],
    "AppName": [],
    "ApplicatioName": [],
    "Available": [],
    "AvailableCountries": [],
    "AvailableLanguages": [],
    "AvailableProviders": [],
    "AverageLux": [],
    "Azimuth": [],
    "BackgroundColor": [],
    "BackgroundImage": [],
    "BackgroundImageinBase64": [],
    "BaudRate": [],
    "BigDefaultText": [],
    "Bold": [],
    "BoundingBox": [],
    "BufferSize": [],
    "Center": [],
    "CenterFromString": [],
    "CharacterEncoding": [],
    "Checked": [],
    "Class": [],
    "Clickable": [],
    "CloseScreenAnimation": [],
    "ColorLeft": [],
    "ColorRight": [],
    "Column": [],
    "ColumnNames": [],
    "Columns": [],
    "ConsumerKey": [],
    "ConsumerSecret": [],
    "ContactName": [],
    "ContactUri": [],
    "Country": [],
    "CredentialsJSON": [],
    "CurrentAddress": [],
    "CurrentPageTitle": [],
    "CurrentUrl": [],
    "DataType": [],
    "DataUri": [],
    "Day": [],
    "DefaultFileScope": [],
    "DefaultScope": [],
    "Delimiter": [],
    "DelimiterByte": [],
    "Description": [],
    "DirectMessages": [],
    "DisconnectOnError": [],
    "Distance": [],
    "DistanceInterval": [],
    "Draggable": [],
    "EastLongitude": [],
    "ElapsedTime": [],
    "Elememtsfromstring": [],
    "Elements": [],
    "ElementsFromString": [],
    "EmailAddress": [],
    "EmailAddressList": [],
    "EnableInfoBox": [],
    "EnablePan": [],
    "EnableRotation": [],
    "EnableZoom": [],
    "Enabled": [],
    "EndLatitude": [],
    "EndLocation": [],
    "EndLongitude": [],
    "ExtendMovesOutsideCanvas": [],
    "ExtraKey": [],
    "ExtraValue": [],
    "Extras": [],
    "Features": [],
    "FillColor": [],
    "FillOpacity": [],
    "FollowLinks": [],
    "Followers": [],
    "FontSize": [],
    "FontSizedetail": [],
    "FontTypeface": [],
    "FontTypefaceDetail": [],
    "FriendTimeline": [],
    "FullScreen": [],
    "GoogleVoiceEnabled": [],
    "HTMLContent": [],
    "HTMLFormat": [],
    "HasAccuracy": [],
    "HasAltitude": [],
    "HasLongitudeLatitude": [],
    "HasMargins": [],
    "Heading": [],
    "Height": [],
    "HighByteFirst": [],
    "HighContrast": [],
    "Hint": [],
    "HolePoints": [],
    "HolePointsFromString": [],
    "HomeUrl": [],
    "Hour": [],
    "Humidity": [],
    "Icon": [],
    "Id": [],
    "IgnoreSslErrors": [],
    "Image": [],
    "ImageAsset": [],
    "Imageheight": [],
    "Imagewidth": [],
    "Instant": [],
    "Interval": [],
    "IsAccepting": [],
    "IsConnected": [],
    "IsInitialized": [],
    "IsOpen": [],
    "IsPlaying": [],
    "Italic": [],
    "ItemBackgroundColor": [],
    "ItemTextColor": [],
    "KeepRunningWhenOnPause": [],
    "Language": [],
    "LastMessage": [],
    "Latitude": [],
    "LegacyMode": [],
    "LineWidth": [],
    "ListData": [],
    "ListViewLayout": [],
    "LocationSensor": [],
    "Longitude": [],
    "Loop": [],
    "Lux": [],
    "Magnitude": [],
    "MapType": [],
    "MaxValue": [],
    "MaximumRange": [],
    "Mentions": [],
    "Message": [],
    "MinValue": [],
    "MinimumInterval": [],
    "Minute": [],
    "Month": [],
    "MonthInText": [],
    "MultiLine": [],
    "Name": [],
    "Namespace": [],
    "NorthLatitude": [],
    "NotifierLength": [],
    "NumbersOnly": [],
    "On": [],
    "OpenScreenAnimation": [],
    "Orientation": [],
    "OriginAtCenter": [],
    "PaintColor": [],
    "Passwordvisible": [],
    "PhoneNumber": [],
    "PhoneNumberList": [],
    "Picture": [],
    "Pitch": [],
    "Platform": [],
    "PlatformVersion": [],
    "PlayOnlyInForeground": [],
    "Points": [],
    "PointsFromString": [],
    "PollingRate": [],
    "PrimaryColor": [],
    "PrimaryColorDark": [],
    "ProjectID": [],
    "Prompt": [],
    "PromptForPermission": [],
    "ProviderLocked": [],
    "ProviderName": [],
    "Radius": [],
    "ReadMode": [],
    "ReadOnly": [],
    "ReadPermission": [],
    "ReceivingEnabled": [],
    "RedisPort": [],
    "RedisServer": [],
    "RefreshTime": [],
    "RequestHeaders": [],
    "ResponseContent": [],
    "ResponseFileName": [],
    "Result": [],
    "ResultName": [],
    "ResultType": [],
    "ResultUri": [],
    "Roll": [],
    "Rotates": [],
    "Rotation": [],
    "RotationAngle": [],
    "Row": [],
    "Rows": [],
    "SaveResponse": [],
    "SavedRecording": [],
    "ScalePictureToFit": [],
    "ScaleUnits": [],
    "Scaling": [],
    "Scope": [],
    "ScreenOrienation": [],
    "Script": [],
    "Scrollable": [],
    "SearchResults": [],
    "Secure": [],
    "Selection": [],
    "SelectionIndex": [],
    "Selectioncolor": [],
    "Selectiondetailtext": [],
    "Selectionindex": [],
    "Sensitivity": [],
    "ServiceURL": [],
    "Shape": [],
    "ShowCompass": [],
    "ShowFeedback": [],
    "ShowFilterBar": [],
    "ShowListsAsJSON": [],
    "ShowScale": [],
    "ShowStatusBar": [],
    "ShowUser": [],
    "ShowZoom": [],
    "SimpleSteps": [],
    "Sizing": [],
    "Source": [],
    "SourceFile": [],
    "SouthLatitude": [],
    "SpeechRate": [],
    "Speed": [],
    "SpreadsheetID": [],
    "StartLatitude": [],
    "StartLocation": [],
    "StartLongitude": [],
    "StopDetectionTimeout": [],
    "StrideLength": [],
    "StrokeColor": [],
    "StrokeOpacity": [],
    "StrokeWidth": [],
    "Style": [],
    "TapThreshold": [],
    "Temperature": [],
    "Text": [],
    "TextAlignment": [],
    "TextColor": [],
    "TextColordetail": [],
    "TextToWrite": [],
    "Textsize": [],
    "Theme": [],
    "ThumbColorActive": [],
    "ThumbColorInactive": [],
    "Thumbenabled": [],
    "Thumbposition": [],
    "TimeInterval": [],
    "Timeout": [],
    "TimerAlwaysFires": [],
    "TimerEnabled": [],
    "TimerInterval": [],
    "Title": [],
    "TitleVisible": [],
    "Token": [],
    "TrackColorActive": [],
    "TrackColorInactive": [],
    "TransportationMethod": [],
    "Type": [],
    "UseExternalScanner": [],
    "UseLegacy": [],
    "UseSSL": [],
    "UserLatitude": [],
    "UserLongitude": [],
    "Username": [],
    "UsesLocation": [],
    "VersionCode": [],
    "VersionName": [],
    "Visible": [],
    "Volume": [],
    "WalkSteps": [],
    "WebViewString": [],
    "WestLongitude": [],
    "Width": [],
    "WritePermission": [],
    "Writetype": [],
    "X": [],
    "XAccel": [],
    "XAngularVelocity": [],
    "XStrength": [],
    "Y": [],
    "YAccel": [],
    "YAngularVelocity": [],
    "YStrength": [],
    "Year": [],
    "Z": [],
    "ZAccel": [],
    "ZAngularVelocity": [],
    "ZStrength": [],
    "ZoomLevel": []
}



///////////////////////////////////////////////////////////////////////////////
//// This section adds the actual lines of code for the various parameters ////
///////////////////////////////////////////////////////////////////////////////

let useQuotesForText = false    //this switch allows the text methods to print with quotes for XML or be processing commands for the transpilation

function setAttribute(key, value, name, descriptor, useQuotes = true) {

    useQuotesForText = useQuotes

    switch (descriptor) {
        case "AppName":
        case "Title":
        case "Hint":
        case "Prompt":
        case "ElementsFromString":
        case "AlternateText":
        case "HomeUrl":
        case "Text":
        case "Selection":
        case "Image":
        case "Picture":
        case "Source":
        case "SavedRecording":
        case "Country":
        case "Language":
        case "ApiKey":
        case "BackgroundImage":
        case "CenterFromString":
        case "Description":
        case "ImageAsset":
        case "PhoneNumber":
        case "Message":
        case "ConsumerKey":
        case "ConsumerSecret":
        case "ProjectID":
        case "RedisServer":
        case "Token":
        case "SourceFile":
        case "ApplicationName":
        case "CredentialsJSON":
        case "SpreadsheetID":
        case "Namespace":
        case "ServiceURL":
        case "Action":
        case "ActivityClass":
        case "ActivityPackage":
        case "DataType":
        case "DataUri":
        case "ExtraKey":
        case "ExtraValue":
        case "ResultName":
        case "CharacterEncoding":
        case "ResponseFileName":
        case "Url":
        case "Icon":
        case "AboutScreen":
        case "VersionName":
        case "HolePointsFromString":
        case "PointsFromString": //this is array of arrays of x,y - should be a convience method to load these better
            //e.g. [[68.02222323204114,-127.02117919921876],[68.01142776369724,-126.99234008789064]]
            return setText(key, value, name, descriptor)
            break;
        //start of default false cases for true/false
        case "TitleVisible":
        case "Enabled":
        case "ShowFeedback":
        case "ShowStatusBar":
        case "ThumbEnabled":
        case "FollowLinks":
        case "PromptForPermission":
        case "HasMargins":
        case "Visible":
        case "UseLegacy":
        case "Rotates":
        case "EnablePan":
        case "EnableZoom":
        case "UseExternalScanner":
        case "TimerAlwaysFires":
        case "TimerEnabled":
        case "ReadMode":
        case "UseSSL":
        case "Secure":
        case "ShowListsAsJSON":
        //start of deafulat true cases
        case "Checked":
        case "Clickable":
        case "FontBold":
        case "FontItalic":
        case "ScalePictureToFit":
        case "On":
        case "IgnoreSslErrors":
        case "UsesLocation":
        case "ShowFilterBar":
        case "NumbersOnly":
        case "HTMLFormat":
        case "MultiLine":
        case "ReadOnly":
        case "PlayOnlyInForeground":
        case "Loop":
        case "ExtendMovesOutsideCanvas":
        case "OriginAtCenter":
        case "EnableRotation":
        case "ShowCompass":
        case "ShowScale":
        case "ShowUser":
        case "ShowZoom":
        case "Draggable":
        case "EnableInfoBox":
        case "LegacyMode":
        case "KeepRunningWhenOnPause":
        case "GoogleVoiceEnabled":
        case "ReadPermission":
        case "WritePermission":
        case "HighByteFirst":
        case "DisconnectOnError":
        case "AllowCookies":
        case "SaveResponse":
        case "BigDefaultText":
        case "HighContrast":
        case "Scrollable":
            return setTrueFalse(key, value, name, descriptor)
            break;
        case "FontSize":
        case "TextSize":
        case "FontSizeDetail":
        case "RotationAngle":
        case "MaxValue":
        case "MinValue":
        case "ThumbPosition":
        case "Volume":
        case "Pitch":
        case "SpeechRate":
        case "LineWidth":
        case "Heading":
        case "Speed":
        case "X":
        case "Y":
        case "Z":
        case "Rotation":
        case "FillOpacity":
        case "Radius": //there are cases where this should be an integer - hope this doesn't break anything
        case "StrokeOpacity":
        case "StrideLength":
        case "Latitude":    //should be a special method to test for latitude and longitude correctness
        case "Longitude":
        case "StartLatitude":
        case "StartLongitude":
        case "EndLatitude":
        case "EndLongitude":
        case "NorthLatitude":
        case "SouthLatitude":
        case "EastLongitude":
        case "WestLongitude":
        case "PollingRate":
            return setFloat(key, value, name, descriptor)
            break;
        case "BackgroundColor":
        case "TextColor":
        case "SelectionColor":
        case "ItemTextColor":
        case "TextColorDetail":
        case "ItemBackgroundColor":
        case "ColorLeft":
        case "ColorRight":
        case "ThumbColorActive":
        case "ThumbColorInactive":
        case "TrackColorActive":
        case "TrackColorInactive":
        case "PaintColor":
        case "FillColor":
        case "StrokeColor":
        case "AccentColor":
        case "PrimaryColor":
        case "PrimaryColorDark":
            return setColor(key, value, name, descriptor)
            break;
        case "Columns":
        case "Rows":
        case "Column":
        case "Row":
        case "ImageHeight":
        case "ImageWidth":
        case "MinimumInterval":
        case "TapThreshold":
        case "Interval":
        case "ZoomLevel":
        case "StrokeWidth":
        case "RefreshTime":
        case "RedisPort":
        case "TimerInterval":
        case "TimeInterval":        //limit to 0, 1000, 10000, 60000, 300000 //should have this as timerinterval so not confuse users
        case "DistanceInterval":    ///limit to 0, 1, 10, 100
        case "StopDetectionTimeout":
        case "DelimiterByte":
        case "BaudRate":
        case "BufferSize":
        case "Timeout":
        case "VersionCode":
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
        case "DefaultScope":
            return setScope(key, value, name, descriptor)
            break;
        case "CloseScreenAnimation":
        case "OpenScreenAnimation":
            return fromTextList(key, value, name, ['fade', 'zoom', 'slidehorizontal', 'slidevertical', 'none'], descriptor)
            break;
        case "TransportationMethod":
            return fromTextList(key, value, name, ['driving', 'cycling', 'wheelchair'], "TransportationMethod")
            break;
        case "ScreenOrientation":
            return fromTextList(key, value, name, ['portrait', 'landscape', 'sensor', 'user'], "TransportationMethod")
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
            return fromList(key, value, name, ['rounded', 'rectangular', 'oval'], "Shape")
            break;
        case "AlignVertical":
        case "AnchorVertical":
            return fromList(key, value, name, ['top', 'center', 'bottom'], "AlignVertical")
            break;
        case "AlignHorizontal":
        case "AnchorHorizontal":
            return fromList(key, value, name, ['left', 'right', 'center'], "AlignHorizontal")
            break;
        case "TextAlignment":
            return fromList(key, value, name, ['left', 'center', 'right'], "TextAlignment")
            break;
        case "Orientation":
            return fromList(key, value, name, ['vertical', 'horizontal'], "Orientation")
            break;
        case "NotifierLength":
            return fromList(key, value, name, ['short', 'long'], "NotifierLength")
            break;
        case "ListViewLayout":
            return fromList(key, value, name, ['text', 'text_detail', 'text_detail_horz', 'image_text', 'image_text_detail'], "ListViewLayout")
            break;
        case "MapType":
            return fromList(key, value, name, ['roads', 'aerial', 'terrain'], "MapType")
            break;
        case "ScaleUnits":
            return fromList(key, value, name, ['metric', 'imperial'], "ScaleUnits")
            break;
        case "Sensitivity":
            return fromList(key, value, name, ['weak', 'moderate', 'strong'], "ScaleUnits")
            break;
        case "ReceivingEnabled":
            return fromList(key, value, name, ['off', 'foreground', 'always'], "ReceivingEnabled")
            break;
        case "ListData":
            return loadListViewData(key, value, name, "ListData")
            break;
        case "Name":
        case "Id":      //for CSS styling
        case "Class":   //for CSS styling
        case "Script":
        case "Style":
            return ""
            break;
        default:
            console.log(`Error: Unknown descriptor "${descriptor}". Ignoring.`)
    }

    return ""

}



/////////////////////////////////////////////////////////
//// These are the master parameter creation methods ////
/////////////////////////////////////////////////////////

function setText(key, value, name, descriptor) {

    if (descriptor === "Country") {
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
    }

    if (useQuotesForText) {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'text)`
    } else {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'text)`
    }

}


function setTrueFalse(key, value, name, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
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
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }
    
    value = parseFloat(value)
    if (!isNaN(value)) {
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
        console.log(`${descriptor} requires a numerical value as input.`)
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
    }
    
    if (options.includes(value.toLowerCase())) {
        let index = options.indexOf(value) + 1

        //special case
        if (descriptor === "TextAlignment" || descriptor === "ListViewLayout") { index-- }
        if (descriptor === "Orientation") { if (index !== 1) { return } } //only send through request for horizonatal, vertical is default
        if (descriptor === "NotifierLength") { if (index !== 0) { return } } //only send through request for short, long is default
        if (descriptor === "MapType" || descriptor === "ScaleUnits") { if (index === 0) { return } }
        if (descriptor === "Sensitivity") { if (index === 2) { } return }

        return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${index} 'number)`
    } else {
        console.log(`${descriptor} value of "${value}" is invalid for this descriptor.`)
    }

    return ""
}

function setColor(key, value, name, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }
    

    if (value.length !== 8) {
        console.log(`Invalid colour for ${descriptor}. Must be 8 digit hexadecimal string. Found value does not have 8 characters - "${value}" ***`)
        return ""
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
    }
    if (descriptor === "CloseScreenAnimation" || descriptor === "OpenScreenAnimation") {
        if (options.indexOf(value) === -1) {
            console.log(`Invalid option given for Open/Close Screen Animation: setting to default.`)
            return ""
        }
    }
    if (descriptor === "ScreenOrientation") {
        if (options.indexOf(value) === -1) {
            console.log(`Invalid option given for Screen Orientation: setting to default.`)
            return ""
        }
    }
    if (descriptor === "Sizing") {
        if (options.indexOf(value) === -1) {
            value = "responsive"
            console.log(`Invalid option given for Sizing (of screen): setting to responsive.`)
        }
    }
    if (descriptor === "Theme") {
        if (value === "devicedefault") { value = "AppTheme.Light.DarkActionBar" }
        else if (value === "blacktitle") { value = "AppTheme.Light" }
        else if (value === "dark") { value = "AppTheme" }
        else {
            console.log("Invalid value for theme (of screen): setting to 'classic'.")
            return ""
        }
    }
    return `\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'text)`
}

function setScope(key, value, name, options, descriptor) {
    //this is to handle data coming from the transpiler
    if (typeof value === "string") {
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
        }
    }
    
    value = value.toLowerCase()
    let options2 = ["asset", "cache", "legacy", "private", "shared"]
    if (options2.indexOf(value) === -1) {
        console.log("Invalid default scope for data file. Ignoring.")
        return ""
    }
    value = value[0].toUpperCase() + value.substring(1)
    return `\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'com.google.appinventor.components.common.FileScopeEnum)`
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