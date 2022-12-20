
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
    // console.log(util.inspect(tree, false, null, true)) // { type: 'Program', body: [ ... ] }

    traverse(tree, {



        enter(node) {
            let type = node.type
            switch (type) {
                case "ExpressionStatement":
                    break;
                case "CallExpression":
                    let elementName = node.callee.object.name

                    //check if a method is called on something
                    if (node.called.property !== undefined) {
                        let methodCalled = node.callee.property.name
                        //check if the method that is called is a legal method for this particular element type (refer to supplied elements list)
                        switch (methodCalled) {
                            case "addEventListener":
                                let eventType = node.arguments[0].value
                                //TODO check element and type to make sure that the eventType is a legal event for that type of element/component
                                outputCode(`(define-event ${elementName} ${camelCase(eventType)}() \n(set-this-form)`)
                                break;
                            case "showAlert":
                                let messageText = node.arguments[0].value
                                outputCode(`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* "${messageText}") '(text)`)
                                break;
                            default:
                        }
                    }

                default:
            }

        },



        leave(node) {
            let type = node.type

            switch (type) {
                case "ExpressionStatement":
                    break;
                case "CallExpression":
                    //check a method is actually called on something
                    if (node.callee.property !== undefined) {
                        let methodCalled = node.callee.property.name
                        switch (methodCalled) {
                            case "addEventListener":
                            case "showAlert":
                                outputCode(`)`)
                                break;
                            default:
                        }
                    }
                    break;
                default:
            }

        }
    })

}






function outputCode(text) {
    generatedCode += text
}

function camelCase(text) {
    return text[0].toUpperCase() + text.substring(1)
}
