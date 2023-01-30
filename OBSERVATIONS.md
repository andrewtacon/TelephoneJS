

component heights and widths can only be read after a screen is initialized, otherwise they return zero
InstantInTime means milliseconds since epoch (1,1,1970 midnight)


PROBLEMS

this code doesn't work
        let list = testComponent.elements
        let b =  testComponent.createElement("c1", "c2", "cat.png")
        list.push(b)
        testComponent.elements = list

but this code does
        //let list =[]
        let b =  testComponent.createElement("c1", "c2", "cat.png")
        //list.push(b)
        testComponent.elements = [b]
        //testComponent.refresh()