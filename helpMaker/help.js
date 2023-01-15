const { ELEMENTS } = require("../yailMaker/elements")
const { ATTRIBUTES } = require("../yailMaker/attributes")
const { METHODS } = require("../yailMaker/methods")
const fs = require("fs")

function main(filename, elementList) {

    let helperClasses = ""
    let helperVariables = ""
    let elementTypesUsed = []


    for (let i = 0; i < elementList.length; i++) {
        let elementInstance = elementList[i]

        if (!elementTypesUsed.includes(elementInstance.type)) {

            let element = ELEMENTS[elementInstance.type]
            let allAttributes = [].concat(element.properties)

            let attributes = ""
            let index = 0
            for (let a = 0; a < allAttributes.length; a++) {
                let att = allAttributes[a]
                let attInfo

                //this is a test for missing attributes
                try { attInfo = ATTRIBUTES[att[0].toUpperCase() + att.substring(1)] } catch (error) { console.log(att); console.log(error); process.exit(0) }

                let attDoc = "\n/**\n"
                for (let a = 0; a < attInfo.length; a++) {
                    if (typeof attInfo !== "string") { continue } //skip non-strings they are test values
                    if (!attInfo.startsWith("@")) { continue } //this is to skip test cases for the test compiler. The JSDoc has all lines starting with @.
                    attDoc += "* " + attInfo[a] + "\n"
                }
                attDoc += `*/\n`
                attributes += `${attDoc}${att};`
            }

            let methods = ""
            for (let a = 0; a < element.methods.length; a++) {
                let method = element.methods[a]
                let methodDocs = METHODS[method]
                let methodDoc = ""
                methodDoc += `\n/**\n`
                let paramList = ""
                if (methodDocs) {
                    if (methodDocs.description) {
                        methodDoc += `* ${methodDocs.description}\n`
                    }

                    if (methodDocs.params) {
                        for (let k = 0; k < methodDocs.params.length; k++) {
                            methodDoc += `* @param ${methodDocs.params[k].type} ${methodDocs.params[k].name} ${methodDocs.params[k].info}`
                            paramList += ` ${methodDocs.params[k].name},`
                        }
                    }

                    if (methodDocs.events) {
                        if (methodDocs.events[elementInstance.type]) {
                            methodDoc += `\n`
                            for (const [key, value] of Object.entries(methodDocs.events[elementInstance.type])) {
                                methodDoc += `* @example <caption>${key}</caption>\n`
                                methodDoc += `* ${value}`
                                methodDoc += `\n`
                            }
                        }
                    }

                }

                methodDoc += `*/\n`
                paramList = paramList.substring(1).trim()
                methods += `${methodDoc}${method}(${paramList}){};\n`
            }

            let newHelperClass = `class ${elementInstance.type.toUpperCase()} {${attributes}constructor(){};${methods}};`
            helperClasses += newHelperClass

        }

        let newInstance = `const ${elementInstance.name} = new ${elementInstance.type.toUpperCase()}();`
        helperVariables += newInstance

    }

    let constants =
        `
    const LEFT = 1;
    const RIGHT = 2;
    const CENTER = 3;
    const TOP = 1;
    const MIDDLE =2;
    const BOTTOM = 3; 
    const FONT= {
        Default:0,
        Serif: 2,
        SansSerif:1,
        Monospace:3
    }
    `


    let finalHelperCode = helperClasses + helperVariables + constants

    filename = filename.substring(0, filename.lastIndexOf("."))

    fs.writeFileSync(`${filename}Helper.js`, finalHelperCode)

}


function buildTest(el) {

    //Construct the XML document

    let head = `
    <screen script="screen1.js" name="screen1" AppName="yail" Title="Great Title!" TitleVisible="false" ShowStatusBar="false" Scrollable="true">
    `

    let tail = `
        <textbox name="testbox" width="80%" height="parent" multiLine="true" />
        <notifier name="testnote" />
    </screen>
    `

    let element = ELEMENTS[el]

    let allAttributes = [].concat(element.properties)
    allAttributes = allAttributes.filter(
        function (el) {
            return !element.designerNoWrite.includes(el)
        })

    let middle = `<${el} `
    for (let a = 0; a < allAttributes.length; a++) {
        let att = allAttributes[a]
        let attCase = att[0].toUpperCase() + att.substring(1, att.length)
        let attInfo = ATTRIBUTES[`${attCase}`]

      //  let test = attInfo

   /*     if (!Array.isArray(attInfo)) {
            continue
        }
        if (attInfo.length === 0) {
            continue
        }*/

        if (typeof attInfo[attInfo.length - 1] === "string") {
            if (attInfo[attInfo.length - 1].startsWith("@")) {
                console.log(`No test case for property "${att}". Skipping.`)
                continue //skip those without a test case
            }
            middle += `\n${att}=${attInfo[attInfo.length - 1]} `
        } else {
            middle += ` \n${att}="${attInfo[attInfo.length - 1]}" `
        }
    }

    let xml = ""
    if (el === 'screen') {
        xml = middle + " name='screen1'>\n" + tail
    } else {
        xml = `${head} \n ${middle} \n name="${el}1" /> ${tail}`
    }

    fs.writeFileSync("screen1.xml", xml)

    //////////////////////////////////////
    //Construct the JavaScript Code
    //////////////////////////////////////

    //PROPERTIES

    allAttributes = [].concat(element.properties)
    let tests = `require("./screen1Helper")\n\n`

    tests += `\n\ntestbox.text = testbox.text +"\\n\\n${el.toUpperCase()} READING AND WRITING TESTS\\n\\n"\n\n`

    for (let a = 0; a < allAttributes.length; a++) {
        let att = allAttributes[a]
        let attCase = att[0].toUpperCase() + att.substring(1, att.length)
        let attInfo = ATTRIBUTES[`${attCase}`]

        let test = attInfo

        if (typeof attInfo[attInfo.length - 1] === "string") {
            if (attInfo[attInfo.length - 1].startsWith("@")) {
                continue //skip those without a test case
            }
        }

        let print = attInfo[attInfo.length - 1]
        if (typeof print === "string") {
            print = print.replaceAll('"', "'")
        }

        tests += `testbox.text = testbox.text + "Setting ${el}1.${att} to ${print}\\n"\n`
        if (!element.codeNoWrite.includes(att)) {
            tests += `${el}1.${att} = ${attInfo[attInfo.length - 1]} \n`
        }

        if (!element.codeNoRead.includes(att)) {
            tests += `testbox.text = testbox.text + "Value after test => "+${el}1.${att} +"\\n"\n`
        }

        tests += "\n"
    }


    //METHODS
    tests +="\n//METHOD TESTS\n\n"

    for (let a = 0; a < element.methods.length; a++) {
        let method = element.methods[a]
        if (method === "addEventListener") { continue }    
        let detail = METHODS[method]
        if (detail.params.length === 0) { //no input parameters
            tests += `${el}1.${method}()\n`
        } else {
            tests += `${el}1.${method}(${detail.tests.join(", ")})\n`
        }

    }





    //EVENTS
    tests +="\n//EVENTS TESTS\n\n"

    for (let a = 0; a < element.events.length; a++) {
        let eventName = element.events[a]
        let template = `
${el}1.addEventListener(
    "${eventName}",
    function () {
        testnote.showAlert("Event detected: ${eventName} ")
    }
)
`
        tests += template
    }

    fs.writeFileSync("screen1.js", tests)

}


exports.run = main
exports.buildTest = buildTest
