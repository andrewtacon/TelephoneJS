
const fs = require('fs')
const { parse, traverse, walk } = require('abstract-syntax-tree')
const util = require('util')



let generatedCode = ""
let generatedGlobalsCode = ""
let variableStack = []

function main(scripts, elements) {
    console.log("*** Transpiling scripts ***")
    generatedCode = ""

    for (const script of scripts) {
        let input = fs.readFileSync(script, "utf-8")
        transpile(input, elements)
    }

    console.log("*** Transpiling complete ***")

    console.log(generatedGlobalsCode)
    console.log(generatedCode)
    return generatedCode
}

exports.run = main


//need to modify the structure of the AST because variable declarations in YAIL are block type statements
function modifyTree(tree) {

    let variableCount = 0
    let copy;
    let lastIndex = 0

    //this step
    // 1. labels the globals
    // 2. splits multiline variables into single lines
    walk(tree, (node, parent) => {
        if (node.type === "VariableDeclaration") {
            if (parent.type === "Program") {
                //globals
                node.body = "Global"
            }

            //if multiple defintions in the one line, this will be a problem
            //these need to be split into separate records
            if (node.declarations.length > 1) {
                let nodeIndex = parent.body.indexOf(node)
                for (let i = node.declarations.length - 1; i >= 1; i--) {
                    let copy = JSON.parse(JSON.stringify(node))
                    copy.declarations = []
                    copy.declarations.push(node.declarations[i])
                    node.declarations.pop()
                    parent.body.splice(nodeIndex + 1, 0, copy)
                }
            }
        }
    })

    //3. find all the globals and add them to the stack
    walk(tree, (node, parent) => {
        if (node.type === "VariableDeclaration") {
            if (node.body === "Global") {
                variableStack.push(
                    {
                        "type": "global",
                        "identifier": node.declarations[0].id.name
                    }
                )
            }
        }
    })


    //4. close the local variables
    walk(tree, (node, parent) => {
        if (node.type === "VariableDeclaration") {
            let endPoint = parent.body.length - variableCount


            if (node.body !== "Global") {
                lastIndex = parent.body.indexOf(node)
                copy = JSON.parse(JSON.stringify(node))
                copy.body = "Close"
                variableCount++

                if (parent.body[parent.body.length - 1].type === "VariableDeclaration") {
                    if (parent.body[parent.body.length - 1].body === "Close") {
                        parent.body.splice(endPoint, 0, copy)
                    } else {
                        //first close
                        parent.body.push(copy)
                    }
                } else {
                    //first closed variable
                    parent.body.push(copy)
                }

            }
        }

        if (parent !== null) {
            if (node.body !== "Global") {
                if (Array.isArray(parent.body)) {
                    if (parent.body.indexOf(node) === parent.body.length - 1 - variableCount) {
                        if (variableCount > 0) {
                            //    parent.body.push(copy)
                            if (parent.body[lastIndex + 1].type === "VariableDeclaration") {
                                parent.body[lastIndex].body = "LastVariableDeclaration"
                            }
                        }
                    }
                }
            }
        }

    })


    return tree
}




function transpile(input, elements) {
    let tree = parse(input)
    tree = modifyTree(tree)
    console.log(util.inspect(tree, false, null, true)) // { type: 'Program', body: [ ... ] }

    traverse(tree, {


        enter(node) {
            let type = node.type

            switch (type) {
                case "ExpressionStatement":
                    break;
                case "VariableDeclaration":
                    if (node.body === "Close") {
                        //ignore close
                        break;
                    } else if (node.body === "Global") {
                        for (let i = 0; i < node.declarations.length; i++) {
                            if (node.declarations[i].init.type === "Literal") {
                                let value = node.declarations[i].init.value
                                if (typeof node.declarations[i].init.value === "boolean") {   //need to adjust true and false in declaration to #t / #f to match YAIL syntax
                                    value = node.declarations[i].init.value ? '#t' : '#f'
                                }
                                outputGlobalsCode(`(def g$${node.declarations[i].id.name} ${value}`)
                            } else if (node.declarations[i].init.type === "Identifier") {
                                outputGlobalsCode(`(def $${node.declarations[i].id.name} (get-var g$${node.declarations[i].init.name})`)
                            }
                            //outputCode(`)\n`)

                        }
                        break;
                    } else {
                        //local variables
                        //for variables - need to see if they are the last element in the list, if so then add another close
                        outputCode(`(let\n`)
                        for (let i = 0; i < node.declarations.length; i++) {

                            variableStack.push(
                                {
                                    "type": "local",
                                    "identifier": node.declarations[i].id.name
                                }
                            )

                            if (node.declarations[i].init.type === "Literal") {
                                let value = node.declarations[i].init.value
                                if (typeof node.declarations[i].init.value === "boolean") {   //need to adjust true and false in declaration to #t / #f to match YAIL syntax
                                    value = node.declarations[i].init.value ? '#t' : '#f'
                                }
                                outputCode(`(($${node.declarations[i].id.name} ${value})\n`)
                            } else if (node.declarations[i].init.type === "Identifier") {
                                outputCode(`(($${node.declarations[i].id.name} (lexical-value $${node.declarations[i].init.name})\n`)
                            }
                            outputCode(`)\n`)
                            if (node.body === "LastVariableDeclaration") {
                                outputCode(`#f\n`)
                            }

                        }
                    }
                    break;
                case "CallExpression":
                    let elementName = node.callee.object.name

                    //check if a method is called on something
                    if (node.callee.property !== undefined) {
                        let methodCalled = node.callee.property.name
                        let args = JSON.parse(JSON.stringify(node.arguments))

                        /*  if (args) {
                              for (let i = 0; i < args.length; i++) {
                                  if (args[i].type === "Literal") {
                                    args[i] = args[i].value
                                  } else if (args[i].type === "Identifier") {
                                      args[i] = `(lexical-value $${args[i].name})`
                                  } else {
  
                                  }
                              }
                          }*/


                        //check if the method that is called is a legal method for this particular element type (refer to supplied elements list)
                        switch (methodCalled) {
                            case "addEventListener":
                                //TODO check element and type to make sure that the eventType is a legal event for that type of element/component
                                //args[0] here is the event type
                                outputCode(`(define-event ${elementName} ${camelCase(asString(args, 0))}() \n(set-this-form)`)
                                break;

                            //methods with no inputs - no return value
                            case "dismissProgressDialog":
                            case "launchPicker":
                            case "open":
                            case "refresh":
                                outputCode(`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime*) '()`)
                                break;

                            //methods with one instant in time input - no return value
                            case "setDateToDisplayFromInstant":
                                outputCode(`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${asInstantInTime(args, 0)}) '(InstantInTime)`)
                                break;

                            //methods with one text input - no return value
                            case "showAlert":
                            case "logInfo":
                            case "logWarning":
                            case "logError":
                                outputCode(`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${asText(args, 0)}) '(text)`)
                                break;

                            //methods with 2 text and an optional true/false (default true) - no return value
                            case "showPasswordDialog":
                            case "showTextDialog":
                                outputCode(`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${asText(args, 0)} ${asText(args, 1)} ${asBoolean(args, 2)}) '(text text boolean)`)
                                break;

                            //methods with 3 text inputs - no return value
                            case "showMessageDialog":
                                outputCode(`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${asText(args, 0)} ${asText(args, 1)} ${asText(args, 2)}) '(text text text))`)
                                break;

                            //methods with 3 numerical inputs - no return value
                            case "setDateToDisplay":
                                outputCode(`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${asNumber(args, 0)} ${asNumber(args, 1, 1, 12)} ${asNumber(args, 2, 1, 31)}) '(number number number))`)
                                break;


                            //methods with 4 text and an optional true/false (default true) - no return value
                            case "showChooseDialog":
                                outputCode(`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${asText(args, 0)} ${asText(args, 1)} ${asText(args, 2)} ${asText(args, 3)} ${asBoolean(args, 4)}) '(text text text text boolean))`)
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
                case "VariableDeclaration":
                    if (node.body === "Close") {
                        outputCode(`)`)
                        removeFromVariableStack(node.declarations[0])
                    } else if (node.body === "Global") {
                        outputGlobalsCode(`)\n`)
                    } else {
                        break;
                    }
                    break;

                case "CallExpression":
                    //check a method is actually called on something
                    if (node.callee.property !== undefined) {
                        let methodCalled = node.callee.property.name
                        switch (methodCalled) {
                            case "addEventListener":

                            //no inputs - no return value
                            case "dismissProgressDialog":
                            case "launchPicker":
                            case "open":
                            case "refresh":

                            //methods with one instant in time input - no return value
                            case "setDateToDisplayFromInstant":

                            //one text input - no return value
                            case "showAlert":
                            case "logInfo":
                            case "logWarning":
                            case "logError":

                            //two text and optional true/false input - no return value
                            case "showPasswordDialog":
                            case "showTextDialog":

                            //three text inputs - no return value
                            case "showMessageDialog":

                            //fours text inputs and optional true/false - no return value
                            case "showChooseDialog":
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



function asInstantInTime(args, index) {

}

function asNumber(args, index, min, max) {
    if (args[index] === undefined) { if (typeof min === "number") { return min } else { return 0 } } //return min or zero
    if (args[index].type === "Identifier") {
        return findVariableInStack(args[index].name)
    }
    if (typeof args[index].value === "number") {
        if (min && typeof min === 'number') { if (args[index].value < min) { return min } }
        if (max && typeof max === 'number') { if (args[index].value > max) { return max } }
        return args[index].value
    } else {
        return 0
    }

}

function asBoolean(args, index) {
    if (args[index] === undefined) { return '#t' } //true by default
    if (args[index].type === "Identifier") {
        return findVariableInStack(args[index].name)
    }
    if (typeof args[index].value === "boolean") {
        return args[index].value ? "#t" : "#f"
    } else {
        return '#t'
    }
}

function asString(args, index) {
    if (args[index] === undefined) { return `""` }
    if (args[index].type === "Literal") {
        return `${args[index].value}`
    }
}

function asText(args, index) {
    if (args[index] === undefined) { return `""` }

    if (args[index].type === "Literal") {
        return `"${args[index].value}"`
    } else if (args[index].type === "Identifier") {
        return findVariableInStack(args[index].name)
    } else {

    }
}


function outputCode(text) {
    generatedCode += text
}

function outputGlobalsCode(text) {
    generatedGlobalsCode += text
}


function camelCase(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1)
}

function removeFromVariableStack(declaration) {
    let name = declaration.id.name

    for (let i = variableStack.length - 1; i >= 0; i--) {
        if (variableStack[i].identifier === name && variableStack[i].type === "local") {
            variableStack.splice(i, 1)
            break
        }
    }
}

function findVariableInStack(name) {

    for (let i = variableStack.length - 1; i >= 0; i--) {
        if (variableStack[i].identifier === name && variableStack[i].type === "local") {
            return `(lexical-value $${name})`
        } else if (variableStack[i].identifier === name && variableStack[i].type === "global") {
            return `(get-var g$${name})`

        }
    }

    console.log(`Variable not found or not in scope: ${name}`)
}