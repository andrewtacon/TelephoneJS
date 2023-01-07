require("./screen1Helper")

let dictionary = {
    "a":"first",
    "b":"second",
    "c":"third"
}

textbox.text = dictionary +"\n"
dictionary.a = "new a value"
textbox.text = textbox.text + "  " + dictionary +"\n"
dictionary.key = "newvalue"
textbox.text = textbox.text + "  " + dictionary +"\n"
delete dictionary.b
textbox.text = textbox.text + "  " + dictionary +"\n"
textbox.text = textbox.text + "  " + Object.keys(dictionary) +"\n"
textbox.text = textbox.text + "  " + Object.values(dictionary) +"\n"
textbox.text = textbox.text + "  " + Object.hasOwn(dictionary, "a") +"\n"
textbox.text = textbox.text + "  " + Object.hasOwn(dictionary,"b") +"\n"
textbox.text = textbox.text + "  " + Object.entries(dictionary) +"\n"

let object2 = Object.fromEntries([["a", "alpha value"],["beta", "beta Value"]])

textbox.text = textbox.text + "  " + object2 +"\n"

let copy = Object.create(object2)
Object.assign(object2, dictionary)

textbox.text = textbox.text + "  " + dictionary +"\n"
textbox.text = textbox.text + "  " + object2 +"\n"
textbox.text = textbox.text + "  " + copy +"\n"


