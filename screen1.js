
require("../screen1Helper")

screen1.addEventListener(
    "initialize",
    function(){
        testbox.text = "change here"

    }
)

button.addEventListener(
    "click",
    function(){
        label.visible = true
    }
)
