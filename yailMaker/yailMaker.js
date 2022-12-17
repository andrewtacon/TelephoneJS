const fs = require("fs")
const convert = require("xml-js")

//TODO: 
//Complete elements
//Make sure that only allowable things can nest within each other
//CSS styling for groups, classes and names (ids)
//programming language
//compilation to android app (or maybe not)
//redo readme better 
//validate component exists for get component somehow
//there is an issue with the charts so not including them in current iteration

//////////////////////////////////////////////////
//// INTERFACE ELEMENTS //////////////////////////
//////////////////////////////////////////////////

const ELEMENTS = {
    //start UI elements
    "button": {
        "runTimeName": "Button",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    "checkbox": {
        "runTimeName": "CheckBox",
        "attributes": ["class", "id", "text", "backgroundcolor", "checked", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "visible", "textcolor", "textalign", "col", "row", "name"]
    },
    "datepicker": {
        "runTimeName": "DatePicker",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "visible", "textcolor", "col", "row", "name"]
    },
    "image": {
        "runTimeName": "Image",
        "attributes": ["class", "id", "alt", "clickable", "height", "width", "picture", "rotationangle", "scalepicturetofit", "visible", "col", "row", "name"]
    },
    "label": {
        "runTimeName": "Label",
        "attributes": ["class", "id", "text", "backgroundcolor", "bold", "italic", "fontsize", "typeface", "html", "margins", "height", "width", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    "listpicker": {
        "runTimeName": "ListPicker",
        "attributes": ["class", "id", "backgroundcolor", "elements", "enabled", "bold", "italic", "fontsize", "typeface", "image", "height", "width", "itembg", "itembackground", "itemtextcolor", "itemcolor", "selection", "shape", "showfeedback", "showfilter", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    "listview": {
        "runTimeName": "ListView",
        "attributes": ["class", "id", "backgroundcolor", "elememts", "fontsizedetail", "typeface", "typefacedetail", "height", "width", "imageheight", "imagewidth", "data", "layout", "orientation", "selection", "selectioncolor", "showfilter", "textcolor", "textcolordetail", "textsize", "visible", "col", "row", "name"]
    },
    "notifier": {
        "runTimeName": "Notifier",
        "attributes": ["class", "id", "backgroundcolor", "textcolor", "length", "name"]
    },
    "password": {
        "runTimeName": "PasswordTextBox",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "hint", "numbers", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    "slider": {
        "runTimeName": "Slider",
        "attributes": ["class", "id", "leftcolor", "rightcolor", "width", "max", "min", "thumbenabled", "thumbposition", "col", "row", "name"]
    },
    "spinner": {
        "runTimeName": "Spinner",
        "attributes": ["class", "id", "elements", "width", "prompt", "selection", "visible", "col", "row", "name"]
    },
    "switch": {
        "runTimeName": "Switch",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "on", "textcolor", "thumbcoloractive", "thumbcolorinactive", 'trackcoloractive', 'trackcolorinactive', "visible", "col", "row", "name"]
    },
    "textbox": {
        "runTimeName": "TextBox",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "multiline", "numbers", "readonly", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    'timepicker': {
        "runTimeName": "TimePicker",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "visible", "textalign", "textcolor", "col", "row", "name"]
    },
    'webview': {
        "runTimeName": "WebViewer",
        "attributes": ["class", "id", "followlinks", "height", "width", "url", "ignoressl", "promptpermission", "uselocation", "visible", "col", "row", "name"]
    },
    "screen": {
        "runTimeName": "Screen",
        "attributes": ["class", "id", "showtitle", "statusbar", "backgroundcolor", "appname", "title"]
    },
    //start layout elements
    "hbox": {
        "runTimeName": "HorizontalArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible", "col", "row"]
    },
    "vbox": {
        "runTimeName": "VerticalArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible", "col", "row"]
    },
    "hscrollbox": {
        "runTimeName": "HorizontalScrollArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible", "col", "row"]
    },
    "vscrollbox": {
        "runTimeName": "VerticalScrollArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible", "col", "row"]
    },
    "table": {
        "runTimeName": "TableArrangement",
        "attributes": ["class", "id", "width", "height", "visible", "columns", "rows", "col", "row"]
    },
    //start media elements
    "camcorder": {
        "runTimeName": "Camcorder",
        "attributes": ["class", "id", "name"]
    },
    "camera": {
        "runTimeName": "Camera",
        "attributes": ["class", "id", "name"]
    },
    "imagepicker": {
        "runTimeName": "ImagePicker",
        "attributes": ["class", "id", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "text", "textalign", "textcolor", "visible"]
    },
    "videoplayer": {
        "runTimeName": "VideoPlayer",
        "attributes": ["class", "id", "height", "width", "source", "visible", "volume"]
    },
    "player": {
        "runTimeName": "Player",
        "attributes": ["class", "id", "loop", "playonlyinforeground", "source", "volume"]
    },
    "sound": {
        "runTimeName": "Sound",
        "attributes": ["class", "id", "minimuminterval", "source"]
    },
    "soundrecorded": {
        "runTimeName": "SoundRecorded",
        "attributes": ["class", "id", "savedrecording"]
    },
    "speechrecognizer": {
        "runTimeName": "SpeechRecognizer",
        "attributes": ["class", "id", "uselegacy"]
    },
    "texttospeech": {
        "runTimeName": "TextToSpeech",
        "attributes": ["class", "id", "country", "language", "lang", "pitch", "speechrate"]
    },
    "translator": {
        "runTimeName": "Translator",
        "attributes": ["class", "id", "apikey"]
    },
    //start drawing and animation elements
    "canvas": {
        "runTimeName": "Canvas",
        "attributes": ["class", "id", "backgroundcolor", "backgroundimage", "extendmovesoutsidecanvas", "extend", "fontsize", "height", "width", "linewidth", "paintcolor", "paint", 'tapthreshold', 'textalign', 'visible']
    },
    "ball": {
        "runTimeName": "Ball",
        "attributes": ["class", "id", "enabled", "heading", "interval", "originatcenter", "paint", "paintcolor", "radius", "speed", "visible", "x", "y", "z"]
    },
    "sprite": {
        "runTimeName": "ImageSprite",
        "attributes": ["class", "id", "enabled", "heading", "height", "width", "interval", "picture", "rotates", "speed", "visible", "x", "y", "z"]
    },
    //start Maps
    //43 things to go
    "map": {
        "runTimeName": "Map",
        "attributes": ["class", "id", "center", "centerfromstring", "enablepan", "enablerotation", "enablezoom", "height", "width", "locationsensor", "maptype", "rotation", "scaleunits", "showcompass", "showscale", "showuser", "showzoom", "visible", "zoomlevel"]
    },
    "circle": {
        "runTimeName": "",
        "attributes": ["class", "id", "description", "draggable", "enableinfobox", "fillcolor", "fillopacity", "latitude", "lat", "longitude", "lon", "radius", "strokecolor", "strokewidth", "title", "visible"]
    },
    /*  "featurecollection": {      //there may be issues here - especially with url as the source of the data - unable to test
          "runTimeName": "FeatureCollection",
          "attributes": ["featuresfromgeojson", "source", "visible"]
      },*/
    "linestring": {
        "runTimeName": "LineString",
        "attributes": ["description", "draggable", "enableinfobox", "pointsfromstring", "points", "strokecolor", "strokeopacity", "strokewidth", "title", "visible"]
    },
    "marker": {
        "runTimeName": "Marker",
        "attributes": ["anchorhorizontal", "anchorvertical", "description", "draggable", "enableinfobox", "fillcolor", "fillopacity", "height", "width", "imageasset", "latitude", "lat", "longitude", "lon", "strokecolor", "strokeopacity", "strokewidth", "title", "visible"]
    },
    "navigation": {
        "runTimeName": "Navigation",
        "attributes": ["apikey", "endlatitude", "endlat", "endlongitude", "endlon", "language", "startlatitude", "startlat", "startlongitude", "startlon", "transportationmethod", "method"]
    },
    "polygon": {
        "runTimeName": "Polygon",
        "attributes": ["description", "draggable", "enableinfobox", "fillcolor", "fillopacity", "holepointsfromstring", "pointsfromstring", "strokecolor", "strokeopacity", "strokewidth", "title", "visible"]
    },
    "rectangle": {
        "runTimeName": "Rectangle",
        "attributes": ["description", "draggable", "eastlongitude", "east", "enableinfobox", "fillcolor", "fillopacity", "northlatitude", "north", "southlatitude", "south", "strokecolor", "strokeopacity", "strokewidth", "title", "visible", "westlongitude", "west"]
    },
    //ignoring charts - not sure how they work
    //start sensors
    "acceleronmeter": {
        "runTimeName": "AccelerometerSensor",
        "attributes": ["enabled", "legacymode", "minimuminterval", "sensitivity"]
    },
    "barcodescanner": {
        "runTimeName": "BarcodeScanner",
        "attributes": ["useexternalscanner", "externalscanner", "external"]
    },
    "barometer": {
        "runTimeName": "Barometer",
        "attributes": ["enabled", "refreshtime"]
    },
    "clock": {
        "runTimeName": "Clock",
        "attributes": ["timeralwaysfires", "alwaysfires", "timerenabled", "timerinterval"]
    },
    "gyroscope": {
        "runTimeName": "GyroscopeSensor",
        "attributes": ["enabled"]
    },
    "hygrometer": {
        "runTimeName": "Hygrometer",
        "attributes": ["enabled", "refreshtime"]
    },
    "lightsensor": {
        "runTimeName": "LightSensor",
        "attributes": ["enabled", "refreshtime"]
    },
    "locationsensor": {
        "runTimeName": "LocationSensor",
        "attributes": ["distanceinterval", "enabled", "timeinterval"]
    },
    "magneticfieldsensor": {
        "runTimeName": "MagneticFieldSensor",
        "attributes": ["enabled"]
    },
    "nearfield": {
        "runTimeName": "NearField",
        "attributes": ["readmode"]
    },
    "orientationsensor": {
        "runTimeName": "OrientationSensor",
        "attributes": ["enabled"]
    },
    "pedometer": {
        "runTimeName": "Pedometer",
        "attributes": ["stopdetectiontimeout", "stridelength"]
    },
    "proximitysensor": {
        "runTimeName": "ProximitySensor",
        "attributes": ["enabled", "keeprunningwhenonpause"]
    },
    "thermometer": {
        "runTimeName": "Thermometer",
        "attributes": ["enabled", "refreshtime"]
    },
    //social and communication tools
    "contactpicker": {
        "runTimeName": "ContactPicker",
        "attributes": ["backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "shape", "showfeedback", "text", "textalign", "textcolor", "visible"]
    },
    "emailpicker": {
        "runTimeName": "EmailPicker",
        "attributes": ["backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "shape", "showfeedback", "hint", "text", "textalign", "textcolor", "visible"]
    },
    "phonecall": {
        "runTimeName": "PhoneCall",
        "attributes": ["phonenumber"]
    },
    "phonenumberpicker": {
        "runTimeName": "PhoneNumberPicker",
        "attributes": ["backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "text", "textalign", "textcolor", "visible"]
    },
    "sharing": {
        "runTimeName": "Sharing",
        "attributes": []
    },
    "texting": {
        "runTimeName": "Texting",
        "attributes": ["googlevoiceenabled", "message", "phonenumber", "recievingenabled"]
    },
    "twitter": {
        "runTimeName": "Twitter",
        "attributes": ["consumerkey", "consumersecret"]
    },
    //storage elements
    "clouddb": {
        "runTimeName": "CloudDB",
        "attributes": ["projectid", "redisport", "redisserver", "token", "usessl"]
    },
    "datafile": {
        "runTimeName": "DataFile",
        "attributes": ["defaultscope", "scope", "sourcefile"]
    },
    "file": {
        "runTimeName": "File",
        "attributes": ["defaultscope", "scope", "readpermission", "writepermission"]
    },
    "spreadsheet": {
        "runTimeName": "Spreadsheet",
        "attributes": ["applicationame", "credentialsjson", "credentials", "spreadsheetid"]
    },
    "tinydb": {
        "runTimeName": "TinyDB",
        "attributes": ["namespace"]
    },
    "tinywebdb": {
        "runTimeName": "TinyWebDB",
        "attributes": ["serviceurl"]
    }


}

//Attributes and their synonyms
const ATTRIBUTES = {
    "ApiKey": [],
    "AppName": [],
    "AlignHorizontal": ["halign"],
    "AlignVertical": ["valign"],
    "AlternateText": ["alt"],
    "AnchorHorizontal": [],
    "AnchorVertical": [],
    "ApplicationName": [],
    "BackgroundColor": [],
    "BackgroundImage": [],
    "CenterFromString": ["center"],
    "Checked": [],
    "Class": [], //for CSS styling
    "Clickable": [],
    "ColorLeft": ["leftcolor"],
    "ColorRight": ["rightcolor"],
    "Column": ["col"],
    "Columns": ["cols"],
    "ConsumerKey": [],
    "ConsumerSecret": [],
    "Country": [],
    "CredentialsJSON": ["credentials"],
    "DefaultScope": ["scope"],
    "Description": [],
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
    "Hint": [],
    "HolePointsFromString": [],
    "HomeUrl": ["url"],
    "HTMLFormat": ["html"],
    "Id": [], //for CSS styling
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
    "Name": [],
    "Namespace": [],
    "NorthLatitude": ["north"],
    "NotifierLength": ["length"],
    "NumbersOnly": ["numbers"],
    "On": [],
    "Orientation": [],
    "OriginAtCenter": [],
    "PaintColor": ["paint"],
    "PhoneNumber": [],
    "Picture": [],
    "Pitch": [],
    "PlayOnlyInForeground": [],
    "PointsFromString": ["points"],
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
    "Rotation": [],
    "RotationAngle": [],
    "Rotates": [],
    "Row": ["row"],
    "Rows": ["rows"],
    "SavedRecording": [],
    "ScalePictureToFit": [],
    "ScaleUnits": [],
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
    "ShowStatusBar": ["statusbar"],
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
    "ThumbColorActive": [],
    "ThumbColorInactive": [],
    "ThumbEnabled": [],
    "ThumbPosition": [],
    "TimeInterval": [],
    "TimerAlwaysFires": ["alwaysfires"],
    "TimerEnabled": [],
    "TimerInterval": [],
    "Title": [],
    "TitleVisible": ["showtitle"],
    "Token": [],
    "TrackColorActive": [],
    "TrackColorInactive": [],
    "TransportationMethod": ["method"],
    "UseExternalScanner": ["externalscanner", "external"],
    "UsesLocation": ["uselocation", "location"],
    "UseLegacy": [],
    "UseSSL": [],
    "Visible": [],
    "Volume": ["vol"],
    "WestLongitude": ["west"],
    "Width": [],
    "WritePermission": [],
    "X": [],
    "Y": [],
    "Z": [],
    "ZoomLevel": [],

}


//this helps name objects without a name
function* getNumber() {
    let count = 0
    while (true) {
        yield count
        count++
    }
}
let generator = getNumber();

function output(text) {
    if (logFile) { fs.appendFileSync("code.yail", text) }
    yail += text
}

//this is the heart of the operation
let yail = ""
let elementList = []    //this is the list of elements on the page - needed so can create and activate them all later in the last line of code
let assetsList = []     //this is the list of media files that need to be loaded
let componentList = ''
let logFile = true

function main(filename = "temp.xml") {
    yail = ""

    //delete base file
    if (logFile) { fs.writeFileSync("code.yail", "") }

    //get input
    let contents = fs.readFileSync(filename, "utf-8")

    //should catch errors in xml format and alert user
    let structure = JSON.parse(convert.xml2json(contents))
    elementList = []    //this is the list of elements on the page - needed so can create and activate them all later in the last line of code
    assetsList = []     //this is the list of media files that need to be loaded

    //if empty object returned then nothing in the file so crash out
    traverse(structure)

    //add lines to execute build
    output(`\n(init-runtime)`)
    componentList = ''
    elementList.shift()  //kill first element - it is the root element of the JSON the CML is parsed
    for (let i = 0; i < elementList.length; i++) {
        componentList += `'${elementList[i]} `
    }
    output(`\n(call-Initialize-of-components ${componentList} )`)

    return { yail: yail, assetsList: assetsList }
}

exports.for = main

function traverse(object, parent = '') {

    let type = object.name

    if (object.attributes) {
        //convert all attributes to lowercase
        object.attributes = Object.fromEntries(
            Object.entries(object.attributes).map(([k, v]) => [k.toLowerCase(), v])
        );

        let attributes = object.attributes
        if (!attributes.name) {
            attributes.name = type + "_" + generator.next().value
        }
    } else {
        object.attributes = {
            name: type + "_" + generator.next().value
        }
    }

    elementList.push(object.attributes.name)


    //for tables we need to do some basic error correct for columns and rows numbers for the table and the elements within
    if (type === "table") {
        //0. determine the size of the table
        let columns = 2
        let rows = 2

        if (object.attributes) {
            if (object.attributes.columns) {
                let setValue = parseInt(object.attributes.columns)
                if (isNaN(setValue)) {
                    console.log("*** Columns not a numerical integer value for a table, coercing to 2. ***")
                    object.attributes.columns = 2
                } else {
                    columns = setValue
                }
            }
            if (object.attributes.rows) {
                let setValue = parseInt(object.attributes.rows)
                if (isNaN(setValue)) {
                    console.log("*** Rows not a numerical integer value for a table, coercing to 2. ***")
                    object.attributes.rows = 2
                } else {
                    rows = setValue
                }
            }
        }

        /*
            1. iterate over the items and determine if the column and row numbers are valid
                -> determine minimum and maximum column
                    -> set number of columns to be max of (current column count, max column number, max range of column numbers (in case did a negative))
                    -> if negative column numbers then will need to determine this difference and update column number positions for the elements to be greater than/equal to zero
                -> do the same for rows
        */
        let minColumn = 0
        let maxColumn = 0
        let minRow = 0
        let maxRow = 0
        for (let i = 0; i < object.elements.length; i++) {
            let element = object.elements[i]
            if (element.attributes) {
                //convert attributes to lowercase
                element.attributes = Object.fromEntries(
                    Object.entries(element.attributes).map(([k, v]) => [k.toLowerCase(), v])
                );
                if (element.attributes.col) {
                    let col = parseInt(element.attributes.col)
                    if (isNaN(col)) {
                        delete element.attributes.col
                        console.log("*** Invalid column reference for table element. Deleting. ***")
                    } else {
                        if (col > maxColumn) { maxColumn = col }
                        if (col < minColumn) { minColumn = col }
                    }
                }
                if (element.attributes.row) {
                    let row = parseInt(element.attributes.row)
                    if (isNaN(row)) {
                        delete element.attributes.row
                        console.log("*** Invalid row reference for table element. Deleting. ***")
                    } else {
                        if (row > maxRow) { maxRow = row }
                        if (row < minRow) { minRow = row }
                    }
                }
            }
        }

        //need to account for the zero indexed columns and rows
        maxRow += 1
        maxColumn += 1
        let requiredCols = Math.max(maxColumn, columns, maxColumn - minColumn)
        if (requiredCols > columns) {
            console.log(`*** Table requires more columns, increasing from ${columns} to ${requiredCols} ***`)
            columns = requiredCols
            object.attributes.columns = `${columns}`
        }
        let requiredRows = Math.max(maxRow, rows, maxRow - minRow)
        if (requiredRows > rows) {
            console.log(`*** Table requires more rows, increasing from ${rows} to ${requiredRows} ***`)
            rows = requiredRows
            object.attributes.rows = `${rows}`
        }

        //if row or column indices are less than zero then need to adjust them
        //this should all work as cleaned these attributes earlier on by deleting invalid ones
        if (minRow < 0 || minColumn < 0) {
            for (let i = 0; i < object.elements.length; i++) {
                let element = object.elements[i]
                if (element.attributes) {
                    if (element.attributes.row) {
                        element.attributes.row = `${parseInt(element.attributes.row) - minRow}`
                    }
                    if (element.attributes.col) {
                        element.attributes.col = `${parseInt(element.attributes.col) - minColumn}`
                    }
                }
            }
        }

        /*
            2. check count of elements in list
                -> if too many elements than cells, add extra rows so that cells will be adequete in quantity
        */
        let elementCount = object.elements.length
        if (elementCount > rows * columns) {
            let requiredRows = Math.ceil(elementCount / columns)
            console.log(`*** Increasing table row count from ${rows} to ${requiredRows} to account for excess elements ***`)
            rows = requiredRows
            object.attributes.rows = `${rows}`
        }

        /*
            3. assign numbered elements to cells and set element as assigned
                -> if cell aready filled then leave second and subsequence as unassigned
        */
        let assignment = []
        for (let i = 0; i < rows; i++) { let r = []; for (j = 0; j < columns; j++) { r.push(0) }; assignment.push(r) }
        for (let i = 0; i < object.elements.length; i++) {
            let element = object.elements[i]
            if (element.attributes) {
                if (element.attributes.row && element.attributes.col) {
                    assignment[parseInt(element.attributes.row)][parseInt(element.attributes.col)] = 1
                    element.attributes.assigned = true //mark element so don't add it later on
                }
            }
        }

        /*
            4. iterate over unassigned elements and fill from the first available cell, assigning col and row to elements
                -> this might stuff up some ordering so doing it anyway
        */

        for (let i = 0; i < object.elements.length; i++) {
            let element = object.elements[i]
            if (element.attributes === undefined || element.attributes.assigned === undefined) {
                let vacantRow = 0
                let vacantColumn = 0
                while (assignment[vacantRow][vacantColumn] !== 0) {
                    vacantColumn++
                    if (vacantColumn === columns) {
                        vacantRow++
                        vacantColumn = 0
                    }
                }
                if (element.attributes == undefined) {
                    element.attributes = {}
                }
                element.attributes.row = `${vacantRow}`
                element.attributes.col = `${vacantColumn}`
                assignment[vacantRow][vacantColumn] = 1
            }
        }
    }    /////////// THIS IS THE END HANDLING TABLES ////////////

    //ball must have an X and Y
    if (type === "ball" || type === "sprite") {
        if (typeof object.attributes === undefined) {
            object.attributes = {}
        }
        if (typeof object.attributes.x === undefined) {
            object.attributes.x = 20
        }
        if (typeof object.attributes.y === undefined) {
            object.attributes.y = 20
        }
        if (isNaN(parseInt(object.attributes.x))) {
            object.attributes.x = 20
            console.log("Invalid ball position x. Setting to 20,")
        }
        if (isNaN(parseInt(object.attributes.y))) {
            object.attributes.y = 20
            console.log("Invalid ball position y. Setting to 20,")
        }
    }


    //create the elements
    if (Object.keys(ELEMENTS).indexOf(type) !== -1) {
        createElement(type, object.attributes, parent, object.elements)
    }

    //generate the assetList
    if (object.attributes) {
        for (const [key, value] of Object.entries(object.attributes)) {
            if (key !== "backgroundimage" && key !== "image") { continue; }
            assetsList.push(value)
        }
    }
    fs.writeFileSync("assets.list", JSON.stringify(assetsList))

    //traverse the children
    if (object.elements) {
        for (let i = 0; i < object.elements.length; i++) {
            if (!object.name) {
                traverse(object.elements[i])
            } else {
                traverse(object.elements[i], object.attributes.name)
            }
        }
    }

}


function createElement(element, attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.${ELEMENTS[element].runTimeName} ${attributes.name}`

    if (element === "screen") { //screen creation is a special case
        template = `\n(try-catch 
            (let 
                ((
                    attempt 
                        (delay 
                            (set-form-name "${attributes.name}")
                        )
                )) 
                (force attempt)
            ) 
            (exception java.lang.Throwable 'notfound)
        )
        \n(do-after-form-creation`
    }

    output(template)

    for (let [key, value] of Object.entries(attributes)) {
        //convert key (the attribute to lowercase)
        key = key.toLowerCase()
        //determine if the key is in the list for this element
        let legalAttributes = ELEMENTS[element].attributes
        if (legalAttributes.indexOf(key) !== -1) {

            //find correct name for the attribute for the SCHEME code
            for (let [attrkey, attrvalue] of Object.entries(ATTRIBUTES)) {
                if (attrkey.toLowerCase() === key || attrvalue.indexOf(key) !== -1) {
                    //process the attribute
                    setAttribute(key, value, attributes.name, attrkey)
                }
            }

        } else {
            console.log(`Invalid attribute for "${element}": ignoring.`)
        }


    }
    output(`\n)\n`)

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
        case "HolePointsFromString":
        case "PointsFromString": //this is array of arrays of x,y - should be a convience method to load these better
            //e.g. [[68.02222323204114,-127.02117919921876],[68.01142776369724,-126.99234008789064]]
            setText(key, value, name, descriptor)
            break;
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
            setFalse(key, value, name, descriptor)
            break;
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
            setTrue(key, value, name, descriptor)
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
            setFloat(key, value, name, descriptor)
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
            setColor(key, value, name, descriptor)
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
            setInteger(key, value, name, descriptor);
            break;
        case "Width":
        case "Height":
            setDimensions(key, value, name, descriptor);
            break;
        case "LocationSensor":
            setComponent(key, value, name, descriptor);
            break;
        case "FeaturesFromGeoJSON":
            setGeoJSONData(key, value, name, descriptor)
            break;
        case "DefaultScope":
            setScope(key, value, name, descriptor)
            break;
        case "TransportationMethod":
            fromTextList(key, value, name, ['driving', 'cycling', 'wheelchair'], "TransportationMethod")
            break;
        case "FontTypeface":
            fromList(key, value, name, ['sans serif', 'serif', 'monospace'], "FontTypeface")
            break;
        case "FontTypefaceDetail":
            fromList(key, value, name, ['sans serif', 'serif', 'monospace'], "FontTypefaceDetail")
            break;
        case "Shape":
            fromList(key, value, name, ['rounded', 'rectangular', 'oval'], "Shape")
            break;
        case "AlignVertical":
        case "AnchorVertical":
            fromList(key, value, name, ['top', 'center', 'bottom'], "AlignVertical")
            break;
        case "AlignHorizontal":
        case "AnchorHorizontal":
            fromList(key, value, name, ['left', 'right', 'center'], "AlignHorizontal")
            break;
        case "TextAlignment":
            fromList(key, value, name, ['left', 'center', 'right'], "TextAlignment")
            break;
        case "Orientation":
            fromList(key, value, name, ['vertical', 'horizontal'], "Orientation")
            break;
        case "NotifierLength":
            fromList(key, value, name, ['short', 'long'], "NotifierLength")
            break;
        case "ListViewLayout":
            fromList(key, value, name, ['text', 'text_detail', 'text_detail_horz', 'image_text', 'image_text_detail'], "ListViewLayout")
            break;
        case "MapType":
            fromList(key, value, name, ['roads', 'aerial', 'terrain'], "MapType")
            break;
        case "ScaleUnits":
            fromList(key, value, name, ['metric', 'imperial'], "ScaleUnits")
            break;
        case "Sensitivity":
            fromList(key, value, name, ['weak', 'moderate', 'strong'], "ScaleUnits")
            break;
        case "RecievingEnabled":
            fromList(key, value, name, ['off', 'foreground', 'always'], "RecievingEnabled")
            break;
        case "ListData":
            loadListViewData(key, value, name, "ListData")
            break;
        case "Name":
        case "Id":      //for CSS styling
        case "Class":   //for CSS styling
            break;
        default:
            console.log(`Error: Unknown descriptor "${descriptor}". Ignoring.`)
    }

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



    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'text)`)
}

function setFalse(key, value, name, descriptor) {
    value = value.toLowerCase().trim()
    if (value === "false" || value === "f") {
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} #f 'boolean)`)
    } else {
        console.log(`${descriptor} requires a value to "false" or "f" to change from default state.`)
    }
}

function setTrue(key, value, name, descriptor) {
    value = value.toLowerCase().trim()
    if (value === "true" || value === "t") {
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} #f 'boolean)`)
    } else {
        console.log(`${descriptor} requires a value to "true" or "t" to change from default state.`)
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
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`)
    } else {
        console.log(`${descriptor} requires a numerical value as input.`)
    }
}

function setInteger(key, value, name, descriptor) {
    value = parseInt(value)
    if (!isNaN(value)) {
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`)
    } else {
        console.log(`${descriptor} requires an integer value as input.`)
    }
}



function setComponent(key, value, name, descriptor) {
    //somehow need to validate that the component actually exists.....
    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} (get-component ${value}) 'component)`)
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

        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${index} 'number)`)
    } else {
        console.log(`${descriptor} value of "${value}" is invalid for this descriptor.`)
    }
}

function setColor(key, value, name, descriptor) {
    if (value.length !== 8) {
        console.log(`Invalid colour for ${descriptor}. Must be 8 digit hexadecimal string. Found value does not have 8 characters - "${value}" ***`)
        return
    }
    value = value.toUpperCase()
    for (let i = 0; i < value.length; i++) {
        let ch = value[i];
        if ((ch < '0' || ch > '9') &&
            (ch < 'A' || ch > 'F')) {
            console.log(`Invalid colour for ${descriptor}. Must be 8 digit hexadecimal string. A non-valid hexadecimal character was found - "${ch}" ***`)
            return;
        }
    }

    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} #x${value} 'number)`)
}

function setDimensions(key, value, name, descriptor) {
    if (value === 'parent') {
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} -2 'number)`)
        return
    }
    if (value.indexOf('%') !== -1) {  //handle percentage
        value = value.replaceAll("%", "").trim()
        value = parseInt(value)
        if (isNaN(value)) {
            console.log(`${descriptor} value set is invalid.`)
            return;
        }
        if (value > 100) { value = 100 }
        if (value < 0) { value = 0 }
        value += 1000
        value = -value
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`)
    } else { //pixels
        value = parseInt(value)
        if (isNaN(value)) {
            console.log(`${descriptor} value set is invalid.`)
            return;
        }
        if (value < 0) { value = 0 }
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`)
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

    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} "${outputText}" 'text)`)
}

function fromTextList(key, value, name, options, descriptor) {
    value = value.toLowerCase()
    if (value === "driving") { value = "driving-car" }
    else if (value === "cycling-regular") { value = "cycling" }
    else if (value === "wheelchair") { }
    else { return }
    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'text)`)
}

function setScope(key, value, name, options, descriptor) {
    value = value.toLowerCase()
    let options = ["asset", "cache", "legacy", "private", "shared"]
    if (options.indexOf(value) === -1) {
        console.log("Invalid deafult scope for data file. Ignoring.")
        return
    }
    value = value[0].toUpperCase() + value.substring(1)
    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'com.google.appinventor.components.common.FileScopeEnum)`)
}

function setGeoJSONData(key, value, name, descriptor) {
    //TODO - load the data from the GeoJSON file, somehow apply 

}