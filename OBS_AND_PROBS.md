

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

PROBLEM 4:

Go through all the components and find the RED blocks e.g. in Phonecall components - work out what these things mean

PROBLEM 5:
Texting component can't send or recieve - it is the same problem in the offical app inventor to do with google permission. https://community.appinventor.mit.edu/t/error-908-permission-receive-sms/7426/5 


PROBLEM 6:

clouddb - attempting to use with apentor default values yields a java.net.UnknownHostException


PROBLEM 7:
datafile --> need to read the "sourcefile" tag in XML and upload that file.
then can do all the tests for that component properly

PROBLEM 8:
need credentials json file for spreadsheet tests
this file needs to be added to the upload files list


PROBLEM 9:
vidoeplayer source needs to upload the file


PROBLEM 10:
camera and camcorder throw errors on console but seem to work

PROBLEM 11:
need to create color.create methods to trun RGB and RGBA into integer colors for box hex strings and integer values in the legal ranges.

PROBLEM 12:
ball component needs all methods to be tested, anything except bounce has not been tested



There is no way for me to test the following component properly - they may or may not work
Barometer
GyroscopeSensor
Hygrometer
Twitter - no account so no testing
