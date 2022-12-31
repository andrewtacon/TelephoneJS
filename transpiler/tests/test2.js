let string = "string"
let number = 12
let list = [string, number]
let object = {"normal":"normal", string:string, number:number, list:list}
let list2 = [
  1,
  2,
  3, 
  list, 
  object,
  "a"=="b",
  "a"==="b",
  "a"=="a",
  "b"==="b",
  "a">"b",
  "a">="b",
  "a"<"b",
  "a"<="b",
  "a"<"a",
  "a"<="a",
  "a">"a",
  "a">="a",
  "test",
  list[0],
  list[1],
  object.string,
  object["string"]/*,
  object.list[1]*/
]


textbox.text = list2 