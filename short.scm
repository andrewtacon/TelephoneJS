

(def 
    (p$procedure ) 
    (let 
        ( 
            ($counter 0)  
        ) 
        0 
    )
)



(def 
    (trimStart _initString)
    (let 
        (
            (_counter 0)
            
        (let   
            (
                (_shortString (substring _initString 1 _counter))
            )
            (while
                (and-delayed
                    (= (string-length _shortString) 0)
                    (<= _counter (string-length) _initString)
                )
                (begin
                    (set-var! _counter (+ _counter 1))
                    (set-var! _shortString (substring _initString 1 _counter))
                )
            )
        )
        (
            if
                (= _counter (- (string-length _initString)1))
                (_initString)
                (substring
                    _initString
                    _counter
                    (- (string-length _initString) (- _counter 1))
                )
        )
    )
)