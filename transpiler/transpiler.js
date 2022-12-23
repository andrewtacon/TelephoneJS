
const fs = require('fs')
const { parse, traverse, walk } = require('abstract-syntax-tree')
const util = require('util')

let debug = false

let generatedCode = ""
let generatedGlobalsCode = ""
let variableStack = []

function main(scripts, elements) {

    variableStack.push(...elements)


    console.log("*** Transpiling scripts ***")
    generatedCode = ""
    generatedGlobalsCode = ""

    for (const script of scripts) {
        let input = fs.readFileSync(script, "utf-8")
        generatedCode += transpile(input, elements)
    }

    console.log("*** Transpiling complete ***")
    generatedCode = generatedCode.replaceAll("\n\n", "\n")

    let opens = 0
    let closes = 0
    let backsOn = false
    for (let i = 0; i < generatedCode.length; i++) {
        if (generatedCode[i] === "(") { opens++; backsOn = false }
        if (generatedCode[i] === ")") { closes++ }
        if (generatedCode[i] === "\b" && !backsOn) {
            generatedCode = generatedCode.substring(0, i - 1) + generatedCode.substring(i)
            backsOn = true;
            closes += 2
        }

        if (generatedCode[i] === "\n") {
            for (let j = 0; j < opens - closes; j++) {
                generatedCode = generatedCode.substring(0, i + 1) + "\t" + generatedCode.substring(i + 1)
            }
        }
    }
    generatedCode = generatedCode.replaceAll("\b", "")

    if (debug) {
        console.log(generatedCode)
        process.exit(0)
    }

    return generatedCode
}

exports.run = main


//need to modify the structure of the AST because variable declarations in YAIL are block type statements
//don't need to float globals to the top - yay!
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

    let globals = []
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
    if (debug) {
        console.log(util.inspect(tree, false, null, true)) // { type: 'Program', body: [ ... ] }
    }
    let transpilation = transpileDeclarations(tree)

    return transpilation
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

        } else if (variableStack[i].type !== "global" && variableStack[i].type !== "local") {
            return name
        }
    }
    console.log(`Variable not found or not in scope: "${name}".`)
}




function transpileDeclarations(node) {

    let type
    let value
    let name
    let elements
    let properties

    if (node === undefined) {
        return
    }

    if (node.init === null) {
        return "#f"
    } else if (node.init === undefined) {
        type = node.type
        value = node.value
        name = node.name
        elements = node.elements
        properties = node.properties
    } else {
        type = node.init.type
        value = node.init.value
        name = node.init.name
        elements = node.init.elements
        properties = node.init.properties
    }


    switch (type) {

        case "Program":
            let ProgramCode = ""
            for (let n of node.body) {
                ProgramCode += transpileDeclarations(n)
            }
            return ProgramCode

        case "ExpressionStatement":
            return transpileDeclarations(node.expression) + "\n"

        case "Literal":
            if (typeof value === "string") { //need to do this first so that new booleans don't get quote marks
                value = `"${value}"`
            }
            if (typeof value === "boolean") {   //need to adjust true and false in declaration to #t / #f to match YAIL syntax
                value = value ? '#t' : '#f'
            }
            return value

        case "Identifier":
            if (name === "undefined") {
                return "#f"
            }
            let name2 = findVariableInStack(name)
            return name2

        case "ArrayExpression":

            let compile = ``
            let anys = ""
            for (let i = 0; i < elements.length; i++) {
                compile += transpileDeclarations(elements[i]) + " "
                anys += "any "
            }
            let arrayCode = `(call-yail-primitive make-yail-list (*list-for-runtime* ${compile}) '(${anys}) "make a list")`
            return arrayCode

        case "ObjectExpression":

            let objectCode = `(call-yail-primitive make-yail-dictionary (*list-for-runtime* `
            let pairs = ""

            for (let i = 0; i < properties.length; i++) {
                let key = `"${properties[i].key.name}"`
                let value = transpileDeclarations(properties[i].value) + " "

                let pairCode = `\n(call-yail-primitive make-dictionary-pair (*list-for-runtime* ${key} ${value} ) '(key any) "make a pair")`
                pairs += "pair "
                objectCode += pairCode

                if (i === properties.length - 1) {
                    objectCode += ")"
                }
            }

            if (properties.length === 0) {
                return `(call-yail-primitive make-yail-dictionary (*list-for-runtime* ) '() "make a dictionary")`
            }

            let tail = `\n'(${pairs}) \n"make a dictionary" )`
            objectCode += tail

            return objectCode


        case "VariableDeclaration":
            if (node.body === "Close") {
                removeFromVariableStack(node.declarations[0])
                return "\n\b)\n"
            } else {
                let VariableCode = ""
                if (node.body !== "Global") { VariableCode += (`(let `) }
                for (let i = 0; i < node.declarations.length; i++) {

                    if (node.body !== "Global") {
                        variableStack.push(
                            {
                                "type": "local",
                                "identifier": node.declarations[i].id.name
                            }
                        )
                    }

                    //recusively generate the declaration data for variables (recursive because arrays and objects can nest)
                    let data;
                    if (node.declarations[i].init) {
                        data = transpileDeclarations(node.declarations[i].init)
                    } else {
                        data = transpileDeclarations(node.declarations[i])
                    }

                    if (node.body === "Global") { VariableCode += (`(def g$${node.declarations[i].id.name} ${data})`) }
                    else { VariableCode += (`(($${node.declarations[i].id.name} ${data})`) }

                    if (node.body !== "Global") {
                        VariableCode += (`)`)
                        if (node.body === "LastVariableDeclaration") {
                            VariableCode += (`#f`)
                        }

                    }

                }
                // console.log(variableStack)
                return "\n" + VariableCode + "\n"
            }


        case "FunctionExpression":
            return transpileDeclarations(node.body)


        case "BlockStatement":
            let BlockStatementCode = ""
            for (let n of node.body) {
                BlockStatementCode += transpileDeclarations(n)
            }
            return BlockStatementCode

        case "CallExpression":

            let elementName = node.callee.object.name

            switch (elementName) {
                case "Math":

                    let MathOperator = ""
                    let MathCommandOperator = ""
                    switch (node.callee.property.name) {
                        case "sqrt": MathOperator = "sqrt"; MathCommandOperator = "sqrt"; break;
                        case "abs": MathOperator = "abs"; MathCommandOperator = "abs"; break;
                        case "log": MathOperator = "log"; MathCommandOperator = "log"; break;
                        case "exp": MathOperator = "exp"; MathCommandOperator = "exp"; break;
                        case "round": MathOperator = "yail-round"; MathCommandOperator = "round"; break;
                        case "ceil": MathOperator = "yail-ceiling"; MathCommandOperator = "ceiling"; break;
                        case "floor": MathOperator = "yail-floor"; MathCommandOperator = "floor"; break;
                        case "sin": MathOperator = "sin-degrees"; MathCommandOperator = "sin"; break;
                        case "cos": MathOperator = "cos-degrees"; MathCommandOperator = "cos"; break;
                        case "tan": MathOperator = "tan-degrees"; MathCommandOperator = "tan"; break;
                        case "asin": MathOperator = "asin-degrees"; MathCommandOperator = "asin"; break;
                        case "acos": MathOperator = "acos-degrees"; MathCommandOperator = "acos"; break;
                        case "atan": MathOperator = "atan-degrees"; MathCommandOperator = "atan"; break;
                        case "atan2": MathOperator = "atan2-degrees"; MathCommandOperator = "atan2"; break;
                        case "random": MathOperator = "random-fraction"; MathCommandOperator = "random fraction"; break;
                        case "min": MathOperator = "min"; MathCommandOperator = "min"; break;
                        case "max": MathOperator = "max"; MathCommandOperator = "max"; break;
                        case "range": MathOperator = "random-integer"; MathCommandOperator = "random integer"; break;
                        case "mod": MathOperator = "modulo"; MathCommandOperator = "modulo"; break;
                        case "quot": MathOperator = "quotient"; MathCommandOperator = "quotient"; break;
                        case "toDegrees": MathOperator = "radians->degrees"; MathCommandOperator = "convert radians to degrees"; break;
                        case "toRadians": MathOperator = "degrees->radians"; MathCommandOperator = "convert degrees to radians"; break;
                        case "randomSeed": MathOperator = "random-set-seed"; MathCommandOperator = "random set seed"; break;
                        default:
                            console.log(`Unknown Math operation: "${node.callee.property.name}" `)
                    }

                    switch (node.callee.property.name) {
                        case "min":
                        case "max":
                            let minMaxText = ""
                            let minMaxNumbers = ""
                            for (let mm = 0; mm < node.arguments.length; mm++) {
                                minMaxText += transpileDeclarations(node.arguments[mm]) + " "
                                minMaxNumbers += "number "
                            }
                            return `(call-yail-primitive ${MathOperator} (*list-for-runtime* ${minMaxText} ) '(${minMaxNumbers}) "${MathCommandOperator}")`

                        case "range":
                        case "atan2":
                        case "mod":
                        case "quot":
                            return `(call-yail-primitive ${MathOperator} (*list-for-runtime* ${transpileDeclarations(node.arguments[0])} ${transpileDeclarations(node.arguments[1])} ) '(number number) "${MathCommandOperator}")`

                        case "random":
                            return `(call-yail-primitive ${MathOperator} (*list-for-runtime*) '() "${MathCommandOperator}")`

                        default:
                            return `(call-yail-primitive ${MathOperator} (*list-for-runtime* ${transpileDeclarations(node.arguments[0])} ) '(number) "${MathCommandOperator}")`
                    }



                default:

                    //check if a method is called on something
                    if (node.callee.property !== undefined) {
                        let methodCalled = node.callee.property.name
                        let args = JSON.parse(JSON.stringify(node.arguments))

                        //check if the method that is called is a legal method for this particular element type (refer to supplied elements list)
                        switch (methodCalled) {
                            case "addEventListener":
                                //TODO check element and type to make sure that the eventType is a legal event for that type of element/component
                                //args[0] here is the event type
                                return (`(define-event ${transpileDeclarations(node.callee.object)} ${camelCase(asString(args, 0))}() (set-this-form) ${transpileDeclarations(args[1])})`)

                            //methods with no inputs - no return value
                            case "dismissProgressDialog":
                            case "launchPicker":
                            case "open":
                            case "refresh":
                                return (`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime*) '()`)

                            //methods with one instant in time input - no return value
                            case "setDateToDisplayFromInstant":
                                return (`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${asInstantInTime(args, 0)}) '(InstantInTime)`)

                            //methods with one text input - no return value
                            case "showAlert":
                            case "logInfo":
                            case "logWarning":
                            case "logError":
                                return (`\n(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])}) '(text))`)

                            //methods with 2 text and an optional true/false (default true) - no return value
                            case "showPasswordDialog":
                            case "showTextDialog":
                                return (`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(text text boolean)`)

                            //methods with 3 text inputs - no return value
                            case "showMessageDialog":
                                return (`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(text text text))`)

                            //methods with 3 numerical inputs - no return value
                            case "setDateToDisplay":
                                return (`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(number number number))`)

                            //methods with 4 text and an optional true/false (default true) - no return value
                            case "showChooseDialog":
                                return (`(call-component-method '${elementName} '${camelCase(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ${transpileDeclarations(args[3])} ${transpileDeclarations(args[4])}) '(text text text text boolean))`)

                            default:
                        }
                    }

            }
            break;

        case "BinaryExpression":


            let operator = ""
            let operatorCommand = ""

            let op
            let left
            let right
            if (node.init !== undefined) {
                op = node.init.operator
                left = node.init.left
                right = node.init.right
            } else {
                op = node.operator
                left = node.left
                right = node.right
            }

            switch (op) {
                case "+": operator = "+"; operatorCommand = "+"; break
                case "-": operator = "-"; operatorCommand = "-"; break
                case "*": operator = "*"; operatorCommand = "*"; break
                case "/": operator = "yail-divide"; operatorCommand = "yail-divide"; break
                case "**": operator = "expt"; operatorCommand = "expt"; break
                case "===": operator = "yail-equal?"; operatorCommand = "="; break
                case "==": operator = "yail-equal?"; operatorCommand = "="; break
                case "!==": operator = "yail-not-equal?"; operatorCommand = "not ="; break
                case "!=": operator = "yail-not-equal?"; operatorCommand = "not ="; break
                case ">": operator = ">"; operatorCommand = ">"; break
                case ">=": operator = ">="; operatorCommand = ">="; break
                case "<": operator = "<"; operatorCommand = "<"; break
                case "<=": operator = "<="; operatorCommand = "<="; break
                case "&": operator = "bitwise-and"; operatorCommand = "bitwise-and"; break
                case "|": operator = "bitwise-ior"; operatorCommand = "bitwise-ior"; break
                case "^": operator = "bitwise-xor"; operatorCommand = "bitwise-xor"; break
                default:
                    console.log(`Unknown binary operator "${JSON.stringify(op)}". Panic!`)
            }

            return `(call-yail-primitive ${operator} (*list-for-runtime* ${transpileDeclarations(left)} ${transpileDeclarations(right)} ) '(number number ) "${operatorCommand}")`


            break;
        case "UnaryExpression":

            let UnaryOperator = ""
            let UnaryOperatorCommand = ""

            let uop
            let uarg
            if (node.init !== undefined) {
                uop = node.init.operator
                uarg = node.init.argument
            } else {
                uop = node.operator
                uarg = node.argument
            }

            switch (uop) {
                case "+":
                    return `${transpileDeclarations(uarg)}`
                case "-":
                    return `(call-yail-primitive - (*list-for-runtime* ${transpileDeclarations(uarg)} ) '(number ) "negate")`
                case "!":
                    return `(call-yail-primitive yail-not (*list-for-runtime* ${transpileDeclarations(uarg)} ) '(boolean ) "not")`
                default:
                    console.log(`Unknown unary operator "${JSON.stringify(op)}". Panic!`)
            }

            /*
                Unary   - (negate) + (ignore?)
                (def g$identifier (call-yail-primitive - (*list-for-runtime* -1) '(number) "negate"))                       -
                (def g$identifier (call-yail-primitive yail-not (*list-for-runtime* #t) '(boolean) "not"))                  !   //only works with boolean

              


                (def g$identifier (call-yail-primitive remainder (*list-for-runtime* 0 1) '(number number) "remainder"))     a%b


                (def g$identifier (call-yail-primitive format-as-decimal (*list-for-runtime* 0 2) '(number number) "format as decimal"))   //2 is number of places     number.toFixed(places) 
                (def g$identifier (call-yail-primitive is-number? (*list-for-runtime* 0) '(text) "is a number?"))           !isNaN(value)

                //extra features


                ?? (def g$identifier (call-yail-primitive is-base10? (*list-for-runtime* 0) '(text) "is base10?")) 
                ?? (def g$identifier (call-yail-primitive is-hexadecimal? (*list-for-runtime* 0) '(text) "is hexadecimal?"))
                ?? (def g$identifier (call-yail-primitive is-binary? (*list-for-runtime* 0) '(text) "is binary?"))
                ?? (def g$identifier (call-yail-primitive math-convert-dec-hex (*list-for-runtime* 0) '(text) "convert Dec to Hex"))
                ?? (def g$identifier (call-yail-primitive math-convert-hex-dec (*list-for-runtime* 0) '(text) "convert Hex to Dec"))
                ?? (def g$identifier (call-yail-primitive math-convert-dec-bin (*list-for-runtime* 0) '(text) "convert Dec to Hex"))
                ?? (def g$identifier (call-yail-primitive math-convert-bin-dec (*list-for-runtime* 0) '(text) "convert Hex to Dec"))




            */

            break;
        default:

    }

}