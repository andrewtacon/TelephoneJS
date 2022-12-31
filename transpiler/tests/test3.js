


let string = "stringlington"
let number = 12
let number2 = 14
let list = [string, number]
let object = { "normal value": "normal", string: string, number: number, list: list, 1: 100 }

object[1] = 1
object.number = number2   //this no longer works = check member expression set
object.string = "string2"
object["normal value"] = "revised normal value"

textbox.text = object["normal value"] + "\n" + object["string"] + "\n" + object.string + "\n" + string

button1.addEventListener(
    "click",
    function () {
        toast.showAlert(object[1] + object["number"] + object.number)
        let a = 0
        while (a<4){
            a = a + 1
        }
        textbox.text = a 

    }
)
