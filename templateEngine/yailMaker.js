//layouts
//HorizontalArrangement
//  alignHorizontal
// align vertical
//backgroundcolor
//height
//width
//image
//visible

const fs = require("fs")
const convert = require("xml-js")

const TYPES = {
    "screen": undefined,
    "label": "com.google.appinventor.components.runtime.Label",
    "button": "com.google.appinventor.components.runtime.Button",
    "text": "'",
    "notifier": "com.google.appinventor.components.runtime.Notifier",
    "hbox": "com.google.appinventor.components.runtime.HorizontalArrangement",
    "vbox": "com.google.appinventor.components.runtime.VerticalArrangement",
    "hscrollbox": "com.google.appinventor.components.runtime.HorizontalScrollArrangement",
    "vscrollbox": "com.google.appinventor.components.runtime.VerticalScrollArrangement",
    "table": "com.google.appinventor.components.runtime.TableArrangement"
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
    console.log(text)
    fs.appendFileSync("code.yail", text)
}

//delete base file
fs.writeFileSync("code.yail", "")

//get input
let contents = fs.readFileSync("screen1.xml", "utf-8")

//should catch errors in xml format and alert user
let structure = JSON.parse(convert.xml2json(contents))
let elementList = []    //this is the list of elements on the page - needed so can create and activate them all later in the last line of code
let assetsList = []     //this is the list of media files that need to be loaded

//if empty object returned then nothing in the file so crash out
traverse(structure)

//add lines to execute build
output(`(init-runtime)`)
let componentList = ''
elementList.shift()  //kill first element - it is the root element of the JSON the CML is parsed
for (let i = 0; i < elementList.length; i++) {
    componentList += `'${elementList[i]} `
}
output(`(call-Initialize-of-components ${componentList} )`)

//generate assets list
fs.writeFileSync("assets.list", JSON.stringify(assetsList))

function traverse(object, parent = '') {

    if (object.type === 'text') { return }

    let type = object.name

    if (!TYPES[type] && parent !== '') {
        console.log(`Error: Invalid design element "${object.name}" found.`)
        console.log(parent)
        console.log(object)
        process.exit(1)
    }

    if (object.attributes) {
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

    if (type === "screen") { createScreen(object.attributes) }
    if (type === "button") { createButton(object.attributes, parent, object.elements) }
    if (type === "label") { createLabel(object.attributes, parent, object.elements) }
    if (type === "notifier") { createNotifier(object.attributes, parent, object.elements) }
    if (type === "hbox") { createhbox(object.attributes, parent, object.elements) }
    if (type === "vbox") { createvbox(object.attributes, parent, object.elements) }
    if (type === "hscrollbox") { createhscrollbox(object.attributes, parent, object.elements) }
    if (type === "vscrollbox") { createvscrollbox(object.attributes, parent, object.elements) }
    if (type === "table") {
        //for a table we need to do something special. We need to look at the direct descendents of the table and 
        //see if they all have 
        //  1. row and column positions
        //  2. that the row and columns positions are valid
        //  3. that there are no double ups
        //  4. if a row and column is missing need to generate one
        //  5. if there is a double then push the element to the next available slot
        //  6. if too many elements then either increase the table size
        //once all of this is done, then the table can be constructed

        createvscrollbox(object.attributes, parent, object.elements)
    }

    //generate the assetList
    if (object.attributes) {
        for (const [key, value] of Object.entries(object.attributes)) {
            if (key !== "BackgroundImage" && key !== "Image") { continue; }
            assetsList.push(value)
        }
    }

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


function createScreen(attributes) {
    let template = `
    (try-catch 
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
    `

    output(template)
    output(`(do-after-form-creation`)
    for (let [key, value] of Object.entries(attributes)) {
        key = key.toLowerCase()
        if (key === "name") { continue; }
        else if (key === "showtitle" && value === "false") { showTitle(key, value, attributes.name) }
        else if (key === "statusbar" && value === "false") { showStatus(key, value, attributes.name) }
        else if (key === 'backgroundcolor') { backgroundColor(key, value, attributes.name) }
        else {
            output(`\t(set-and-coerce-property! '${attributes.name} '${key} "${value}" 'text)`)
        }
    }
    output(`)`)

}

function createButton(attributes, parent, elements) {
    let template = `(add-component ${parent} com.google.appinventor.components.runtime.Button ${attributes.name} `
    output(template)
    text("", elements[0].text, attributes.name)

    for (let [key, value] of Object.entries(attributes)) {
        key = key.toLowerCase()
        if (key === 'col') { col(key, value, attributes.name) }
        else if (key === 'row') { row(key, value, attributes.name) }
    }

    output(')')
}

function createLabel(attributes, parent, elements) {
    let template = `(add-component ${parent} com.google.appinventor.components.runtime.Label ${attributes.name} `
    output(template)
    text("", elements[0].text, attributes.name)

    for (let [key, value] of Object.entries(attributes)) {
        key = key.toLowerCase()
        if (key === 'col') { col(key, value, attributes.name) }
        else if (key === 'row') { row(key, value, attributes.name) }
    }

    output(')')
}

function createNotifier(attributes, parent, elements) {
    let template = `(add-component ${parent} com.google.appinventor.components.runtime.Notifier ${attributes.name} )`
    output(template)
}






//Horizontal Arrangement
function createhbox(attributes, parent, elements) {
    let template = `(add-component ${parent} com.google.appinventor.components.runtime.HorizontalArrangement ${attributes.name}`
    output(template)
    layoutAttributes(attributes)
    output(`)`)
}

//Vertical Arrangement
function createvbox(attributes, parent, elements) {
    let template = `(add-component ${parent} com.google.appinventor.components.runtime.VerticalArrangement ${attributes.name}`
    output(template)
    layoutAttributes(attributes)
    output(`)`)
}

//Vertical Scroll Arrangement
function createvscrollbox(attributes, parent, elements) {
    let template = `(add-component ${parent} com.google.appinventor.components.runtime.VerticalScrollArrangement ${attributes.name}`
    output(template)
    layoutAttributes(attributes)
    output(`)`)
}

//Horizontal Scroll Arrangement
function createhscrollbox(attributes, parent, elements) {
    let template = `(add-component ${parent} com.google.appinventor.components.runtime.HorizontalScrollArrangement ${attributes.name}`
    output(template)
    layoutAttributes(attributes)
    output(`)`)
}

function layoutAttributes(attributes) {
    for (let [key, value] of Object.entries(attributes)) {
        key = key.toLowerCase()
        if (key === "halign") { halign(key, value, attributes.name) }
        else if (key === "valign") { valign(key, value, attributes.name) }
        else if (key === "width") { width(key, value, attributes.name) }
        else if (key === 'height') { height(key, value, attributes.name) }
        else if (key === 'backgroundColor') { backgroundColor(key, value, attributes.name) }
        else if (key === 'image') { image(key, value, attributes.name) }
        else if (key === 'visible') { visible(key, value, attributes.name) }
        else if (key === 'col') { col(key, value, attributes.name) }
        else if (key === 'row') { row(key, value, attributes.name) }
    }
}

function table(attributes, parent, elements) {
    let template = `(add-component ${parent} com.google.appinventor.components.runtime.TableArrangement ${attributes.name}`
    output(template)
    for (let [key, value] of Object.entries(attributes)) {
        key = key.toLowerCase()
        if (key === "width") { width(key, value, attributes.name) }
        else if (key === 'height') { height(key, value, attributes.name) }
        else if (key === 'visible') { visible(key, value, attributes.name) }
        else if (key === 'cols') { cols(key, value, attributes.name) }
        else if (key === 'rows') { rows(key, value, attributes.name) }
        else if (key === 'col') { col(key, value, attributes.name) }
        else if (key === 'row') { row(key, value, attributes.name) }
    }
    output(`)`)
}

///////////////////////////////////////////////////////////////////////////////
//// This section adds the actual lines of code for the various parameters ////
///////////////////////////////////////////////////////////////////////////////

function showTitle(key, value, name) {
    output(`(set-and-coerce-property! '${name} 'TitleVisible #f 'boolean)`)
}

function showStatus(key, value, name) {
    output(`(set-and-coerce-property! '${name} 'ShowStatusBar #f 'boolean)`)
}

function text(key, value, name) {
    output(`(set-and-coerce-property! '${name} 'Text "${value}" 'text)`)
}

function valign(key, value, name) {
    let options = ['top', 'center', 'bottom']
    if (options.includes(value.toLowerCase())) {
        let index = options.indexOf(value) + 1
        output(`(set-and-coerce-property! '${name} 'AlignVertical ${index} 'number)`)
    } else {
        console.log(`hbox valign value "${value}" invalid`)
    }
}

function halign(key, value, name) {
    let options = ['left', 'right', 'center']
    if (options.includes(value.toLowerCase())) {
        let index = options.indexOf(value) + 1
        output(`(set-and-coerce-property! '${name} 'AlignHorizontal ${index} 'number)`)
    } else {
        console.log(`hbox halign value "${value}" invalid`)
    }
}

function backgroundColor(key, value, name) {
    if (value.length !== 8) {
        console.log(`Invalid colour. Must be 8 digit hexadecimal string. Found value does not have 8 characters - "${value}"`)
        return
    }
    value = value.toUpperCase()
    for (let i = 0; i < value.length; i++) {
        let ch = value[i];
        if ((ch < '0' || ch > '9') &&
            (ch < 'A' || ch > 'F')) {
            console.log(`Invalid colour. Must be 8 digit hexadecimal string. A non-valid hexadecimal character was found - "${ch}"`)
            return;
        }
    }

    output(`(set-and-coerce-property! '${name}  'BackgroundColor #x${value} 'number)`)
}

function width(key, value, name) {
    if (value === 'parent') {
        output(`(set-and-coerce-property! '${name} 'Width -2 'number)`)
        return
    }
    if (value.indexOf('%') !== -1) {  //handle percentage
        value = value.replaceAll("%", "").trim()
        value = parseInt(value)
        if (isNaN(value)) {
            console.log("Width value set is invalid.")
            return;
        }
        if (value > 100) { value = 100 }
        if (value < 0) { value = 0 }
        value += 1000
        value = -value
        output(`(set-and-coerce-property! '${name} 'Width ${value} 'number)`)
    } else { //pixels
        value = parseInt(value)
        if (isNaN(value)) {
            console.log("Width value set is invalid.")
            return;
        }
        if (value < 0) { value = 0 }
        output(`(set-and-coerce-property! '${name} 'Width ${value} 'number)`)
    }
}

function height(key, value, name) {
    if (value === 'parent') {
        output(`(set-and-coerce-property! '${name} 'Height -2 'number)`)
        return
    }
    if (value.indexOf('%') !== -1) {  //handle percentage
        value = value.replaceAll("%", "").trim()
        value = parseInt(value)
        if (isNaN(value)) {
            console.log("Width value set is invalid.")
            return;
        }
        if (value > 100) { value = 100 }
        if (value < 0) { value = 0 }
        value += 1000
        value = -value
        output(`(set-and-coerce-property! '${name} 'Height ${value} 'number)`)
    } else { //pixels
        value = parseInt(value)
        if (isNaN(value)) {
            console.log("Width value set is invalid.")
            return;
        }
        if (value < 0) { value = 0 }
        output(`(set-and-coerce-property! '${name} 'Height ${value} 'number)`)
    }
}



function visible(key, value, name) {
    if (value === 'false') {
        output(`(set-and-coerce-property! '${name} 'Visible #f 'boolean)`)
    }
}

function image(key, value, name) {
    output(`(set-and-coerce-property! '${name} 'Image "${value}" 'text)`)
}

//cols and rows are for the table arrangement itself
function cols(key, value, name) {
    value = parseInt(value)
    if (isNaN(value)) {
        console.log('Invalid columns value.')
        return
    }
    if (value < 1) { value = 1 }
    output(`(set-and-coerce-property! '${name} 'Columns ${value} 'number)`)
}

function rows(key, value, name) {
    value = parseInt(value)
    if (isNaN(value)) {
        console.log('Invalid rows value.')
        return
    }
    if (value < 1) { value = 1 }
    output(`(set-and-coerce-property! '${name} 'Rows ${value} 'number)`)
}

//col and row are for any item placed inside a table arrangement
function col(key, value, name) {
    value = parseInt(value)
    if (isNaN(value)) {
        console.log('Invalid column value.')
        return
    }
    if (value < 0) { value = 0 }
    output(`(set-and-coerce-property! '${name} 'Column ${value} 'number)`)
}

function row(key, value, name) {
    value = parseInt(value)
    if (isNaN(value)) {
        console.log('Invalid row value.')
        return
    }
    if (value < 0) { value = 0 }
    output(`(set-and-coerce-property! '${name} 'Row ${value} 'number)`)
}

