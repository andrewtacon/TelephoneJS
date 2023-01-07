require("./screen2Helper")

button2.addEventListener(
    "click",
    function(){
        closeScreen("hello from 2")
    }
)


bananaBread.addEventListener(
    "initialize",
    function(){
        textbox.text = getStartValue()
    }
)