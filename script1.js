Button1.addEventListener(
    "click",
    function () {
        toast.showAlert("Hello World!")
    }
)


Button2.addEventListener(
    "click",
    function () {
        toast.showAlert("This is button 2!")
    }
)


/*
(define-event Button1 Click()
    (set-this-form)
    (call-component-method 
        'toast 
        'ShowAlert 
        (*list-for-runtime* "Hello World!") 
        '(text)
    )
)
*/