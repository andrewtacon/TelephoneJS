

let g1 = {
    "key0": false,
    "key1": "value",
    "key2": 123,
    "key3": identifier,
    "key4": [],
    "key5":{},
    "key6":{"text":"text"}
}



button1.addEventListener(
    "click",
    function () {
        toast.showAlert(g1)
    }
)

/*
(def g$g2 
    (call-yail-primitive make-yail-list 
        (*list-for-runtime* ) 
        '() 
        "make a list"
    )
)

(define-event Button1 Click()
    (set-this-form)
    (let 
        ( 
            ($name 
                (call-yail-primitive make-yail-list 
                    (*list-for-runtime* ) 
                    '() 
                    "make a list"
                )
            )  
        ) 
        #f 
    )
)

--- with elements ---

(def g$g2 
    (call-yail-primitive make-yail-list 
        (*list-for-runtime* 25 #t ) 
        '(any any ) 
        "make a list"
    )
)

(define-event Button1 Click()(set-this-form)
(let 
    ( 
        ($name 
            (call-yail-primitive make-yail-list 
                (*list-for-runtime* "text" (get-var g$g2) ) 
                '(any any ) 
                "make a list")
            )  
        ) 
        #f 
    )
)







(def g$g2 
    (call-yail-primitive make-yail-list 
        (*list-for-runtime* 
            25 
            #t 
            (call-yail-primitive make-yail-list 
                (*list-for-runtime* 
                    "" 
                    0 
                ) 
                '(any any ) 
                "make a list"
            ) 
        ) 
        '(any any any ) 
        "make a list"
    )
)





(define-event Button1 Click()(set-this-form)
    (let ( ($name (call-yail-primitive make-yail-list (*list-for-runtime* "text" (get-var g$g2) ) '(any any ) "make a list"))  ) #f ))















/*
Button1.addEventListener(
    "click",
    function () {
        toast.showChooseDialog("messageText", "titleText", "b1Text", "b2Text", true)
    }
)




/*
(define-event Button1 Click()
    (set-this-form)
    (set-and-coerce-property! 'Button1 'Shape 3 'number)
)
*/