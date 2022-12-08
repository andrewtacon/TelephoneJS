let isLogging = true
let isDebugging = false

function log(message){
    if (isLogging) {
        console.log(message)
    }
}

function debug(message){
    if (isDebugging) {
        console.log(message)
    }
}


exports.log = log
exports.debug = debug