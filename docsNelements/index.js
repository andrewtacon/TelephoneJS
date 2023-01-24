let { ELEMENTS } = require("./elements")
const { METHODS } = require("./methods")

const fs = require('fs')

for (const i of Object.keys(ELEMENTS)) {
    if (ELEMENTS[i].attributes) {
        delete ELEMENTS[i].attributes
    }
    if (ELEMENTS[i].designerAttributes) {
        delete ELEMENTS[i].designerAttributes
    }

    if (ELEMENTS[i].blocksAttributes) {
        delete ELEMENTS[i].blocksAttributes
    }

    if (ELEMENTS[i].blocksWriteOnly) {
        delete ELEMENTS[i].blocksWriteOnly
    }

    if (ELEMENTS[i].blocksReadOnly) {
        delete ELEMENTS[i].blocksReadOnly
    }
}

let newElements = {}

for (const [key, value] of Object.entries(ELEMENTS)) {
    console.log(value)
    newElements[key] = {}
    newElements[key].runTimeName = value.runTimeName
    newElements[key].events = {}
    newElements[key].methods = {}
    newElements[key].properties = {}
    newElements[key].designerNoWrite = value.designerNoWrite
    newElements[key].codeNoRead = value.codeNoRead
    newElements[key].codeNoWrite = value.codeNoWrite

    for (let i = 0; i < value.events.length; i++) {
        newElements[key].events[value.events[i]] = ""
    }

    for (let i = 0; i < value.methods.length; i++) {
        newElements[key].methods[value.methods[i]] = ""
    }

    for (let i = 0; i < value.properties.length; i++) {
        newElements[key].properties[value.properties[i]] = ""
    }


}

fs.writeFileSync('elements2.js', JSON.stringify(newElements))


console.log(newElements)