//These functions simplify the output code from the transpiler and implement missing functionality in the Kawa Scheme implemented
//in the App Inventor REPL

//Overloads addition to handle string concatenation and numberical addition
//this needs rewrite to cover all possible cases of addition in js
exports.add = `
(define (add a b) 
    (if    
        (and (number? a) (number? b))
        (+ a b) 
        (string-append (coerce-arg a 'text) (coerce-arg b 'text))
    )
)
`

//Overloads greaterthan for strings and numbers
exports.gt = `
(def (gt $a $b ) 
    (if 
        (and (string? $a) (string? $b))
        (string>? $a $b)
        (> $a $b)
    )
)
`

//Overloads less than for strings and numbers
exports.lt = `
(def (lt $a $b ) 
    (if 
        (and (string? $a) (string? $b))
        (string<? $a $b)
        (< $a $b ) 
    )
)
`

//Adds the functionality to trim from the start of a string e.g.   content.trimStart()
exports.trim_start = `
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
`


//Adds the functionality to trim from the end of a string e.g.   content.trimEnd()
exports.trim_end = `
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
`

//adds the 'at' method for strings  "hello".at(1) =>  e
exports.at = `
(define
    (at object property)
    (cond 
        (
            (string? object) 
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
        (
            (isList object)
            (begin
                (set! property (+ property 1))
                (let
                    ((
                        len (call-yail-primitive yail-list-length (*list-for-runtime* object ) '(list) "length of list")
                    ))
                    (if 
                        (<= property 0)
                        (set! property (+ len property))
                        #f
                    )
                    (if
                        (and (> property 0) (<= property len)   )
                        (call-yail-primitive yail-list-get-item (*list-for-runtime* object property) '(list number) "select list item")
                        #f    
                    )

                )
            )
        )
        (else #f)

    )

)
`



//adds the 'charat' method for strings  "hello".charAt(1)
exports.char_at = `
(define
    (char-at object property)
    (if
        (and (>= property 0) (< property (string-length object))   )
        (substring object property (+ property 1))
        '()    
    )
)
`


//adds the 'charcodeat' method for strings  "hello".charCodeAt(1) =>  number
exports.char_code_at = `
(define
    (char-code-at object property)
    (if
        (and (>= property 0) (< property (string-length object))   )
        (char->integer (object:charAt property)  )
        '()    
    )
)
`

//Simplifies checking if something is a dictionary / object
exports.isDictionary = `
(define 
    (isDictionary testItem)
    (call-yail-primitive yail-dictionary? (*list-for-runtime*  testItem ) '(any)  "check if something is a dictionary") 
)
`

//Simplifies checking if something is a list / array
exports.isList = `
(define 
    (isList testItem)
    (call-yail-primitive yail-list? (*list-for-runtime* testItem ) '(any) "is a list?") 
)
`


// This gets a property from a dictionary / object
exports.getFromDict = `
(define
    (getFromDict property object)
    (call-yail-primitive yail-dictionary-lookup (*list-for-runtime* property  object  "not found") '(key any any) "dictionary lookup") 
)
`

exports.getFromList = `
(define
    (getFromList property object) 
    (call-yail-primitive yail-list-get-item (*list-for-runtime*  object (+ property 1) ) '(list number) "select list item") 
)
`


exports.endsWith = `
(define
    (endsWith fullString endString)
    (if 
        (or(< (string-length endString) (string-length fullString))(= (string-length endString) (string-length fullString)))
        (if
            (string=?
            (substring fullString (- (string-length fullString) (string-length endString)) (string-length fullString)  )  
                endString
            )    
            #t
            #f
        )    
        #f
    )
)
`

exports.indexOf = `
(define (indexOf t s)
  (let* ((len (string-length s))
        (max (- (string-length t) len)))        
    (let loop ((i 0))
      (cond ((> i max) 
             -1)
            ((string=? s
                       (substring t i (+ i len)))
             i)
            (else (loop (+ i 1)))))))`


exports.lastIndexOf = `
(define (lastIndexOf t s)
    (let* ((len (string-length s))
        (max (- (string-length t) len)))        

    (let loop ((i 0))
        (cond ((> i max) 
                -1)
            ((string=? s
                        (substring t 
                            (- (- (string-length t) len) i)
                            (- (string-length t) i)
                        ))
                (- max i))
            (else (loop (+ i 1)))))))`


exports.padEnd = `
(define 
    (padEnd s len sym)
    (if
        (<  len (string-length s))
        s
        (let loop ((i 0))
            (cond
                ( 
                    (> 
                        len
                        (string-length s)
                    )  
                    (begin
                        (set! s (string-append s sym))
                        (loop 
                            (+ i 1)
                        )
                    )
                )
                (else s)
               
            )
        ) 
    )    
)`


exports.padStart = `
(define 
    (padStart s len sym)
    (if
        (<  len (string-length s))
        s
        (let loop ((i 0))
            (cond
                ( 
                    (> 
                        len
                        (string-length s)
                    )  
                    (begin
                        (set! s (string-append sym s))
                        (loop 
                            (+ i 1)
                        )
                    )
                )
                (else s)
               
            )
        ) 
    )    
)`


exports.repeat = `
(define 
    (repeat s len)
    (let 
        ((init s))
        (let loop ((i 1))
            (cond
                ( 
                    (< i len)  
                    (begin
                        (set! s (string-append s init))
                        (loop 
                            (+ i 1)
                        )
                    )
                )
                (else s)
            )
        )
    )    
)`


exports.replace =`
(define
    (replace str search replacement)
    (let 
        (
            (index (indexOf str search))
        )
        (if
            (= index -1)
            (str)
            (string-append 
                (substring str 0 index)
                (substring ((get-var add)replacement "") 0 (string-length ((get-var add) replacement "")))
                (substring str (+ index (string-length search)) (string-length str))
            )
            
        )
    )
)
`


exports.slice = `
(define 
    (slice str start end)
    (begin
        (if
            (string=? end "endOfString")
            (set! end (string-length str))
            (set! end end)
        )    
        (if
            (< start 0)
            (set! start (+ (string-length str) start))
            (set! start start)
        )
        (if
            (< end 0)
            (set! end (+ (string-length str) end))
            (set! end end)
        )
        (if 
            (< end start)
            ""
            (substring str start end)
        )
    )    
)

`



exports.startsWith = `
(define
    (startsWith fullString startString)
    (if 
        (or (< (string-length startString) (string-length fullString))(= (string-length startString) (string-length fullString)))
        (if
            (string=? (substring fullString 0 (string-length startString)) startString)    
            #t
            #f
        )    
        #f
    )
)
`




exports.customSubstring = `
(define 
    (customSubstring str start end)
    (begin
        (if
            (string=? end "endOfString")
            (set! end (string-length str))
            (set! end end)
        )    
        (if
            (< start 0)
            (set! start 0)
            (set! start start)
        )
        (if
            (< end 0)
            (set! start 0)
            (set! end end)
        )
        (if 
            (< end start)
            (begin
                (set! start (+ start end))
                (set! end (- start end))
                (set! start (- start end))
                (substring str start end)
            )
            (substring str start end)
        )
    )    
)

`


exports.length =`
(define
    (length object property)
    (begin
        (cond
            ((isDictionary  object ) (getFromDict "property" object) )
            (
                (isList object) 
                (call-yail-primitive yail-list-length 
                    (*list-for-runtime* object ) 
                    '(list) 
                    "length of list"
                )
            )
            (
                (string? object)
                (begin 
                    (string-length object )
                )
            )
            (else #f)
        )
    )
)

`


exports.listAppend =
`
(define (listAppend a b)
    (call-yail-primitive yail-list-append! 
        (*list-for-runtime* 
            a 
            b
        ) 
        '(list list) 
        "append to list"
    ) 
)
`




exports.createNewElementWithRefresh =
`
(define
    (createNewElement component main detail image)
    (let 
        ((
            newElement 
            (get-property component 'Elements)
        ))   
        (call-yail-primitive yail-list-add-to-list! 
            (*list-for-runtime* 
                (lexical-value newElement) 
                (call-component-method component 'CreateElement 
                    (*list-for-runtime* main detail image) 
                    '(text text text)
                ) 
            ) 
            '(list any ) 
            "add items to list"
        )
        (set-and-coerce-property! component 'Elements 
            (lexical-value newElement) 
            'list
        )     
    )
)



`


exports.getDetailText =
`
(define 
    (getDetailText component index)
    (call-component-method 
        component
        'GetDetailText 
        (*list-for-runtime* 
            (call-yail-primitive yail-list-get-item 
                (*list-for-runtime* 
                    (get-property component 'Elements) 
                    (+ index 1)
                ) 
                '(list number) 
                "select list item"
            )
        ) 
        '(dictionary)
    )
)
`

exports.getMainText =
`
(define 
    (getMainText component index)
    (call-component-method 
        component 
        'GetMainText 
        (*list-for-runtime* 
            (call-yail-primitive yail-list-get-item 
                (*list-for-runtime* 
                    (get-property component 'Elements) 
                    (+ index 1)
                ) 
                '(list number) 
                "select list item"
            )
        ) 
        '(dictionary)
    )
)
`

exports.getImageName =
`
(define 
    (getImageName component index)
    (call-component-method 
        component 
        'GetImageName 
        (*list-for-runtime* 
            (call-yail-primitive yail-list-get-item 
                (*list-for-runtime* 
                    (get-property component 'Elements) 
                    (+ index 1)
                ) 
                '(list number) 
                "select list item"
            )
        ) 
        '(dictionary)
    )
)
`



exports.getSystemConstant =
`
(define 
    (getSystemConstant component property)
    (let 
        ((
            $stringValue 
            (call-yail-primitive string-append 
                (*list-for-runtime* 
                    (call-yail-primitive make-yail-dictionary 
                        (*list-for-runtime* 
                            (call-yail-primitive make-dictionary-pair 
                                (*list-for-runtime* 
                                    "align" 
                                    (get-property component property) 
                                ) 
                                '(key any)  
                                "make a pair"
                            )
                        ) 
                        '(pair ) 
                        "make a dictionary"
                    ) 
                ) 
                '(text ) 
                "join"
            )
        ))   
        (set-lexical! 
            $stringValue 
            (call-yail-primitive string-split 
                (*list-for-runtime* 
                    (lexical-value $stringValue) 
                    ":"
                ) 
                '(text text) 
                "split"
            )
        )
        (set-lexical! $stringValue 
            (call-yail-primitive yail-list-get-item 
                (*list-for-runtime* 
                    (lexical-value $stringValue) 
                    2
                ) 
                '(list number) 
                "select list item"
            )
        )
        (set-lexical! $stringValue 
            (call-yail-primitive string-replace-all 
                (*list-for-runtime* 
                    (lexical-value $stringValue) 
                    "\\"" 
                    ""
                ) 
                '(text text text) 
                "replace all"
            )
        )
        (set-lexical! $stringValue 
            (call-yail-primitive string-to-lower-case 
                (*list-for-runtime* 
                    (call-yail-primitive string-replace-all 
                        (*list-for-runtime* 
                            (lexical-value $stringValue) 
                            "}" 
                            ""
                        ) 
                        '(text text text) 
                        "replace all"
                    )
                ) 
                '(text) 
                "downcase"
            )
        )
        (lexical-value $stringValue)
    )
)
`



exports.toARGB = 
`
(define
    (toARGB colorValue)
    (let 
        ((
            $colorList 
            (call-yail-primitive split-color 
                (*list-for-runtime* 
                    colorValue
                ) 
                '(number) 
                "split-color"
            )
        ))   
        (forrange $number 
            (begin   
                (call-yail-primitive yail-list-set-item! 
                    (*list-for-runtime* 
                        (lexical-value $colorList) 
                        (lexical-value $number) 
                        (call-yail-primitive math-convert-dec-hex 
                            (*list-for-runtime* 
                                (call-yail-primitive yail-list-get-item 
                                    (*list-for-runtime* 
                                        (lexical-value $colorList) 
                                        (lexical-value $number)
                                    ) 
                                    '(list number) 
                                    "select list item"
                                )
                            ) 
                            '(text) 
                            "convert Dec to Hex"
                        )
                    ) 
                    '(list number any) 
                    "replace list item"
                )
                (if 
                    (call-yail-primitive yail-not-equal? 
                        (*list-for-runtime* 
                            (call-yail-primitive string-length 
                                (*list-for-runtime* 
                                    (call-yail-primitive yail-list-get-item 
                                        (*list-for-runtime* 
                                            (lexical-value $colorList) 
                                            (lexical-value $number)
                                        ) 
                                        '(list number) 
                                        "select list item"
                                    )
                                ) 
                                '(text) 
                                "length"
                            ) 
                            2
                        ) 
                        '(any any) 
                        "="
                    ) 
                    (begin   
                        (call-yail-primitive yail-list-set-item! 
                            (*list-for-runtime* 
                                (lexical-value $colorList) 
                                (lexical-value $number) 
                                (call-yail-primitive string-append 
                                    (*list-for-runtime* 
                                        "0" 
                                        (call-yail-primitive yail-list-get-item 
                                            (*list-for-runtime* 
                                                (lexical-value $colorList) 
                                                (lexical-value $number)
                                            ) 
                                            '(list number) 
                                            "select list item"
                                        ) 
                                    ) 
                                    '(text text ) 
                                    "join"
                                )
                            ) 
                            '(list number any) 
                            "replace list item"
                        )
                    )
                )
            ) 
            1 
            4 
            1
        )
        (call-yail-primitive yail-list-join-with-separator 
            (*list-for-runtime* 
                (lexical-value $colorList) 
                ""
            ) 
            '(list text) 
            "join with separator"
        ) 
    )
)
`

exports.RGBAtoARGB = `
(define
    (RGBAtoARGB colorText)
    (begin
        (call-yail-primitive string-append 
            (*list-for-runtime* 
                (call-yail-primitive string-substring 
                    (*list-for-runtime* 
                        (lexical-value colorText) 7 2
                    ) 
                    '(text number number) 
                    "segment"
                ) 
                (call-yail-primitive string-substring 
                    (*list-for-runtime* 
                        (lexical-value colorText) 1 6
                    ) 
                    '(text number number) 
                    "segment"
                ) 
            ) 
            '(text text ) 
            "join"
        )
    )
)
`

exports.splitColor = `
(define
    (splitColor colorValue)
    (begin 
        (let 
            ( ($name colorValue)  )   
            (if 
                (call-yail-primitive is-number? 
                    (*list-for-runtime* 
                        (lexical-value $name)
                    ) 
                    '(text) 
                    "is a number?"
                ) 
                (begin   
                    (call-yail-primitive split-color (*list-for-runtime* (lexical-value $name)) '(number) "split-color")
                ) 
                (begin   
                    (call-yail-primitive split-color 
                        (*list-for-runtime* 
                            (call-yail-primitive math-convert-hex-dec 
                                (*list-for-runtime* 
                                    (RGBAtoARGB (lexical-value $name))
                                ) 
                                '(text) 
                                "convert Hex to Dec"
                            )
                        ) 
                        '(number) 
                        "split-color"
                    )
                )
            ) 
        )
    )
)

`