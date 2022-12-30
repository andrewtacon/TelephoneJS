//These functions simplify the output code from the transpiler and implement missing functionality in the Kawa Scheme implemented
//in the App Inventor REPL

//Overloads addition to handle string concatenation and numberical addition
//this needs rewrite to cover all possible cases of addition in js
exports.add = `
(def (add $a $b) 
    (if    
        (and (string? $a) (string? $b))
        (string-append $a $b)
        (+ $a $b) 
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