let a = [1,2,3]
a[0] = 5
a[1] = 6
a[2] = 7
textbox.value =a[0]+","+a[1]+","+a[2]



/*let string = "stingvalue"
let number = 2 
let bool = true
let object = {"key":{"nestedkey":"nestedvalue"}, "array":[1,2,3,4]}
let list = ["item1",object]

string = "newstring"
number = 2 + 3 /4 * 7 **2
bool = false

textbox.value = "hello"
textbox.value = textbox.value + object + list

button1.addEventListener(
    "click",
    function(){
        toast.showAlert(textbox.value)
    }
)

*/

/*


(let ( ($xxx #f)  )   (if(call-yail-primitive yail-dictionary? (*list-for-runtime* (get-var g$name) ) '(any)  "check if something is a dictionary") (begin   (set-lexical! $xxx (call-yail-primitive yail-dictionary-lookup (*list-for-runtime* "length" (get-var g$name) "not found") '(key any any)  "dictionary lookup"))) (begin #f)) ))


(if 
    (call-yail-primitive yail-dictionary? 
        (*list-for-runtime* 
            (get-var g$name) 
        ) 
        '(any)  
        "check if something is a dictionary"
    ) 
    (begin #f) 
    (begin 
        (if 
            (call-yail-primitive yail-list? 
                (*list-for-runtime* 
                    (get-var g$name) 
                ) 
                '(any) 
                "is a list?"
            ) 
            (begin #f) 
            (begin #f)
        )
    )
)

(call-yail-primitive string? 
    (*list-for-runtime* 
        #f 
    ) 
    '(any) 
    "is a string?"
) 

(call-yail-primitive is-number? 
    (*list-for-runtime* 
        #f
    ) 
    '(text) 
    "is a number?"
) 



(if 
    (call-yail-primitive yail-dictionary? 
        (*list-for-runtime* 
            (get-var g$name) 
        ) 
        '(any)  
        "check if something is a dictionary"
    ) 
    (begin   
        (let 
            ( 
                ($xxx 
                    (call-yail-primitive yail-dictionary-lookup 
                        (*list-for-runtime* "length" (get-var g$name) "not found") 
                        '(key any any)  
                        "dictionary lookup")
                    )  
                ) 
                #f 
            )
        ) 
        (begin #f)
    )
)


*/