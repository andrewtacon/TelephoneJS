const ELEMENTS = {
    "screen": {
        "runTimeName": "Screen",
        "events": {
            "backPressed": ``,
            "errorOccured": ``,
            "initialize": ``,
            "otherScreenClosed": ``,
            "permissionDenied": ``,
            "permissionGranted": ``,
            "screenOrientationChanged": ``
        },
        "methods": {
            "askForPermission": ``,
            "hideKeyboard": ``,
            "addEventListener": ``
        },
        "properties": {
            "aboutScreen": `Information about the screen. It appears when “About this Application” is selected from the system menu. Use it to tell users about your app. In multiple screen apps, each screen has its own AboutScreen info.`,
            "accentColor": ``,
            "alignHorizontal": ``,
            "alignVertical": ``,
            "appName": ``,
            "backgroundColor": ``,
            "backgroundImage": ``,
            "bigDefaultText": ``,
            "blocksToolkit": ``,
            "class": ``,
            "closeScreenAnimation": ``,
            "defaultFileScope": ``,
            "height": ``,
            "highContrast": ``,
            "icon": ``,
            "name": ``,
            "openScreenAnimation": ``,
            "platform": ``,
            "platformVersion": ``,
            "primaryColor": ``,
            "primaryColorDark": ``,
            "screenOrientation": ``,
            "script": ``,
            "scrollable": ``,
            "showListsAsJson": ``,
            "showStatusBar": ``,
            "sizing": ``,
            "style": ``,
            "theme": ``,
            "title": ``,
            "titleVisible": ``,
            "tutorialURL": ``,
            "versionCode": ``,
            "versionName": ``,
            "width": ``
        },
        "designerNoWrite": [
            "platform",
            "platformVersion",
            "height",
            "width"
        ],
        "codeNoRead": [
            "tutorialURL",
            "versionName",
            "versionCode",
            "tutorialUrl",
            "style",
            "sizing",
            "script",
            "appName",
            "class",
            "alignHorizontal",
            "alignVertical",
            "icon",
            "name"
        ],
        "codeNoWrite": [
            "style",
            "script",
            "height",
            "class",
            "name",
            "platform",
            "platformVersion",
            "width"
        ]
    },
    "button": {
        "runTimeName": "Button",
        "events": {
            "click": ``,
            "gotFocus": ``,
            "longClick": ``,
            "lostFocus": ``,
            "touchDown": ``,
            "touchUp": ``
        },
        "methods": {
            "addEventListener": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "image": ``,
            "name": ``,
            "row": ``,
            "shape": ``,
            "showFeedback": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "widthPercent",
            "heightPercent",
            "class",
            "id"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "checkbox": {
        "runTimeName": "CheckBox",
        "events": {
            "changed": ``,
            "gotFocus": ``,
            "lostFocus": ``
        },
        "methods": {
            "addEventListener": ``
        },
        "properties": {
            "backgroundColor": ``,
            "checked": ``,
            "class": ``,
            "column": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "name": ``,
            "row": ``,
            "text": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "widthPercent",
            "heightPercent",
            "class",
            "id"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "datepicker": {
        "runTimeName": "DatePicker",
        "events": {
            "afterDateSet": ``,
            "gotFocus": ``,
            "lostFocus": ``,
            "touchDown": ``,
            "touchUp": ``
        },
        "methods": {
            "addEventListener": ``,
            "launchPicker": ``,
            "setDateToDisplay": ``,
            "setDateToDisplayFromInstant": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "day": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "image": ``,
            "instant": ``,
            "month": ``,
            "monthInText": ``,
            "name": ``,
            "row": ``,
            "shape": ``,
            "showFeedback": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``,
            "year": ``
        },
        "designerNoWrite": [
            "day",
            "month",
            "monthInText",
            "year",
            "instant"
        ],
        "codeNoRead": [
            "class",
            "heightPercent",
            "id",
            "widthPercent"
        ],
        "codeNoWrite": [
            "class",
            "day",
            "id",
            "month",
            "monthInText",
            "year",
            "instant"
        ]
    },
    "image": {
        "runTimeName": "Image",
        "events": {
            "click": ``
        },
        "methods": {
            "addEventListener": ``
        },
        "properties": {
            "alternateText": ``,
            "animation": ``,
            "class": ``,
            "clickable": ``,
            "column": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "name": ``,
            "picture": ``,
            "rotationAngle": ``,
            "row": ``,
            "scalePictureToFit": ``,
            "scaling": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "alternateText",
            "animation",
            "class",
            "heightPercent",
            "id",
            "scalePictureToFit",
            "widthPercent"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "label": {
        "runTimeName": "Label",
        "events": {},
        "methods": {},
        "properties": {
            "HTMLContent": ``,
            "HTMLFormat": ``,
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "hasMargins": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "name": ``,
            "row": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [
            "HTMLContent"
        ],
        "codeNoRead": [
            "class",
            "heightPercent",
            "id",
            "widthPercent"
        ],
        "codeNoWrite": [
            "HTMLContent",
            "class",
            "id"
        ]
    },
    "listpicker": {
        "runTimeName": "ListPicker",
        "events": {
            "afterPicking": ``,
            "beforePicking": ``,
            "gotFocus": ``,
            "lostFocus": ``,
            "touchDown": ``,
            "touchUp": ``
        },
        "methods": {
            "addEventListener": ``,
            "open": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "elements": ``,
            "elementsFromString": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "image": ``,
            "itemBackgroundColor": ``,
            "itemTextColor": ``,
            "name": ``,
            "row": ``,
            "selection": ``,
            "selectionIndex": ``,
            "shape": ``,
            "showFeedback": ``,
            "showFilterBar": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "title": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [
            "elements"
        ],
        "codeNoRead": [
            "class",
            "elementsFromString",
            "heightPercent",
            "id",
            "widthPercent"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "listview": {
        "runTimeName": "ListView",
        "events": {
            "afterPicking": ``
        },
        "methods": {
            "addEventListener": ``,
            "createElement": ``,
            "getDetailText": ``,
            "getImageName": ``,
            "getMainText": ``,
            "refresh": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "elements": ``,
            "elementsFromString": ``,
            "fontSizeDetail": ``,
            "fontTypeface": ``,
            "fontTypefaceDetail": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "imageHeight": ``,
            "imageWidth": ``,
            "listData": ``,
            "listViewLayout": ``,
            "name": ``,
            "orientation": ``,
            "row": ``,
            "selection": ``,
            "selectionColor": ``,
            "selectionDetailText": ``,
            "selectionIndex": ``,
            "showFilterBar": ``,
            "textColor": ``,
            "textColorDetail": ``,
            "textSize": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [
            "selection",
            "selectionDetailText",
            "elements"
        ],
        "codeNoRead": [
            "class",
            "heightPercent",
            "id",
            "listData",
            "widthPercent"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "listData",
            "selection",
            "selectionDetailList"
        ]
    },
    "notifier": {
        "runTimeName": "Notifier",
        "events": {
            "afterChoosing": ``,
            "afterTextInput": ``,
            "choosingCanceled": ``,
            "textInputCanceled": ``
        },
        "methods": {
            "addEventListener": ``,
            "dismissProgressDialog": ``,
            "logError": ``,
            "logInfo": ``,
            "logWarning": ``,
            "showAlert": ``,
            "showChooseDialog": ``,
            "showMessageDialog": ``,
            "showPasswordDialog": ``,
            "showProgressDialog": ``,
            "showTextDialog": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "id": ``,
            "name": ``,
            "notifierLength": ``,
            "textColor": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name",
            "backgroundColor"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ]
    },
    "password": {
        "runTimeName": "PasswordTextBox",
        "events": {
            "gotFocus": ``,
            "lostFocus": ``
        },
        "methods": {
            "addEventListener": ``,
            "requestFocus": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "heightPercent": ``,
            "hint": ``,
            "id": ``,
            "name": ``,
            "numbersOnly": ``,
            "passwordVisible": ``,
            "row": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "slider": {
        "runTimeName": "Slider",
        "events": {
            "positionChanged": ``
        },
        "methods": {
            "addEventListener": ``
        },
        "properties": {
            "class": ``,
            "colorLeft": ``,
            "colorRight": ``,
            "heightPercent": ``,
            "column": ``,
            "id": ``,
            "maxValue": ``,
            "minValue": ``,
            "name": ``,
            "row": ``,
            "thumbEnabled": ``,
            "thumbPosition": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "spinner": {
        "runTimeName": "Spinner",
        "events": {
            "afterSelecting": ``
        },
        "methods": {
            "addEventListener": ``,
            "displayDropdown": ``
        },
        "properties": {
            "class": ``,
            "column": ``,
            "elements": ``,
            "elementsFromString": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "name": ``,
            "prompt": ``,
            "row": ``,
            "selection": ``,
            "selectionIndex": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [
            "elements"
        ],
        "codeNoRead": [
            "class",
            "id",
            "heightPercent",
            "widthPercent",
            "elementsFromString"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "elements"
        ]
    },
    "switch": {
        "runTimeName": "Switch",
        "events": {
            "changed": ``,
            "gotFocus": ``,
            "lostFocus": ``
        },
        "methods": {
            "addEventListener": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "name": ``,
            "on": ``,
            "row": ``,
            "text": ``,
            "textColor": ``,
            "thumbColorActive": ``,
            "thumbColorInactive": ``,
            "trackColorActive": ``,
            "trackColorInactive": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "textbox": {
        "runTimeName": "TextBox",
        "events": {
            "gotFocus": ``,
            "lostFocus": ``
        },
        "methods": {
            "addEventListener": ``,
            "hideKeyboard": ``,
            "requestFocus": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "heightPercent": ``,
            "hint": ``,
            "id": ``,
            "multiLine": ``,
            "name": ``,
            "numbersOnly": ``,
            "readOnly": ``,
            "row": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "timepicker": {
        "runTimeName": "TimePicker",
        "events": {
            "afterTimeSet": ``,
            "gotFocus": ``,
            "lostFocus": ``,
            "touchDown": ``,
            "touchUp": ``
        },
        "methods": {
            "addEventListener": ``,
            "launchPicker": ``,
            "setTimeToDisplay": ``,
            "setTimeToDisplayFromInstant": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "heightPercent": ``,
            "hour": ``,
            "id": ``,
            "image": ``,
            "instantInTime": ``,
            "minute": ``,
            "name": ``,
            "row": ``,
            "shape": ``,
            "showFeedback": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [
            "hour",
            "minute",
            "instantInTime"
        ],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent",
            "instantInTime"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "hour",
            "minute",
            "instantInTime"
        ]
    },
    "webview": {
        "runTimeName": "WebViewer",
        "events": {
            "beforePageLoad": ``,
            "errorOccured": ``,
            "pageLoaded": ``,
            "webViewStringChange": ``
        },
        "methods": {
            "addEventListener": ``,
            "canGoBack": ``,
            "canGoForward": ``,
            "clearCaches": ``,
            "clearCookies": ``,
            "clearLocations": ``,
            "goBack": ``,
            "goForward": ``,
            "goHome": ``,
            "goToUrl": ``,
            "reload": ``,
            "runJavaScript": ``,
            "stopLoading": ``
        },
        "properties": {
            "class": ``,
            "column": ``,
            "currentPageTitle": ``,
            "currentUrl": ``,
            "followLinks": ``,
            "height": ``,
            "heightPercent": ``,
            "homeUrl": ``,
            "id": ``,
            "ignoreSslErrors": ``,
            "name": ``,
            "row": ``,
            "usesLocation": ``,
            "visible": ``,
            "webViewString": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [
            "currentPageTitle",
            "currentUrl",
            "webViewString"
        ],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent",
            "usesLocation"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "currentPageTitle",
            "currentUrl",
            "usesLocation"
        ]
    },
    "hbox": {
        "runTimeName": "HorizontalArrangement",
        "events": {},
        "methods": {},
        "properties": {
            "alignHorizontal": ``,
            "alignVertical": ``,
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "image": ``,
            "name": ``,
            "row": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent",
            "alignHorizontal",
            "alignVertical"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "vbox": {
        "runTimeName": "VerticalArrangement",
        "events": {},
        "methods": {},
        "properties": {
            "alignHorizontal": ``,
            "alignVertical": ``,
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "image": ``,
            "name": ``,
            "row": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent",
            "alignHorizontal",
            "alignVertical"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "hscrollbox": {
        "runTimeName": "HorizontalScrollArrangement",
        "events": {},
        "methods": {},
        "properties": {
            "alignHorizontal": ``,
            "alignVertical": ``,
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "image": ``,
            "name": ``,
            "row": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent",
            "alignHorizontal",
            "alignVertical"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "vscrollbox": {
        "runTimeName": "VerticalScrollArrangement",
        "events": {},
        "methods": {},
        "properties": {
            "alignHorizontal": ``,
            "alignVertical": ``,
            "backgroundColor": ``,
            "class": ``,
            "column": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "image": ``,
            "name": ``,
            "row": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent",
            "alignHorizontal",
            "alignVertical"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "table": {
        "runTimeName": "TableArrangement",
        "events": {},
        "methods": {},
        "properties": {
            "class": ``,
            "column": ``,
            "columns": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "name": ``,
            "row": ``,
            "rows": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "widthPercent",
            "heightPercent"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "camcorder": {
        "runTimeName": "Camcorder",
        "events": {
            "afterRecording": ``
        },
        "methods": {
            "addEventListener": ``,
            "recordVideo": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "camera": {
        "runTimeName": "Camera",
        "events": {
            "afterPicture": ``
        },
        "methods": {
            "addEventListener": ``,
            "takePicture": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "imagepicker": {
        "runTimeName": "ImagePicker",
        "events": {
            "afterPicking": ``,
            "beforePicking": ``,
            "gotFocus": ``,
            "lostFocus": ``,
            "touchDown": ``,
            "touchUp": ``
        },
        "methods": {
            "addEventListener": ``,
            "open": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "heightPercent": ``,
            "id": ``,
            "image": ``,
            "name": ``,
            "selection": ``,
            "shape": ``,
            "showFeedback": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``,
            "widthPercent": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "heightPercent",
            "widthPercent"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "player": {
        "runTimeName": "Player",
        "events": {
            "completed": ``,
            "otherPlayerStarted": ``
        },
        "methods": {
            "addEventListener": ``,
            "pause": ``,
            "start": ``,
            "stop": ``,
            "vibrate": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "isPlaying": ``,
            "loop": ``,
            "name": ``,
            "playOnlyInForeground": ``,
            "source": ``,
            "volume": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "sound": {
        "runTimeName": "Sound",
        "events": {},
        "methods": {
            "pause": ``,
            "play": ``,
            "resume": ``,
            "stop": ``,
            "vibrate": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "minimumInterval": ``,
            "name": ``,
            "source": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "soundrecorder": {
        "runTimeName": "SoundRecorder",
        "events": {
            "afterSoundRecorded": ``,
            "startedRecording": ``,
            "stoppedRecording": ``
        },
        "methods": {
            "addEventListener": ``,
            "start": ``,
            "stop": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``,
            "savedRecording": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "speechrecognizer": {
        "runTimeName": "SpeechRecognizer",
        "events": {
            "afterGettingText": ``,
            "beforeGettingText": ``
        },
        "methods": {
            "addEventListener": ``,
            "getText": ``,
            "stop": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "language": ``,
            "name": ``,
            "result": ``,
            "useLegacy": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id"
        ],
        "codeNoWrite": [
            "class",
            "id"
        ]
    },
    "texttospeech": {
        "runTimeName": "TextToSpeech",
        "events": {
            "afterSpeaking": ``,
            "beforeSpeaking": ``
        },
        "methods": {
            "speak": ``
        },
        "properties": {
            "availableCountries": ``,
            "availableLanguages": ``,
            "class": ``,
            "country": ``,
            "id": ``,
            "language": ``,
            "name": ``,
            "pitch": ``,
            "result": ``,
            "speechRate": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "translator": {
        "runTimeName": "Translator",
        "events": {
            "gotTranslation": ``
        },
        "methods": {
            "requestTranslation": ``
        },
        "properties": {
            "apiKey": ``,
            "class": ``,
            "id": ``,
            "name": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "videoplayer": {
        "runTimeName": "VideoPlayer",
        "events": {
            "completed": ``
        },
        "methods": {
            "getDuration": ``,
            "pause": ``,
            "seekTo": ``,
            "start": ``,
            "stop": ``
        },
        "properties": {
            "class": ``,
            "fullScreen": ``,
            "height": ``,
            "id": ``,
            "name": ``,
            "source": ``,
            "visible": ``,
            "volume": ``,
            "width": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "canvas": {
        "runTimeName": "Canvas",
        "events": {
            "dragged": ``,
            "flung": ``,
            "touchDown": ``,
            "touchUp": ``,
            "touched": ``
        },
        "methods": {
            "clear": ``,
            "drawArc": ``,
            "drawCircle": ``,
            "drawLine": ``,
            "drawPoint": ``,
            "drawShape": ``,
            "drawText": ``,
            "drawTextAtAngle": ``,
            "getBackgroundPixelColor": ``,
            "getPixelColor": ``,
            "save": ``,
            "saveAs": ``,
            "setBackgroundPixelColor": ``
        },
        "properties": {
            "backgroundColor": ``,
            "backgroundImage": ``,
            "backgroundImageinBase64": ``,
            "class": ``,
            "extendMovesOutsideCanvas": ``,
            "fontSize": ``,
            "height": ``,
            "id": ``,
            "lineWidth": ``,
            "name": ``,
            "paintColor": ``,
            "tapThreshold": ``,
            "textAlignment": ``,
            "visible": ``,
            "width": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "ball": {
        "runTimeName": "Ball",
        "events": {
            "collidedWith": ``,
            "dragged": ``,
            "edgeReached": ``,
            "flung": ``,
            "noLongerCollidingWith": ``,
            "touchDown": ``,
            "touchUp": ``,
            "touched": ``
        },
        "methods": {
            "bounce": ``,
            "moveIntoBounds": ``,
            "moveTo": ``,
            "moveToPoint": ``,
            "pointInDirection": ``,
            "pointTowards": ``
        },
        "properties": {
            "class": ``,
            "enabled": ``,
            "heading": ``,
            "id": ``,
            "interval": ``,
            "name": ``,
            "originAtCenter": ``,
            "paintColor": ``,
            "radius": ``,
            "speed": ``,
            "visible": ``,
            "x": ``,
            "y": ``,
            "z": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "imagesprite": {
        "runTimeName": "ImageSprite",
        "events": {
            "collidedWith": ``,
            "dragged": ``,
            "edgeReached": ``,
            "Flung": ``,
            "noLongerCollidingWith": ``,
            "touchDown": ``,
            "touchUp": ``,
            "touched": ``
        },
        "methods": {
            "bounce": ``,
            "moveIntoBounds": ``,
            "moveTo": ``,
            "moveToPoint": ``,
            "pointInDirection": ``,
            "pointTowards": ``
        },
        "properties": {
            "class": ``,
            "enabled": ``,
            "heading": ``,
            "height": ``,
            "id": ``,
            "interval": ``,
            "name": ``,
            "picture": ``,
            "rotates": ``,
            "speed": ``,
            "visible": ``,
            "width": ``,
            "x": ``,
            "y": ``,
            "z": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "map": {
        "runTimeName": "Map",
        "events": {
            "boundsChange": ``,
            "doubleTapAtPoint": ``,
            "featureClick": ``,
            "featureDrag": ``,
            "featureLongClick": ``,
            "featureStartDrag": ``,
            "featureStopDrag": ``,
            "gotFeatures": ``,
            "invalidPoint": ``,
            "loadError": ``,
            "longPressAtPoint": ``,
            "ready": ``,
            "tapAtPoint": ``,
            "zoomChange": ``
        },
        "methods": {
            "createMarker": ``,
            "featureFromDescription": ``,
            "loadFromURL": ``,
            "panTo": ``,
            "save": ``
        },
        "properties": {
            "boundingBox": ``,
            "center": ``,
            "centerFromString": ``,
            "class": ``,
            "enablePan": ``,
            "enableRotation": ``,
            "enableZoom": ``,
            "features": ``,
            "height": ``,
            "id": ``,
            "latitude": ``,
            "locationSensor": ``,
            "longitude": ``,
            "mapType": ``,
            "name": ``,
            "rotation": ``,
            "scaleUnits": ``,
            "showCompass": ``,
            "showScale": ``,
            "showUser": ``,
            "showZoom": ``,
            "userLatitude": ``,
            "userLongitude": ``,
            "visible": ``,
            "width": ``,
            "zoomLevel": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "circle": {
        "runTimeName": ``,
        "events": {
            "click": ``,
            "drag": ``,
            "longClick": ``,
            "startDrag": ``,
            "stopDrag": ``
        },
        "methods": {
            "distanceToFeature": ``,
            "distanceToPoint": ``,
            "hideInfobox": ``,
            "setLocation": ``,
            "showInfobox": ``
        },
        "properties": {
            "class": ``,
            "description": ``,
            "draggable": ``,
            "enableInfoBox": ``,
            "fillColor": ``,
            "fillOpacity": ``,
            "id": ``,
            "latitude": ``,
            "longitude": ``,
            "name": ``,
            "radius": ``,
            "strokeColor": ``,
            "strokeWidth": ``,
            "title": ``,
            "type": ``,
            "visible": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "linestring": {
        "runTimeName": "LineString",
        "events": {
            "click": ``,
            "drag": ``,
            "longClick": ``,
            "startDrag": ``,
            "stopDrag": ``
        },
        "methods": {
            "distanceToFeature": ``,
            "distanceToPoint": ``,
            "hidInfobox": ``,
            "shoInfobox": ``
        },
        "properties": {
            "class": ``,
            "description": ``,
            "draggable": ``,
            "enableInfoBox": ``,
            "id": ``,
            "name": ``,
            "points": ``,
            "pointsFromString": ``,
            "strokeColor": ``,
            "strokeOpacity": ``,
            "strokeWidth": ``,
            "title": ``,
            "type": ``,
            "visible": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "marker": {
        "runTimeName": "Marker",
        "events": {
            "click": ``,
            "drag": ``,
            "longClick": ``,
            "startDrag": ``,
            "stopDrag": ``
        },
        "methods": {
            "bearingToFeature": ``,
            "bearingToPoint": ``,
            "distanceToFeature": ``,
            "distanceToPoint": ``,
            "hideInfobox": ``,
            "setLocation": ``,
            "showInfobox": ``
        },
        "properties": {
            "anchorHorizontal": ``,
            "anchorVertical": ``,
            "class": ``,
            "description": ``,
            "draggable": ``,
            "enableInfoBox": ``,
            "fillColor": ``,
            "fillOpacity": ``,
            "height": ``,
            "id": ``,
            "imageAsset": ``,
            "latitude": ``,
            "longitude": ``,
            "name": ``,
            "strokeColor": ``,
            "strokeOpacity": ``,
            "strokeWidth": ``,
            "title": ``,
            "type": ``,
            "visible": ``,
            "width": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "navigation": {
        "runTimeName": "Navigation",
        "events": {
            "gotDirections": ``
        },
        "methods": {
            "requestDirections": ``
        },
        "properties": {
            "apiKey": ``,
            "class": ``,
            "endLatitude": ``,
            "endLocation": ``,
            "endLongitude": ``,
            "id": ``,
            "language": ``,
            "name": ``,
            "responseContent": ``,
            "startLatitude": ``,
            "startLocation": ``,
            "startLongitude": ``,
            "transportationMethod": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "polygon": {
        "runTimeName": "Polygon",
        "events": {
            "click": ``,
            "drag": ``,
            "longClick": ``,
            "startDrag": ``,
            "stopDrag": ``
        },
        "methods": {
            "centroid": ``,
            "distanceToFeature": ``,
            "distanceToPoint": ``,
            "hideInfobox": ``,
            "showInfobox": ``
        },
        "properties": {
            "class": ``,
            "description": ``,
            "draggable": ``,
            "enableInfoBox": ``,
            "fillColor": ``,
            "fillOpacity": ``,
            "holePoints": ``,
            "holePointsFromString": ``,
            "id": ``,
            "name": ``,
            "points": ``,
            "pointsFromString": ``,
            "strokeColor": ``,
            "strokeOpacity": ``,
            "strokeWidth": ``,
            "title": ``,
            "type": ``,
            "visible": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "rectangle": {
        "runTimeName": "Rectangle",
        "events": {
            "click": ``,
            "drag": ``,
            "longClick": ``,
            "startDrag": ``,
            "stopDrag": ``
        },
        "methods": {
            "bounds": ``,
            "center": ``,
            "distanceToFeature": ``,
            "distanceToPoint": ``,
            "hideInfobox": ``,
            "setCenter": ``,
            "showInfobox": ``
        },
        "properties": {
            "class": ``,
            "description": ``,
            "draggable": ``,
            "eastLongitude": ``,
            "enableInfoBox": ``,
            "fillColor": ``,
            "fillOpacity": ``,
            "id": ``,
            "name": ``,
            "northLatitude": ``,
            "southLatitude": ``,
            "strokeColor": ``,
            "strokeOpacity": ``,
            "strokeWidth": ``,
            "title": ``,
            "type": ``,
            "visible": ``,
            "westLongitude": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "acceleronmeter": {
        "runTimeName": "AccelerometerSensor",
        "events": {
            "accelerationChanged": ``,
            "shaking": ``
        },
        "methods": {},
        "properties": {
            "XAccel": ``,
            "YAccel": ``,
            "ZAccel": ``,
            "available": ``,
            "class": ``,
            "enabled": ``,
            "id": ``,
            "legacyMode": ``,
            "minimumInterval": ``,
            "name": ``,
            "sensitivity": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "barcodescanner": {
        "runTimeName": "BarcodeScanner",
        "events": {
            "afterScan": ``
        },
        "methods": {
            "doScan": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``,
            "result": ``,
            "useExternalScanner": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "barometer": {
        "runTimeName": "Barometer",
        "events": {
            "airPressureChanged": ``
        },
        "methods": {},
        "properties": {
            "airPressure": ``,
            "available": ``,
            "class": ``,
            "enabled": ``,
            "id": ``,
            "name": ``,
            "refreshTime": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "clock": {
        "runTimeName": "Clock",
        "events": {
            "timer": ``
        },
        "methods": {
            "addDays": ``,
            "addDuration": ``,
            "addHours": ``,
            "addMinutes": ``,
            "addMonths": ``,
            "addSeconds": ``,
            "addWeeks": ``,
            "addYears": ``,
            "dayOfMonth": ``,
            "duration": ``,
            "durationToDays": ``,
            "durationToHours": ``,
            "durationToMinutes": ``,
            "durationToSeconds": ``,
            "durationToWeeks": ``,
            "formatDate": ``,
            "formatDateTime": ``,
            "formatTime": ``,
            "getMillis": ``,
            "hour": ``,
            "makeDate": ``,
            "makeInstant": ``,
            "makeInstantFromMillis": ``,
            "makeInstantFromParts": ``,
            "makeTime": ``,
            "minute": ``,
            "month": ``,
            "monthName": ``,
            "now": ``,
            "second": ``,
            "systemTime": ``,
            "weekday": ``,
            "weekdayName": ``,
            "year": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``,
            "timerAlwaysFires": ``,
            "timerEnabled": ``,
            "timerInterval": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "gyroscope": {
        "runTimeName": "GyroscopeSensor",
        "events": {
            "gyroscopeChanged": ``
        },
        "methods": {},
        "properties": {
            "XAngularVelocity": ``,
            "YAngularVelocity": ``,
            "ZAngularVelocity": ``,
            "available": ``,
            "class": ``,
            "enabled": ``,
            "id": ``,
            "name": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "hygrometer": {
        "runTimeName": "Hygrometer",
        "events": {
            "humdityChanged": ``
        },
        "methods": {},
        "properties": {
            "available": ``,
            "class": ``,
            "enabled": ``,
            "humidity": ``,
            "id": ``,
            "name": ``,
            "refreshTime": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "lightsensor": {
        "runTimeName": "LightSensor",
        "events": {
            "lightChanged": ``
        },
        "methods": {},
        "properties": {
            "available": ``,
            "averageLux": ``,
            "class": ``,
            "enabled": ``,
            "id": ``,
            "lux": ``,
            "name": ``,
            "refreshTime": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "locationSensor": {
        "runTimeName": "locationSensor",
        "events": {
            "locationChanged": ``,
            "statusChanged": ``
        },
        "methods": {
            "latitudeFromAddress": ``,
            "longitudeFromAddress": ``
        },
        "properties": {
            "accuracy": ``,
            "altitude": ``,
            "availableProviders": ``,
            "class": ``,
            "currentAddress": ``,
            "distanceInterval": ``,
            "enabled": ``,
            "hasAccuracy": ``,
            "hasAltitude": ``,
            "hasLongitudeLatitude": ``,
            "id": ``,
            "latitude": ``,
            "longitude": ``,
            "name": ``,
            "providerLocked": ``,
            "providerName": ``,
            "timeInterval": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "magneticfieldsensor": {
        "runTimeName": "MagneticFieldSensor",
        "events": {
            "magneticChanged": ``
        },
        "methods": {},
        "properties": {
            "XStrength": ``,
            "YStrength": ``,
            "ZStrength": ``,
            "absoluteStrength": ``,
            "available": ``,
            "class": ``,
            "enabled": ``,
            "id": ``,
            "maximumRange": ``,
            "name": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "nearfield": {
        "runTimeName": "NearField",
        "events": {
            "tagRead": ``,
            "tagWritten": ``
        },
        "methods": {},
        "properties": {
            "class": ``,
            "id": ``,
            "lastMessage": ``,
            "name": ``,
            "readMode": ``,
            "textToWrite": ``,
            "writetype": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "orientationsensor": {
        "runTimeName": "OrientationSensor",
        "events": {
            "orientationChanged": ``
        },
        "methods": {},
        "properties": {
            "angle": ``,
            "available": ``,
            "azimuth": ``,
            "class": ``,
            "enabled": ``,
            "id": ``,
            "magnitude": ``,
            "name": ``,
            "pitch": ``,
            "roll": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "pedometer": {
        "runTimeName": "Pedometer",
        "events": {
            "simpleStep": ``,
            "walkStep": ``
        },
        "methods": {
            "reset": ``,
            "save": ``,
            "start": ``,
            "stop": ``
        },
        "properties": {
            "class": ``,
            "distance": ``,
            "elapsedTime": ``,
            "id": ``,
            "name": ``,
            "simpleSteps": ``,
            "stopDetectionTimeout": ``,
            "strideLength": ``,
            "walkSteps": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "proximitysensor": {
        "runTimeName": "ProximitySensor",
        "events": {
            "proximityChanged": ``
        },
        "methods": {},
        "properties": {
            "available": ``,
            "class": ``,
            "distance": ``,
            "enabled": ``,
            "id": ``,
            "keepRunningWhenOnPause": ``,
            "maximumRange": ``,
            "name": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "thermometer": {
        "runTimeName": "Thermometer",
        "events": {
            "temperatureChanged": ``
        },
        "methods": {},
        "properties": {
            "available": ``,
            "class": ``,
            "enabled": ``,
            "id": ``,
            "name": ``,
            "refreshTime": ``,
            "temperature": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "contactpicker": {
        "runTimeName": "ContactPicker",
        "events": {
            "afterPicking": ``,
            "beforePicking": ``,
            "gotFocus": ``,
            "lostFocus": ``,
            "touchDown": ``,
            "touchUp": ``
        },
        "methods": {
            "open": ``,
            "viewContact": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "contactName": ``,
            "contactUri": ``,
            "emailAddress": ``,
            "emailAddressList": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "id": ``,
            "name": ``,
            "phoneNumber": ``,
            "phoneNumberList": ``,
            "picture": ``,
            "shape": ``,
            "showFeedback": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "emailpicker": {
        "runTimeName": "EmailPicker",
        "events": {
            "gotFocus": ``,
            "lostFocus": ``
        },
        "methods": {
            "requestFocus": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "hint": ``,
            "id": ``,
            "name": ``,
            "shape": ``,
            "showFeedback": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "phonecall": {
        "runTimeName": "PhoneCall",
        "events": {
            "incomingCallAnswered": ``,
            "phoneCallEnded": ``,
            "phoneCallStarted": ``
        },
        "methods": {
            "makePhoneCall": ``,
            "makePhoneCallDirect": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``,
            "phoneNumber": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "phonenumberpicker": {
        "runTimeName": "PhoneNumberPicker",
        "events": {
            "afterPicking": ``,
            "beforePicking": ``,
            "gotFocus": ``,
            "lostFocus": ``,
            "touchDown": ``,
            "touchUp": ``
        },
        "methods": {
            "open": ``,
            "viewContact": ``
        },
        "properties": {
            "backgroundColor": ``,
            "class": ``,
            "contactName": ``,
            "contactUri": ``,
            "emailAddress": ``,
            "emailAddressList": ``,
            "enabled": ``,
            "fontBold": ``,
            "fontItalic": ``,
            "fontSize": ``,
            "fontTypeface": ``,
            "height": ``,
            "id": ``,
            "image": ``,
            "name": ``,
            "phoneNumber": ``,
            "phoneNumberList": ``,
            "picture": ``,
            "shape": ``,
            "showFeedback": ``,
            "text": ``,
            "textAlignment": ``,
            "textColor": ``,
            "visible": ``,
            "width": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "sharing": {
        "runTimeName": "Sharing",
        "events": {},
        "methods": {
            "shareFile": ``,
            "shareFileWithMessage": ``,
            "shareMessage": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "texting": {
        "runTimeName": "Texting",
        "events": {
            "messageReceived": ``
        },
        "methods": {
            "sendMessage": ``,
            "sendMessageDirect": ``
        },
        "properties": {
            "class": ``,
            "googleVoiceEnabled": ``,
            "id": ``,
            "message": ``,
            "name": ``,
            "phoneNumber": ``,
            "receivingEnabled": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "twitter": {
        "runTimeName": "Twitter",
        "events": {
            "directMessageReceived": ``,
            "followersReceived": ``,
            "friendTimelineReceived": ``,
            "isAuthorized": ``,
            "mentionsReceived": ``,
            "searchSuccessful": ``
        },
        "methods": {
            "authorize": ``,
            "checkAuthorized": ``,
            "deAuthorize": ``,
            "directMessage": ``,
            "follow": ``,
            "requestDirectMessage": ``,
            "requestFollowers": ``,
            "requestFriendTimeline": ``,
            "requestMentions": ``,
            "searchTwitter": ``,
            "stopFollowing": ``,
            "tweet": ``,
            "tweetWithImage": ``
        },
        "properties": {
            "class": ``,
            "consumerKey": ``,
            "consumerSecret": ``,
            "directMessages": ``,
            "followers": ``,
            "friendTimeline": ``,
            "id": ``,
            "mentions": ``,
            "name": ``,
            "searchResults": ``,
            "username": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "clouddb": {
        "runTimeName": "CloudDB",
        "events": {
            "cloudDBError": ``,
            "dataChanged": ``,
            "firstRemoved": ``,
            "gotValue": ``,
            "tagList": ``,
            "updateDone": ``
        },
        "methods": {
            "appendValueToList": ``,
            "clearTag": ``,
            "cloudConnected": ``,
            "getTagList": ``,
            "getValue": ``,
            "removeFirstFromList": ``,
            "storeValue": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``,
            "projectID": ``,
            "redisPort": ``,
            "redisServer": ``,
            "token": ``,
            "useSSL": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "datafile": {
        "runTimeName": "DataFile",
        "events": {},
        "methods": {
            "readFile": ``
        },
        "properties": {
            "class": ``,
            "columnNames": ``,
            "columns": ``,
            "defaultScope": ``,
            "id": ``,
            "name": ``,
            "rows": ``,
            "sourceFile": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "file": {
        "runTimeName": "File",
        "events": {
            "afterFileSaved": ``,
            "gotText": ``
        },
        "methods": {
            "appendToFile": ``,
            "copyFile": ``,
            "delete": ``,
            "exists": ``,
            "isDirectory": ``,
            "listDirectory": ``,
            "makeDirectory": ``,
            "makeFullPath": ``,
            "moveFile": ``,
            "readFrom": ``,
            "removeDirectory": ``,
            "saveFile": ``
        },
        "properties": {
            "class": ``,
            "defaultScope": ``,
            "id": ``,
            "name": ``,
            "readPermission": ``,
            "scope": ``,
            "writePermission": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "spreadsheet": {
        "runTimeName": "Spreadsheet",
        "events": {
            "errorOccured": ``,
            "finishAddCol": ``,
            "finishedAddRow": ``,
            "finishedClearRange": ``,
            "finishedRemoveCol": ``,
            "finishedRemoveRow": ``,
            "finishedWriteCell": ``,
            "finishedWriteCol": ``,
            "finishedWriteRange": ``,
            "finishedWriteRow": ``,
            "gotCellData": ``,
            "gotColData": ``,
            "gotFilterResult": ``,
            "gotRangeData": ``,
            "gotRowData": ``,
            "gotSheetData": ``
        },
        "methods": {
            "addCol": ``,
            "addRow": ``,
            "clearRange": ``,
            "getCellReference": ``,
            "getRangeReference": ``,
            "readCell": ``,
            "readCol": ``,
            "readRange": ``,
            "readRow": ``,
            "readSheet": ``,
            "readWithExactFilter": ``,
            "readWithPartialFilter": ``,
            "removeCol": ``,
            "removeRow": ``,
            "writeCell": ``,
            "writeCol": ``,
            "writeRange": ``,
            "writeRow": ``
        },
        "properties": {
            "applicatioName": ``,
            "class": ``,
            "credentialsJSON": ``,
            "id": ``,
            "name": ``,
            "spreadsheetID": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "tinydb": {
        "runTimeName": "TinyDB",
        "events": {},
        "methods": {
            "clearAll": ``,
            "clearTag": ``,
            "getTags": ``,
            "getValue": ``,
            "storeValue": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``,
            "namespace": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "tinywebdb": {
        "runTimeName": "TinyWebDB",
        "events": {
            "gotValue": ``,
            "valueStored": ``,
            "webServiceError": ``
        },
        "methods": {
            "getValue": ``,
            "storeValue": ``
        },
        "properties": {
            "class": ``,
            "id": ``,
            "name": ``,
            "serviceURL": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "activitystarter": {
        "runTimeName": "ActivityStarter",
        "events": {
            "activityCanceled": ``,
            "afterActivity": ``
        },
        "methods": {
            "resolveActivity": ``,
            "startActivity": ``
        },
        "properties": {
            "action": ``,
            "activityClass": ``,
            "activityPackage": ``,
            "class": ``,
            "dataType": ``,
            "dataUri": ``,
            "extraKey": ``,
            "extraValue": ``,
            "extras": ``,
            "id": ``,
            "name": ``,
            "result": ``,
            "resultName": ``,
            "resultType": ``,
            "resultUri": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "bluetoothclient": {
        "runTimeName": "BluetoothClient",
        "events": {},
        "methods": {
            "bytesAvailableToReceive": ``,
            "connect": ``,
            "connectWithUUID": ``,
            "disconnect": ``,
            "isDevicePaired": ``,
            "receiveSigned1ByteNumber": ``,
            "receiveSigned2ByteNumber": ``,
            "receiveSigned4ByteNumber": ``,
            "receiveSignedBytes": ``,
            "receiveText": ``,
            "receiveUnsigned1ByteNumber": ``,
            "receiveUnsigned2ByteNumber": ``,
            "receiveUnsigned4ByteNumber": ``,
            "receiveUnsignedBytes": ``,
            "send1ByteNumber": ``,
            "send2ByteNumber": ``,
            "send4ByteNumber": ``,
            "sendBytes": ``,
            "sendText": ``
        },
        "properties": {
            "addressesAndNames": ``,
            "available": ``,
            "characterEncoding": ``,
            "class": ``,
            "delimiterByte": ``,
            "disconnectOnError": ``,
            "enabled": ``,
            "highByteFirst": ``,
            "id": ``,
            "isConnected": ``,
            "name": ``,
            "pollingRate": ``,
            "secure": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "bluetoothserver": {
        "runTimeName": "BluetoothServer",
        "events": {
            "connectionAccepted": ``
        },
        "methods": {
            "acceptConnection": ``,
            "acceptConnectionWithUUID": ``,
            "bytesAvailableToReceive": ``,
            "disconnect": ``,
            "receiveSigned1ByteNumber": ``,
            "receiveSigned2ByteNumber": ``,
            "receiveSigned4ByteNumber": ``,
            "receiveSignedBytes": ``,
            "receiveText": ``,
            "receiveUnsigned1ByteNumber": ``,
            "receiveUnsigned2ByteNumber": ``,
            "receiveUnsigned4ByteNumber": ``,
            "receiveUnsignedBytes": ``,
            "send1ByteNumber": ``,
            "send2ByteNumber": ``,
            "send4ByteNumber": ``,
            "sendBytes": ``,
            "sendText": ``
        },
        "properties": {
            "available": ``,
            "characterEncoding": ``,
            "class": ``,
            "delimiter": ``,
            "delimiterByte": ``,
            "enabled": ``,
            "highByteFirst": ``,
            "id": ``,
            "isAccepting": ``,
            "isConnected": ``,
            "name": ``,
            "secure": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "serial": {
        "runTimeName": "Serial",
        "events": {},
        "methods": {
            "closeSerial": ``,
            "initializeSerial": ``,
            "openSerial": ``,
            "printSerial": ``,
            "readSerial": ``,
            "writeSerial": ``
        },
        "properties": {
            "baudRate": ``,
            "bufferSize": ``,
            "class": ``,
            "id": ``,
            "isInitialized": ``,
            "isOpen": ``,
            "name": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    },
    "web": {
        "runTimeName": "Web",
        "events": {
            "gotFile": ``,
            "gotText": ``,
            "timedOut": ``
        },
        "methods": {
            "buildRequestData": ``,
            "clearCookies": ``,
            "delete": ``,
            "get": ``,
            "htmlTextDecode": ``,
            "jsonEncodeObject": ``,
            "jsonTextDecode": ``,
            "jsonTextDecodeWithDictionaries": ``,
            "patchFile": ``,
            "patchtext": ``,
            "patchTextWithEncoding": ``,
            "postFile": ``,
            "postText": ``,
            "postTextWithEncoding": ``,
            "putFile": ``,
            "putText": ``,
            "putTextWithEncoding": ``,
            "uriDecode": ``,
            "uriEncode": ``,
            "XMLTextDecode": ``,
            "XMLTextDecodeAsDictionary": ``
        },
        "properties": {
            "allowCookies": ``,
            "class": ``,
            "homeUrl": ``,
            "id": ``,
            "name": ``,
            "requestHeaders": ``,
            "responseFileName": ``,
            "saveResponse": ``,
            "timeout": ``
        },
        "designerNoWrite": [],
        "codeNoRead": [],
        "codeNoWrite": []
    }
}