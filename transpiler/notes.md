## STRINGS

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
.replace() acts slightly differently.<br>When you add an object it flattens the object<br> and prints it as opposed to printing [OBJECT object].|
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


## OBJECTS

Object Methods Implemented | Object Methods Not Implemented
-|-
.assign(target, source)|.defineProperties()
.create(source)|.defineProperty()
.entrie()|.freeze(0)
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



## KEYWORDS 

Keywords Implemented | Keywords Not Implemented
-|-
break | continue
while (){} | -
for(;;){} <br>For loops are transformed into while loops<br>during transpilation.|-
if, else if, else | -
function name(){}<br> Function expressions (<code>let name = function(){}</code>)<br>are transpiled into declarations (<code>function name(){}</code>) | -
let (for declaring variables) | -
Logical operators && and \|\| |-
Member expressions | -
Return | -
Template Literals | -
Unary Expressions (! and -) | -
Postfix and prefix decrement and increment ++a, a++ , --a and a-- | -



