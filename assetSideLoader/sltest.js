const fs = require('fs')
const { Blob } = require('buffer')

let asset = "red.png"

const stats = fs.statSync(asset);
const fileSizeInBytes = stats.size;
let fileData = fs.readFileSync(asset, 'base64')

console.log(fileData)

console.log(stats)
console.log(fileSizeInBytes)





/*


const {
  Blob,
  resolveObjectURL,
} = require('buffer');

const blob = new Blob(['hello']);
const id = URL.createObjectURL(blob);

// later...

const otherBlob = resolveObjectURL(id);
console.log(otherBlob.size);

function save(name, data, type, isBinary) {
    if (isBinary) {
        let bytes = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            bytes[i] = data.charCodeAt(i);
        }
        data = new Uint8Array(bytes);
    }

    let blob = new Blob([data], { type: type });
    let objectURL = window.URL.createObjectURL(blob);
    let anchor = document.createElement('a');

    anchor.href = objectURL;
    anchor.download = name;
    anchor.click();

    URL.revokeObjectURL(objectURL);
}
*/