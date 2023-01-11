const { ELEMENTS } = require("../yailMaker/elements")
const { ATTRIBUTES } = require("../yailMaker/attributes")
const {METHODS} = require("../yailMaker/methods")
const fs = require("fs")

function main(filename, elementList) {


    fs.writeFileSync(`${filename}Helper.js`, "")
    return

    let helperClasses = ""
    let helperVariables = ""
    let elementTypesUsed = []
  //  console.log("Building Helper File.")
  //  console.log(elementList)


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

            let methods = ""
            for (let a = 0; a < element.methods.length; a++) {
                let method = element.methods[a]
                let methodDocs = METHODS[method]
                let methodDoc = ""
                methodDoc += `\n/**\n`
                let paramList = ""
                for (let k=0; k<methodDocs.params.length; k++){
                    methodDoc += `* @param ${methodDocs.params[k].type} ${methodDocs.params[k].name} ${methodDocs.params[k].info}\n`
                    paramList += ` ${methodDocs.params[k].name},`
                }
                methodDoc +=`* @description ${methodDocs.description}\n`
                methodDoc += `*/\n`
                paramList=paramList.substring(1).trim()
                methods += `${methodDoc}${method}(${paramList}){};\n`

            }

            let newHelperClass = `class ${elementInstance.type.toUpperCase()} {${attributes}constructor(){};${methods}};`
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
