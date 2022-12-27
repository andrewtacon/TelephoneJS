const {ELEMENTS} =  require("../elements")
const fs = require('fs')

let list = []

for (const [key, value] of Object.entries(ELEMENTS)){
    list = list.concat(value.attributes)
    list = list.concat(value.designerAttributes)
    list = list.concat(value.blocksAttributes)
    list = list.concat(value.blocksReadOnly)
    list = list.concat(value.blocksWriteOnly)
}

let set = new Set(list)
list = [...set]

for (let i=0; i< list.length; i++) {
    list[i] = list[i][0].toUpperCase() + list[i].substring(1)
}

list.sort()


for (let i=0; i< list.length; i++) {
    list[i] = list[i][0].toUpperCase() + list[i].substring(1)
}

fs.writeFileSync('atts.txt',"")

for (let i=0; i< list.length; i++) {
    fs.appendFileSync("atts.txt", `"${list[i]}":[],\n`)
}




console.log(list)