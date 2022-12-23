//screen
<screen script="script1.js" name="Screen1" AppName="yail" Title="Great Title!" ShowTitle="false" StatusBar="false" Scrollable="true">
    <button name="Button1" text="Click me!" />
    <notifier name='toast' />
</screen>

//add click event listener
Button1.addEventListener(
    "click",
    function () {
        toast.showAlert("Hello World!")
    }
)

//dictionaries / objects
let object = {
    "key0": false,
    "key1": "value",
    "key2": 123,
    "key3": identifier,
    "key4": [],
    "key5":{},
    "key6":{"text":"text"}
}


//arrays
let array = [
    {"key":"value"},
    {"key":"value"}
]


