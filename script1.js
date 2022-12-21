let g1=1, g2=2, g3 = 3

button1.addEventListener(
    "click",
    function () {
        let name = true
        let name2 = 456
        toast.showPasswordDialog(123456,g1, name)
        let name3 = 456
    }
)

/*


(let 
    ( 
        ($name 123)  
    )   
    (let 
        ( 
            ($name2 
                (lexical-value $name))  
            ) 
            #f 
        ) 
    )
)

(let
    (
        ($a 123 )
    )
    (let
        (
            ($b 
                (lexical-value $a )
            )
            #f
        )
    )
)


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