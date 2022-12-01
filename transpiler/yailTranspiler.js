const fs = require('fs')
const {SCANNER} = require("./scanner")

let sourceCode = fs.readFileSync("source/test.yas", "utf8")
let hadError = false

function run(source) {
  let scanner = new SCANNER(source)
  let tokens = scanner.scanTokens()

  for (const token in tokens) {
    console.log(token)
  }
}

function main() {
  run(sourceCode)
  if (hadError) {
    process.exit(65)
  }
}

main()