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


let d = []


