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
   // console.log(text)
    if (logFile){ fs.appendFileSync("code.yail", text)}
    yail+=text
}


//this is the heart of the operation
let yail = ""
let elementList = []    //this is the list of elements on the page - needed so can create and activate them all later in the last line of code
let assetsList = []     //this is the list of media files that need to be loaded
let componentList = ''
let logFile = true    

function main(filename = "temp.xml") {
    yail=""

    //delete base file
    if (logFile){fs.writeFileSync("code.yail", "")}

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

    //generate assets list
    //fs.writeFileSync("assets.list", JSON.stringify(assetsList))

    return {yail:yail, assetsList:assetsList}
}

exports.for = main

function traverse(object, parent = '') {

    if (object.type === 'text') { return }

    let type = object.name

    if (!TYPES[type] && parent !== '') {
        console.log(`*** Error: Invalid design element "${object.name}" found. ***`)
        console.log(parent)
        console.log(object)
        process.exit(1)
    }

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
        /*
            non-QCAA psuedocode
            0. determine the size of the table
            1. iterate over the items and determine if the column and row numbers are valid
                -> determine minimum and maximum column
                    -> set number of columns to be max of (current column count, max column number, max range of column numbers (in case did a negative))
                    -> if negative column numbers then will need to determine this difference and update column number positions for the elements to be greater than/equal to zero
                -> do the same for rows
            2. check count of elements in list
                -> if too many elements than cells, add extra rows so that cells will be adequete in quantity
            3. assign numbered elements to cells and set element as assigned
                -> if cell aready filled then leave second and subsequence as unassigned
            4. iterate over unassigned elements and fill from the first available cell, assigning col and row to elements
        */


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


        createTable(object.attributes, parent, object.elements)
    }

    //generate the assetList
    if (object.attributes) {
        for (const [key, value] of Object.entries(object.attributes)) {
            if (key !== "backgroundimage" && key !== "image") { continue; }
            assetsList.push(value)
        }
    }

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


function createScreen(attributes) {
    let template = `\n(try-catch 
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
    output(`\n(do-after-form-creation`)
    for (let [key, value] of Object.entries(attributes)) {
        key = key.toLowerCase()
        if (key === "name") { continue; }
        else if (key === "showtitle" && value === "false") { showTitle(key, value, attributes.name) }
        else if (key === "statusbar" && value === "false") { showStatus(key, value, attributes.name) }
        else if (key === 'backgroundcolor') { backgroundColor(key, value, attributes.name) }
        else if (key === 'appname') { appName(key, value, attributes.name) }
        else if (key === 'title') { title(key, value, attributes.name) }
        //else {
        //    output(`\t(set-and-coerce-property! '${attributes.name} '${key} "${value}" 'text)`)
        //}
    }
    output(`\n)\n`)

}

function createButton(attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.Button ${attributes.name} `
    output(template)
    text("", elements[0].text, attributes.name)

    for (let [key, value] of Object.entries(attributes)) {
        key = key.toLowerCase()
        if (key === 'col') { col(key, value, attributes.name) }
        else if (key === 'row') { row(key, value, attributes.name) }
        else if (key === 'width') { width(key, value, attributes.name) }
    }

    output('\n)\n')
}

function createLabel(attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.Label ${attributes.name} `
    output(template)
    text("", elements[0].text, attributes.name)

    for (let [key, value] of Object.entries(attributes)) {
        key = key.toLowerCase()
        if (key === 'col') { col(key, value, attributes.name) }
        else if (key === 'row') { row(key, value, attributes.name) }
    }

    output('\n)\n')
}

function createNotifier(attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.Notifier ${attributes.name})\n`
    output(template)
}






//Horizontal Arrangement
function createhbox(attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.HorizontalArrangement ${attributes.name}`
    output(template)
    layoutAttributes(attributes)
    output(`\n)\n`)
}

//Vertical Arrangement
function createvbox(attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.VerticalArrangement ${attributes.name}`
    output(template)
    layoutAttributes(attributes)
    output(`\n)\n`)
}

//Vertical Scroll Arrangement
function createvscrollbox(attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.VerticalScrollArrangement ${attributes.name}`
    output(template)
    layoutAttributes(attributes)
    output(`\n)\n`)
}

//Horizontal Scroll Arrangement
function createhscrollbox(attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.HorizontalScrollArrangement ${attributes.name}`
    output(template)
    layoutAttributes(attributes)
    output(`\n)\n`)
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

function createTable(attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.TableArrangement ${attributes.name}`
    output(template)
    for (let [key, value] of Object.entries(attributes)) {
        key = key.toLowerCase()
        if (key === "width") { width(key, value, attributes.name) }
        else if (key === 'height') { height(key, value, attributes.name) }
        else if (key === 'visible') { visible(key, value, attributes.name) }
        else if (key === 'columns') { cols(key, value, attributes.name) }
        else if (key === 'rows') { rows(key, value, attributes.name) }
        else if (key === 'col') { col(key, value, attributes.name) }
        else if (key === 'row') { row(key, value, attributes.name) }
    }
    output(`\n)\n`)
}

///////////////////////////////////////////////////////////////////////////////
//// This section adds the actual lines of code for the various parameters ////
///////////////////////////////////////////////////////////////////////////////

function appName(key, value, name) {
    output(`\n\t(set-and-coerce-property! '${name} 'AppName "${value}" 'text)`)
}

function title(key, value, name) {
    output(`\n\t(set-and-coerce-property! '${name} 'Title "${value}" 'text)`)
}

function showTitle(key, value, name) {
    output(`\n\t(set-and-coerce-property! '${name} 'TitleVisible #f 'boolean)`)
}

function showStatus(key, value, name) {
    output(`\n\t(set-and-coerce-property! '${name} 'ShowStatusBar #f 'boolean)`)
}

function text(key, value, name) {
    output(`\n\t(set-and-coerce-property! '${name} 'Text "${value}" 'text)`)
}

function valign(key, value, name) {
    let options = ['top', 'center', 'bottom']
    if (options.includes(value.toLowerCase())) {
        let index = options.indexOf(value) + 1
        output(`\n\t(set-and-coerce-property! '${name} 'AlignVertical ${index} 'number)`)
    } else {
        console.log(`*** hbox valign value "${value}" invalid ***`)
    }
}

function halign(key, value, name) {
    let options = ['left', 'right', 'center']
    if (options.includes(value.toLowerCase())) {
        let index = options.indexOf(value) + 1
        output(`\n\t(set-and-coerce-property! '${name} 'AlignHorizontal ${index} 'number)`)
    } else {
        console.log(`*** hbox halign value "${value}" invalid ***`)
    }
}

function backgroundColor(key, value, name) {
    if (value.length !== 8) {
        console.log(`*** Invalid colour. Must be 8 digit hexadecimal string. Found value does not have 8 characters - "${value}" ***`)
        return
    }
    value = value.toUpperCase()
    for (let i = 0; i < value.length; i++) {
        let ch = value[i];
        if ((ch < '0' || ch > '9') &&
            (ch < 'A' || ch > 'F')) {
            console.log(`*** Invalid colour. Must be 8 digit hexadecimal string. A non-valid hexadecimal character was found - "${ch}" ***`)
            return;
        }
    }

    output(`\n\t(set-and-coerce-property! '${name}  'BackgroundColor #x${value} 'number)`)
}

function width(key, value, name) {
    if (value === 'parent') {
        output(`\n\t(set-and-coerce-property! '${name} 'Width -2 'number)`)
        return
    }
    if (value.indexOf('%') !== -1) {  //handle percentage
        value = value.replaceAll("%", "").trim()
        value = parseInt(value)
        if (isNaN(value)) {
            console.log("*** Width value set is invalid. ***")
            return;
        }
        if (value > 100) { value = 100 }
        if (value < 0) { value = 0 }
        value += 1000
        value = -value
        output(`\n\t(set-and-coerce-property! '${name} 'Width ${value} 'number)`)
    } else { //pixels
        value = parseInt(value)
        if (isNaN(value)) {
            console.log("*** Width value set is invalid. ***")
            return;
        }
        if (value < 0) { value = 0 }
        output(`\n\t(set-and-coerce-property! '${name} 'Width ${value} 'number)`)
    }
}

function height(key, value, name) {
    if (value === 'parent') {
        output(`\n\t(set-and-coerce-property! '${name} 'Height -2 'number)`)
        return
    }
    if (value.indexOf('%') !== -1) {  //handle percentage
        value = value.replaceAll("%", "").trim()
        value = parseInt(value)
        if (isNaN(value)) {
            console.log("*** Width value set is invalid. ***")
            return;
        }
        if (value > 100) { value = 100 }
        if (value < 0) { value = 0 }
        value += 1000
        value = -value
        output(`\n\t(set-and-coerce-property! '${name} 'Height ${value} 'number)`)
    } else { //pixels
        value = parseInt(value)
        if (isNaN(value)) {
            console.log("*** Width value set is invalid. ***")
            return;
        }
        if (value < 0) { value = 0 }
        output(`\n\t(set-and-coerce-property! '${name} 'Height ${value} 'number)`)
    }
}



function visible(key, value, name) {
    if (value === 'false') {
        output(`\n\t(set-and-coerce-property! '${name} 'Visible #f 'boolean)`)
    }
}

function image(key, value, name) {
    output(`\n\t(set-and-coerce-property! '${name} 'Image "${value}" 'text)`)
}

//cols and rows are for the table arrangement itself
function cols(key, value, name) {
    value = parseInt(value)
    if (isNaN(value)) {
        console.log('*** Invalid columns value. ***')
        return
    }
    if (value < 1) { value = 1 }
    output(`\n\t(set-and-coerce-property! '${name} 'Columns ${value} 'number)`)
}

function rows(key, value, name) {
    value = parseInt(value)
    if (isNaN(value)) {
        console.log('*** Invalid rows value. ***')
        return
    }
    if (value < 1) { value = 1 }
    output(`\n\t(set-and-coerce-property! '${name} 'Rows ${value} 'number)`)
}

//col and row are for any item placed inside a table arrangement
function col(key, value, name) {
    value = parseInt(value)
    if (isNaN(value)) {
        console.log('*** Invalid column value. ***')
        return
    }
    if (value < 0) { value = 0 }
    output(`\n\t(set-and-coerce-property! '${name} 'Column ${value} 'number)`)
}

function row(key, value, name) {
    value = parseInt(value)
    if (isNaN(value)) {
        console.log('*** Invalid row value. ***')
        return
    }
    if (value < 0) { value = 0 }
    output(`\n\t(set-and-coerce-property! '${name} 'Row ${value} 'number)`)
}

