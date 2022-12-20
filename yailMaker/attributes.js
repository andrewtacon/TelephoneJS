
//Attributes and their synonyms
//the key is the value that the YAIL code requires (it is not case sensitive for the XML designs)
//the values is the value the transpiler uses for javascript (it is case sensitive in the javascript)
//if there is no value then it cannot be changed programmatically in the code (well, you probably could, but the app inventor online version doesn't allow it)

const ATTRIBUTES = {
    "AboutScreen": [],
    "AccentColor": ["accent"],
    "ApiKey": [],
    "AppName": [],
    "AlignHorizontal": ["halign"],
    "AlignVertical": ["valign"],
    "AlternateText": ["alt"],
    "AllowCookies": ["cookies"],
    "AnchorHorizontal": [],
    "AnchorVertical": [],
    "ApplicationName": [],
    "BackgroundColor": [],
    "BackgroundImage": [],
    "BaudRate": ["baud"],
    "BigDefaultText": [],
    "BufferSize": ["buffer"],
    "CenterFromString": ["center"],
    "CharacterEncoding": ["encoding"],
    "Checked": [],
    "Class": [], //for CSS styling
    "Clickable": [],
    "CloseScreenAnimation": [],
    "ColorLeft": ["leftcolor"],
    "ColorRight": ["rightcolor"],
    "Column": ["col"],
    "Columns": ["cols"],
    "ConsumerKey": [],
    "ConsumerSecret": [],
    "Country": [],
    "CredentialsJSON": ["credentials"],
    "DefaultScope": ["scope"],
    "DelimiterByte": ["delimiter"],
    "Description": [],
    "DisconnectOnError": [],
    "Draggable": [],
    "DistanceInterval": [],
    "EastLongitude": ["east"],
    "ElementsFromString": ["elements"],
    "Enabled": [],
    "EnableInfoBox": [],
    "EnablePan": [],
    "EnableRotation": [],
    "EnableZoom": [],
    "EndLatitude": ["endlat"],
    "EndLongitude": ["endlon"],
    "ExtendMovesOutsideCanvas": ["extend"],
    "FeaturesFromGeoJSON": [],
    "FillColor": [],
    "FillOpacity": [],
    "FollowLinks": [],
    "FontBold": ["bold"],
    "FontItalic": ["italic"],
    "FontSize": [],
    "FontSizeDetail": [],
    "FontTypeface": ["typeface"],
    "FontTypefaceDetail": ["typefacedetail"],
    "GoogleVoiceEnabled": [],
    "HasMargins": ["margins"],
    "Heading": [],
    "Height": [],
    "HighByteFirst": [],
    "HighContrast": [],
    "Hint": [],
    "HolePointsFromString": [],
    "HomeUrl": ["url"],
    "HTMLFormat": ["html","HTMLFormat"],
    "Icon": [],
    "IgnoreSslErrors": ["ignoressl"],
    "Image": [],
    "ImageAsset": [],
    "ImageHeight": [],
    "ImageWidth": [],
    "Interval": [],
    "ItemBackgroundColor": ["itembg", "itembackground"],
    "ItemTextColor": ["itemcolor"],
    "KeepRunningWhenOnPause": [],
    "Language": ["lang"],
    "Latitude": ["lat"],
    "LegacyMode": [],
    "LineWidth": [],
    "ListData": ["data"],
    "ListViewLayout": ["layout"],
    "LocationSensor": [],
    "Longitude": ["lon"],
    "Loop": [],
    "MapType": [],
    "MaxValue": ["max"],
    "Message": [],
    "MinValue": ["min"],
    "MinimumInterval": [],
    "MultiLine": [],
    "Name": ["id"],
    "Namespace": [],
    "NorthLatitude": ["north"],
    "NotifierLength": ["length"],
    "NumbersOnly": ["numbers"],
    "On": [],
    "OpenScreenAnimation": [],
    "Orientation": [],
    "OriginAtCenter": [],
    "PaintColor": ["paint"],
    "PhoneNumber": [],
    "Picture": [],
    "Pitch": [],
    "PlayOnlyInForeground": [],
    "PointsFromString": ["points"],
    "PollingRate": [],
    "PrimaryColor": [],
    "PrimaryColorDark": [],
    "ProjectID": [],
    "Prompt": [],
    "PromptForPermission": ["promptpermission"],
    "Radius": [],
    "ReadOnly": [],
    "ReadMode": [],
    "ReadPermission": [],
    "RecievingEnabled": [],
    "RedisPort": [],
    "RedisServer": [],
    "RefreshTime": [],
    "ResponseFileName": [],
    "Rotation": [],
    "RotationAngle": [],
    "Rotates": [],
    "Row": ["row"],
    "Rows": ["rows"],
    "SavedRecording": [],
    "SaveResponse": [],
    "ScalePictureToFit": [],
    "ScaleUnits": [],
    "ScreenOrientation": [],
    "Script": [],
    "Style": [],
    "Scrollable": [],
    "Secure": [],
    "Selection": [],
    "SelectionColor": [],
    "Sensitivity": [],
    "ServiceURL": [],
    "Shape": [],
    "ShowCompass": [],
    "ShowScale": [],
    "ShowUnits": [],
    "ShowZoom": [],
    "ShowFeedback": [],
    "ShowFilterBar": ["showfilter"],
    "ShowListsAsJSON": [],
    "ShowStatusBar": ["statusbar"],
    "Sizing": [],
    "Source": ["src"],
    "SourceFile": [],
    "SouthLatitude": ["south"],
    "SpeechRate": [],
    "SpreadsheetID": [],
    "StartLatitude": ["startlat"],
    "StartLongitude": ["startlon"],
    "StopDetectionTimeout": [],
    "StrideLength": [],
    "StrokeColor": [],
    "StrokeOpacity": [],
    "StrokeWidth": [],
    "Speed": [],
    "Text": [],
    "TextAlignment": ["textalign"],
    "TextColor": [],
    "TextColorDetail": [],
    "TextSize": [],
    "Theme": [],
    "ThumbColorActive": [],
    "ThumbColorInactive": [],
    "ThumbEnabled": [],
    "ThumbPosition": [],
    "TimeInterval": [],
    "Timeout": [],
    "TimerAlwaysFires": ["alwaysfires"],
    "TimerEnabled": [],
    "TimerInterval": [],
    "Title": [],
    "TitleVisible": [],
    "Token": [],
    "TrackColorActive": [],
    "TrackColorInactive": [],
    "TransportationMethod": ["method"],
    "Url": [],
    "UseExternalScanner": ["externalscanner", "external"],
    "UsesLocation": ["uselocation", "location"],
    "UseLegacy": [],
    "UseSSL": [],
    "VersionCode": [],
    "VersionName": [],
    "Visible": [],
    "Volume": ["vol"],
    "WestLongitude": ["west"],
    "Width": [],
    "WritePermission": [],
    "X": [],
    "Y": [],
    "Z": [],
    "ZoomLevel": [],

    //extra connectivity attributes (I got lazy about alphabetising)
    "Action": [],
    "ActivityClass": [],
    "ActivityPackage": [],
    "DataType": [],
    "DataUri": [],
    "ExtraKey": [],
    "ExtraValue": [],
    "ResultName": []
}



///////////////////////////////////////////////////////////////////////////////
//// This section adds the actual lines of code for the various parameters ////
///////////////////////////////////////////////////////////////////////////////

function setAttribute(key, value, name, descriptor) {

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
        case "RecievingEnabled":
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



    return `\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'text)`
}


function setTrueFalse(key, value, name, descriptor) {
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
    value = parseInt(value)
    if (!isNaN(value)) {
        return `\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)` 
    } else {
        console.log(`${descriptor} requires an integer value as input.`)
    }
    return ""
}



function setComponent(key, value, name, descriptor) {
    //somehow need to validate that the component actually exists.....
    return `\n\t(set-and-coerce-property! '${name} '${descriptor} (get-component ${value}) 'component)`
}

function fromList(key, value, name, options, descriptor) {
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