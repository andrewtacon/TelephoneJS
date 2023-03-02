const fs = require('fs')
const PROPERTIES = 1
const METHODS = 2
const EVENTS = 3

let files = fs.readdirSync(".")

let data = ""

for (let i = 0; i < files.length; i++) {

    if (files[i].endsWith("chart.txt")) {
        data += fs.readFileSync(files[i], "utf-8") + "\r\n"

        console.log(files[i])
    }
}






let lines = data.split('\r\n')
//console.log(lines)
for (let i = lines.length - 1; i >= 0; i--) {

    if (!lines[i].startsWith("{")) {
        lines.splice(i, 1)
    }
}

let output = {}

let mode = 0
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('{:.properties}')) {
        mode = PROPERTIES
        continue
    }
    if (lines[i].startsWith('{:.methods}')) {
        mode = METHODS
        continue
    }
    if (lines[i].startsWith('{:.events}')) {
        mode = EVENTS
        continue
    }

    if (mode === PROPERTIES) {
        let line = lines[i].split("}")
        let specs = line[0]
        let line2 = line[1].split(":")
        let name = line2[0].trim()
        name = name[0].toLowerCase(0) + name.substring(1)

        let description = line2[1]? line2[1].trim():""
        let component = specs.substring(specs.indexOf('"') + 1, specs.indexOf('.'))

        let runTimeName = component

        component = component.toLowerCase()

        let type = "string"

        if (specs.includes("boolean")) {
            type = "boolean"
        } else if (specs.includes("number")) {
            type = "number"
        } else if (specs.includes("color")) {
            type = "color"
        } else if (specs.includes('InstantInTime')) {
            type = "InstantInTime"
        } else if (specs.includes('dictionary')) {
            type = "object"
        } else if (specs.includes('list')) {
            type = "array"
        }

        // console.log("-----------------------")

        if (!output[component]) {
            output[component] = {}
            output[component].properties = {}
            output[component].designerNoWrite = []
            output[component].codeNoRead = []
            output[component].codeNoWrite = []
            output[component].methods = {}
            output[component].events = {}
        }

        // console.log(runTimeName)
        output[component].runTimeName = runTimeName
        //        console.log(component)

        output[component].properties[name] = {
            description: description,
            type: type
        }

        //console.log(name)
        //console.log(type)
        //console.log(description)
        //  console.log(specs)

        specs = specs.replace(".boolean", "")

        if (specs.includes(".do")) {
            //   console.log("BlocksNoRead")
            // console.log("BlocksNoWrite")
            output[component].codeNoRead.push(name)
            output[component].codeNoWrite.push(name)

        } else if (specs.includes(".bo")) {
            if (specs.includes(".wo")) {
                //   console.log("NoDesigner")
                //   console.log("BlocksNoRead")
                output[component].designerNoWrite.push(name)
                output[component].codeNoRead.push(name)

            } else if (specs.includes(".ro")) {
                //  console.log("NoDesigner")
                //  console.log("BlocksNoWrite")
                output[component].designerNoWrite.push(name)
                output[component].codeNoWrite.push(name)
            } else {
                //  console.log("NoDesigner")
                output[component].designerNoWrite.push(name)
            }
        }

    }

    if (mode === METHODS || mode === EVENTS) {
        let start = lines[i].substring(0, lines[i].indexOf(')'))
        let end = lines[i].substring(lines[i].indexOf(')') + 1)
        end = end.substring(end.indexOf(':') + 1).trim()

        let component = start.substring(start.indexOf('"') + 1, start.indexOf('.'))

        let detail = start.substring(start.indexOf('}') + 1).trim()
        let method = detail.substring(0, detail.indexOf('('))

        detail = detail.substring(detail.indexOf("(") + 1)
        detail = detail.split(",")

        let detail2 = {}
        for (let j = 0; j < detail.length; j++) {
            let d = detail[j]
            if (d === '') { continue }
            let ds = d.split("{:.")
            ds[1] = ds[1].replace("}", "")
            if (ds[1] === 'text') { ds[1] = 'string' }
            detail2[ds[0]] = ds[1]
        }

        let runTimeName = component

        component = component.toLowerCase()


        if (!output[component]) {
            output[component] = {}
            output[component].properties = {}
            output[component].designerNoWrite = []
            output[component].codeNoRead = []
            output[component].codeNoWrite = []
            output[component].methods = {}
            output[component].events = {}
        }

        if (method.startsWith("HTML") || method.startsWith("HTML")) {

        } else {
            method = method[0].toLowerCase() + method.substring(1)
        }

        // console.log("-------------")
        output[component].runTimeName = runTimeName
        // console.log(runTimeName)

        if (mode === METHODS) {
            output[component].methods[method] = {
                parameters: detail2,
                description: end
            }
        } else {
            output[component].events[method] = {
                parameters: detail2,
                description: end
            }
        }

        // console.log(component)
        // console.log(method)
        // console.log(detail2)
        // console.log(end)

    }



}


for (const [key, value] of Object.entries(output)) {
    value.properties["class"] = {
        description: "The styling class of the the component",
        type: "string"
    }
    value.codeNoRead.push("class")
    value.codeNoWrite.push("class")

    value.properties["id"] = {
        description: "The styling id of the the component",
        type: "string"
    }
    value.codeNoRead.push("id")
    value.codeNoWrite.push("id")

    value.properties["name"] = {
        description: "The name of the component that will be used to refer to it in code.",
        type: "string"
    }
    value.codeNoRead.push("name")
    value.codeNoWrite.push("name")

    let events = Object.keys(value.events)
    if (events.length > 0) {
        value.methods["addEventListener"] = {
            description: "Method used to create event listeners.",
            parameters: {}
        }
    }

}


//console.log(output)

//console.log(lines)

//at end add 'name', 'class' and 'id' as properties that are designer only


fs.writeFileSync("chart.json", JSON.stringify(output))