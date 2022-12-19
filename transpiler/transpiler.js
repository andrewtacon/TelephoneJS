
const fs = require('fs')
const { parse, traverse } = require('abstract-syntax-tree')
const util = require('util')

let generatedCode = ""
function main(scripts, elements) {
    console.log("*** Transpiling scripts ***")
    generatedCode = ""

    for (const script of scripts) {
        let input = fs.readFileSync(script, "utf-8")
        transpile(input, elements)
    }

    console.log("*** Transpiling complete ***")

    console.log(generatedCode)
    return generatedCode

}

exports.run = main




function transpile(input, elements) {
    const tree = parse(input)
    //  console.log(util.inspect(tree, false, null, true)) // { type: 'Program', body: [ ... ] }

    traverse(tree, {
        enter(node) {
            let type = node.type
            if (type === "ExpressionStatment") { }
            else if (type === "CallExpression") {
                //object with method and property
                if (node.callee.property) {
                    if (node.callee.property.name === "addEventListener") {
                        let eventType = node.arguments[0].value
                        outputCode(`(define-event ${node.callee.object.name} ${caseManage(eventType)}() \n(set-this-form)`)
                    } else if (node.callee.property.name === "showAlert") {
                        let text = node.arguments[0].value
                        outputCode(`(call-component-method '${node.callee.object.name} '${caseManage(node.callee.property.name)} (*list-for-runtime* "${text}") '(text)`)

                    }
                }
                //function with arguments
                else {

                }
            }
        },
        leave(node) {
            let type = node.type
            if (type === "ExpressionStatement") { }
            else if (type === "CallExpression") {
                if (node.callee.property !== undefined) {
                    if (node.callee.property.name === "addEventListener") {
                        outputCode(`)`)
                    } else if (node.callee.property.name === "showAlert") {
                        outputCode(`)`)
                    }
                }
                //function with arguments
                else {

                }
            }
        }
    })

}

function outputCode(text) {
    generatedCode += text
}


function caseManage(text) {
    let out = ""
    for (const [key,value] of Object.entries(correctCases)) {
        if (value===text) {
            out = key
            break;
        }
    }
    return out
}

const correctCases = {
    "Click": "click",
    "ShowAlert": "showAlert"
}