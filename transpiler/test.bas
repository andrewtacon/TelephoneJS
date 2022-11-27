(set-var! g$name 
	(call-yail-primitive 
		- 
		(*list-for-runtime* 
			2 
			(call-yail-primitive 
			+ 
			(*list-for-runtime* 
				3 
				4 
			) 
			'(number number ) "+")
		) 
		'(number number) "-")
	)
)





DEFINE EVENT BUTTON Button1 CLICK
BEGIN
END

(define-event Button1 Click()
    (set-this-form)
)



DEFINE EVENT BUTTON Button1 CLICK
BEGIN
	CALL NOTIFIER Note1 ALERT "Message"
END

(define-event Button1 Click()
    (set-this-form)
    (call-component-method 'note1 'ShowAlert (*list-for-runtime* "Alert") '(text))
)



DEFINE EVENT BUTTON Button1 CLICK
BEGIN
	FOR number = 1 TO 5 STEP 1
		CALL NOTIFIER Note1 ALERT number
	NEXT number
END


(define-event Button1 Click()
    (set-this-form)
    (forrange $number 
        (begin   
            (call-component-method 'Notifier1 'ShowAlert (*list-for-runtime* (lexical-value $number)) '(text))) 
        1 5 1)
    )





DEFINE EVENT BUTTON Button1 CLICK
BEGIN
	LET x = 3
	FOR number = 1 TO x+5 STEP 1
		CALL NOTIFIER Note1 ALERT number
	NEXT number
END



(define-event Button1 Click()(set-this-form)
    (let ( ($x 3)  )   
	(forrange $number 
		(begin   
			(call-component-method 'Notifier1 'ShowAlert 
				(*list-for-runtime* 
					(lexical-value $number)
				) '(text)
			)
		) 
		1 
		(call-yail-primitive + (*list-for-runtime* (lexical-value $x) 5 ) '(number number ) "+") 
		1
		) 
	)
)
			
			
(call-Initialize-of-components 'Screen1 'Button1 'Notifier1)




GRAMMAR

DEFINE EVENT %type% %identifer% [CLICK, GOTFOCUS, LONGCLICK, LOSTFOCUS, TOUCHDOWN, TOUCHUP] BEGIN <expressions> END