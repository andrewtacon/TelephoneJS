//THIS IS NO LONGER USED
//This because it is better to upload the geojson file directly and load it in code
//than to try and parse it and build all the components here

const fs = require("fs")


//this helps name objects without a name
function* getNumber() {
    let count = 0
    while (true) {
        yield count
        count++
    }
}
let geo_generator = getNumber();

//loadGeojson("sherwood.geojson", "fc1")

function loadGeojson(filename, featureCollectionComponent) {

    let output = ""
    let componentNames = []

    let fileData = fs.readFileSync(filename, "utf-8")
    fileData = JSON.parse(fileData)

    let features = fileData.features

    for (let i = 0; i < Math.min(features.length,20); i++) {

        let feature = features[i]
        let geometry = feature.geometry

        switch (geometry.type) {
            case "Point": //return a marker
                let markerIdent = featureCollectionComponent + "_" + geo_generator.next().value
                output += `
(add-component ${featureCollectionComponent} com.google.appinventor.components.runtime.Marker ${markerIdent} 
    (set-and-coerce-property! '${markerIdent} 'FillColor #xFF448800 'number)
    (set-and-coerce-property! '${markerIdent} 'Latitude ${geometry.coordinates[1]} 'number)
    (set-and-coerce-property! '${markerIdent} 'Longitude ${geometry.coordinates[0]} 'number)
)
                `
                componentNames.push(markerIdent)
                break;
            default:
                console.log(`Geometry type "${geometry.type}" not yet implemented.`)
        }

    }

    return {scheme:output, componentNames: componentNames}

}


exports.load = loadGeojson

/*



(add-component FeatureCollection1 com.google.appinventor.components.runtime.Marker Marker8 
    (set-and-coerce-property! 'Marker8 'FillColor #xFF448800 'number)

    (set-and-coerce-property! 'Marker8 'Height 7 'number)

    (set-and-coerce-property! 'Marker8 'Latitude -27.53131725999998 'number)

    (set-and-coerce-property! 'Marker8 'Longitude 152.9727554000001 'number)

    (set-and-coerce-property! 'Marker8 'Title \"Marker8\" 'text)

)

*/