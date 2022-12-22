(define-event Button1 Click()
    (set-this-form)
    (let 
        ( 
            ($name 
                (call-yail-primitive make-yail-dictionary 
                    (*list-for-runtime* ) 
                    '() 
                    "make a dictionary"
                )
            )  
        )   
        (call-component-method 'Notifier1 'ShowAlert (*list-for-runtime* (lexical-value $name)) '(text)) 
    )
)




(call-yail-primitive make-yail-dictionary 
    (*list-for-runtime* 
        (call-yail-primitive make-dictionary-pair 
            (*list-for-runtime* "boolean" #t ) 
            '(key any)  
            "make a pair"
        ) 
        (call-yail-primitive make-dictionary-pair 
            (*list-for-runtime* "identifer" (get-var g$aaaa) ) 
            '(key any)  
            "make a pair"
        ) 
        (call-yail-primitive make-dictionary-pair 
            (*list-for-runtime* "string" "stringdata" ) 
            '(key any)  
            "make a pair"
        ) 
        (call-yail-primitive make-dictionary-pair 
            (*list-for-runtime* "number" 0 ) 
            '(key any)  
            "make a pair"
        ) 
        (call-yail-primitive make-dictionary-pair 
            (*list-for-runtime* 
                "object" 
                (call-yail-primitive make-yail-dictionary 
                    (*list-for-runtime* ) 
                    '() 
                    "make a dictionary"
                ) 
            ) 
            '(key any)  
            "make a pair"
        ) 
        (call-yail-primitive make-dictionary-pair 
            (*list-for-runtime* 
                "array" 
                (call-yail-primitive make-yail-list 
                    (*list-for-runtime* ) 
                    '() 
                    "make a list"
                )
            ) 
            '(key any)  
            "make a pair"
        )
    ) 
    '(pair pair pair pair pair ) 
    "make a dictionary"
)
     

------------

(try-catch 
            (let 
                ((
                    attempt 
                        (delay 
                            (set-form-name "Screen1")
                        )
                )) 
                (force attempt)
            ) 
            (exception java.lang.Throwable 'notfound)
        )
        
(do-after-form-creation
	(set-and-coerce-property! 'Screen1 'AppName "yail" 'text)
	(set-and-coerce-property! 'Screen1 'Title "Great Title!" 'text)
	(set-and-coerce-property! 'Screen1 'TitleVisible #f 'boolean)
	(set-and-coerce-property! 'Screen1 'ShowStatusBar #f 'boolean)
	(set-and-coerce-property! 'Screen1 'Scrollable #t 'boolean)
)

(add-component Screen1 com.google.appinventor.components.runtime.Button button1
	(set-and-coerce-property! 'button1 'Text "Show Message" 'text)
)

(add-component Screen1 com.google.appinventor.components.runtime.Notifier toast
)

(init-runtime)
(def g$identifer #t)
(def g$g1 
    (call-yail-primitive make-yail-dictionary 
        (*list-for-runtime*
            (call-yail-primitive make-dictionary-pair
                (*lists-for-runtime* "key0" #f  )
                '(key any)
                "make a pair"
            )
            (call-yail-primitive make-dictionary-pair
                (*lists-for-runtime* "key1" "value"  )
                '(key any)
                "make a pair"
            )
            (call-yail-primitive make-dictionary-pair
                (*lists-for-runtime* "key2" 123  )
                '(key any)
                "make a pair"
            )
            (call-yail-primitive make-dictionary-pair
                (*lists-for-runtime* "key3" (get-var g$identifer)  )
                '(key any)
                "make a pair"
            )
            (call-yail-primitive make-dictionary-pair
                (*lists-for-runtime* "key4" 
                    (call-yail-primitive make-yail-list 
                    (*list-for-runtime* ) 
                    '() 
                    "make a list")  
                )
                '(key any)
                "make a pair"
            )
            (call-yail-primitive make-dictionary-pair
                (*lists-for-runtime* "key5" 
                    (call-yail-primitive make-yail-dictionary 
                        (*list-for-runtime*
                            '()
                            "make a dictionary"
                        )
                    )
                )
                '(key any)
                "make a pair"
            )
            '(pair pair pair pair pair pair )
            "make a dictionary"
        )
    )
) 




(define-event button1 Click() 
(set-this-form)(call-component-method 'toast 'ShowAlert (*list-for-runtime* (get-var g$g1)) '(text)))
(call-Initialize-of-components 'Screen1 'button1 'toast  )