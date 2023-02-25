

let data = { "type": "Feature", "properties": { "ObjectId": 1, "Tree_ID": 196, "x": 152.9747755, "y": -27.53269641, "Year_Established": 0, "Scientific_Name": "Acacia concurrens", "Common_Name": "Black wattle, Curracabah", "Family": "Mimosaceae", "Nature_Conservation_Act_1992": "Least concern", "EPBC_Act_1999": "Not listed", "Australian": "Yes", "Distribution": "N NSW to SEQ", "Habitat": "Coastal areas eucalypt forest and woodland", "Height": "4", "Crown_width": 2, "DBH": 0, "Species_Profile": "Acacia concurrens, commonly known as Black wattle or Curracabah, is a tall shrub endemic to eastern Australia, growing to a height of up to 10m. The botanic name concurrens describes the converging primary veins on the phyllodes (modified leaf stems which function as leaf). Bright yellow rod-shaped flowers are seen from late winter to early spring." }, "geometry": { "type": "Point", "coordinates": [152.974775500000078, -27.532696409999971] } }
let output = [
    ["type", "Feature"],
    ["geometry",
        []
    ],
    ["properties",
        []
    ]
]

let props = Object.keys(data.properties)
props.forEach(
    item=> {
        output[2][1].push(
            [item, data.properties[item]]
        )
    }
)

console.log(output)
