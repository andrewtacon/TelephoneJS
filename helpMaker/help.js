const { ELEMENTS } = require("../yailMaker/elements")

const fs = require("fs")

function main(filename, elementList) {


    let helperClasses = ""
    let helperVariables = ""
    let elementTypesUsed = []



    for (let i = 0; i < elementList.length; i++) {
        let elementInstance = elementList[i]

        helperVariables += `const ${elementInstance.name} = new ${elementInstance.type.toUpperCase()}()\n`

        if (!elementTypesUsed.includes(elementInstance.type)) {
            elementTypesUsed.push(elementInstance.type)


            let elementDocs = `class ${elementInstance.type.toUpperCase()} {\n`
            let element = ELEMENTS[elementInstance.type]

            //do properties first
            for (const [property, information] of Object.entries(element.properties)) {
                if (element.codeNoRead.includes(property) && element.codeNoWrite.includes(property)) {
                    continue //skip anything that cannot be coded
                }
                let restriction = ""
                if (element.codeNoRead.includes(property)) {
                    restriction = "Write ONLY."
                }
                if (element.codeNoWrite.includes(property)) {
                    restriction = "Read ONLY."
                }

                let propDoc = `\n/** \n`
                propDoc += `* ${information.description}\n`

                propDoc += `* @property {${information.type}}\n`
                if (restriction !== "") { propDoc += `* ${restriction}\n` }
                propDoc += "*/\n"

                elementDocs += `${propDoc} ${property};\n`


            }


            //now do methods

            let methods = element.methods
            for (const [method, value] of Object.entries(methods)) {

                let methodDoc = "/** \n"
                methodDoc += `* ${value.description} \n`


                let parameters = []
                for (const [parameter, type] of Object.entries(value.parameters)) {
                    if (type === "callback") {
                        methodDoc += `* @param {function} eventCallbackFunction - runs after event has been triggered\n`
                    } else if (parameter === "eventName") {

                        methodDoc += `* @param {${type}} ${parameter} - Available event(s): ${Object.keys(element.events).join(", ")}\n`

                    } else {
                        methodDoc += `* @param {${type}} ${parameter}\n`
                    }
                    parameters.push(parameter)
                }

                if (method === "addEventListener") {
                    methodDoc += `* \n`
                    methodDoc += `* Events for ${elementInstance.type}s are: \n`
                    methodDoc += `* \n`

                    for (const [event, detail] of Object.entries(element.events)) {

                        let eventParameters = Object.keys(detail.parameters)


                        methodDoc += `* @example <caption>${event}: ${detail.description}</caption>\n`
                        methodDoc += `*         ${elementInstance.type}.addEventListener(\n`
                        methodDoc += `*                 "${event}",\n`
                        methodDoc += `*                 function (${eventParameters.join(", ")}) {\n`

                        for (const [p, t] of Object.entries(detail.parameters)) {
                            methodDoc += `*                         //"${p}" is a returned value of type "${t}"\n`
                        }

                        //methodDoc += `*                         //Your code here\n`
                        methodDoc += `*                 }\n`
                        methodDoc += `*         )\n`
                        methodDoc += `* \n`
                    }
                }



                methodDoc += `*/\n`

                methodDoc += `${method} (${parameters.join(", ")}){};\n\n`

                elementDocs += methodDoc
            }


            elementDocs += `constructor(){};\n`
            elementDocs += "}\n\n"
            helperClasses += elementDocs
        }
    }

    let finalHelperCode = helperClasses + helperVariables

    filename = filename.substring(0, filename.lastIndexOf("."))

    fs.writeFileSync(`${filename}Helper.js`, finalHelperCode)

}


function buildTest(el) {

    console.log("Building test for " + el)
    //Construct the XML document

    let head = `
    <screen script="screen1.js" name="screen1" AppName="yail" Title="Great Title!" TitleVisible="false" ShowStatusBar="false" Scrollable="true">
    `

    let tail = `
        <textbox name="testbox" width="80%" height="parent" multiLine="true" />
        <notifier name="testnote" />
    </screen>
    `

    let xml = ""
    let properties = ELEMENTS[el].properties
    let nonDesigner = ELEMENTS[el].designerNoWrite
    for (const [property, data] of Object.entries(properties)) {

        if (nonDesigner.includes(property)) { continue }
        let testValue = data.tests
        let type = typeof testValue[0]

        if (type !== "string") {
            xml += `${property}="${testValue}"\n`
        } else {
            xml += `${property}=${testValue}\n`
        }

    }

    if (el === "screen") {
        xml = `<screen ${xml}>\n` + tail
    } else {
        xml = `${head}\n <${el} ${xml} />\n ${tail}\n`
    }


    fs.writeFileSync("screen1.xml", xml)

    //////////////////////////////////////
    //Construct the JavaScript Code
    //////////////////////////////////////

    //PROPERTIES

    let tests = `require("./screen1Helper")\n\n`

    tests += `\n\ntestbox.text = testbox.text +"\\n\\n${el.toUpperCase()} READING AND WRITING TESTS\\n\\n"\n\n`

    let noRead = ELEMENTS[el].codeNoRead
    let noWrite = ELEMENTS[el].codeNoWrite

    let componentName = "testComponent"
    if (el === "screen") {
        componentName = "Screen1"
    }
    for (const [property, data] of Object.entries(properties)) {

        if (noWrite.includes(property) && noRead.includes(property)) { continue }


        //WRITING
        if (!noWrite.includes(property)) {
            tests += `testbox.text = testbox.text + 'Writing ${property} property to ${data.tests[0]}\\n'\n`.replaceAll('"', '')
            tests += `${componentName}.${property} = ${data.tests[0]}\n`
        }
        if (!noRead.includes(property)) {
            tests += `testbox.text = testbox.text + 'Read ${property} property\\n'\n`.replaceAll('"', '')
            tests += `testbox.text = testbox.text + ${componentName}.${property}\n`.replaceAll('"', '')
        }
        tests += `testbox.text = testbox.text + "\\n\\n"` + "\n\n"

    }


    //METHODS
    tests += "\n//METHOD TESTS\n\n"

    let methods = ELEMENTS[el].methods
    for (const [method,value] of Object.entries(methods)){
        if (method==="addEventListener"){continue} //this isn't an app inventor method and is only relevant for events

        tests += `${componentName}.${method}(${value.tests.join()})\n\n`        

    }



    //EVENTS
    tests += "\n//EVENTS TESTS\n\n"

    let events = ELEMENTS[el].events
    for (const [event, value] of Object.entries(events)){
        let params = Object.keys(value.parameters).join()

        tests += `${componentName}.addEventListener(
    "${event}",
    function (${params}) {
        testnote.showAlert("Event occured: ${event}")
    }
)\n\n`


    }



    fs.writeFileSync("screen1.js", tests)

}


exports.run = main
exports.buildTest = buildTest
