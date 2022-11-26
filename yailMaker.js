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
    "text":"'"
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
fs.writeFileSync("code.yail","")

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
for (let i=0; i< elementList.length; i++) {
    componentList+= `'${elementList[i]} `
}
output(`(call-Initialize-of-components ${componentList} )`)

//generate assets list
fs.writeFileSync("assets.list", JSON.stringify(assetsList))

function traverse(object, parent = '') {

    if (object.type==='text' ) {return}

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

    //generate the assetList
    if (object.attributes) {
        for (const [key, value] of Object.entries(object.attributes)) {
            if (key !== "BackgroundImage") { continue; }
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
    for (const [key, value] of Object.entries(attributes)) {
        if (key === "name") { continue; }
        output(`\t(set-and-coerce-property! '${attributes.name} '${key} "${value}" 'text)`)
    }
    output(`)`)

}

function createButton(attributes, parent, elements) {
    let template = `
    (add-component ${parent} com.google.appinventor.components.runtime.Button ${attributes.name} 
        (set-and-coerce-property! '${attributes.name} 'Text "${elements[0].text}" 'text)
    )
    `
    output(template)
}

function createLabel(attributes, parent, elements) {
    let template = `
    (add-component ${parent} com.google.appinventor.components.runtime.Label ${attributes.name} 
        (set-and-coerce-property! '${attributes.name} 'Text "${elements[0].text}" 'text)
    )
    `
    output(template)
}