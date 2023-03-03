const fs = require('fs')
const { parse, walk } = require('abstract-syntax-tree')
const util = require('util')
const procedures = require("./procedures.js")

const { ELEMENTS } = require("../yailMaker/elements")
const ATTRIBUTES = require("../yailMaker/attributes")
//const { METHODS } = require("../yailMaker/methods")

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


    // console.log("*** Transpiling scripts ***")
    generatedCode = ""
    generatedGlobalsCode = ""

    for (const script of scripts) {
        let input = fs.readFileSync(script, "utf-8")
        generatedCode += transpile(input, elements)
    }

    if (debug) {
        console.log(generatedCode)
        process.exit(0)
    }

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




    //refactor for loops as a block with a while loop in it
    /*  walk(tree, (node, parent) => {
  
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
      })*/




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

function uppercaseFirstLetter(text) {
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



//this is the recursive function that does the work
function transpileDeclarations(node) {

    if (Array.isArray(node)) {
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

            //console.log(node)

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
                    case "getComponent": //in code like this getComponent(screen1) ... perhaps should be like this getComponent("screen1") .. or maybe both
                        return `(get-component ${transpileDeclarations(node.arguments[0])})`
                    case "inject":  //inject scheme code directly into the application
                        return node.arguments[0].quasis[0].value.raw
                    case "require":
                        return ""   //ignore require for now - this is so can use the helper file
                    case "getStartValue":
                        return `(call-yail-primitive get-start-value (*list-for-runtime* ) '() "get start value")`
                    case "getInitMessage":
                        return `(call-yail-primitive get-plain-start-text (*list-for-runtime* ) '() "get plain start text")`
                    case "openScreen":
                        if (node.arguments.length === 1) {
                            return `(call-yail-primitive open-another-screen (*list-for-runtime* ${transpileDeclarations(node.arguments[0])}) '(text) "open another screen")`
                        } else if (node.arguments.length === 2) {
                            return `(call-yail-primitive open-another-screen-with-start-value (*list-for-runtime* ${transpileDeclarations(node.arguments[0])} ${transpileDeclarations(node.arguments[1])}) '(text any) "open another screen with start value")`
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
                case "JSON":
                    let JSONMethod = node.callee.property.name
                    // ${transpileDeclarations(node.arguments[0])}
                    switch (JSONMethod) {
                        case "parse":
                            return `(call-component-method 'JSONUtilityBelt 'JsonTextDecodeWithDictionaries (*list-for-runtime* ${transpileDeclarations(node.arguments[0])}) '(text))`
                        case "stringify":
                            return `(call-component-method 'JSONUtilityBelt 'JsonObjectEncode (*list-for-runtime*  ${transpileDeclarations(node.arguments[0])}) '(text))`
                    }

                    //(call-component-method 'Web1 'JsonTextDecode (*list-for-runtime* (call-component-method 'Web1 'JsonObjectEncode (*list-for-runtime*  ${transpileDeclarations(node.arguments[0])}) '(text))) '(text))
                    break;

                case "Stat": //new features in app inventor 2.66
                    let StatMethod = node.callee.property.name
                    switch (StatMethod) {
                        case "avg":
                        case "min": if (StatMethod === "min") { StatMethod = "minl"; }
                        case "max": if (StatMethod === "max") { StatMethod = "maxl"; }
                        case "gm":
                        case "stddev": if (StatMethod === "stddev") { StatMethod = "std-dev"; }
                        case "stderr": if (StatMethod === "stderr") { StatMethod = "std-err"; }
                        case "mode":
                            return `(call-yail-primitive ${StatMethod} (*list-for-runtime* ${transpileDeclarations(node.arguments[0])}) '(list-of-number) "${StatMethod}")`
                        default:
                            console.log(`No such method "StatMethod" for Stat. Ignoring.`)
                            return ""
                    }

                    break;
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
                        case "round":
                            return `(call-yail-primitive yail-round (*list-for-runtime* ${transpileDeclarations(node.arguments[0])}) '(number) "round")`

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
                    break;

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


                case "Color":
                    let ColorMethod = node.callee.property.name

                    switch (ColorMethod) {
                        case "make":
                            let colorRed = 0, colorGreen = 0, colorBlue = 0, colorAlpha = 255
                            if (node.arguments.length === 1) {
                                colorRed = transpileDeclarations(node.arguments[0])
                                colorBlue = transpileDeclarations(node.arguments[0])
                                colorGreen = transpileDeclarations(node.arguments[0])
                            } else if (node.arguments.length === 2) {
                                colorRed = transpileDeclarations(node.arguments[0])
                                colorBlue = transpileDeclarations(node.arguments[0])
                                colorGreen = transpileDeclarations(node.arguments[0])
                                colorAlpha = transpileDeclarations(node.arguments[1])
                            } else if (node.arguments.length === 3) {
                                colorRed = transpileDeclarations(node.arguments[0])
                                colorBlue = transpileDeclarations(node.arguments[1])
                                colorGreen = transpileDeclarations(node.arguments[2])
                            } else if (node.arguments.length === 4) {
                                colorRed = transpileDeclarations(node.arguments[0])
                                colorBlue = transpileDeclarations(node.arguments[1])
                                colorGreen = transpileDeclarations(node.arguments[2])
                                colorAlpha = transpileDeclarations(node.arguments[3])
                            }
                            return `(call-yail-primitive make-color (*list-for-runtime* (call-yail-primitive make-yail-list (*list-for-runtime* ${colorRed} ${colorBlue} ${colorGreen} ${colorAlpha} ) '(any any any any ) "make a list")) '(list) "make-color")`
                        case "split":
                            proceduresUsed.add(procedures.splitColor)
                            proceduresUsed.add(procedures.RGBAtoARGB)
                            return `(splitColor ${transpileDeclarations(node.arguments[0])})`
                        //return `(call-yail-primitive split-color (*list-for-runtime* ${transpileDeclarations(node.arguments[0])}) '(number) "split-color")`
                    }
                    break;

                default:


                    //if not MATH then a variable so find variable type and work based off that
                    //components have built in fixed methods
                    //other variable types have different methods

                    //do a check for method is possible on componet
                    //also check that the correct number of parameters are supplied for the method,
                    //otherwise throw error and print out documentation for the method

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

                            /////////////////////////////////////////////////////////////////////////////////
                            /////////////////////////////////////////////////////////////////////////////////
                            /////  COMPONENT METHODS ////////////////////////////////////////////////////////
                            /////////////////////////////////////////////////////////////////////////////////
                            /////////////////////////////////////////////////////////////////////////////////

                            //check if a method is called on something
                            if (node.callee.property !== undefined) {
                                let methodCalled = node.callee.property.name
                                let args = JSON.parse(JSON.stringify(node.arguments))

                                //get legal methods for each component and check that this is one of them

                                //let legalMethods = ELEMENTS[isVariableOfType].methods  CHANGED FOR NEW ELEMENTS
                                let legalMethods = Object.keys(ELEMENTS[isVariableOfType].methods)

                                legalMethods.push("addEventListener")
                                if (!legalMethods.includes(methodCalled)) {
                                    console.log(`"${elementName}" is a ${isVariableOfType} and does not have a method "${methodCalled}". Ignoring.`)
                                    return ""
                                }

                                //check if the method that is called is a legal method for this particular element type (refer to supplied elements list)
                                switch (methodCalled) {

                                    /////////////////////////////////////////////////////////////////////////////////////
                                    /// The AddEventListener exists to provide a hook to the events for the different ///
                                    /// components //////////////////////////////////////////////////////////////////////
                                    /////////////////////////////////////////////////////////////////////////////////////

                                    case "addEventListener":
                                        //TODO check element and type to make sure that the eventType is a legal event for that type of element/component
                                        //args[0] here is the event type
                                        //let legalEvents = ELEMENTS[isVariableOfType].events //CHANGE FOR NEW ELEMENTS

                                        let legalEvents = Object.keys(ELEMENTS[isVariableOfType].events)

                                        if (!legalEvents.includes(args[0].value)) {
                                            console.log(`"${elementName}" is a ${isVariableOfType} and does not have an event "${args[0].value}". Perhaps check your capitalisation. Ignoring.`)
                                            return ""
                                        }

                                        let params = ""
                                        for (let i = 0; i < args[1].params.length; i++) {
                                            params += "$" + args[1].params[i].name + " "
                                            variableStack[variableStack.length - 1].push(
                                                {
                                                    "scope": "local",
                                                    "identifier": args[1].params[i].name,
                                                    "type": "procedureVariable"
                                                }
                                            )
                                        }

                                        //import code
                                        /* for (let i = 0; i < node.params.length; i++) {
                                            variableStack[variableStack.length - 1].push(
                                                {
                                                    "scope": "local",
                                                    "identifier": node.params[i].name,
                                                    "type": "procedureVariable"
                                                }
                                            )
                                            parameters += `$${node.params[i].name} `
                                        }*/

                                        //need to add these parameters as lexically scoped variables so they can be called (I think)
                                        let returnEventlistener = (`(define-event ${transpileDeclarations(node.callee.object)} ${uppercaseFirstLetter(asString(args, 0))}(${params.trim()}) (set-this-form) ${transpileDeclarations(args[1])})`)
                                        //then remove them as variables


                                        /*   let returnProcedure = `
                                        (def
                                            (p$${node.id.name} ${parameters})
                                            ${transpileDeclarations(node.body)}
                                        )
                                        `*/

                                        /* for (let i = 0; i < args[1].params.length; i++) {
                                              params += args[1].params[i].name + " "
                                              variableStack[variableStack.length - 1].push(
                                                  {
                                                      "scope": "local",
                                                      "identifier": args[1].params[i].name,
                                                      "type": "procedureVariable"
                                                  }
                                              )
                                          }*/

                                        //remove variables from stack
                                        for (let i = 0; i < args[1].params.length; i++) {
                                            removeFromVariableStack(args[1].params[i].name, true)
                                        }

                                        //  removeFromVariableStack(node)


                                        //end import



                                        return returnEventlistener


                                    ////////////////////////////////////////////////////////////////////////////////////////////
                                    /// The following generic methods handle simple cases on no, one, two etc input arguments //
                                    ////////////////////////////////////////////////////////////////////////////////////////////

                                    //methods with no inputs 
                                    case "authorize":           //twitter
                                    case "bounds":              //rectangle on map
                                    case "bytesAvailableToReceive": //bluetoothclient
                                    case "canGoBack":           //webview   //returns true/false
                                    case "canGoForward":        //webview   //returns true/false
                                    case "center":              //rectangle on map
                                    case "centroid":            //polygon on maps
                                    case "checkAuthorized":     //twitter
                                    case "clear":               //canvas, chartline2d
                                    case "clearAll":            //tinydb
                                    case "clearCaches":         //webview
                                    case "clearCookies":        //webview, web
                                    case "clearLocations":      //webview
                                    case "cloudConnected":      //clouddb
                                    case "closeSerial":         //serial
                                    case "deAuthorize":         //twitter
                                    case "delete":              //web
                                    case "disconnect":          //bluetoothclient
                                    case "dismissProgressDialog":   //notifier
                                    case "doScan":              //barcode scanner
                                    case "hideKeyboard":        //screen
                                    case "get":                 //web
                                    case "getAllEntries":       //chartline2d
                                    case "getDuration":         //videoplayer
                                    case "getTagList":          //clouddb
                                    case "getTags":             //tinydb
                                    case "getText":             //speechrecognizer
                                    case "goBack":              //webview
                                    case "goForward":           //webview
                                    case "goHome":              //webview
                                    case "initializeSerial":    //serial
                                    case "hideInfobox":         //circle
                                    case "launchPicker":        //datepicker
                                    case "makePhoneCall":       //phonecall
                                    case "makePhoneCallDirect": //phonecall
                                    case "moveIntoBounds":      //ball
                                    case "pause":               //player, videoplayer
                                    case "play":                //sound
                                    case "open":                //listpicker, imagepicker\
                                    case "openSerial":          //serial
                                    case "readSerial":          //serial
                                    case "receiveSigned1ByteNumber":    //bluetoothclient
                                    case "receiveSigned2ByteNumber":    //bluetoothclient
                                    case "receiveSigned4ByteNumber":    //bluetoothclient
                                    case "receiveUnsigned1ByteNumber":  //bluetoothclient
                                    case "receiveUnsigned2ByteNumber":  //bluetoothclient
                                    case "receiveUnsigned4ByteNumber":  //bluetoothclient
                                    case "recordVideo":         //camcorder
                                    case "refresh":
                                    case "reload":              //webview
                                    case "removeDataSource":    //chartline2d
                                    case "requestDirectMessages":   //twitter
                                    case "requestDirections":   //navigation
                                    case "requestFocus":        //emailpicker
                                    case "requestFollowers":    //twitter
                                    case "requestFriendTimeline":   //twitter
                                    case "requestMentions":     //twitter
                                    case "reset":               //pedometer
                                    case "resolveActivity":     //activity starter
                                    case "resume":              //sound
                                    case "save":                //pedometer, canvas
                                        if (methodCalled === "save" && args.length === 1) { //case for map which has a single text input
                                            return (`\n(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)}  (*list-for-runtime*  ${transpileDeclarations(args[0])} )  '(text))`)
                                        }
                                    case "sendMessage":         //testing
                                    case "sendMessageDirect":   //texting
                                    case "showInfobox":         //circle
                                    case "start":               //player, soundrecorder, pedometer, videoplayer
                                    case "startActivity":       //activity starter
                                    case "stop":                //player, soundrecorder, pedometer, videoplayer
                                    case "stopAccepting":       //bluetoothserver
                                    case "stopLoading":         //webview
                                    case "takePicture":         //camera
                                    case "now":                 //clock
                                    case "systemTime":          //clock
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime*) '() )`)


                                    //methods with one text input 
                                    case "acceptConnection":    //bluetoothserver
                                    case "clearTag":            //clouddb, tinydb
                                    case "connect":             //bluetoothclient
                                    case "delete":              //file
                                    case "follow":              //twitter
                                    case "getEntriesWithXValue": //chartline2d
                                    case "getEntriesWithYValue": //chartline2d
                                    case "getWebValue":         //tinywebdb
                                    case "goToUrl":             //webview
                                    case "isDevicePaired":		//bluetoothclient
                                    case "send1ByteNumber":		//bluetoothclient
                                    case "send2ByteNumber":		//bluetoothclient
                                    case "send4ByteNumber":		//bluetoothclient
                                    case "sendText":			//bluetoothclient
                                    case "showAlert":           //notifier
                                    case "logInfo":             //notifier
                                    case "logWarning":          //notifier
                                    case "logError":            //notifier
                                    case "runJavaScript":       //webview
                                    case "latitudeFromAddress": //location sensor
                                    case "longitudeFromAddress"://location sensor
                                    case "printSerial":         //serial
                                    case "readFile":            //datafile
                                    case "readFrom":            //file
                                    case "removeFirstFromList": //clouddb
                                    case "searchTwitter":       //twitter
                                    case "shareFile":           //sharing
                                    case "shareMessage":        //sharing
                                    case "stopFollowing":       //twitter
                                    case "makeInstant":         //clock
                                    case "saveAs":              //canvas
                                    case "speak":               //texttospeech
                                    case "tweet":               //twitter
                                    case "viewContact":         //contactPicker
                                    case "writeSerial":         //serial
                                    case "htmlTextDecode":					//web
                                    case "jsonTextDecode":					//web
                                    case "jsonTextDecodeWithDictionaries":	//web
                                    case "patchFile":						//web
                                    case "patchText":						//web
                                    case "postFile":						//web
                                    case "postText":						//web
                                    case "putFile":							//web
                                    case "putText":							//web
                                    case "uriDecode":						//web
                                    case "uriEncode":						//web
                                    case "XMLTextDecode":					//web
                                    case "XMLTextDecodeAsDictionary":		//web
                                    case "loadFromURL":                     //map


                                        if (methodCalled === "getWebValue") { methodCalled = "getValue" } //rename the alias for tinydb method so it works
                                        return (`\n(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)}  (*list-for-runtime*  ${transpileDeclarations(args[0])} )  '(text))`)

                                    //methods with one numerical input
                                    case "durationToDays":      //clock
                                    case "durationToHours":     //clock
                                    case "durationToMinutes":   //clock
                                    case "durationToSeconds":   //clock
                                    case "durationToWeeks":     //clock
                                    case "makeInstantFromMillis": //clock
                                    case "seekTo":              //videoplayer
                                    case "receiveSignedBytes":		//bluetoothclient
                                    case "receiveText":				//bluetoothclient
                                    case "receiveUnsignedBytes":	//bluetoothclient
                                    case "vibrate":
                                        return (`\n(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)}  (*list-for-runtime*  ${transpileDeclarations(args[0])} )  '(number))`)


                                    //methods with two text input 
                                    case "acceptConnectionWithUUID":    //bluetoothserver
                                    case "appendToFile":            //file
                                    case "connectWithUUID":         //bluetoothclient
                                    case "directMessage":           //twitter
                                    case "login":                   //twitter
                                    case "tweetWithImage":          //twitter
                                    case "requestTranslation":      //translator
                                    case "saveFile":                //file
                                    case "showProgressDialog":
                                    case "shareFileWithMessage":
                                    case "patchTextWithEncoding":   //web
                                    case "postTextWithEncoding":    //web
                                    case "putTextWithEncoding":     //web
                                    case "addEntry":                //chartline2d
                                    case "removeEntry":             //chartline2d
                                    case "doesEntryExist":          //chartline2d
                                        return (`\n(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)}  (*list-for-runtime*  ${transpileDeclarations(args[0])}  ${transpileDeclarations(args[1])})  '(text text))`)

                                    //methods with 2 text and an optional true/false (default true) 
                                    case "showPasswordDialog":      //notifier
                                    case "showTextDialog":          //notifier
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(text text boolean))`)

                                    //methods with two numerical inputs
                                    case "setLocation":
                                    case "bearingToPoint":          //marker on map
                                    case "setCenter":               //rectangle on map
                                    case "setDomain":               //chart
                                    case "setRange":                //chart
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ) '(number number))`)


                                    //methods with two inputs - text and any
                                    case "appendValueToList":       //clouddb
                                    case "getValue":                //clouddb, tinydb
                                    case "storeValue":              //clouddb,tinydb
                                    case "storeWebValue":           //tinywebdb 
                                        if (methodCalled === "storeWebValue") { methodCalled = "storeValue" } //this is so that the tinywebdb can have same name as for getting a value as getvalue is different for the tinywebdb component
                                        return (`\n(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)}  (*list-for-runtime*  ${transpileDeclarations(args[0])}  ${transpileDeclarations(args[1])})  '(text any))`)

                                    //methods with 3 text inputs - no return value
                                    case "showMessageDialog":   //notifier
                                    case "createElement":       //listview
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(text text text))`)

                                    //methods with 4 text and an optional true/false (default true) 
                                    case "showChooseDialog":    //notifier
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ${transpileDeclarations(args[3])} ${transpileDeclarations(args[4])}) '(text text text text boolean))`)

                                    //methods to send a list
                                    case "sendBytes":           //serial?
                                    case "buildRequestData":    //web
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])}) '(list))`)

                                    //methods accepting 'any'
                                    case "jsonObjectEncode":
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])}) '(any))`)

                                    /////////////////////////////////////////////////////////////////////////////////////////////////
                                    ///// The below component methods don't fit any simple generic pattern like the above ones do ///
                                    /////////////////////////////////////////////////////////////////////////////////////////////////

                                    //////////////////////////////////
                                    //////Special Screen methods /////
                                    //////////////////////////////////

                                    case "askForPermission":    //screen
                                        //Screen - One of CourseLocation, FineLocation, MockLocation, LocationExtraCommands, ReadExternalStorage, WriteExternalStorage, Camera, Audio, Vibrate, Internet, NearFieldCommunication, Bluetooth, BluetoothAdmin, WifiState, NetworkState, AccountManager, ManageAccounts, GetAccounts, ReadContacts, UseCredentials
                                        let legalPermissions = ["CoarseLocation", "FineLocation", "MockLocation", "LocationExtraCommands", "ReadExternalStorage", "WriteExternalStorage", "Camera", "Audio", "Vibrate", "Internet", "NearFieldCommunication", "Bluetooth", "BluetoothAdmin", "WifiState", "NetworkState", "AccountManager", "ManageAccounts", "GetAccounts", "ReadContacts", "UseCredentials"]
                                        if (!legalPermissions.includes(args[0].value)) {
                                            console.log(`"${elementName}" has called "askForPermission" with an invalid request ("${args[0].value}").\nRequests need to be one of CoarseLocation, FineLocation, MockLocation, LocationExtraCommands, ReadExternalStorage, WriteExternalStorage, Camera, Audio, Vibrate, Internet, NearFieldCommunication, Bluetooth, BluetoothAdmin, WifiState, NetworkState, AccountManager, ManageAccounts, GetAccounts, ReadContacts or UseCredentials.`)
                                            return ""
                                        }
                                        return `(call-component-method '${elementName} 'AskForPermission (*list-for-runtime* (static-field com.google.appinventor.components.common.Permission "${args[0].value}")) '(text))`

                                    //////////////////////////////////////////////////////
                                    ///// Special Date Picker and Time Picker Methods ////
                                    //////////////////////////////////////////////////////

                                    //methods with 3 numerical inputs 
                                    //TO CHECK AT END - if this is only date picker then check the ranges of the acceptable values.
                                    case "makeDate":            //clock
                                    case "makeTime":            //clock
                                    case "setDateToDisplay":    //datepicker
                                        if (args.length !== 3) {
                                            console.log(`"${elementName}" of type "${isVariableOfType}" requires three numerical arguments.`)
                                        }
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(number number number))`)

                                    //methods with one instant in time input - no return value
                                    //TO DO -> make instants in time 
                                    case "setDateToDisplayFromInstant": //datepicker
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])}) '(InstantInTime))`)

                                    case "setTimeToDisplay":    //timepicker
                                        if (args.length !== 2) {
                                            console.log(`"${elementName}" of type "${isVariableOfType}" requires two numerical arguments.`)
                                        }
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}) '(number number))`)

                                    case "setTimeToDisplayFromInstant": //timepicker
                                        return (`(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ) '(InstantInTime))`)


                                    ////////////////////////////////////////
                                    ////////// Special Listview Methods ////
                                    ////////////////////////////////////////

                                    case "getDetailText":   //listview
                                        proceduresUsed.add(procedures.getDetailText)
                                        return (`(getDetailText '${elementName} ${transpileDeclarations(args[0])})`)
                                    case "getMainText":     //listview
                                        proceduresUsed.add(procedures.getMainText)
                                        return (`(getMainText '${elementName} ${transpileDeclarations(args[0])})`)
                                    case "getImageName":       //listview
                                        proceduresUsed.add(procedures.getImageName)
                                        return (`(getImageName '${elementName} ${transpileDeclarations(args[0])})`)
                                    case "refresh":             //listview
                                        return `(call-component-method '${elementName} 'Refresh (*list-for-runtime*) '())`


                                    //////////////////////////////////
                                    // SPECIAL CLOCK METHODS /////////
                                    //////////////////////////////////

                                    //six numerical iputs
                                    case "makeInstantFromParts":    //clock
                                        return `(call-component-method '${elementName} 'MakeInstantFromParts (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ${transpileDeclarations(args[3])} ${transpileDeclarations(args[4])} ${transpileDeclarations(args[5])}         ) '(number number number number number number))`

                                    //instant in time input
                                    case "dayOfMonth":      //clock
                                    case "formatTime":      //clock
                                    case "getMillis":       //clock
                                    case "hour":            //clock
                                    case "minute":          //clock
                                    case "month":           //clock
                                    case "monthName":       //clock
                                    case "second":          //clock
                                    case "weekday":         //clock
                                    case "weekdayName":     //clock
                                    case "year":            //clock
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ) '(InstantInTime))`

                                    //two instants
                                    case "duration":        //clock
                                        return `(call-component-method '${elementName} 'Duration (*list-for-runtime*   ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ) '(InstantInTime InstantInTime))`

                                    //instant followed by number as input
                                    case "addDays":         //clock
                                    case "addDuration":     //clock
                                    case "addHours":        //clock
                                    case "addMinutes":      //clock
                                    case "addSeconds":      //clock
                                    case "addWeeks":        //clock
                                    case "addMonths":       //clock
                                    case "addYears":        //clock
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ) '(InstantInTime number))`

                                    //instant followed by text
                                    case "formatDate":      //clock
                                    case "formatDateTime":  //clock
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}) '(InstantInTime text))`


                                    /////////////////////////////////////////////
                                    //// SPECIAL FILE METHODS ///////////////////
                                    /////////////////////////////////////////////

                                    case "exists":
                                        return `
                                        (call-component-method-with-blocking-continuation 
                                            '${elementName} 
                                            'Exists 
                                            (*list-for-runtime* 	
                                                (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[0])})  
                                                ${transpileDeclarations(args[1])}
                                            ) 
                                            '(com.google.appinventor.components.common.FileScopeEnum text)
                                        )
                                        `

                                    case "removeDirectory":
                                        return `
                                        (call-component-method-with-blocking-continuation 
                                            '${elementName} 
                                            'RemoveDirectory 
                                            (*list-for-runtime* 
                                                (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[0])})  
                                                ${transpileDeclarations(args[1])}  
                                                ${transpileDeclarations(args[2])}
                                            ) 
                                            '(com.google.appinventor.components.common.FileScopeEnum text boolean)
                                        )                                    
                                        `

                                    case "makeDirectory":
                                        return `                                    
                                            (call-component-method-with-blocking-continuation 
                                                '${elementName} 
                                                'MakeDirectory 
                                                (*list-for-runtime* 
                                                    (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[0])})  
                                                    ${transpileDeclarations(args[1])}
                                                ) 
                                                '(com.google.appinventor.components.common.FileScopeEnum text)
                                            )
	
                                        `

                                    case "moveFile":
                                        return `
                                            (call-component-method-with-blocking-continuation 
                                                '${elementName} 
                                                'MoveFile 
                                                (*list-for-runtime* 
                                                    (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[0])})  
                                                    ${transpileDeclarations(args[1])}  
                                                    (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[2])})  
                                                    ${transpileDeclarations(args[3])}
                                                ) 
                                                '(com.google.appinventor.components.common.FileScopeEnum text com.google.appinventor.components.common.FileScopeEnum text)
                                            )
                                        `
                                    case "copyFile":
                                        return `
                                            (call-component-method-with-blocking-continuation 
                                                '${elementName} 
                                                'CopyFile 
                                                (*list-for-runtime* 
                                                    (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[0])})  
                                                    ${transpileDeclarations(args[1])}  
                                                    (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[2])})  
                                                    ${transpileDeclarations(args[3])}
                                                ) 
                                                '(com.google.appinventor.components.common.FileScopeEnum text com.google.appinventor.components.common.FileScopeEnum text)
                                            )
                                        `

                                    case "makeFullPath":
                                        return `
                                            (call-component-method 
                                                '${elementName} 
                                                'MakeFullPath 
                                                (*list-for-runtime* 
                                                    (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[0])})  
                                                    ${transpileDeclarations(args[1])}
                                                ) 
                                                '(com.google.appinventor.components.common.FileScopeEnum text)
                                            )                                                                           
                                        `
                                    case "listDirectory":
                                        return `
                                            (call-component-method-with-blocking-continuation 
                                                '${elementName} 
                                                'ListDirectory 
                                                (*list-for-runtime* 
                                                    (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[0])})  
                                                    ${transpileDeclarations(args[1])}
                                                ) 
                                                '(com.google.appinventor.components.common.FileScopeEnum text)
                                            )                                    
                                        `

                                    case "isDirectory":
                                        return `
                                            (call-component-method-with-blocking-continuation 
                                                '${elementName} 
                                                'IsDirectory 
                                                (*list-for-runtime* 
                                                    (static-field com.google.appinventor.components.common.FileScope ${transpileDeclarations(args[0])})  
                                                    ${transpileDeclarations(args[1])}
                                                ) 
                                                '(com.google.appinventor.components.common.FileScopeEnum text)
                                            )                                    
                                        `

                                    ///////////////////////////////////////////
                                    /// SPECIAL SPREADSHEET METHODS ///////////
                                    ///////////////////////////////////////////
                                    case "getRangeReference":
                                        return `(call-component-method '${elementName} 'GetRangeReference (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ${transpileDeclarations(args[3])}) '(number number number number))`
                                    case "getCellReference":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}) '(number number))`
                                    case "addCol":
                                    case "addRow":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}) '(text list))`
                                    case "clearRange":
                                    case "readCell":
                                    case "readRange":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}) '(text text))`
                                    case "readCol":
                                    case "readRow":
                                    case "removeCol":
                                    case "removeRow":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}) '(text number))`
                                    case "readSheet":
                                        return `(call-component-method '${elementName} 'ReadSheet (*list-for-runtime* ${transpileDeclarations(args[0])}) '(text))`
                                    case "readWithExactFilter":
                                    case "readWithPartialFilter":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(text number text))`
                                    case "writeCell":
                                        return `(call-component-method '${elementName} 'WriteCell (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(text text any))`
                                    case "writeCol":
                                    case "writeRow":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(text number list))`
                                    case "writeRange":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(text text list))`


                                    ///////////////////////////////////////////
                                    /// SPECIAL CANVAS METHODS ////////////////
                                    ///////////////////////////////////////////

                                    case "drawPoint":
                                    case "getPixelColor":
                                    case "getBackgroundPixelColor":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}) '(number number))`

                                    case "drawArc":
                                        return `(call-component-method '${elementName} 'DrawArc (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ${transpileDeclarations(args[3])} ${transpileDeclarations(args[4])} ${transpileDeclarations(args[5])} ${transpileDeclarations(args[6])} ${transpileDeclarations(args[7])}) '(number number number number number number boolean boolean))`

                                    case "drawCircle":
                                        return `(call-component-method '${elementName} 'DrawCircle (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ${transpileDeclarations(args[3])}) '(number number number boolean))`

                                    case "drawLine":
                                        return `(call-component-method '${elementName} 'DrawLine (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ${transpileDeclarations(args[3])}) '(number number number number))`

                                    case "drawShape":
                                        return `(call-component-method '${elementName} 'DrawShape (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}) '(list boolean))`

                                    case "drawText":
                                        return `(call-component-method '${elementName} 'DrawText (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(text number number))`

                                    case "drawTextAtAngle":
                                        return `(call-component-method '${elementName} 'DrawTextAtAngle (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ${transpileDeclarations(args[3])}) '(text number number number))`

                                    case "setBackgroundPixelColor":
                                        //need a function to turn AARRGGBB into a number for this to work
                                        return `(call-component-method '${elementName} 'SetBackgroundPixelColor (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}) '(number number number))`


                                    ///////////////////////////////////////////
                                    /// SPECIAL BALL METHODS //////////////////
                                    ///////////////////////////////////////////

                                    case "bounce":
                                        return `(call-component-method '${elementName} 'Bounce (*list-for-runtime* ${transpileDeclarations(args[0])}) '(number))`

                                    case "moveTo":
                                    case "pointInDirection":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ) '(number number))`

                                    case "moveToPoint":
                                        return `(call-component-method '${elementName} 'MoveToPoint (*list-for-runtime* ${transpileDeclarations(args[0])} ) '(list))`

                                    case "pointTowards":
                                    case "collidingWith":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime*  ${transpileDeclarations(args[0])} ) '(component))`

                                    //////////////////////////////////////////
                                    /// SPECIAL MAP METHODS //////////////////
                                    //////////////////////////////////////////

                                    case "featureFromDescription":
                                        return (`
                                            (call-component-method '${elementName} 'FeatureFromDescription 
                                                (*list-for-runtime* 
                                                    (call-component-method 'JSONUtilityBelt 'JsonTextDecode  
                                                        (*list-for-runtime*  
                                                            (call-component-method 'JSONUtilityBelt 'JsonObjectEncode 
                                                                (*list-for-runtime* 
                                                                    ${transpileDeclarations(args[0])}
                                                                ) 
                                                                '(any)
                                                            ) 
                                                        )  
                                                        '(text)
                                                    )
                                                )
                                                '(list)
                                            )
                                        `)
                                    case "panTo":
                                        return (`(call-component-method '${elementName} 'PanTo (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}   ) '(number number number))`)
                                    case "createMarker":
                                        return (`(call-component-method '${elementName} 'CreateMarker (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}  ) '(number number))`)

                                    /////////////////////////////////////////////
                                    /// CIRCLE (FOR MAP) METHODS ////////////////
                                    /////////////////////////////////////////////

                                    case "distanceToFeature":
                                    case "bearingToFeature":
                                        return (`(call-component-method '${elementName} 'DistanceToFeature (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ) '(component boolean))`)
                                    case "distanceToPoint":
                                        if (args.length === 3) {
                                            return `(call-component-method '${elementName} 'DistanceToPoint (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])}  ) '(number number boolean))`
                                        } else if (args.length === 2) {
                                            return `(call-component-method '${elementName} 'DistanceToPoint (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ) '(number number))`
                                        } else {
                                            console.log("'DistanceToPoint' requires 2 arguments for Markers (number number) and 3 arguments for Circles and Polygons (number number boolean)")
                                            return ""
                                        }

                                    ////////////////////////////////////////
                                    /// SPECIAL CHARTLINE 2D METHODS ///////
                                    ////////////////////////////////////////

                                    case "importFromList":
                                        return `(call-component-method '${elementName} 'ImportFromList (*list-for-runtime* ${transpileDeclarations(args[0])}) '(list))`
                                    case "changeDataSource":
                                    case "importFromCloudDB":
                                    case "importFromTinyDB":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime* ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])}  ) '(component text))`
                                    case "importFromDataFile":
                                    case "importFromWeb":
                                        return `(call-component-method '${elementName} '${uppercaseFirstLetter(methodCalled)} (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ) '(component text text))`
                                    case "importFromSpreadSheet":
                                        return `(call-component-method '${elementName} 'ImportFromSpreadsheet (*list-for-runtime*  ${transpileDeclarations(args[0])} ${transpileDeclarations(args[1])} ${transpileDeclarations(args[2])} ${transpileDeclarations(args[3])}     ) '(component text text boolean))`

                                    ///////////////////////////////////////////
                                    // DEFAULT ERROR MESSAGE //////////////////
                                    ///////////////////////////////////////////


                                    default:
                                        console.log(`Method "${methodCalled}" not defined in transpiler for component of type "${isVariableOfType}"`)
                                }
                            } // case "component"

                        default:
                            //for global and local variables
                            if (node.callee.property !== undefined) {
                                let methodCalled = node.callee.property.name
                                let args = JSON.parse(JSON.stringify(node.arguments))

                                //check if the method that is called is a legal method for this particular element type (refer to supplied elements list)

                                /////////////////////////////////////////////////////////////////////////////////////////////
                                /////////////////////////////////////////////////////////////////////////////////////////////
                                //// JAVASCRIPT METHODS /////////////////////////////////////////////////////////////////////
                                /////////////////////////////////////////////////////////////////////////////////////////////
                                /////////////////////////////////////////////////////////////////////////////////////////////

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

                                    case "map":
                                        //here need to look into the function that is called and
                                        //look at the params 
                                        //first param becomes $item
                                        //second param becomes index so will need a counter around the outside
                                        //third param becomes the original list
                                        console.log(node.arguments)
                                        //if node.arguments.type include FunctionExpression (so include ArrowFunctionExpression for future proofing hopefully)
                                        //first add first, second and third param to lexical scope
                                        //create a let wrapping for the index counter variable and close at end
                                        //add an increment for let counter at end of middle args (somehow???) call counter first name plus counterNumberX
                                        //add let wrapping for third parameter that is equal to the calling array
                                        //then construct the scheme code
                                        //the remove the params from the scope
                                        //then return the computed scheme code
                                        return `
                                            (map_nondest $${name-of-first-parameter-given-by-user}   
                                                ${transpileDeclarations(args[0])} 
                                                ${transpileDeclarations(node.callee.object)}
                                            )
                                        `

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
                                                (call-yail-primitive yail-list-length (*list-for-runtime* ${transpileDeclarations(node.callee.object)} ) '(list) "length of list")
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
            console.log("For Statement Found")

            //this limits for loops to one declaration 
            let forStatementDec = `${transpileDeclarations(node.init)}`
            let forStatementLoop = `
            
                (while
                    ${transpileDeclarations(node.test)}
                    (begin
                        ${transpileDeclarations(node.body)}    
                        ${transpileDeclarations(node.update)}
                    )    
                )
            
            `
            forStatementDec = forStatementDec.replace("undefined", forStatementLoop)
            return forStatementDec
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
            if (node.alternate !== null) {
                alternate = `(begin ${transpileDeclarations(node.alternate)} )`
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

                    /////////////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////////////
                    ///// COMPONENT PROPERTIES //////////////////////////////////////////////////////
                    ///// FOR REQUESTING VALUES OF //////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////////////

                    let propertyRequested = uppercaseFirstLetter(MemberExpressionProperty)

                    switch (propertyRequested) {

                        case "PromptForPermission":
                            return `(get-property '${MEelementName} 'PromptforPermission)`  //inconsistent naming in app inventor - fixing here


                        case "AlignHorizontal":
                        case "AlignVertical":
                        case "AnchorHorizontal":
                        case "AnchorVertical":
                        case "Sensitivity":
                        case "ReceivingEnabled":
                        case "ScaleUnits":
                        case "MapType":
                            proceduresUsed.add(procedures.getSystemConstant)
                            return `(getSystemConstant '${MEelementName} '${propertyRequested})`
                        case "BackgroundColor":
                        case "TextColor":
                        case "TextColorDetail":
                        case "ThumbColorActive":
                        case "ThumbColorInactive":
                        case "TrackColorActive":
                        case "TrackColorInactive":
                            proceduresUsed.add(procedures.toARGB)

                            return `(toARGB (get-property '${MEelementName} '${propertyRequested}) ) `
                        case "Instant":
                            return `(com.google.appinventor.components.runtime.Clock:GetMillis (get-property '${MEelementName} '${propertyRequested}) )`
                        case "SelectionIndex":
                            return `(- (get-property '${MEelementName} '${propertyRequested}) 1)`  //subtract 1 to keep zero indexes in JS
                        default:
                            return `(get-property '${MEelementName} '${propertyRequested})`

                    }


                    //TODO need to make sure that these are legally get-able values for different elements
                    //valid for
                    //textbox text
                    //listview selectionDetailText

                    /*                switch (MemberExpressionProperty) {
                                        case "text":
                
                                            if (MEisVariableOfType === "textbox") {
                                                return `(get-property 'textbox 'Text)`
                
                                            }
                                            //(set-and-coerce-property! 'TextBox1 'Text "text value" 'text)
                                            return ""
                
                                    }*/
                    break;

                //then deal with everything else
                default:
                    if (!MemberExpressionProperty) {
                        proceduresUsed.add(procedures.isDictionary)
                        proceduresUsed.add(procedures.getFromDict)
                        proceduresUsed.add(procedures.isList)
                        proceduresUsed.add(procedures.getFromList)
                        proceduresUsed.add(procedures.props)
                        return `(props ${transpileDeclarations(node.object)} ${transpileDeclarations(node.property)} ${isNaN(transpileDeclarations(node.property)) ? transpileDeclarations(node.property) : `"${transpileDeclarations(node.property)}"`})`
                        /*return `
                        (cond 
                            ((isDictionary  ${transpileDeclarations(node.object)}) (getFromDict ${isNaN(transpileDeclarations(node.property)) ? transpileDeclarations(node.property) : `"${transpileDeclarations(node.property)}"`} ${transpileDeclarations(node.object)}) )
                            ((isList ${transpileDeclarations(node.object)}) (getFromList ${transpileDeclarations(node.property)} ${transpileDeclarations(node.object)} ))
                            (else #f)
                        )`*/



                        /*
                            check if transpile declaration is a number - if number the getfrom list, if string then lookup pairs?

                            (call-yail-primitive yail-alist-lookup 
                                (*list-for-runtime* 
                                    "features" 
                                    (lexical-value $data) 
                                    "not found"
                                ) 
                                '(any list any)  
                                "lookup in pairs"
                            )


                        */



                        /* console.log("here")
                         return `
                         (if 
                             (call-yail-primitive yail-dictionary? (*list-for-runtime* ${transpileDeclarations(node.object)} ) '(any) "check if something is a dictionary") 
                             (call-yail-primitive yail-dictionary-lookup (*list-for-runtime* ${isNaN(transpileDeclarations(node.property)) ? transpileDeclarations(node.property) : `"${transpileDeclarations(node.property)}"`} ${transpileDeclarations(node.object)} #f) '(key any any) "dictionary lookup")
                             (if 
                                 (call-yail-primitive yail-list? (*list-for-runtime* ${transpileDeclarations(node.object)} ) '(any) "is a list?") 
                                     (getFromList ${transpileDeclarations(node.property)} ${transpileDeclarations(node.object)} ) 
                                     #f
                                 )
                             )
                         )  
                         `*/


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
                            proceduresUsed.add(procedures.mep)

                            //problems here again? remember node.computed tells the differnce between a variable and a literal (I hope) node.computed)
                            if (!node.computed) { //then treat as string
                                return `(mep ${transpileDeclarations(node.object)} ${node.property.name ? `"${node.property.name}"` : transpileDeclarations(node.property)} ${node.property.name ? `"${node.property.name}"` : transpileDeclarations(node.property)})`
                            } else { //if a variable
                                let test = node.property.name ? `"${node.property.name}"` : transpileDeclarations(node.property)
                                //this tests that a variable should exist for this name. If not then make it throw an error
                                if (!test.startsWith("(get-var") && !test.startsWith("(lexical-value") && !test.startsWith('"')) {
                                    test = `(lexical-value $${test})`
                                    console.log(`Variable "${test}" potentially doesn't exist at some point and should.`)
                                }
                                return `(mep ${transpileDeclarations(node.object)} ${transpileDeclarations(node.property)} ${test})`
                            }

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


                    ////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////
                    //// COMPONENT PROPERTIES //////////////////////////////////////////////////////////////////////
                    //// FOR ASSIGNING VALUES TO - THIS IS OUTSOURCED TO THE yailmaker FILE THAT ///////////////////
                    //// IS ALSO USED FOR ASSIGNING VALUES FROM THE PARSING OF THE XML FILE ////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////

                    //MESisVariableOfType  -> what type of component is it -> get the alllowable attributes for it
                    let elemInfo = ELEMENTS[MESisVariableOfType + ""]

                    //get the attributes that can be set (for now)
                    let allowableAttributes = [].concat(Object.keys(elemInfo.properties))  //updated for new ELEMENTS
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

                    /////////////////////////////////////////////////////////////////////////////
                    /// This sets the property or assigns values to anything else ///////////////
                    /// that has properties - that is objects and arrays ////////////////////////
                    /////////////////////////////////////////////////////////////////////////////

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
            let assignmentOp = "set-var!"
            if (assignee.startsWith("(get-var ")) {  //this is string, numbers and bools (simple cases)
                assignee = assignee.substring(8, assignee.length - 1)
            } else if (assignee.startsWith("(lexical-value ")) {
                assignee = assignee.substring(15, assignee.length - 1)
                assignmentOp = "set!"
            }

            if (node.prefix) {
                switch (node.operator) {
                    case "++":
                        proceduresUsed.add(procedures.add)
                        return `
                            (begin
                                (${assignmentOp} ${assignee} (+ ${transpileDeclarations(node.argument)} 1))
                                ${transpileDeclarations(node.argument)}
                            )
                        `
                    case "--":
                        return `
                        (begin
                            (${assignmentOp} ${assignee} (- ${transpileDeclarations(node.argument)} 1))
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
                                    (${assignmentOp} ${assignee} (+ ${transpileDeclarations(node.argument)} 1))
                                    temp
                            )
                        `
                    case "--":
                        return `
                        (let ((temp ${transpileDeclarations(node.argument)}))
                            (${assignmentOp} ${assignee} (- ${transpileDeclarations(node.argument)} 1))
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
            console.log(node)
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
