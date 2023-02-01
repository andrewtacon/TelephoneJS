

component heights and widths can only be read after a screen is initialized, otherwise they return zero
InstantInTime means milliseconds since epoch (1,1,1970 midnight)


PROBLEMS


PROBLEM 1: Array push has an issue.

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

There seems to be a problem there for with pushing to arrays and assigning them to components (or maybe this is an edge case)

PROBLEM 2:

go back and check createElement for listview

PROBLEM 3:

Prompt for permission never works (webviewer - maybe others also)

