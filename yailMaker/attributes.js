
//Attributes and their synonyms
//the key is the value that the YAIL code requires (it is not case sensitive for the XML designs)
//the values are acceptable values for this particular element - they are used for the help file

let string = "@type {string}"
let color = "@type {string} An 8 character hexadecimal string using ARBG e.g. 'AARRGGBB'"
let number = "@type {number}"
let bool = "@type {boolean}"
let instant = "@type {instant}"
let list = "@type {array}"

let getset = "@summary Gets or sets."
let get = "@summary Read-only."
let set = "@summary Write-only."
let designer = "@summary Designer only attribute."
let code = "@summary Code only attribute."

const ATTRIBUTES = {
    "AboutScreen": [
        string,
        getset,
        "@description Information about the screen. It appears when “About this Application” is selected from the system menu. Use it to tell users about your app. In multiple screen apps, each screen has its own AboutScreen info.",
        `"Test case for the aboutSceen"`
    ],
    "AbsoluteStrength": [],
    "AccentColor": [
        color,
        designer,
        "@description This is the accent color used for highlights and other user interface accents in newer versions of Android. Components affected by this property include dialogs created by the Notifier, the DatePicker, and others.",
        `"AAFF0000"` //test case colour red
    ],
    "Accuracy": [],
    "Action": ["Text value."],
    "ActivityClass": ["Text value."],
    "ActivityPackage": ["Text value."],
    "AddressesAndNames": [],
    "AirPressure": [],
    "AlignHorizontal": [
        string,
        getset,
        "@description A number that encodes how contents of the screen are aligned horizontally. The choices are the constants LEFT, RIGHT, CENTER",
        `"center"`  //center for test
    ],
    "AlignVertical": [
        string, getset,
        "@description A number that encodes how the contents of the arrangement are aligned vertically. The choices are the constants TOP, MIDDLE, BOTTOM. Vertical alignment has no effect if the screen is scrollable.",
        `"center"` //center for test
    ],
    "AllowCookies": [],
    "AlternateText": [
        string,
        set,
        "@description A written description of what the image looks like.",
        `"Text Alternate Text"`
    ],
    "Altitude": [],
    "AnchorHorizontal": [],
    "AnchorVertical": [],
    "Angle": [],
    "Animation": [
        string,
        set,
        "@description This is a limited form of animation that can attach a small number of motion types to images. The allowable motions are 'ScrollRightSlow', 'ScrollRight', 'ScrollRightFast', 'ScrollLeftSlow', 'ScrollLeft', 'ScrollLeftFast', and 'Stop'.",
        `"ScrollLeftSlow"`
    ],
    "ApiKey": ["Text value."],
    "AppName": [
        string, designer,
        "@description This is the display name of the installed application in the phone. If the AppName is blank, it will be set to the name of the project when the project is built.",
        `"Test App name"`
    ],
    "ApplicatioName": ["??????"],
    "Available": [],
    "AvailableCountries": [],
    "AvailableLanguages": [],
    "AvailableProviders": [],
    "AverageLux": [],
    "Azimuth": [],
    "BackgroundColor": [
        color, getset,
        "@decription Specifies the background color as an alpha-red-green-blue integer. If an BackgroundImage is available for the component and it has been set, the color change will not be visible until the BackgroundImage is removed.",
        `"AA00FF00"`
    ],
    "BackgroundImage": [
        string, getset,
        "@description Specifies the path of the background image. If there is both an BackgroundImage and a BackgroundColor specified, only the BackgroundImage will be visible.",
        `"cat.png"` //test case
    ],
    "BackgroundImageinBase64": [],
    "BaudRate": [],
    "BigDefaultText": [
        bool, getset,
        "@description When true, all default size text will be increased in size.",
        false //turn it on for tests
    ],
    //TO ADD PROCESSING FOR
    "BlocksToolkit": [
        string, designer,
        "@description A JSON string representing the subset for the screen. Authors of template apps can use this to control what components, designer properties, and blocks are available in the project."
    ],
    "BoundingBox": [],
    "BufferSize": [],
    "Center": [],
    "CenterFromString": ["Text value."],
    "CharacterEncoding": ["Text value."],
    "Checked": [
        bool,
        getset,
        "@description Specifies whether the CheckBox should be active and clickable."
    ],
    "Class": [
        string,
        designer,
        "@description Sets the design class to apply property settings from a CSS file.",
        `"TestClass"`
    ],
    "Clickable": [
        bool,
        getset,
        "@description Specifies whether the image should be clickable or not.",
        true
    ],
    "CloseScreenAnimation": [
        string, getset,
        "@description Sets the animation type for this transition of the form. One of 'default', 'fade', 'zoom', 'slidehorizontal', 'slidevertical', 'none'.",
        `"slidevertical"` //testcase
    ],
    "ColorLeft": [],
    "ColorRight": [],
    "Column": [
        number,
        designer,
        "@description Sets the column position of the component in a table arrangement.",
        0
    ],
    "ColumnNames": [],
    "Columns": [],
    "ConsumerKey": ["Text value."],
    "ConsumerSecret": ["Text value."],
    "ContactName": [],
    "ContactUri": [],
    "Country": ["Text value."],
    "CredentialsJSON": ["Text value."],
    "CurrentAddress": [],
    "CurrentPageTitle": [],
    "CurrentUrl": [],
    "DataType": ["Text value."],
    "DataUri": ["Text value."],
    "Day": [
        number,
        get,
        "@description Returns the Day of the month that was last picked using the DatePicker.",
        3
    ],
    "DefaultFileScope": [
        string,
        "@summary Designer only for screens.",
        "@description Specifies the default scope used when components access files. One of 'app', 'asset', 'cache', 'legacy', 'private', 'shared'.",
        `"App"` //test (it is default case)
    ],
    "DefaultScope": [],
    "Delimiter": [],
    "DelimiterByte": [],
    "Description": ["Text value."],
    "DirectMessages": [],
    "DisconnectOnError": [],
    "Distance": [],
    "DistanceInterval": [],
    "Draggable": [],
    "EastLongitude": [],
    "ElapsedTime": [],
    "Elements": [
        list,
        set,
        "@description Specifies the list of choices to display.",
        `["test choice 1", "test choice 2"]`
    ],
    "ElementsFromString": [
        string,
        set,
        "@description Set the list of choices from a string of comma-separated values.",
        `"test choice 1, test choice 2"`
    ],
    "EmailAddress": [],
    "EmailAddressList": [],
    "EnableInfoBox": [],
    "EnablePan": [],
    "EnableRotation": [],
    "EnableZoom": [],
    "Enabled": [
        bool, getset,
        "@descriptor Specifies whether the component should be active and clickable.",
        true //have to set as true for tests of won't work
    ],
    "EndLatitude": [],
    "EndLocation": [],
    "EndLongitude": [],
    "ExtendMovesOutsideCanvas": [],
    "ExtraKey": ["Text value."],
    "ExtraValue": ["Text value."],
    "Extras": [],
    "Features": [],
    "FillColor": [],
    "FillOpacity": [],
    "FollowLinks": [],
    "Followers": [],
    "FontBold": [
        bool, getset,
        "@description Specifies whether the text of the component should be bold. Some fonts do not support bold.",
        true
    ],
    "FontItalic": [
        bool, getset,
        "@description Specifies whether the text of the component should be italic. Some fonts do not support italic.",
        true
    ],
    "FontSize": [
        number, getset,
        "@description Specifies the text font size of the component, measured in sp(scale-independent pixels).",
        24
    ],
    "FontSizeDetail": [],
    "FontTypeface": [
        number, designer,
        "@description Specifies the text font face of the component as 'serif', 'sans serif' or 'monospace' if the default is not appropriate.",
        `"monospace"`
    ],
    "FontTypefaceDetail": [],
    "FriendTimeline": [],
    "FullScreen": [],
    "GoogleVoiceEnabled": [],
    "HTMLContent": [
        string,
        get,
        "@decription Returns the content of the Label as HTML. This is only useful if the HTMLFormat property is true.",
        `"Test HTML Content"`
    ],
    "HTMLFormat": [
        bool,
        designer,
        "@description Specifies the label’s text’s format.",
        true
    ],
    "HasAccuracy": [],
    "HasAltitude": [],
    "HasLongitudeLatitude": [],
    "HasMargins": [
        bool,
        getset,
        "@description Specifies whether the label should have margins. This margin value is not well coordinated with the designer, where the margins are defined for the arrangement, not just for individual labels.",
        true
    ],
    "Heading": [],
    "Height": [
        "@type (number | 'parent' | number%)",
        "@summary Usage depends on component type.",
        `@description For Screens (read only in code): Returns the Screen height in pixels (y-size).
        @description For other components (read/write code only): Specifies the Button’s vertical height, measured in pixels.`,
        200
    ],
    "HeightPercent": [
        number, set,
        "@description Specifies the component's vertical height as a percentage of the Screen's Height.",
        50
    ],
    "HighByteFirst": [],
    "HighContrast": [
        bool,
        getset,
        "@description When true, there will be high contrast mode turned on.",
        true
    ],
    "Hint": ["Text value."],
    "HolePoints": [],
    "HolePointsFromString": ["Text value."],
    "HomeUrl": ["Text value."],
    "Hour": [],
    "Humidity": [],
    "Icon": [
        string,
        designer,
        "@description The image used for your App’s display icon should be a square png or jpeg image with dimensions up to 1024x1024 pixels. Larger images may cause compiling or installing the app to fail. The build server will generate images of standard dimensions for Android devices.",
        `"cat.png"`
    ],
    "Id": [
        string,
        designer,
        "@description Sets the id for an component in a CSS file.",
        `"TestId"`
    ],
    "IgnoreSslErrors": [],
    "Image": [
        string,
        getset,
        "@description Specifies the path of the component's image. If there is both an Image and a BackgroundColor specified, only the Image will be visible.",
        `"cat.png"`
    ],
    "ImageAsset": ["Text value."],
    "ImageHeight": [],
    "ImageWidth": [],
    "Instant": [
        instant,
        get,
        "@description Returns instant of the date that was last picked using the DatePicker in milliseconds since January 1, 1970.",
        0
    ],
    "Interval": [],
    "IsAccepting": [],
    "IsConnected": [],
    "IsInitialized": [],
    "IsOpen": [],
    "IsPlaying": [],
    "ItemBackgroundColor": [
        color,
        getset,
        "@description The background color of the ListPicker items.",
        `"AAFF00F0"`
    ],
    "ItemTextColor": [
        color,
        getset,
        "@description The text color of the ListPicker items.",
        `"AAF0F0F0"`
    ],
    "KeepRunningWhenOnPause": [],
    "Language": ["Text value."],
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
    "Message": ["Text value."],
    "MinValue": [],
    "MinimumInterval": [],
    "Minute": [],
    "Month": [
        number,
        get,
        "@description Returns the number of the Month that was last picked using the DatePicker.",
        2
    ],
    "MonthInText": [
        string,
        get,
        "@description Returns the name of the Month that was last picked using the DatePicker.",
        `"May"`
    ],
    "MultiLine": [],
    "Name": [
        string,
        designer,
        "@description Sets the name of the element. This appears as a variable in the JavaScript file."
    ],
    "Namespace": ["Text value."],
    "NorthLatitude": [],
    "NotifierLength": [],
    "NumbersOnly": [],
    "On": [],
    "OpenScreenAnimation": [
        string, getset,
        "@description Sets the animation type for this transition of the form. One of 'default', 'fade', 'zoom', 'slidehorizontal', 'slidevertical', 'none'.",
        `"fade"`
    ],
    "Orientation": [],
    "OriginAtCenter": [],
    "PaintColor": [],
    "Passwordvisible": [],
    "PhoneNumber": ["Text value."],
    "PhoneNumberList": [],
    "Picture": [
        string,
        getset,
        "@description Specifies the path of the Image’s Picture.",
        `"cat.png"`
    ],
    "Pitch": [],
    "Platform": [
        code,
        get,
        "@description Gets the name of the underlying platform running the app.",
        `"Microsoft"`
    ],
    "PlatformVersion": [
        code,
        get,
        "@description Gets the version number of the platform running the app. This is typically a dotted version number, such as 10.0. Any value can be returned, however, so you should take care to handle unexpected data. If the platform version is unavailable, the empty text will be returned.",
        2
    ],
    "PlayOnlyInForeground": [],
    "Points": [],
    "PointsFromString": ["Text value."],
    "PollingRate": [],
    "PrimaryColor": [
        color,
        designer,
        "@description This is the primary color used as part of the Android theme, including coloring the Screen’s title bar.",
        `"AA0000FF"`
    ],
    "PrimaryColorDark": [
        color,
        designer,
        "@description This is the primary color used when the Theme property is specified to be Dark. It applies to a number of elements, including the Screen’s title bar.",
        `"AAFFFF00"`
    ],
    "ProjectID": ["Text value."],
    "Prompt": ["Text value."],
    "PromptForPermission": [],
    "ProviderLocked": [],
    "ProviderName": [],
    "Radius": [],
    "ReadMode": [],
    "ReadOnly": [],
    "ReadPermission": [],
    "ReceivingEnabled": [],
    "RedisPort": [],
    "RedisServer": ["Text value."],
    "RefreshTime": [],
    "RequestHeaders": [],
    "ResponseContent": [],
    "ResponseFileName": ["Text value."],
    "Result": [],
    "ResultName": ["Text value."],
    "ResultType": [],
    "ResultUri": [],
    "Roll": [],
    "Rotates": [],
    "Rotation": [],
    "RotationAngle": [
        number,
        getset,
        "@description The angle at which the image picture appears rotated. This rotation does not appear on the designer screen, only on the device.",
        45
    ],
    "Row": [
        number,
        designer,
        "@description Sets the row position of the component in a table arrangement.",
        0
    ],
    "Rows": [],
    "SaveResponse": [],
    "SavedRecording": ["Text value."],
    "ScalePictureToFit": [
        bool,
        set,
        "@designer Specifies whether the image should be resized to match the size of the ImageView.",
        true
    ],
    "ScaleUnits": [],
    "Scaling": [
        number,
        set,
        "@designer This property determines how the picture scales according to the Height or Width of the Image. Scale proportionally (0) preserves the picture aspect ratio. Scale to fit (1) matches the Image area, even if the aspect ratio changes.",
        1
    ],
    "Scope": [],
    "ScreenOrientation": [
        string,
        getset,
        "@description Declares the requested screen orientation, specified as a text value. Values are one of 'unspecified', 'landscape', 'portrait', 'sensor', 'user', 'behind', 'nosensor', 'fullsensor', 'reverselandscape', 'reverseportrait', 'sensorlandscape', 'sensorportrait'. ",
        `"portrait"`
    ],
    "Script": [
        "@description Connects a JavaScript script file to the screen",
        `"screen1.js"`
    ],
    "Scrollable": [
        bool,
        getset,
        "@description When checked, there will be a vertical scrollbar on the screen, and the height of the application can exceed the physical height of the device. When unchecked, the application height is constrained to the height of the device.",
        true
    ],
    "SearchResults": [],
    "Secure": [],
    "Selection": [
        string,
        getset,
        "@description The selected item. When directly changed by the programmer, the SelectionIndex property is also changed to the first item in the ListPicker with the given value. If the value is not in Elements, SelectionIndex will be set to 0.",
        `"test choice 1"`
    ],
    "SelectionColor": [],
    "SelectionDetailText": ["@returns {string} Returns the Secondary or Detail text in the ListView at the position set by SelectionIndex."],
    "SelectionIndex": [
        number,
        getset,
        "@description Selection index property setter method.",
        0
    ],
    "Sensitivity": [],
    "ServiceURL": ["Text value."],
    "Shape": [
        string,
        designer,
        "@description Specifies the shape of the component. The valid values for this property are 'round', 'rectangle', and 'oval'. The Shape will not be visible if an Image is used.",
        `"round"`
    ],
    "ShowCompass": [],
    "ShowFeedback": [
        bool,
        getset,
        "@description Specifies if a visual feedback should be shown when a component with an assigned Image is pressed.",
        true
    ],
    "ShowFilterBar": [
        bool,
        getset,
        "@description If true, the ListPicker will show a search filter bar.",
        true
    ],
    "ShowListsAsJson": [
        bool,
        designer,
        "@description If true (the default), lists will be shown as strings in JSON/Python notation for example [1, “a”, true]. If false, lists will be shown in the LISP notation, for example (1 a true). Note: This property should be set only in Screen1 and the value for Screen1 determines the behavior for all screens in the app.",
        true
    ],
    "ShowScale": [],
    "ShowStatusBar": [
        bool,
        getset,
        "@description The status bar is the topmost bar on the screen. This property reports whether the status bar is visible.",
        true
    ],
    "ShowUser": [],
    "ShowZoom": [],
    "SimpleSteps": [],
    "Sizing": [
        string,
        designer,
        "@description If set to 'responsive' (the default), screen layouts will use the actual resolution of the device. If set to 'fixed', screen layouts will be created for a single fixed-size screen and autoscaled. Note: This property should be set on Screen1 only and controls the sizing for all screens in the app.",
        `"responsive"`
    ],
    "Source": ["Text value."],
    "SourceFile": ["Text value."],
    "SouthLatitude": [],
    "SpeechRate": [],
    "Speed": [],
    "SpreadsheetID": ["Text value."],
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
    "Text": [
        string,
        getset,
        "@description Specifies the text displayed by the component.",
        `"Test value for text"`
    ],
    "TextAlignment": [
        string,
        designer,
        "@description Specifies the alignment of the component’s text. Valid values are: 'left' (left-justified if text is written left to right), 'center', or 'right' (right-justified if text is written left to right).",
        `"center"`
    ],
    "TextColor": [
        color,
        getset,
        "@description Specifies the text color of the component as an alpha-red-green-blue integer.",
        `"AA00FFFF"`
    ],
    "TextColorDetail": [],
    "TextToWrite": [],
    "Textsize": [],
    "Theme": [
        string,
        designer,
        "@designer Selects the theme for the application. Theme can only be set at compile time and the Companion will approximate changes during live development. Possible options are:<ul><li><code >Classic</code>, which is the same as older versions of App Inventor;</li><li><code >Device Default</code>, which gives the same theme as the version of Android running on thedevice and uses PrimaryColor for the Action Bar and has light buttons;</li><li><code >Black Title Text</code>, which is the <code >Device Default</code> theme but with black title text; and</li><li><code >Dark</code>, which is a dark version of the <code >Device Default</code> theme using <code >PrimaryColorDark</code> and having dark grey components.</li></ul>"
    ],
    "ThumbColorActive": [],
    "ThumbColorInactive": [],
    "Thumbenabled": [],
    "Thumbposition": [],
    "TimeInterval": [],
    "Timeout": [],
    "TimerAlwaysFires": [],
    "TimerEnabled": [],
    "TimerInterval": [],
    "Title": [
        string,
        getset,
        "@description Screen: Title property setter method: sets a new caption for the form in the form’s title bar.",
        "@description ListPicker: Optional title displayed at the top of the list of choices.",
        `"Test for title"`
    ],
    "TitleVisible": [
        bool,
        getset,
        "@description The title bar is the top gray bar on the screen. This property reports whether the title bar is visible.",
        true
    ],
    "Token": ["Text value."],
    "TrackColorActive": [],
    "TrackColorInactive": [],
    "TransportationMethod": [],
    "TutorialURL": [
        string,
        designer,
        "@descriptionA URL which will be opened on the left side panel (which can be toggled once it is open). This is intended for projects that have an in-line tutorial as part of the project. For security reasons, only tutorials hosted on http://appinventor.mit.edu or linked to from our URL shortener (http://appinv.us) may be used here. Other URLs will be silently ignored.",
        `"Test for tutorial url"`
    ],
    "Type": [],
    "Url": ["Text value."],
    "UseExternalScanner": [],
    "UseLegacy": [],
    "UseSSL": [],
    "UserLatitude": [],
    "UserLongitude": [],
    "Username": [],
    "UsesLocation": [],
    "VersionCode": [
        number,
        designer,
        "@description An integer value which must be incremented each time a new Android Application Package File (APK) is created for the Google Play Store.",
        2
    ],
    "VersionName": [
        string,
        designer,
        "@description A string which can be changed to allow Google Play Store users to distinguish between different versions of the App.",
        `"Test version"`
    ],
    "Visible": [
        bool,
        getset,
        "@description Specifies whether the component should be visible on the screen. Value is true if the Button is showing and false if hidden.",
        true
    ],
    "Volume": [],
    "WalkSteps": [],
    "WebViewString": [],
    "WestLongitude": [],
    "Width": [
        "@type (number | 'parent' | number%)",
        "@summary Usage depends on component type.",
        `@description For Screens (read only in code): Returns the Screen width in pixels (x-size).
        @description For other components (read/write in code): Specifies the horizontal width of the Button, measured in pixels.`,
        `"parent"`
    ],
    "WidthPercent": [
        number, set,
        "@description Specifies the horizontal width of the component as a percentage of the Screen’s Width.",
        80

    ],
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
    "Year": [
        number,
        get,
        "@description Returns the Year that was last picked using the DatePicker.",
        1902
    ],
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
        case "CenterFromString":
        case "CharacterEncoding":
        case "ConsumerKey":
        case "ConsumerSecret":
        case "Country":
        case "CredentialsJSON":
        case "DataType":
        case "DataUri":
        case "Description":
        case "ElementsFromString":
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
        case "RedisServer":
        case "ResponseFileName":
        case "ResultName":
        case "SavedRecording":
        case "Selection":
        case "ServiceURL":
        case "Source":
        case "SourceFile":
        case "SpreadsheetID":
        case "Text":
        case "Title":
        case "Token":
        case "TutorialURL":
        case "Url":
        case "VersionName":
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
        case "EnableInfoBox":
        case "EnableRotation":
        case "ExtendMovesOutsideCanvas":
        case "FontBold":
        case "FontItalic":
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
        case "PlayOnlyInForeground":
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
        case "ImageHeight":
        case "ImageWidth":
        case "Interval":
        case "MinimumInterval":
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
        case "Class":   //for CSS styling
        case "Id":      //for CSS styling
        case "Name":
        case "Script":
        case "Style":
            return ""
            break;

        case "Instant":
            return setInstant(key, value, name, descriptor)

        ///These are the get only methods
        case "SelectionDetailText":
            return getProperty(key, value, name, descriptor)


        default:
            console.log(`Error: Unknown descriptor "${descriptor}". Ignoring.`)
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

        let index = options.indexOf(value) + 1

        //special case
        if (descriptor === "TextAlignment" || descriptor === "ListViewLayout") { index-- }
        if (descriptor === "Orientation") { if (index !== 1) { return } } //only send through request for horizonatal, vertical is default
        if (descriptor === "NotifierLength") { if (index !== 0) { return } } //only send through request for short, long is default
        if (descriptor === "MapType" || descriptor === "ScaleUnits") { if (index === 0) { return } }
        if (descriptor === "Sensitivity") { if (index === 2) { } return }

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
    } else
        if (descriptor === "CloseScreenAnimation" || descriptor === "OpenScreenAnimation") {
            if (options.indexOf(value) === -1) {
                console.log(`Invalid option given for Open/Close Screen Animation: setting to default.`)
                return ""
            }
        } else
            if (descriptor === "ScreenOrientation") {
                if (options.indexOf(value) === -1) {
                    console.log(`Invalid option given for Screen Orientation: setting to default.`)
                    return ""
                }
            } else
                if (descriptor === "Sizing") {
                    if (options.indexOf(value) === -1) {
                        value = "responsive"
                        console.log(`Invalid option given for Sizing (of screen): setting to responsive.`)
                    }
                } else
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



function setInstant(key, value, name, descriptor) {
    return `(call-component-method '${name} 'SetDateToDisplayFromInstant (*list-for-runtime* ${value}) '(InstantInTime))`
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