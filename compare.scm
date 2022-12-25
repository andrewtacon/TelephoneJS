(def g$string "stringvalue")
(def g$number 0)
(def g$object (call-yail-primitive make-yail-dictionary (*list-for-runtime* (call-yail-primitive make-dictionary-pair (*list-for-runtime* "objectkey" "objectvalue" ) '(key any)  "make a pair") ) '(pair ) "make a dictionary"))
(def g$list (call-yail-primitive make-yail-list (*list-for-runtime* "listitem" ) '(any ) "make a list"))
(def g$bool #t)

(define-event Button1 Click()(set-this-form)
    (set-var! g$number 3)
    (set-var! g$string "newstringvalue")
    (set-var! g$bool #f)

    (call-yail-primitive yail-dictionary-set-pair 
        (*list-for-runtime* 
            "objectkey" 
            (get-var g$object) 
            "newvalue"
        ) 
        '(key dictionary any)  
        "set value for key in dictionary to value"
    )


    (call-yail-primitive yail-list-set-item! 
        (*list-for-runtime* 
            (get-var g$list) 
            1 
            "newlistitem"
        ) 
        '(list number any) 
        "replace list item"
    )
)




















(def g$object (call-yail-primitive make-yail-dictionary (*list-for-runtime*
(call-yail-primitive make-dictionary-pair (*list-for-runtime* "key"  "value" ) '(key any) "make a pair"))
'(pair )
"make a dictionary" ))



(set-var! 
    (if
        (call-yail-primitive yail-dictionary? (*list-for-runtime*  (get-var g$object) ) '(any)  "check if something is a dictionary")
        (call-yail-primitive yail-dictionary-lookup (*list-for-runtime* "key"  (get-var g$object)  "not found") '(key any any) "dictionary lookup")
        (
            if
                (call-yail-primitive yail-list?
                    (*list-for-runtime* 
                        (get-var g$object) 
                    )
                    '(any)
                    "is a list?"
                )
                (call-yail-primitive yail-list-get-item
                    (*list-for-runtime*
                        (get-var g$object)
                        key
                    )
                    '(list number)
                    "select list item"
                )
                (#f)
        )
    ) 
    "newvalue"  
)
