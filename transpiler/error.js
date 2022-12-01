function error(line, message) {
    report(line, "", message)
}

function report(line, where, message) {
    console.log(`Line: ${line}\nError ${where}: ${message}`)
}

exports.error = error
exports.report = report