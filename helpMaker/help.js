const { ELEMENTS } = require("../yailMaker/elements")
const { ATTRIBUTES } = require("../yailMaker/attributes")
const fs = require("fs")

function main(filename, elementList) {

    let helperClasses = ""
    let helperVariables = ""
    let elementTypesUsed = []
    console.log("Building Helper File.")
    console.log(elementList)


    for (let i = 0; i < elementList.length; i++) {
        let elementInstance = elementList[i]

        if (!elementTypesUsed.includes(elementInstance.type)) {

            let element = ELEMENTS[elementInstance.type]

            let attributes = ""
            let index = 0
            for (let a = 0; a < element.attributes.length; a++) {
                let att = element.attributes[a]
                let attInfo = ATTRIBUTES[att[0].toUpperCase() + att.substring(1)][0]
                if (attInfo) {
                    attributes += `${att}:"${attInfo}";`
                } else {
                    attributes += `${att};`

                }
            }

            //ignore designer only attributes

            for (let a = 0; a < element.blocksAttributes.length; a++) {
                let att = element.blocksAttributes[a]
                attributes += `${att};`
            }

            for (let a = 0; a < element.blocksReadOnly.length; a++) {
                let att = element.blocksReadOnly[a]
                attributes += `${att};`
            }

            for (let a = 0; a < element.blocksWriteOnly.length; a++) {
                let att = element.blocksWriteOnly[a]
                attributes += `${att};`
            }

            let newHelperClass = `class ${elementInstance.type.toUpperCase()} {${attributes}constructor(){};};`
            helperClasses += newHelperClass

        }

        let newInstance = `const ${elementInstance.name} = new ${elementInstance.type.toUpperCase()}();`
        helperVariables += newInstance

    }

    let finalHelperCode = helperClasses + helperVariables

    filename = filename.substring(0, filename.lastIndexOf("."))

    fs.writeFileSync(`${filename}Helper.js`, finalHelperCode)

}

exports.run = main
