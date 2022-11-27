const { parse, find } = require('abstract-syntax-tree')
const fs = require('fs')

const dashAst = require('dash-ast')
const isIdentifier = require('estree-is-identifier')
 


const source = fs.readFileSync("screen1.js", "utf8")
const ast = parse(source)


console.log(ast)

console.log('--------------------')

let deps = []
dashAst(ast, function (node, parent) {

    console.log(node, '\n')
  if (node.type === 'CallExpression' && isIdentifier(node.callee, 'require')) {
  }


})

//console.log(deps)

/*
(define-event Button1 Click()
    (set-this-form)
    (call-component-method 'Notifier1 'ShowAlert (*list-for-runtime* "Alert") '(text)))

*/