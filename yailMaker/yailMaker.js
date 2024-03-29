const fs = require("fs")
const convert = require("xml-js")
const transpiler = require("../transpiler/transpiler")
const helperMaker = require("../helpMaker/help")

const { ATTRIBUTES, setAttribute } = require("./attributes")
const { ELEMENTS } = require("./elements")

//////////////////////////////////////////////////
///// SETUP HIDDEN FOLDER ////////////////////////
//////////////////////////////////////////////////

let hiddenFolder = ".aijs\\"


//////////////////////////////////////////////////
//// INTERFACE ELEMENTS //////////////////////////
//////////////////////////////////////////////////

//this helps name objects without a name
function* getNumber() {
    let count = 0
    while (true) {
        yield count
        count++
    }
}
let generator = getNumber();


//constructs the output and logs generated scheme data to a file
function output(text) {
    if (logFile) {
        fs.appendFileSync(hiddenFolder+"code.scm", text)
    }
    yail += text
}

//this is the heart of the operation
let yail = ""
let elementList = []    //this is the list of elements on the page - needed so can create and activate them all later in the last line of code
let assetsList = []     //this is the list of media files that need to be loaded
let componentList = ''
let logFile = true
let extractedData = []
let scripts = []
let screenName = ""

function main(filename = "temp.xml") {
    //overwrite the content of the backup scm file
    
    fs.writeFileSync(hiddenFolder+"code.scm", "")




    console.log()
    console.log(`Compiling "${filename}"...`)
    console.log(`*** Compiler messages ***`)

    yail = ""

    //delete base file
    if (logFile) {
        fs.appendFileSync(hiddenFolder+"code.scm", "")
    }

    //get input
    let contents = fs.readFileSync(filename, "utf-8")

    //should catch errors in xml format and alert user
    let structure = JSON.parse(convert.xml2json(contents))
    elementList = []    //this is the list of elements on the page - needed so can create and activate them all later in the last line of code
    assetsList = []     //this is the list of media files that need to be loaded
    extractedData = []
    scripts = []

    //if empty object returned then nothing in the file so crash out

    traverse(structure.elements[0])

    //   console.log('making helper')

    let helperFile = helperMaker.run(filename, extractedData)


    //this runs the transpiler on the attached scripts
    let generatedCode = transpiler.run(scripts, extractedData)

    //this is so can always access JSON components - ideally would test all the source code first but meh
    output(`
        (add-component screen1 com.google.appinventor.components.runtime.Web JSONUtilityBelt)
    `)
    //add lines to execute build
    output(`\n(init-runtime)\n`)

    componentList = ''
    elementList.shift()  //kill first element - it is the root element of the JSON the CML is parsed
    for (let i = 0; i < elementList.length; i++) {
        componentList += `'${elementList[i]} `
    }

    componentList += "'JSONUtilityBelt "


    output(generatedCode)

    output(`\n(call-Initialize-of-components ${componentList} )`)

    console.log(`*** End compiler messages ***`)
    console.log()

    //console.log(yail.length)


    // console.log(yail)



    return { yail: yail, assetsList: assetsList, screenName: screenName }
}

exports.for = main



function traverse(object, parent = '') {


    //must delete text objects or it falls apart
    if (object.type === 'text') { return }

    let type = object.name.toLowerCase()

    //handle attributes and default attributes - these are the properties etc from the XML and the parser gets hold of them
    if (object.attributes) {
        //convert all attributes to lowercase so can be case insensitive for the XML file
        object.attributes = Object.fromEntries(
            Object.entries(object.attributes).map(([k, v]) => [k.toLowerCase(), v])
        );

        let attributes = object.attributes
        if (!attributes.name) {
            attributes.name = type + "_" + generator.next().value
        } else {
            //probably should check users if they rename something the same thing.
            if (attributes.name === "JSONUtilityBelt") {
                attributes.name += "_" + generator.next().value
                console.log(`JSONUtilityBelt is a protected name, your component is renamed to "${attributes.name}".`)
            }

            let newNamedElement = {
                type: type,
                name: attributes.name
            }
            extractedData.push(newNamedElement)
        }
        //default screen attributes
        if (type === "screen") {
            if (typeof attributes.showlistsasjson === undefined) { attributes.showlistsasjson = "true" }
            if (typeof attributes.sizing === undefined) { attributes.sizing = "Responsive" }
            if (typeof attributes.title === undefined) { attributes.title = "Screen1" }
            if (typeof attributes.name === undefined) { attributes.name = "Screen1" }
            if (typeof attributes.appname === undefined) { attributes.appname = "Crazy Green Pencils" }
            if (attributes.script !== undefined) {
                let scriptNames = attributes.script.split(",")

                for (let scriptName of scriptNames) {
                    scripts.push(scriptName.trim())
                }
            }
            elementList.push(attributes.name)
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

        //only process table components if they exist
        if (object.elements !== undefined) {

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

            if (["backgroundimage", "image", "picture", "sourcefile", "source", "credentialsjson", "filelist"].includes(key)) {
                if (!value.toLowerCase().startsWith("http")) {
                    if (key === "filelist" && type==="assetlist") {
                        let values= value.split(",")
                        for (let p=0;p<values.length; p++){
                            assetsList.push(values[p].trim())
                        }
                    } else {
                        assetsList.push(value)
                    }
                }
            }
        }
    }
    fs.writeFileSync(hiddenFolder+"assets.list", JSON.stringify(assetsList))

    if (object.elements) {
        //determine if object can have children
        let objectswithChildren = ['screen', "hbox", "vbox", "hscrollbox", 'vscrollbox', 'table', 'canvas', 'map', "chart"]
        if (objectswithChildren.indexOf(type) !== -1) {

            for (let i = 0; i < object.elements.length; i++) {
                //determine cases where children are limited
                let childname = object.elements[i].name.toLowerCase()
                let mapChildren = ["circle", "featurecollection", "linestring", "marker", "polygon", 'rectangle']
                if (type === 'map') {
                    if (mapChildren.indexOf(childname) === -1) {
                        console.log(`Element "Map" cannot have child of element type "${childname}". Ignoring.`)
                        continue
                    }
                } else {
                    if (mapChildren.indexOf(childname) !== -1) {
                        console.log(`Element "${childname}" can only be parented by a "Map" element. Ignoring.`)
                        continue
                    }
                }

                let canvasChildren = ["ball", "imagesprite"]
                if (type === 'canvas') {
                    if (canvasChildren.indexOf(childname) === -1) {
                        console.log(`Element "Canvas" cannot have child of element type "${childname}". Ignoring.`)
                        continue
                    }
                } else {
                    if (canvasChildren.indexOf(childname) !== -1) {
                        console.log(`Element "${childname}" can only be parented by a "Canvas" element. Ignoring.`)
                        continue
                    }
                }

                if (type==="chart") {
                    if (childname!=="chartdata2d") {
                        console.log("chart can only have 'chartdata2d' as children. Ignoring.")
                        continue;
                    }
                }


                if (childname === "screen") {
                    console.log(`Cannot nest "Screen" elements. Ignoring.`)
                    continue;
                }


                if (!object.name) {
                    traverse(object.elements[i])
                } else {
                    traverse(object.elements[i], object.attributes.name)
                }
            }
        } else {
            console.log(`Element of type '${type}' cannot have child elements. Ignoring.`)
        }
    }

}


function createElement(element, attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.${ELEMENTS[element].runTimeName} ${attributes.name}`

    let rename = ""
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
        (rename-component "Screen1" "${attributes.name}")
        \n(do-after-form-creation`

        screenName = attributes.name
    }

    output(template)

    for (let [key, value] of Object.entries(attributes)) {
        //convert key (the attribute to lowercase)
        key = key.toLowerCase()
        //determine if the key is in the list for this element
        //let legalAttributes = [].concat(ELEMENTS[element].properties)   //CHANGED FOR NEW ELEMENTS 
        let legalAttributes = [].concat(Object.keys(ELEMENTS[element].properties))


        let legalAttributesLowerCase = legalAttributes.map(element => {
            return element.toLowerCase().trim()
        })

        if (legalAttributesLowerCase.indexOf(key.toLowerCase().trim()) !== -1) {

            //find correct name for the attribute for the SCHEME code
            //need to do this because converted to lowercase for the XML file so we can forgive casing errors in XML (but not in the JavaScript code)
            for (let attrkey of ATTRIBUTES) {
                if (attrkey.toLowerCase() === key) {
                    //process the attribute
                    output(setAttribute(key, value, attributes.name, attrkey))
                }
            }

        } else {
            console.log(`Invalid attribute "${key}" for "${element}", Ignoring.`)
        }


    }
    output(`\n)\n`)

}


