;;These functions simplify the output code from the transpiler and implement missing functionality in the Kawa Scheme implemented
;;in the App Inventor REPL

;;Overloads addition to handle string concatenation and numberical addition
(def (add $a $b) 
    (if    
        (and-delayed (call-yail-primitive is-number? (*list-for-runtime* (lexical-value $a)) '(text) "is a number?") (call-yail-primitive is-number? (*list-for-runtime* (lexical-value $b)) '(text) "is a number?")) 
        (call-yail-primitive + (*list-for-runtime* (lexical-value $a) (lexical-value $b) ) '(number number ) "+") 
        (call-yail-primitive string-append (*list-for-runtime* (lexical-value $a) (lexical-value $b) ) '(text text ) "join")
    )
)

;;Overload equality for stings and numbers
(def (eql $a $b $operator $operatorCommand ) 
    (if 
        (and (call-yail-primitive string? (*list-for-runtime* $a) '(any) "is a string?")  (call-yail-primitive string? (*list-for-runtime* $b) '(any) "is a string?")  )
        (call-yail-primitive string=? (*list-for-runtime* $a $b) '(text text) "text=")
        (call-yail-primitive $operator (*list-for-runtime* $a $b) '(number number ) "$operatorCommand")
    )
)

;;Overloads not equals for strings and numbers
(def (neq $a $b $operator $operatorCommand ) 
    (if 
        (and (call-yail-primitive string? (*list-for-runtime* $a) '(any) "is a string?")  (call-yail-primitive string? (*list-for-runtime* $b) '(any) "is a string?")  )
        (not (call-yail-primitive string=? (*list-for-runtime* $a $b) '(text text) "not ="))
        (call-yail-primitive $operator (*list-for-runtime* $a $b) '(number number ) "$operatorCommand")
    )
)


;;Overloads greaterthan for strings and numbers
(def (gt $a $b ) 
    (if 
        (and (call-yail-primitive string? (*list-for-runtime* $a) '(any) "is a string?")  (call-yail-primitive string? (*list-for-runtime* $b) '(any) "is a string?")  )
        (call-yail-primitive string>? (*list-for-runtime* $a $b) '(text text) "text>")
        (call-yail-primitive > (*list-for-runtime* $a $b ) '(number number ) ">")
    )
)


;;Overloads less than for strings and numbers
(def (lt $a $b ) 
    (if 
        (and (call-yail-primitive string? (*list-for-runtime* $a) '(any) "is a string?")  (call-yail-primitive string? (*list-for-runtime* $b) '(any) "is a string?")  )
        (call-yail-primitive string<? (*list-for-runtime* $a $b) '(text text) "text>")
        (call-yail-primitive < (*list-for-runtime* $a $b ) '(number number ) "<")
    )
)

;;Adds the functionality to trim from the start of a string e.g.   content.trimStart()
(define 
    (trim-start initString) 
    (let 
            (  
            (counter 0)
            )
            (let   
            (
                (shortString (substring initString 0 counter))
            )
            (while
                (and
                    (= (string-length (string-trim shortString)) 0)
                    (<= counter (string-length initString))
                )
                (begin
                    (set! counter (+ counter 1))
                    (set! shortString (substring initString 0 counter))
                )
                )
                (begin
                (set! counter (- counter 1))
                (substring
                    initString
                    counter
                    (string-length initString)
                )
            )
        )
    )
)



;;Adds the functionality to trim from the end of a string e.g.   content.trimEnd()
(define 
    (trim-end initString) 
    (let 
            (  
            (counter 0)
            )
            (let   
            (
                (shortString (substring initString (-(string-length initString) counter) (string-length initString)))
            )
            (while
                (and
                    (= (string-length (string-trim shortString)) 0)
                    (<= counter (string-length initString))
                )
                (begin
                    (set! counter (+ counter 1))
                    (set! shortString (substring initString (-(string-length initString) counter) (string-length initString)))
                )
                )
                (begin
                (set! counter (- counter 1))
                (substring
                    initString
                    0
                    (- (string-length initString) counter)
                )
            )
        )
    )
)


;;adds the 'at' method for strings  "hello".at(1) =>  e
(define
    (at object property)
    (begin
        (if 
            (< property 0)
            (set! property (+ (string-length object) property))
            #f
        )
        (if
            (and (>= property 0) (< property (string-length object))   )
            (substring object property (+ property 1))
            '()    
        )
    )
)

;;adds the 'charat' method for strings  "hello".charAt(1)
(define
    (char-at object property)
    (if
        (and (>= property 0) (< property (string-length object))   )
        (substring object property (+ property 1))
        '()    
    )
)

;;adds the 'charcodeat' method for strings  "hello".charCodeAt(1) =>  number
(define
    (char-code-at object property)
    (if
        (and (>= property 0) (< property (string-length object))   )
        (char->integer (object:charAt property)  )
        '()    
    )
)


;;Simplifies checking if something is a dictionary / object
(define 
    (isDictionary testItem)
    (call-yail-primitive yail-dictionary? (*list-for-runtime*  testItem ) '(any)  "check if something is a dictionary") 
)

;;Simplifies checking if something is a list / array
(define 
    (isList testItem)
    (call-yail-primitive yail-list? (*list-for-runtime* testItem ) '(any) "is a list?") 
)

;; This gets a property from a dictionary / object
(define
    (getFromDict property object)
    (call-yail-primitive yail-dictionary-lookup (*list-for-runtime* property  object  "not found") '(key any any) "dictionary lookup") 
)

(define
    (getFromList property object) 
    (call-yail-primitive yail-list-get-item (*list-for-runtime*  object (+ property 1) ) '(list number) "select list item") 
)