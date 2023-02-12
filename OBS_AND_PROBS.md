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

PROBLEM 5:
Texting component can't send or recieve - it is the same problem in the offical app inventor to do with google permission. https://community.appinventor.mit.edu/t/error-908-permission-receive-sms/7426/5 

PROBLEM 6:
clouddb - attempting to use with apentor default values yields a java.net.UnknownHostException

PROBLEM 8:
need credentials json file for spreadsheet tests
this file needs to be added to the upload files list

PROBLEM 10:
camera and camcorder throw errors on console but seem to work

PROBLEM 11:
need to create color.create methods to trun RGB and RGBA into integer colors for box hex strings and integer values in the legal ranges.

PROBLEM 12:
ball component needs all methods to be tested, anything except bounce has not been tested

PROBLEM 13
for map need to properly test methods of
FeatureFromDescription and
Save

PROBLEM 14
feature collection = everything

PROBLEM 15
test navigation component by getting API key

PROBLEM 16
polygons don't show up ??????

PROBLEM 17
fail gracefully but not terminate on xml and js errors in code

PROBLEM 18
xml hinting dtd template?

PROBLEM 19
emulatorUSb needs to have better file on device checking - at moment seems to upload everything each time (which works and is fine but annoying)



There is no way for me to test the following component properly - they may or may not work
Barometer
GyroscopeSensor
Hygrometer
Twitter - no account so no testing
