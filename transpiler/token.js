

const TokenType = {
    //literals
    "STRING": "STRING",
    "IDENTIFIER": "IDENTIFIER",


    //keywords
    "DEFINE": "DEFINE",
    "BUTTON": "BUTTON",
    "EVENT": "EVENT",
    "CLICK": "CLICK",
    "BEGIN": "BEGIN",
    "CALL": "CALL",
    "NOTIFIER": "NOTIFIER",
    "ALERT": "ALERT",
    "OPEN": "OPEN",
    "SCREEN": "SCREEN",
    "END": "END",

    "EOF": "EOF"
}
Object.freeze(TokenType)


class TOKEN {
    constructor() {
        this.type = undefined
        this.lexeme = undefined
        this.literal = undefined
        this.line = undefined
    }

    token(type, lexeme, literal, line) {
        this.type = type
        this.lexeme = lexeme
        this.literal = literal
        this.line = line
    }

    toString() {
        return `${type} ${lexeme} ${literal}`
    }
}

exports.TOKEN = TOKEN
exports.TokenType = TokenType