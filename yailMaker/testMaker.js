let { ELEMENTS } = require("./elements")
const fs = require('fs');

for (let [key, value] of Object.entries(ELEMENTS)) {

    for (let [property, propData] of Object.entries(value.properties)) {
        propData.tests = []

        switch (propData.type) {
            case "string":
                propData.tests.push(`Test ${property}`)
                break;
            case "boolean":
                propData.tests.push(true)
                break;
            case "number":
                propData.tests.push(0)
                break;
            case "component":
                propData.tests.push(`"componentName"`)
                break;
            case "color":
                let c = "FF"
                for (let i = 0; i < 6; i++) {
                    let r = Math.floor(Math.random() * 16).toString(16)
                    c += r
                }
                propData.tests.push(`"${c}"`)
                break;
            default:
                propData.tests.push(`${propData.type}`)
        }
    }



    for (let [property, propData] of Object.entries(value.methods)) {
        propData.tests = []
     
        for (let [name, type] of Object.entries(propData.parameters)) {
            switch (type) {
                case "string":
                    propData.tests.push(`Test ${name}`)
                    break;
                case "boolean":
                    propData.tests.push(true)
                    break;
                case "number":
                    propData.tests.push(0)
                    break;
                case "component":
                    propData.tests.push(`"componentName"`)
                    break;
                case "color":
                    let c = "FF"
                    for (let i = 0; i < 6; i++) {
                        let r = Math.floor(Math.random() * 16).toString(16)
                        c += r
                    }
                    propData.tests.push(`"${c}"`)
                    break;
                default:
                    propData.tests.push(`${type}`)
            }
        }
    }


}



fs.writeFileSync("tests.json", JSON.stringify(ELEMENTS))