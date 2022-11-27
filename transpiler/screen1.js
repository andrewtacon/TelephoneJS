/*

(define-event Button1 Click()
    (set-this-form)
    (call-component-method 'note1 'ShowAlert (*list-for-runtime* "Alert") '(text))
)

*/


button("Button1").click = function() {
    notifier("Note1").alert("Message")
}




/*

(define-event Button1 Click()
    (set-this-form)
    (forrange $number 
        (begin   
            (call-component-method 'Notifier1 'ShowAlert (*list-for-runtime* (lexical-value $number)) '(text))) 
        1 5 1)
    )
*/

/*button("Button1").click = function() {
    for (let number =1; number<=5; number=number+1) {
        notifier("Note1").alert(number)
    }
}*/