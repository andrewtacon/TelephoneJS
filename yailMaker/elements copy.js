//these are all the elements that can be added to the user interface
//the runTimeName is the case sensitice version for the YAIL code
//attributes are the allowable attributes for code
//extra attributes are other usable attributes in design (and my special ones) that are used in design but not in code


const ELEMENTS = {
    "screen": {
        "runTimeName": "Screen",
        "attributes": ["aboutscreen", "alignhorizontal", "halign", "alignvertical", "valign", "backgroundcolor",
            "backgroundimage", "bigdefaulttext", "closescreenanimation", "highcontrast", "openscreenanimation",
            "screenorienation", "scrollable", "titlevisible", "showstatusbar", "statusbar", "title", "class", "id",
            "accentcolor", "accent", "appname", "defaultfilescope", "icon", "primarycolor", "primarycolordark",
            "showlistsasjson", "sizing", "theme", "versioncode", "versionname", "name", "script", "style"],
        "designerAttributes": []
    },

    //start UI elements
    "button": {
        "runTimeName": "Button",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface",
            "height", "width", "image", "shape", "showfeedback", "textalign", "visible", "textcolor", "col", "row", "name"],
        "designerAttributes": []
    },
    "checkbox": {
        "runTimeName": "CheckBox",
        "attributes": ["class", "id", "text", "backgroundcolor", "checked", "enabled", "bold", "italic", "fontsize", "typeface",
            "height", "width", "visible", "textcolor", "textalign", "col", "row", "name"],
        "designerAttributes": []

    },
    "datepicker": {
        "runTimeName": "DatePicker",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height",
            "width", "image", "shape", "showfeedback", "visible", "textcolor", "col", "row", "name"],
        "designerAttributes": []

    },
    "image": {
        "runTimeName": "Image",
        "attributes": ["class", "id", "alt", "clickable", "height", "width", "picture", "rotationangle", "scalepicturetofit",
            "visible", "col", "row", "name"],
        "designerAttributes": []

    },
    "label": {
        "runTimeName": "Label",
        "attributes": ["class", "id", "text", "backgroundcolor", "bold", "italic", "fontsize", "typeface", "html", "margins",
            "height", "width", "textalign", "visible", "textcolor", "col", "row", "name"],
        "designerAttributes": []

    },
    "listpicker": {
        "runTimeName": "ListPicker",
        "attributes": ["class", "id", "backgroundcolor", "elements", "enabled", "bold", "italic", "fontsize", "typeface", "image",
            "height", "width", "itembg", "itembackground", "itemtextcolor", "itemcolor", "selection", "shape", "showfeedback",
            "showfilter", "textalign", "visible", "textcolor", "col", "row", "name"],
        "designerAttributes": []

    },
    "listview": {
        "runTimeName": "ListView",
        "attributes": ["class", "id", "backgroundcolor", "elememts", "fontsizedetail", "typeface", "typefacedetail", "height",
            "width", "imageheight", "imagewidth", "data", "layout", "orientation", "selection", "selectioncolor", "showfilter",
            "textcolor", "textcolordetail", "textsize", "visible", "col", "row", "name"],
        "designerAttributes": []

    },
    "notifier": {
        "runTimeName": "Notifier",
        "attributes": ["class", "id", "backgroundcolor", "textcolor", "length", "name"],
        "designerAttributes": []

    },
    "password": {
        "runTimeName": "PasswordTextBox",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height",
            "width", "hint", "numbers", "textalign", "visible", "textcolor", "col", "row", "name"],
        "designerAttributes": []

    },
    "slider": {
        "runTimeName": "Slider",
        "attributes": ["class", "id", "leftcolor", "rightcolor", "width", "max", "min", "thumbenabled", "thumbposition", "col",
            "row", "name"],
        "designerAttributes": []

    },
    "spinner": {
        "runTimeName": "Spinner",
        "attributes": ["class", "id", "elements", "width", "prompt", "selection", "visible", "col", "row", "name"],
        "designerAttributes": []

    },
    "switch": {
        "runTimeName": "Switch",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height",
            "width", "on", "textcolor", "thumbcoloractive", "thumbcolorinactive", 'trackcoloractive', 'trackcolorinactive', "visible",
            "col", "row", "name"],
        "designerAttributes": []

    },
    "textbox": {
        "runTimeName": "TextBox",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height",
            "width", "multiline", "numbers", "readonly", "textalign", "visible", "textcolor", "col", "row", "name"],
        "designerAttributes": []

    },
    'timepicker': {
        "runTimeName": "TimePicker",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height",
            "width", "image", "shape", "showfeedback", "visible", "textalign", "textcolor", "col", "row", "name"],
        "designerAttributes": []

    },
    'webview': {
        "runTimeName": "WebViewer",
        "attributes": ["class", "id", "followlinks", "height", "width", "url", "ignoressl", "promptpermission", "uselocation",
            "visible", "col", "row", "name"],
        "designerAttributes": []

    },
    //start layout elements
    "hbox": {
        "runTimeName": "HorizontalArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible",
            "col", "row", "name"],
        "designerAttributes": []

    },
    "vbox": {
        "runTimeName": "VerticalArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible",
            "col", "row", "name"],
        "designerAttributes": []

    },
    "hscrollbox": {
        "runTimeName": "HorizontalScrollArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible",
            "col", "row", "name"],
        "designerAttributes": []

    },
    "vscrollbox": {
        "runTimeName": "VerticalScrollArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible",
            "col", "row", "name"],
        "designerAttributes": []

    },
    "table": {
        "runTimeName": "TableArrangement",
        "attributes": ["class", "id", "width", "height", "visible", "columns", "rows", "col", "row", "name"],
        "designerAttributes": []

    },
    //start media elements
    "camcorder": {
        "runTimeName": "Camcorder",
        "attributes": ["class", "id", "name"],
        "designerAttributes": []

    },
    "camera": {
        "runTimeName": "Camera",
        "attributes": ["class", "id", "name"],
        "designerAttributes": []

    },
    "imagepicker": {
        "runTimeName": "ImagePicker",
        "attributes": ["class", "id", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width",
            "image", "shape", "showfeedback", "text", "textalign", "textcolor", "visible", "name"],
        "designerAttributes": []

    },
    "videoplayer": {
        "runTimeName": "VideoPlayer",
        "attributes": ["class", "id", "height", "width", "source", "visible", "volume", "name"],
        "designerAttributes": []

    },
    "player": {
        "runTimeName": "Player",
        "attributes": ["class", "id", "loop", "playonlyinforeground", "source", "volume", "name"],
        "designerAttributes": []

    },
    "sound": {
        "runTimeName": "Sound",
        "attributes": ["class", "id", "minimuminterval", "source", "name"],
        "designerAttributes": []

    },
    "soundrecorded": {
        "runTimeName": "SoundRecorded",
        "attributes": ["class", "id", "savedrecording", "name"],
        "designerAttributes": []

    },
    "speechrecognizer": {
        "runTimeName": "SpeechRecognizer",
        "attributes": ["class", "id", "uselegacy", "name"],
        "designerAttributes": []

    },
    "texttospeech": {
        "runTimeName": "TextToSpeech",
        "attributes": ["class", "id", "country", "language", "lang", "pitch", "speechrate", "name"],
        "designerAttributes": []

    },
    "translator": {
        "runTimeName": "Translator",
        "attributes": ["class", "id", "apikey", "name"],
        "designerAttributes": []

    },
    //start drawing and animation elements
    "canvas": {
        "runTimeName": "Canvas",
        "attributes": ["class", "id", "backgroundcolor", "backgroundimage", "extendmovesoutsidecanvas", "extend", "fontsize",
            "height", "width", "linewidth", "paintcolor", "paint", 'tapthreshold', 'textalign', 'visible', "name"],
        "designerAttributes": []

    },
    "ball": {
        "runTimeName": "Ball",
        "attributes": ["class", "id", "enabled", "heading", "interval", "originatcenter", "paint", "paintcolor", "radius", "speed",
            "visible", "x", "y", "z", "name"],
        "designerAttributes": []

    },
    "sprite": {
        "runTimeName": "ImageSprite",
        "attributes": ["class", "id", "enabled", "heading", "height", "width", "interval", "picture", "rotates", "speed", "visible",
            "x", "y", "z", "name"],
        "designerAttributes": []

    },
    //start Maps
    //43 things to go
    "map": {
        "runTimeName": "Map",
        "attributes": ["class", "id", "center", "centerfromstring", "enablepan", "enablerotation", "enablezoom", "height", "width",
            "locationsensor", "maptype", "rotation", "scaleunits", "showcompass", "showscale", "showuser", "showzoom", "visible",
            "zoomlevel", "name"],
        "designerAttributes": []

    },
    "circle": {
        "runTimeName": "",
        "attributes": ["class", "id", "description", "draggable", "enableinfobox", "fillcolor", "fillopacity", "latitude", "lat",
            "longitude", "lon", "radius", "strokecolor", "strokewidth", "title", "visible", "name"],
        "designerAttributes": []

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
        "attributes": ["class", "id", "description", "draggable", "enableinfobox", "pointsfromstring", "points", "strokecolor",
            "strokeopacity", "strokewidth", "title", "visible", "name"],
        "designerAttributes": []

    },
    "marker": {
        "runTimeName": "Marker",
        "attributes": ["class", "id", "anchorhorizontal", "anchorvertical", "description", "draggable", "enableinfobox", "fillcolor",
            "fillopacity", "height", "width", "imageasset", "latitude", "lat", "longitude", "lon", "strokecolor",
            "strokeopacity", "strokewidth", "title", "visible", "name"],
        "designerAttributes": []

    },
    "navigation": {
        "runTimeName": "Navigation",
        "attributes": ["class", "id", "apikey", "endlatitude", "endlat", "endlongitude", "endlon", "language", "startlatitude",
            "startlat", "startlongitude", "startlon", "transportationmethod", "method", "name"],
        "designerAttributes": []

    },
    "polygon": {
        "runTimeName": "Polygon",
        "attributes": ["class", "id", "description", "draggable", "enableinfobox", "fillcolor", "fillopacity", "holepointsfromstring",
            "pointsfromstring", "strokecolor", "strokeopacity", "strokewidth", "title", "visible", "name"],
        "designerAttributes": []

    },
    "rectangle": {
        "runTimeName": "Rectangle",
        "attributes": ["class", "id", "description", "draggable", "eastlongitude", "east", "enableinfobox", "fillcolor", "fillopacity",
            "northlatitude", "north", "southlatitude", "south", "strokecolor", "strokeopacity", "strokewidth", "title", "visible",
            "westlongitude", "west", "name"],
        "designerAttributes": []

    },
    //ignoring charts - not sure how they work
    //start sensors
    "acceleronmeter": {
        "runTimeName": "AccelerometerSensor",
        "attributes": ["class", "id", "enabled", "legacymode", "minimuminterval", "sensitivity", "name"],
        "designerAttributes": []

    },
    "barcodescanner": {
        "runTimeName": "BarcodeScanner",
        "attributes": ["class", "id", "useexternalscanner", "externalscanner", "external", "name"],
        "designerAttributes": []

    },
    "barometer": {
        "runTimeName": "Barometer",
        "attributes": ["class", "id", "enabled", "refreshtime", "name"],
        "designerAttributes": []

    },
    "clock": {
        "runTimeName": "Clock",
        "attributes": ["class", "id", "timeralwaysfires", "alwaysfires", "timerenabled", "timerinterval", "name"],
        "designerAttributes": []

    },
    "gyroscope": {
        "runTimeName": "GyroscopeSensor",
        "attributes": ["class", "id", "enabled", "name"],
        "designerAttributes": []

    },
    "hygrometer": {
        "runTimeName": "Hygrometer",
        "attributes": ["class", "id", "enabled", "refreshtime", "name"],
        "designerAttributes": []

    },
    "lightsensor": {
        "runTimeName": "LightSensor",
        "attributes": ["class", "id", "enabled", "refreshtime", "name"],
        "designerAttributes": []

    },
    "locationsensor": {
        "runTimeName": "LocationSensor",
        "attributes": ["class", "id", "distanceinterval", "enabled", "timeinterval", "name"],
        "designerAttributes": []

    },
    "magneticfieldsensor": {
        "runTimeName": "MagneticFieldSensor",
        "attributes": ["class", "id", "enabled", "name"],
        "designerAttributes": []

    },
    "nearfield": {
        "runTimeName": "NearField",
        "attributes": ["class", "id", "readmode", "name"],
        "designerAttributes": []

    },
    "orientationsensor": {
        "runTimeName": "OrientationSensor",
        "attributes": ["class", "id", "enabled", "name"],
        "designerAttributes": []

    },
    "pedometer": {
        "runTimeName": "Pedometer",
        "attributes": ["class", "id", "stopdetectiontimeout", "stridelength", "name"],
        "designerAttributes": []

    },
    "proximitysensor": {
        "runTimeName": "ProximitySensor",
        "attributes": ["class", "id", "enabled", "keeprunningwhenonpause", "name"],
        "designerAttributes": []

    },
    "thermometer": {
        "runTimeName": "Thermometer",
        "attributes": ["class", "id", "enabled", "refreshtime", "name"],
        "designerAttributes": []

    },
    //social and communication tools
    "contactpicker": {
        "runTimeName": "ContactPicker",
        "attributes": ["class", "id", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "shape",
            "showfeedback", "text", "textalign", "textcolor", "visible", "name"],
        "designerAttributes": []

    },
    "emailpicker": {
        "runTimeName": "EmailPicker",
        "attributes": ["class", "id", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "shape",
            "showfeedback", "hint", "text", "textalign", "textcolor", "visible", "name"],
        "designerAttributes": []

    },
    "phonecall": {
        "runTimeName": "PhoneCall",
        "attributes": ["class", "id", "phonenumber", "name"],
        "designerAttributes": []

    },
    "phonenumberpicker": {
        "runTimeName": "PhoneNumberPicker",
        "attributes": ["class", "id", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width",
            "image", "shape", "showfeedback", "text", "textalign", "textcolor", "visible", "name"],
        "designerAttributes": []

    },
    "sharing": {
        "runTimeName": "Sharing",
        "attributes": ["class", "id", "name"],
        "designerAttributes": []

    },
    "texting": {
        "runTimeName": "Texting",
        "attributes": ["class", "id", "googlevoiceenabled", "message", "phonenumber", "recievingenabled", "name"],
        "designerAttributes": []

    },
    "twitter": {
        "runTimeName": "Twitter",
        "attributes": ["class", "id", "consumerkey", "consumersecret", "name"],
        "designerAttributes": []

    },
    //storage elements
    "clouddb": {
        "runTimeName": "CloudDB",
        "attributes": ["class", "id", "projectid", "redisport", "redisserver", "token", "usessl", "name"],
        "designerAttributes": []

    },
    "datafile": {
        "runTimeName": "DataFile",
        "attributes": ["class", "id", "defaultscope", "scope", "sourcefile", "name"],
        "designerAttributes": []

    },
    "file": {
        "runTimeName": "File",
        "attributes": ["class", "id", "defaultscope", "scope", "readpermission", "writepermission", "name"],
        "designerAttributes": []

    },
    "spreadsheet": {
        "runTimeName": "Spreadsheet",
        "attributes": ["class", "id", "applicationame", "credentialsjson", "credentials", "spreadsheetid", "name"],
        "designerAttributes": []

    },
    "tinydb": {
        "runTimeName": "TinyDB",
        "attributes": ["class", "id", "namespace", "name"],
        "designerAttributes": []

    },
    "tinywebdb": {
        "runTimeName": "TinyWebDB",
        "attributes": ["class", "id", "serviceurl", "name"],
        "designerAttributes": []

    },
    //connectivity elements
    "activitystarter": {
        "runTimeName": "ActivityStarter",
        "attributes": ["class", "id", "action", "activityclass", "activitypackage", "datatype", "datauri", "extrakey",
            "extravalue", "resultname", "name"],
        "designerAttributes": []

    },
    "bluetoothclient": {
        "runTimeName": "BluetoothClient",
        "attributes": ["class", "id", "characterencoding", "encoding", "delimiterbyte", "delimiter", "disconnectonerror",
            "highbytefirst", "pollingrate", "secure", "name"],
        "designerAttributes": []

    },
    "bluetoothserver": {
        "runTimeName": "BluetoothServer",
        "attributes": ["class", "id", "characterencoding", "encoding", "delimiterbyte", "delimiter", "highbytefirst",
            "secure", "name"],
        "designerAttributes": []

    },
    "serial": {
        "runTimeName": "Serial",
        "attributes": ["class", "id", "baudrate", "baud", "buffersize", "buffer", "name"],
        "designerAttributes": []

    },
    "web": {
        "runTimeName": "Web",
        "attributes": ["class", "id", "allowcookies", "cookies", "responsefilename", "saveresponse", "timeout", "url", "name"],
        "designerAttributes": []

    }

}


exports.ELEMENTS = ELEMENTS