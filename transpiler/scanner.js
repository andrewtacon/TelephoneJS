const { TokenType, TOKEN } = require("./token")
const {error} = require("./error")

//scan the source file and return a list of tokens
class SCANNER {
  constructor(source) {
    this.source = source
    this.tokens = []
    this.start = 0
    this.current = 0
    this.line = 1
  }

  scanTokens() {
    while (!this.isAtEnd()) {
      this.start = this.current
      this.scanToken()
    }

    this.tokens.push(new TOKEN(TokenType.EOF), "", null, this.line)
    return this.tokens
  }

  scanToken() {
    let c = this.advance()
    switch (c) {
      case ' ':
      case "\r":
      case "\t":
        break
      case "\n":
        this.line++
        break
      default:
        error(this.line, "Unexpected Character")
        break;
    }
  }

  advance() {
    return this.source[this.current++]     //consume next character in the source code
  }

  peek() {
    if (this.isAtEnd()) { return '\0' }
    return this.source[this.current]
  }

  match(expected) {
    if (this.isAtEnd()) { return false }
    if (this.source(this.current) !== expected) { return false }
    this.current++
    return true;
  }


  addToken(type) {
    this.addToken(type, null)
  }

  addToken(type, literal) {
    let text = this.source.substring(start, current)
    this.tokens.push(new TOKEN(type, text, literal, this.line))
  }

  isAtEnd() {
    return this.current >= this.source.length
  }
}


exports.SCANNER = SCANNER