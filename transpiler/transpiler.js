/*

Hard problems:
1. Logical operators like NOT to evaluate correctly
2. Format as decimal (.toFixed)
                (def g$identifier (call-yail-primitive format-as-decimal (*list-for-runtime* 0 2) '(number number) "format as decimal"))   //2 is number of places     number.toFixed(places) 
                (def g$identifier (call-yail-primitive is-number? (*list-for-runtime* 0) '(text) "is a number?"))           !isNaN(value)

    /*
        REPL features skipped
        //extra features
        ?? (def g$identifier (call-yail-primitive is-base10? (*list-for-runtime* 0) '(text) "is base10?")) 
        ?? (def g$identifier (call-yail-primitive is-hexadecimal? (*list-for-runtime* 0) '(text) "is hexadecimal?"))
        ?? (def g$identifier (call-yail-primitive is-binary? (*list-for-runtime* 0) '(text) "is binary?"))
        ?? (def g$identifier (call-yail-primitive math-convert-dec-hex (*list-for-runtime* 0) '(text) "convert Dec to Hex"))
        ?? (def g$identifier (call-yail-primitive math-convert-hex-dec (*list-for-runtime* 0) '(text) "convert Hex to Dec"))
        ?? (def g$identifier (call-yail-primitive math-convert-dec-bin (*list-for-runtime* 0) '(text) "convert Dec to Hex"))
        ?? (def g$identifier (call-yail-primitive math-convert-bin-dec (*list-for-runtime* 0) '(text) "convert Hex to Dec"))
    */




const fs = require('fs')
const { parse, walk } = require('abstract-syntax-tree')
const util = require('util')
const procedures = require("./procedures.js")

const { ELEMENTS } = require("../yailMaker/elements")
const ATTRIBUTES = require("../yailMaker/attributes")

let debug = true

let generatedCode = ""
let generatedGlobalsCode = ""
let globalStack = []
let variableStack = []

let proceduresUsed = new Set()

function main(scripts, elements) {

    for (let i = 0; i < elements.length; i++) {
        elements[i].scope = "component"
    }

    globalStack.push(...elements)


    console.log("*** Transpiling scripts ***")
    generatedCode = ""
    generatedGlobalsCode = ""

    for (const script of scripts) {
        let input = fs.readFileSync(script, "utf-8")
        generatedCode += transpile(input, elements)
    }

    console.log("*** Transpiling complete ***")

    /*
    let gcode = generatedCode.split("\n")
    for (let i = gcode.length - 1; i >= 0; i--) {
        if (gcode[i].length === 0) {
            gcode.splice(i, 1)
        } else {
            gcode[i] = gcode[i].trim()
        }
    }

    generatedCode = gcode.join("")

    //  generatedCode = generatedCode.replaceAll("\n\n", "\n")
    //  generatedCode = generatedCode.replaceAll("\t", "")

    /*
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
                generatedCode = generatedCode.substring(0, i + 1) + "" + generatedCode.substring(i + 1)
            }
        }
    }
    generatedCode = generatedCode.replaceAll("\b", "")
*/

    if (debug) {
        console.log(generatedCode)
        process.exit(0)
    }

    //let procedures = fs.readFileSync("transpiler/procedures.scm", "utf-8")
    let procedures = ""
    proceduresUsed.forEach(
        function (value) {
            while (value.indexOf("\n") !== -1) {
                value = value.replaceAll("\n", " ")
            }
            while (value.indexOf("  ") !== -1) {
                value = value.replaceAll("  ", " ")
            }

            procedures += value + "\n"
        }
    )
    generatedCode = ";;Procedures\n" + procedures + "\n\n;;Transpiled Code\n" + generatedCode

    return generatedCode
}

exports.run = main


//need to modify the structure of the AST because variable declarations in YAIL are block type statements
//don't need to float globals to the top - yay!
function modifyTree(tree) {

    let variableCount = 0
    let copy;
    let lastIndex = 0

    //refactor for loops as a block with a while loop in it
    walk(tree, (node, parent) => {

        if (node.type === "ForStatement") {
            node.type = "BlockStatement"
            node.newbody = []
            node.newbody.push(node.init)
            let newWhileStatement = {
                type: 'WhileStatement',
                test: { type: 'Literal', value: true },
                body: { type: 'BlockStatement', body: [] }
            }
            newWhileStatement.test = node.test
            newWhileStatement.body.body.push(...node.body.body)
            newWhileStatement.body.body.push(node.update)
            node.newbody.push(newWhileStatement)
            node.body = node.newbody
            delete node.newbody
            delete node.init
            delete node.test
            delete node.update
        }
    })


    //this step
    // 1. labels the globals
    // 2. splits multiline variables into single lines
    walk(tree, (node, parent) => {
        if (node.type === "VariableDeclaration") {
            if (parent.type === "Program") {
                //globals
                node.isGlobal = "true"
            }

            //if multiple defintions in the one line, this will be a problem
            //these need to be split into separate records

            if (node.declarations.length > 1 && Array.isArray(parent.body)) {
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

    //2.5 find all variables that declare functions like   `let a = function(){...}`  and turn these into normal function declarations
    walk(tree, (node, parent) => {
        if (node.type === "VariableDeclaration") {
            if (node.declarations[0].init.type === "FunctionExpression") {
                node.type = "FunctionDeclaration"
                node.id = node.declarations[0].id
                node.params = node.declarations[0].init.params
                node.async = node.declarations[0].init.async
                node.generator = node.declarations[0].init.generator
                node.body = node.declarations[0].init.body
                delete node.kind
                delete node.declarations
                if (node.isGlobal) (delete node.isGlobal)
            }
        }
    })



    //3. find all the globals and add them to the stack
    walk(tree, (node, parent) => {
        if (node.type === "VariableDeclaration") {
            if (node.isGlobal === "true") {
                globalStack.push(
                    {
                        "scope": "global",
                        "identifier": node.declarations[0].id.name
                    }
                )

            }
        }
        if (node.type === "FunctionDeclaration") {
            if (node.isGlobal === "true") {
                globalStack.push(
                    {
                        "scope": "global",
                        "identifier": node.declarations[0].id.name,
                        "type": "procedure"
                    }
                )

            }
        }

    })

    //3.5 hoist the functions
    function hoistFunctions(node) {
        for (let [key, value] of Object.entries(node)) {
            if (typeof value === 'object') {
                if (value !== null) {
                    hoistFunctions(value)
                }
            }
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].type === "FunctionDeclaration") {
                        value.unshift(value.splice(i, 1))
                    }
                }
            }
        }
    }

    hoistFunctions(tree)


    //4 next the local variables
    function nestVariables(node) {
        if (node.isGlobal === "true") return  //ignore global variables

        for (let [key, value] of Object.entries(node)) {
            if (typeof value === 'object') {
                if (value !== null) {
                    nestVariables(value)
                }
            }
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].type === "VariableDeclaration" && value[i].isGlobal !== 'true') {
                        value[i].body = [].concat(value.splice(i + 1))
                        nestVariables(value[i])
                        break;
                    }
                }

            }
        }
    }

    nestVariables(tree)


    /*
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
    */

    return tree
}




function transpile(input, elements) {
    let tree = parse(input)
    tree = modifyTree(tree)

    variableStack.push(globalStack)

    if (debug) {
        console.log(util.inspect(tree, false, null, true)) // { type: 'Program', body: [ ... ] }
    }
    let transpilation = transpileDeclarations(tree)

    return transpilation
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

function removeFromVariableStack(declaration, isActualName = false) {

    let name
    if (isActualName) {
        name = declaration
    } else {
        declaration.id.name
    }

    let currentStack = variableStack[variableStack.length - 1]

    for (let i = currentStack.length - 1; i >= 0; i--) {
        if (currentStack[i].identifier === name && currentStack[i].scope === "local") {
            currentStack.splice(i, 1)
            break
        }
    }
}

function findVariableInStack(name) {

    let currentStack = variableStack[variableStack.length - 1]
    for (let i = currentStack.length - 1; i >= 0; i--) {
        if (currentStack[i].identifier === name && currentStack[i].scope === "local") {
            return `(lexical-value $${name})`
        } else if (currentStack[i].identifier === name && currentStack[i].scope === "global") {
            return `(get-var g$${name})`

        } else if (currentStack[i].scope !== "global" && currentStack[i].scope !== "local") {
            return name
        } else if (currentStack[i].name === name && currentStack[i].scope === "component") {
            return currentStack[i]
        }
    }
    console.log(`Variable not found or not in scope: "${name}".`)
}

function transpileDeclarations(node) {

    if (Array.isArray(node)) {
        console.log("processing array")
        let output = ""
        for (let nn = 0; nn < node.length; nn++) {
            output += transpileDeclarations(node[nn]) + "\n"
        }
        return output
    }

    let type
    let value
    let name
    let elements
    let properties

    if (node === undefined) {
        return
    }


    type = node.type
    value = node.value
    name = node.name
    elements = node.elements
    properties = node.properties

    //   console.log(type)

    switch (type) {

        case "ArrayExpression":

            let compile = ``
            let anys = ""
            for (let i = 0; i < elements.length; i++) {
                compile += transpileDeclarations(elements[i]) + " "
                anys += "any "
            }
            let arrayCode = `(call-yail-primitive make-yail-list (*list-for-runtime* ${compile}) '(${anys}) "make a list")`
            return `${arrayCode}`

        case "AssignmentExpression":        //this feels pretty clumsy


            isAssigning = true
            let AssignmentExpressionLeft = node.left
            let AssignmentExpressionRight = node.right

            if (AssignmentExpressionLeft.type === "MemberExpression") {
                AssignmentExpressionLeft.type = "MemberExpressionSet"
            }
            AssignmentExpressionLeft.assignedRight = AssignmentExpressionRight     //need to send the right hand side on for insertion later on 

            AssignmentExpressionLeft = transpileDeclarations(AssignmentExpressionLeft)
            if (AssignmentExpressionLeft.startsWith("(get-var ")) {  //this is string, numbers and bools (simple cases)
                AssignmentExpressionLeft = AssignmentExpressionLeft.substring(8, AssignmentExpressionLeft.length - 1)
                return `(set-var! ${AssignmentExpressionLeft} ${transpileDeclarations(AssignmentExpressionRight)}  )`
            } else if (AssignmentExpressionLeft.startsWith("(lexical-value ")) {
                AssignmentExpressionLeft = AssignmentExpressionLeft.substring(15, AssignmentExpressionLeft.length - 1)
                return `(set! ${AssignmentExpressionLeft} ${transpileDeclarations(AssignmentExpressionRight)}  )`
            } else {
                return AssignmentExpressionLeft
            }


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
                case "+":
                    operator = "+";
                    operatorCommand = "+";
                    proceduresUsed.add(procedures.add)
                    return `(add ${transpileDeclarations(left)} ${transpileDeclarations(right)})`
                case "-":
                    operator = "-";
                    operatorCommand = "-";
                    break
                case "*":
                    operator = "*";
                    operatorCommand = "*";
                    break
                case "/":
                    operator = "yail-divide";
                    operatorCommand = "yail-divide";
                    break
                case "**":
                    operator = "expt";
                    operatorCommand = "expt";
                    break
                case "===":     //this is not correct - there should be type checking but not going to bother
                case "==":
                    operator = "yail-equal?";
                    operatorCommand = "=";
                    return `(equal? ${transpileDeclarations(left)} ${transpileDeclarations(right)})`
                case "!==":     //this is not correct - there should be type checking
                case "!=":
                    operator = "yail-not-equal?";
                    operatorCommand = `"not ="`;
                    return `(not (equal? ${transpileDeclarations(left)} ${transpileDeclarations(right)} ))`
                case "<":
                    proceduresUsed.add(procedures.lt)
                    return `((get-var lt) ${transpileDeclarations(left)} ${transpileDeclarations(right)})`
                case ">":
                    proceduresUsed.add(procedures.gt)
                    return `((get-var gt) ${transpileDeclarations(left)} ${transpileDeclarations(right)})`
                case ">=":
                    operator = "yail-equal?";
                    operatorCommand = "=";
                    proceduresUsed.add(procedures.gt)
                    return `(or ((get-var gt) ${transpileDeclarations(left)} ${transpileDeclarations(right)}) (equal? ${transpileDeclarations(left)} ${transpileDeclarations(right)} ))`
                case "<=":
                    operator = "yail-equal?";
                    operatorCommand = "=";
                    proceduresUsed.add(procedures.lt)
                    return `(or ((get-var lt) ${transpileDeclarations(left)} ${transpileDeclarations(right)}) (equal? ${transpileDeclarations(left)} ${transpileDeclarations(right)} ))`
                case "&": operator = "bitwise-and"; operatorCommand = "bitwise-and"; break
                case "|": operator = "bitwise-ior"; operatorCommand = "bitwise-ior"; break
                case "^": operator = "bitwise-xor"; operatorCommand = "bitwise-xor"; break
                case "%": operator = "remainder"; operatorCommand = "remainder"; break
                default:
                    console.log(`Unknown binary operator "${JSON.stringify(op)}". Panic!`)
            }

            return `(call-yail-primitive ${operator} (*list-for-runtime* ${transpileDeclarations(left)} ${transpileDeclarations(right)} ) '(number number ) "${operatorCommand}")`


            break;

        case "BlockStatement":
            return transpileDeclarations(node.body)

        case "BreakStatement":
            return `(*yail-break* #f)`


        case "CallExpression":

            //this is a call to a function with or with variables
            if (node.callee.type === "Identifier") {

                //these are the system functions

                switch (node.callee.name) {
                    case "require":
                        return ""   //ignore require for now - this is so can use the helper file
                    case "getStartValue":
                        return `(call-yail-primitive get-start-value (*list-for-runtime* ) '() "get start value")`
                    case "getInitMessage":
                        return `(call-yail-primitive get-plain-start-text (*list-for-runtime* ) '() "get plain start text")`
                    case "openScreen":
                        if (node.arguments.length === 1) {
                            return `(call-yail-primitive open-another-screen (*list-for-runtime* "${transpileDeclarations(node.arguments[0])}") '(text) "open another screen")`
                        } else if (node.arguments.lenth === 2) {
                            return `(call-yail-primitive open-another-screen-with-start-value (*list-for-runtime* "${transpileDeclarations(node.arguments[0])}" ${transpileDeclarations(node.arguments[1])}) '(text any) "open another screen with start value")`
                        } else {
                            console.log("No destination screen given from call to openScreen")
                            return ""
                        }
                    case "closeScreen":
                        if (node.arguments.length === 0) {
                            return `(call-yail-primitive close-screen (*list-for-runtime* ) '() "close screen")`
                        } else {
                            return `(call-yail-primitive close-screen-with-value (*list-for-runtime* ${transpileDeclarations(node.arguments[0])}) '(any) "close screen with value")`
                        }
                    case "closeApplication":
                        return `(call-yail-primitive close-application (*list-for-runtime* ) '() "close application")`
                    case "closeApplicationWithMessage":
                        return `(call-yail-primitive close-screen-with-plain-text (*list-for-runtime* ${transpileDeclarations(node.arguments[0])}) '(text) "close screen with plain text")`
                    default:
                        let CEargs = ""
                        for (i = 0; i < node.arguments.length; i++) {
                            CEargs += transpileDeclarations(node.arguments[i]) + " "
                        }
                        return `((get-var p$${node.callee.name}) ${CEargs})`
                }
            }



            //whilst a "CallExpression" does contain a "MemberExpression" in the callee, the "MemberExpression" is stepped over because
            //I think (currently) it is easier to deal with things this way
            let elementName = node.callee.object.name

            //console.log("Call expression on element: " + elementName)

            switch (elementName) {
                case "Math":

                    let MathOperator = ""
                    let MathCommandOperator = ""
                    let MathMethod = node.callee.property.name
                    switch (MathMethod) {
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

                    switch (MathMethod) {
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

                //END OF MATH

                case "Array":
                    let ArrayMethod = node.callee.property.name
                    switch (ArrayMethod) {
                        case "isArray":
                            return `(isList ${transpileDeclarations(node.arguments[0])})`

                    }
                    break;

                case "Object":
                    let ObjectMethod = node.callee.property.name

                    switch (ObjectMethod) {
                        case "assign":
                            return `(call-yail-primitive yail-dictionary-combine-dicts (*list-for-runtime* ${transpileDeclarations(node.arguments[0])} ${transpileDeclarations(node.arguments[1])} ) '(dictionary dictionary)  "combine 2 dictionaries")`
                        case "create":
                            return `
                            (let 
                                ( (temp (call-yail-primitive make-yail-dictionary (*list-for-runtime* ) '() "make a dictionary")  ))   
                                (call-yail-primitive yail-dictionary-combine-dicts (*list-for-runtime* (lexical-value temp) ${transpileDeclarations(node.arguments[0])} ) '(dictionary dictionary)  "combine 2 dictionaries") 
                                temp
                            )
                            `
                        case "entries":
                            return `(call-yail-primitive yail-dictionary-dict-to-alist (*list-for-runtime* ${transpileDeclarations(node.arguments[0])} ) '(dictionary)  "convert a dictionary to an alist")`
                        case "fromEntries":
                            return `(call-yail-primitive yail-dictionary-alist-to-dict (*list-for-runtime* ${transpileDeclarations(node.arguments[0])} ) '(list)  "convert an alist to a dictionary")`
                        case "hasOwn":
                            return `(call-yail-primitive yail-dictionary-is-key-in (*list-for-runtime* ${transpileDeclarations(node.arguments[1])} ${transpileDeclarations(node.arguments[0])} ) '(key dictionary)  "is key in dict?")`
                        case "keys":
                            return `(call-yail-primitive yail-dictionary-get-keys (*list-for-runtime* ${transpileDeclarations(node.arguments[0])}) '(dictionary) "get a dictionary's keys")`
                        case "values":
                            return `(call-yail-primitive yail-dictionary-get-values (*list-for-runtime* ${transpileDeclarations(node.arguments[0])}) '(dictionary) "get a dictionary's values")`
                    }
                    break;


                default:

                    //if not MATH then a variable so find variable type and work based off that
                    //components have built in fixed methods
                    //other variable types have different methods

                    let isVariableOfType = undefined
                    let isVariableOfScope = undefined
                    let currentStack = variableStack[variableStack.length - 1]
                    for (let i = currentStack.length - 1; i >= 0; i--) {
                        if (currentStack[i].name === elementName || currentStack[i].identifier === elementName) {
                            isVariableOfType = currentStack[i].type
                            isVariableOfScope = currentStack[i].scope
                            break
                        }
                    }

                    switch (isVariableOfScope) {
                        case "component":

                            //check if a method is called on something
                            if (node.callee.property !== undefined) {
                                let methodCalled = node.callee.property.name
                                let args = JSON.parse(JSON.stringify(node.arguments))


                                //check if the method that is called is a legal method for this particular element type (refer to supplied elements list)
                                switch (methodCalled) {
                                    case "addEventListener":
                                        //TODO check element and type to make sure that the eventType is a legal event for that type of element/component
                                        //args[0] here is the event type
                                        
                                        let params = ""
                                        for (let i=0; i< args[1].params.length;i++){
                                            params +=args[1].params[i].name+" "
                                        }
                                        return (`(define-event ${transpileDeclarations(node.callee.object)} ${camelCase(asString(args, 0))}(${params.trim()}) (set-this-form) ${transpileDeclarations(args[1])})`)

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
                                        return (`\n(call-component-method '${elementName} '${camelCase(methodCalled)}  (*list-for-runtime*  ${transpileDeclarations(args[0])} )  '(text))`)

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
                            } // case "component"

                        default:
                            //for global and local variables
                            if (node.callee.property !== undefined) {
                                let methodCalled = node.callee.property.name
                                let args = JSON.parse(JSON.stringify(node.arguments))

                                //check if the method that is called is a legal method for this particular element type (refer to supplied elements list)

                                switch (methodCalled) {
                                    //methods for strings
                                    case "at":
                                        proceduresUsed.add(procedures.at)
                                        proceduresUsed.add(procedures.isList)
                                        let atassign = transpileDeclarations(node.callee.object)
                                        //if (atassign.startsWith("(get-var ")){atassign = atassign.substring(8, atassign.length-1)}
                                        return `(at ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])})`
                                        return `
                                             (cond
                                                ((string? ${transpileDeclarations(node.callee.object)})(at ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])})) 
                                                ((isList ${transpileDeclarations(node.callee.object)}) (call-yail-primitive yail-list-get-item (*list-for-runtime* ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])}) '(list number) "select list item"))                                                    
                                                (else #f)
                                             )`
                                    case "charAt":
                                        proceduresUsed.add(procedures.char_at)
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(char-at ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])}) #f)`
                                        break;
                                    case "charCodeAt":
                                        proceduresUsed.add(procedures.char_code_at)
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(char-code-at ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])}) #f)`
                                    case "concat":
                                        proceduresUsed.add(procedures.isList)
                                        proceduresUsed.add(procedures.listAppend)

                                        let concatArgs = ""
                                        for (let concatArgCount = 0; concatArgCount < args.length; concatArgCount++) {
                                            concatArgs += transpileDeclarations(args[concatArgCount])
                                            if (concatArgCount != args.length - 1) {
                                                concatArgs += " "
                                            }
                                        }

                                        let concatList = ""
                                        for (let concatArgCount = 0; concatArgCount < args.length; concatArgCount++) {
                                            concatList += `(listAppend (lexical-value tempList) ${transpileDeclarations(args[concatArgCount])})`
                                        }
                                        concatList = `(listAppend (lexical-value tempList) ${transpileDeclarations(node.callee.object)})` + concatList

                                        return `(if 
                                                    (string? ${transpileDeclarations(node.callee.object)})
                                                    (string-append ${transpileDeclarations(node.callee.object)} ${concatArgs}) 
                                                    (if
                                                        (isList ${transpileDeclarations(node.callee.object)})
                                                        (begin
                                                            (let
                                                                ((tempList (call-yail-primitive make-yail-list (*list-for-runtime* ) '() "make a list") ))  
                                                                (begin
                                                                    ${concatList} 
                                                                    tempList
                                                                )
                                                            )
                                                        )
                                                        #f    
                                                    )
                                                )`

                                    case "copyWithin":
                                        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin        

                                        break;
                                    case "endsWith":
                                        proceduresUsed.add(procedures.endsWith)
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(endsWith ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])}) #f)`
                                    case "fromCharCode":
                                        let fromCharCodeArgs = ""
                                        for (let fromCharCodeArgCount = 0; fromCharCodeArgCount < args.length; fromCharCodeArgCount++) {
                                            fromCharCodeArgs += `(integer->char ${transpileDeclarations(args[fromCharCodeArgCount])})`
                                            if (fromCharCodeArgCount != args.length - 1) {
                                                fromCharCodeArgs += " "
                                            }
                                        }
                                        return `(if 
                                                    (string=? ${transpileDeclarations(node.callee.object)} String)
                                                    (string ${fromCharCodeArgs}) 
                                                    "not the string"
                                                )`
                                    case "includes":
                                        proceduresUsed.add(procedures.isList)
                                        return `(if 
                                                    (string? ${transpileDeclarations(node.callee.object)})
                                                    (string-contains ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])}) 
                                                    (if
                                                        (isList ${transpileDeclarations(node.callee.object)})
                                                        (if  
                                                            (> (call-yail-primitive yail-list-index (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(node.callee.object)}) '(any list) "index in list") 0)
                                                            #t
                                                            #f
                                                        )
                                                        #f
                                                    )
                                                )`
                                    case "indexOf":
                                        proceduresUsed.add(procedures.indexOf)
                                        proceduresUsed.add(procedures.isList)
                                        return `(if 
                                                    (string? ${transpileDeclarations(node.callee.object)})
                                                    (indexOf ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])}    ) 
                                                    (if
                                                        (isList ${transpileDeclarations(node.callee.object)})
                                                        (- (call-yail-primitive yail-list-index (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(node.callee.object)}) '(any list) "index in list") 1)
                                                        -1
                                                    )
                                                )`
                                    case "join":
                                        proceduresUsed.add(procedures.isList)
                                        let joiner = `","`
                                        if (args.length > 0) {
                                            joiner = transpileDeclarations(args[0])
                                        }
                                        return `
                                        (if 
                                            (isList ${transpileDeclarations(node.callee.object)})
                                            (call-yail-primitive yail-list-join-with-separator (*list-for-runtime* ${transpileDeclarations(node.callee.object)} ${joiner}) '(list text) "join with separator")
                                            #f
                                        )
                                        `


                                    case "lastIndexOf":
                                        proceduresUsed.add(procedures.lastIndexOf)
                                        return `(if 
                                                    (string? ${transpileDeclarations(node.callee.object)})
                                                    (lastIndexOf ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])}    ) 
                                                    -1
                                                )`
                                    case "padEnd":
                                        proceduresUsed.add(procedures.padEnd)
                                        return `(if
                                                    (string? ${transpileDeclarations(node.callee.object)})
                                                    (padEnd ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])})
                                                    ${transpileDeclarations(node.callee.object)}
                                                )

                                        `
                                    case "padStart":
                                        proceduresUsed.add(procedures.padStart)
                                        return `(if
                                                    (string? ${transpileDeclarations(node.callee.object)})
                                                    (padStart ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])})
                                                    ${transpileDeclarations(node.callee.object)}
                                                )

                                        `

                                    case "pop":
                                        return `
                                                (let
                                                    ((temp (call-yail-primitive yail-list-get-item (*list-for-runtime* ${transpileDeclarations(node.callee.object)} (length ${transpileDeclarations(node.callee.object)} "")) '(list number) "select list item")))
                                                    (call-yail-primitive yail-list-remove-item! (*list-for-runtime* ${transpileDeclarations(node.callee.object)} (length ${transpileDeclarations(node.callee.object)} "")) '(list number) "remove list item")
                                                    temp
                                                )
                                                `

                                    case "push":
                                        let pushes = ""
                                        for (let push = 0; push < args.length; push++) {
                                            pushes += `(call-yail-primitive yail-list-add-to-list! (*list-for-runtime* ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[push])} ) '(list any ) "add items to list") `
                                        }
                                        return `
                                            (begin                    
                                                ${pushes}        
                                                (length ${transpileDeclarations(node.callee.object)} "")
                                            )
                                            `


                                    case "repeat":
                                        proceduresUsed.add(procedures.repeat)
                                        return `(if
                                            (string? ${transpileDeclarations(node.callee.object)})
                                            (repeat ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])})
                                            ${transpileDeclarations(node.callee.object)}
                                        )`
                                    case "replace":
                                        if (args.length < 2) {
                                            console.log(`Error: ".replace()" require two arguments.`)
                                            return
                                        }
                                        proceduresUsed.add(procedures.add)
                                        proceduresUsed.add(procedures.indexOf)
                                        proceduresUsed.add(procedures.replace)
                                        return `(if
                                            (string? ${transpileDeclarations(node.callee.object)})
                                            (replace ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])})
                                            ${transpileDeclarations(node.callee.object)}
                                        )`
                                    case "replaceAll":
                                        return `(call-yail-primitive string-replace-all 
                                                    (*list-for-runtime* 
                                                        ${transpileDeclarations(node.callee.object)}
                                                        ${transpileDeclarations(args[0])}
                                                        ${transpileDeclarations(args[1])}
                                                    ) 
                                                    '(text text text) 
                                                    "replace all"
                                                )`

                                    case "reverse":
                                        let reversee = `${transpileDeclarations(node.callee.object)}`
                                        if (reversee.startsWith("(get-var ")) {  //this is string, numbers and bools (simple cases)
                                            reversee = reversee.substring(8, reversee.length - 1)
                                            return `
                                            (set-var!
                                                ${reversee}
                                                (call-yail-primitive yail-list-reverse (*list-for-runtime* ${transpileDeclarations(node.callee.object)} ) '(list) "reverse list")
                                            )
                                            `

                                        } else if (reversee.startsWith("(lexical-value ")) {
                                            reversee = reversee.substring(15, reversee.length - 1)
                                            return `
                                            (set!
                                                ${reversee}
                                                (call-yail-primitive yail-list-reverse (*list-for-runtime* ${transpileDeclarations(node.callee.object)} ) '(list) "reverse list")
                                            )
                                            `
                                        }
                                        break;

                                    case "shift":
                                        return `
                                        (let
                                            ((temp (call-yail-primitive yail-list-get-item (*list-for-runtime* ${transpileDeclarations(node.callee.object)} 1) '(list number) "select list item")))
                                            (call-yail-primitive yail-list-remove-item! (*list-for-runtime* ${transpileDeclarations(node.callee.object)} 1) '(list number) "remove list item")
                                            temp
                                        )
                                        `

                                    case "slice":
                                        proceduresUsed.add(procedures.slice)
                                        if (args.length < 2) {
                                            args.push({ type: "Literal", value: "endOfString" })
                                        }
                                        return `(if
                                            (string? ${transpileDeclarations(node.callee.object)})
                                            (slice ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])})
                                            ${transpileDeclarations(node.callee.object)}
                                        )`
                                    case "split":
                                        if (args.length === 0) { return `${transpileDeclarations(node.callee.object)}` }
                                        return `
                                        (if
                                            (string? ${transpileDeclarations(node.callee.object)})
                                            (call-yail-primitive string-split (*list-for-runtime* ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])}) '(text text) "split")
                                            ${transpileDeclarations(node.callee.object)}
                                        )
                                        `
                                    case "startsWith":
                                        proceduresUsed.add(procedures.startsWith)
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(startsWith ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])}) #f)`
                                    case "substring":
                                        if (args.length < 2) {
                                            args.push({ type: "Literal", value: "endOfString" })
                                        }
                                        proceduresUsed.add(procedures.customSubstring)
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(customSubstring ${transpileDeclarations(node.callee.object)} ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}) #f)`
                                    case "toLowerCase":
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(string-downcase ${transpileDeclarations(node.callee.object)}) #f)`
                                    case "toUpperCase":
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(string-upcase ${transpileDeclarations(node.callee.object)}) #f)`
                                    case "trim":
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(string-trim ${transpileDeclarations(node.callee.object)}) #f)`
                                    case "trimEnd":
                                        proceduresUsed.add(procedures.trim_end)
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(trim-end ${transpileDeclarations(node.callee.object)}) #f)`
                                    case "trimStart":
                                        proceduresUsed.add(procedures.trim_start)
                                        return `(if (string? ${transpileDeclarations(node.callee.object)})(trim-start ${transpileDeclarations(node.callee.object)}) #f)`

                                    case "unshift":
                                        let unshifts = ""
                                        for (let us = 0; us < args.length; us++) {
                                            unshifts += `(call-yail-primitive yail-list-insert-item! (*list-for-runtime* ${transpileDeclarations(node.callee.object)} ${us + 1} ${transpileDeclarations(args[us])}) '(list number any) "insert list item")`
                                        }
                                        return `
                                        (begin                    
                                            ${unshifts}
                                            (length ${transpileDeclarations(node.callee.object)} "")
                                        )
                                        `

                                    default:
                                }

                            }



                    } // end isVariableOfScope
            }
            break;


        case "ContinueStatement":
            console.error("Error: There is no 'continue' statement in this implementation. You need to rewrite your code.\n 'continue' is being skipped in transcompilation.\n")
            return ``


        case "ExpressionStatement":
            return transpileDeclarations(node.expression) + "\n"

        case "ForStatement":
            //init, test, update, body

            return ''
            break;


        case "FunctionDeclaration":

            //put variables on stack for locals
            variableStack[variableStack.length - 1].push(
                {
                    "scope": "local",
                    "identifier": node.id.name,
                    "type": "procedure"
                }
            )
            let parameters = ""
            for (let i = 0; i < node.params.length; i++) {
                variableStack[variableStack.length - 1].push(
                    {
                        "scope": "local",
                        "identifier": node.params[i].name,
                        "type": "procedureVariable"
                    }
                )
                parameters += `$${node.params[i].name} `
            }

            let returnProcedure = `
            (def
                (p$${node.id.name} ${parameters})
                ${transpileDeclarations(node.body)}
            )
            `

            //remove variables from stack
            for (let i = node.params.length - 1; i >= 0; i--) {
                removeFromVariableStack(node.params[i].name, true)
            }

            removeFromVariableStack(node)
            return returnProcedure

        case "FunctionExpression":
            return transpileDeclarations(node.body)





        case "Identifier":
            if (name === "undefined") {
                return "#f"
            }
            let name2 = findVariableInStack(name)
            return name2


        case "IfStatement":
            let alternate = ""
            if (node.alternate!==null) {
                alternate=`(begin ${transpileDeclarations(node.alternate)} )`
            }
            return `
            (if
                ${transpileDeclarations(node.test)}
                (begin
                    ${transpileDeclarations(node.consequent)}
                )
                ${alternate}
            )
            `
            break;



        case "Literal":
            if (typeof value === "string") { //need to do this first so that new booleans don't get quote marks
                value = `"${value}"`
            }
            if (typeof value === "boolean") {   //need to adjust true and false in declaration to #t / #f to match YAIL syntax
                value = value ? '#t' : '#f'
            }
            return value

        case "LogicalExpression":
            switch (node.operator) {
                case "&&": return `(and ${transpileDeclarations(node.left)} ${transpileDeclarations(node.right)})`
                case "||": return `(or ${transpileDeclarations(node.left)} ${transpileDeclarations(node.right)})`
            }





        case "MemberExpression":
            //this is for a GET case

            let MemberExpressionProperty = node.property.name       // .text
            let MemberExpressionValue = node.property.value         // ["text"] or [2]    //need to work out if the is whole number 


            let MEelementName = node.object.name

            let MEisVariableOfType = undefined
            let MEisVariableOfScope = undefined
            let MEcurrentStack = variableStack[variableStack.length - 1]
            for (let i = MEcurrentStack.length - 1; i >= 0; i--) {
                if (MEcurrentStack[i].name === MEelementName) {
                    MEisVariableOfType = MEcurrentStack[i].type
                    MEisVariableOfScope = MEcurrentStack[i].scope
                    break
                }
            }

            //  '()   is an empty list - it is equivalent to null

            switch (MEisVariableOfScope) {
                //Do components first
                case "component":
                    switch (MemberExpressionProperty) {
                        case "text":

                            if (MEisVariableOfType === "textbox") {
                                return `(get-property 'textbox 'Text)`

                            }
                            //(set-and-coerce-property! 'TextBox1 'Text "text value" 'text)
                            return ""

                    }
                    break;

                //then deal with everything else
                default:
                    if (!MemberExpressionProperty) {
                        proceduresUsed.add(procedures.isDictionary)
                        proceduresUsed.add(procedures.getFromDict)
                        proceduresUsed.add(procedures.isList)
                        proceduresUsed.add(procedures.getFromList)
                        return `
                        (cond 
                            ((isDictionary  ${transpileDeclarations(node.object)}) (getFromDict ${isNaN(transpileDeclarations(node.property)) ? transpileDeclarations(node.property) : `"${transpileDeclarations(node.property)}"`} ${transpileDeclarations(node.object)}) )
                            ((isList ${transpileDeclarations(node.object)}) (getFromList ${transpileDeclarations(node.property)} ${transpileDeclarations(node.object)} ))
                            (else #f)
                        )`
                    }

                    switch (MemberExpressionProperty) {

                        case "length":
                            proceduresUsed.add(procedures.isDictionary)
                            proceduresUsed.add(procedures.getFromDict)
                            proceduresUsed.add(procedures.isList)
                            proceduresUsed.add(procedures.length)
                            return `(length ${transpileDeclarations(node.object)} ${transpileDeclarations(node.property)})`

                        default:
                            proceduresUsed.add(procedures.isDictionary)
                            proceduresUsed.add(procedures.getFromDict)
                            proceduresUsed.add(procedures.isList)
                            proceduresUsed.add(procedures.getFromList)
                            /*
                                cannot transpile declarations on the object property in case it is also the name of a variable
                            */
                            return `
                                (cond 
                                    ((isDictionary  ${transpileDeclarations(node.object)} ) (getFromDict ${node.property.name ? `"${node.property.name}"` : transpileDeclarations(node.property)} ${transpileDeclarations(node.object)}) )
                                    ((isList ${transpileDeclarations(node.object)}) (getFromList ${transpileDeclarations(node.property)} ${transpileDeclarations(node.object)} ) )
                                    (else #f)
                                )`
                    }


            }

            break;

        case "MemberExpressionSet":
            let MemberExpressionSetProperty = node.property.name       // .text
            let MemberExpressionSetValue = node.property.value         // ["text"] or [2]    //need to work out if the is whole number 

            if (node.type === "MemberExpression") { node.type = "MemberExpressionSet" } //make it come back to here

            let MESelementName = node.object.name

            let MESisVariableOfType = undefined
            let MESisVariableOfScope = undefined
            let currentStack = variableStack[variableStack.length - 1]
            for (let i = currentStack.length - 1; i >= 0; i--) {
                if (currentStack[i].name === MESelementName) {
                    MESisVariableOfType = currentStack[i].type
                    MESisVariableOfScope = currentStack[i].scope
                    break
                }
            }


            switch (MESisVariableOfScope) {

                case "component":
                    //MESisVariableOfType  -> what type of component is it -> get the alllowable attributes for it
                    let elemInfo = ELEMENTS[MESisVariableOfType + ""]

                    //get the attributes that can be set (for now)
                    let allowableAttributes = [].concat(elemInfo.attributes, elemInfo.blocksAttributes, elemInfo.blocksReadOnly)
                    if (!allowableAttributes.includes(MemberExpressionSetProperty)) {
                        console.log(`Cannot set the "${MemberExpressionSetProperty}" of a ${MESisVariableOfType}`)
                        console.log('Ignoring this instruction.')
                        return ""
                    }

                    let descriptor = MemberExpressionSetProperty[0].toUpperCase() + MemberExpressionSetProperty.substring(1)

                    //setAttribute(key, value, name, descriptor, useQuotes = true)
                    return ATTRIBUTES.setAttribute("", transpileDeclarations(node.assignedRight), MESelementName, descriptor, false)

                    /*switch (MemberExpressionSetProperty) {
                        case "text":

                            if (MESisVariableOfType === "textbox") {
                                return `(set-and-coerce-property! '${MESelementName} 'Text ${transpileDeclarations(node.assignedRight)} 'text)`

                            }
                            //(set-and-coerce-property! 'TextBox1 'Text "text value" 'text)
                            return ""

                    }*/


                    break;

                default:

                    switch (MemberExpressionSetProperty) {

                        default:
                            proceduresUsed.add(procedures.isDictionary)
                            proceduresUsed.add(procedures.isList)
                            let lookupValue;
                            if (node.property.name) {
                                lookupValue = node.property.name
                            } else {
                                lookupValue = node.property.value
                            }

                            return `
                                    (cond 
                                        ((isDictionary  ${transpileDeclarations(node.object)} ) (call-yail-primitive yail-dictionary-set-pair (*list-for-runtime* "${lookupValue}" ${transpileDeclarations(node.object)} ${transpileDeclarations(node.assignedRight)}) '(key dictionary any) "set value for key in dictionary to value"))
                                        ((isList ${transpileDeclarations(node.object)}) (call-yail-primitive yail-list-set-item! (*list-for-runtime* ${transpileDeclarations(node.object)} (+ ${node.property.value} 1) ${transpileDeclarations(node.assignedRight)}) '(list number any) "replace list item"))
                                        (else #f)
                                    )`
                    } // END Memeber expression set property




            } // END Member Expression set Scope


            break;


        case "ObjectExpression":

            let objectCode = `(call-yail-primitive make-yail-dictionary (*list-for-runtime* `
            let pairs = ""

            for (let i = 0; i < properties.length; i++) {
                let key = properties[i].key.name ? `"${properties[i].key.name}"` : `"${properties[i].key.value}"`
                let value = transpileDeclarations(properties[i].value) + " "

                let pairCode = `(call-yail-primitive make-dictionary-pair (*list-for-runtime* ${key}  ${transpileDeclarations(properties[i].value)} ) '(key any) "make a pair")`
                pairs += "pair "
                objectCode += pairCode

                if (i === properties.length - 1) {
                    objectCode += ")"
                }
            }

            if (properties.length === 0) {
                return `(call-yail-primitive make-yail-dictionary (*list-for-runtime* ) '() "make a dictionary")`
            }

            let tail = ` '(${pairs}) "make a dictionary" )`
            objectCode += tail

            return `${objectCode}`

        case "Program":
            let ProgramCode = ""
            for (let n of node.body) {
                ProgramCode += transpileDeclarations(n)
            }
            return ProgramCode


        case "ReturnStatement":
            //console.log(node)
            return transpileDeclarations(node.argument)

        case "SequenceExpression":
            return transpileDeclarations(node.expressions)

        case "TemplateElement":
            //console.log(node.value.cooked)
            //console.log(node.value.cooked.replaceAll('"',"\\\""))
            return `"${node.value.cooked.replaceAll('"', "\\\"")}"`

        case "TemplateLiteral":
            let templateOutput = transpileDeclarations(node.quasis[0])
            for (let i = 0; i < node.expressions.length; i++) {
                templateOutput += `(coerce-arg ${transpileDeclarations(node.expressions[i])} 'text)${transpileDeclarations(node.quasis[i + 1])}`
            }
            return `(string-append ${templateOutput})`


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
                    return `(call-yail-primitive - (*list-for-runtime*  ${transpileDeclarations(uarg)} ) '(number ) "negate")`
                case "!":
                    return `(not ${transpileDeclarations(uarg)})`  //this returns false for anything that is not #t
                case "delete":
                    return `
                    (call-yail-primitive yail-dictionary-delete-pair 
                        (*list-for-runtime* ${transpileDeclarations(uarg.object)} "${transpileDeclarations(uarg.property)}") 
                        '(dictionary key)  
                        "delete dictionary pair"
                    )`
                    break;
                default:
                    console.log(`Unknown unary operator "${JSON.stringify(uop)}". Panic!`)
            }
            break;

        case "UpdateExpression":
            let assignee = transpileDeclarations(node.argument)
            if (assignee.startsWith("(get-var ")) {  //this is string, numbers and bools (simple cases)
                assignee = assignee.substring(8, assignee.length - 1)
            } else if (assignee.startsWith("(lexical-value ")) {
                assignee = assignee.substring(15, assignee.length - 1)
            }

            if (node.prefix) {
                switch (node.operator) {
                    case "++":
                        proceduresUsed.add(procedures.add)
                        return `
                            (begin
                                (set-var! ${assignee} (+ ${transpileDeclarations(node.argument)} 1))
                                ${transpileDeclarations(node.argument)}
                            )
                        `
                    case "--":
                        return `
                        (begin
                            (set-var! ${assignee} (- ${transpileDeclarations(node.argument)} 1))
                            ${transpileDeclarations(node.argument)}
                        )
                        `
                }
            } else {
                switch (node.operator) {
                    case "++":
                        proceduresUsed.add(procedures.add)
                        return `
                            (let ((temp ${transpileDeclarations(node.argument)}))
                                    (set-var! ${assignee} (+ ${transpileDeclarations(node.argument)} 1))
                                    temp
                            )
                        `
                    case "--":
                        return `
                        (let ((temp ${transpileDeclarations(node.argument)}))
                            (set-var! ${assignee} (- ${transpileDeclarations(node.argument)} 1))
                            temp
                    )`
                }

            }


        case "VariableDeclaration":


            let source;
            if (node.declarations[0].init) {
                source = node.declarations[0].init
            } else {
                source = node.declarations
            }

            if (node.isGlobal === "true") {
                return `(def g$${node.declarations[0].id.name} ${transpileDeclarations(source)})`
            }
            else {
                //add variable to stack before processing
                variableStack[variableStack.length - 1].push(
                    {
                        "scope": "local",
                        "identifier": node.declarations[0].id.name
                    }
                )
                let vBody = transpileDeclarations(node.body)

                let returnVariable = `(let
                            (($${node.declarations[0].id.name}  ${transpileDeclarations(source)}))
                            ${vBody}
                        )
                        `
                removeFromVariableStack(node.declarations[0])
                return returnVariable
            }

            break;

        case "WhileStatement":
            return `
                (while
                    ${transpileDeclarations(node.test)}
                    (begin
                        ${transpileDeclarations(node.body)}    
                        
                    )    
                )
            `


        default:

    }

}


function asString(args, index) {
    if (args[index] === undefined) { return `""` }
    if (args[index].type === "Literal") {
        return `${args[index].value}`
    }
}
