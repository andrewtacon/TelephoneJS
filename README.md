This application takes a subset of Javascript and allows it to be used at the programming langauge for MIT's App Inventor.

## Why does this exist?

1. Australia curriculum asks students to use a text based general purpose programming language
2. I teach a lot of Javascript
3. I was interested in how compilation worked so had been reading about how it is done for a year or so
4. I found out that MIT App Inventor blocks and interface eventually end up as Scheme code through reading a journal article. Coincidently I now know how to write basic scheme code. 
5. I found out that whilst others had attempted to write a text language for App Inventor blocks, they had not really had much success (that I could find). Interesting articles those.
6. I thought it would be fun (probably the most important reason)

## Device connection status

1. Emulator - flakey - tends to lose sync and drop out
2. Android over USB - no known issues - works really well
3. Android over wifi - no known issues - works really well
4. Apple over wifi - connects, loads files - asset loading not tested - may/will be issues

## Installation

1. npm install @mapbox/node-pre-gyp
2. npm install telephonejs

Or See 'packaged' folder for instructions.

## How to use: (this really needs better notes.)

1. Create XML file for the layout
2. Create a linked JS file for the code
3. Run the app
4. Connect to device 
5. Hopefully see what you made

## Number convention

a.b.c

a - breaking changes on other versions
b - new components or other significant improvements
c - bug fixes (which will turn over a lot in the initial stages i suspect)

## Information on components - properties, methods and events

Please visit this url - https://telephonejs.com/ Eventually this will have sample code examples for each of these.

## JavaScript General Notes:

* Variables are only assigned with 'let'. No 'const' or 'var'
* To select a component use <code>getComponent(componentName)</code> where componentName was the name given in the XML declaration for the component

## Strings

String Properties Implemented | String Properties Not Implemented
-|-
.length|

String Methods Implemented |  String Methods Not Implemented
-|-
.at()|.codePointAt(0)
.charAt()|.fromCodePoint()
.charCodeAt()|.localeCompare()
.concat()|.match()    //regex
.endsWith()|.matchAll()    //regex
.fromcharCode()|.normalize()
.includes()|.raw
.indexOf()|
.lastIndexOf()|
.padEnd()|
.padStart()|
.repeat()|
.replace() acts slightly differently. When you add an object it flattens the object and prints it as opposed to printing [OBJECT object].|
.replaceAll()|
.slice()|
.split()|
.startsWith()|
.substring()|
.toLowerCase()|
.toUpperCase()|
.trim()|
.trimEnd()|
.trimStart()|


## Arrays

Array Properties Implemented | Array Properties Not Implemented
-|-
.length|

Array Methods Implemented | Array Methods Not Implemented
-|-
.at()|.copyWithin()
.concat()|.entries()
.includes()|.every()
.indexOf()|.fill()
Array.isArray()|.filter()
.join()|.find()
.shift()|.findIndex()
.pop()|.findLast()
.unshift()|.findLastIndex()
.shift()|... and all the other ones
.reverse()|-
.map() (except for the optional assignment of a 'this' value) | -


## Objects

Object Methods Implemented | Object Methods Not Implemented
-|-
.assign(target, source)|.defineProperties()
.create(source)|.defineProperty()
.entries()|.freeze(0)
.fromEntries()|.getOwnPropertyDescriptor()
.hasOwn()|.getOwnPropertyDescriptors()
.keys()|.getOwnPropertyNames()
.values()|.getOwnPropertySymbols()
-|.getPrototypeOf()
-|.hasOwnProperty()
-|.is()
-|.isExtensible()
-|.isFrozen()
-|.isPrototypeOf()
-|.isSealed()
-|.preventExtensions()
-|.propertyIsEnumerable()
-|.seal()
-|.setPropertyOf()
-|.toLocaleString()
-|.toString()
-|.valueOf(0)

## Keywords

Keywords Implemented | Keywords Not Implemented
-|-
break | continue
while (){} | var
for(;;){} <br>For loops are transformed into while loops<br>during transpilation.|const
if, else if, else | -
function name(){}<br> Function expressions (<code>let name = function(){}</code>)<br>are transpiled into declarations (<code>function name(){}</code>) | -
let (for declaring variables) | -
Logical operators && and \|\| |-
Member expressions | -
Return | -
Template Literals | -
Unary Expressions (! and -) | -
Postfix and prefix decrement and increment ++a, a++ , --a and a-- | -


## Math

Math Methods Implemented | Math Methods Not Implemented
-|-
sqrt() |-
abs()|-
log()|-
exp()|-
round()|-
ceil()|-
floor()|-
sin()|-
cos()|-
tan()|-
asin()|-
acos()|-
atan()|-
atan2()|-
random()|-
min()|-
max()|-
range()|-
mod()|-
quot()|-
toDegrees()|-
toRadians()|-
randomSeed()|-

## Stat (statistics methods)

Stat Methods Implemented | Stat Methods Not Implemented
-|-
avg()|-
min()|-
max()|-
gm()|-
stddev()|-
stderr()|-
mode()|-

## Color (color methods)

Color Methods Implemented | Color Methods Not Implemented
-|-
make() |-
split()|-

## Things Not Included in the current iteration
- EV3 lego robotics components
- FirebaseDb - there are some fixed default values so would require special processing code for this component and I am a bit over adding components at the moment (being doing it every day for a week)

## Known Issues

1. Texting component can't send or recieve - it is the same problem in the offical app inventor to do with google permission. https://community.appinventor.mit.edu/t/error-908-permission-receive-sms/7426/5 

2. camera and camcorder throw errors on console but seem to work

3. Need to fail gracefully but not terminate on xml and js errors in code

4. xml hinting for properties via dtd or xmlschema

5. emulatorUSb needs to have better file on device checking - at moment seems to upload everything each time (which works and is fine but annoying)

6. New functions for math (now mostly implemented as a Stat.<i>method</i>)

7. Compilation from generated scheme file to apk (because that would be cool)

8. declaring the correct scope for function declarations - currently defaults to "global" but this is not always correct

9. Testing required for:
    * Charts 
    * Chartline2d
    * Barometer
    * GyroscopeSensor
    * Hygrometer
    * Twitter 

10. New Features in App Inventor 2.66 (This will be a lot more work, sigh.....)
    * Add functional list operators like map, filter, reduce, and sort (@siyaoL1) (map now done)
    * Add new math stats blocks like average, standard deviation, min/max over lists (mostly completed)
    * Add custom font typeface support (@preetvadaliya)
    * Add new Bluetooth permissions to permission helper block
    * Add “every component” block (@Vishwas-Adiga) (no idea what this does yet)
    * Add functions to Chart to set domain and range of charts and to fix the origin at 0, 0 (done)

11. Need to add feature to application to build a template app

12. Need to add option to menu to select for iOS device to pick up the correct header info (or do this another way). This implies testing with iOS devices. 

13. Add support for arrow function code style (probably just treat it like a normal function - this will break 'this' scoping for these functions but oh well, some sacrifices need to be made, and as I haven't actually acounted for the 'this' it is not going to be an issue hopefully)

14. Need to test getting images from subfolders rather than just uploading from root folder and any issues this may have

15. Need an option to upload a pre-made 'file manager' app to device to view and clear out App Inventor App memory.

(This list keeps growing for some reason. It's like one of those plants that the more you trim it back the better it grows.)

## Observations

component heights and widths can only be read after a screen is initialized, otherwise they return zero
InstantInTime means milliseconds since epoch (1,1,1970 midnight)

## TODO

* CSS type external styling
* Programming language documentation for functionality
* Validate components for the 'setComponent' function 
* Complete this readme
* Compilation to android app (unlikely)



<style>
    table{
        width: 80%;
    }
    td {
        width: 50%;
    }
    tr:nth-child(even) {
        background-color: #EEE;
    }
    th {
        background-color: #DDD;
    }
    tr {
        border: 1px solid black;
    }    
</style>