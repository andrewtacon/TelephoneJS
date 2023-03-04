
            (let 
                (( newList (call-yail-primitive make-yail-list (*list-for-runtime* ) '() "make a list") ))
                (begin   
                    (let 
                        (($userArrayName callingArray)  )
                        (let 
                            ((fixedIndex 1))
                            (let 
                                ((indexLimit (call-yail-primitive yail-list-length (*list-for-runtime* (lexical-value $userArrayName) ) '(list) "length of list"))  )   
                                (while 
                                    (call-yail-primitive < (*list-for-runtime* (lexical-value fixedIndex) (lexical-value indexLimit)) '(number number) "<") 
                                    (begin   
                                        (let 
                                            ( ($localIndex (lexical-value fixedIndex))  )   
                                            (let 
                                                (($item (call-yail-primitive yail-list-get-item (*list-for-runtime* (lexical-value $userArrayName) (lexical-value fixedIndex)) '(list number) "select list item") ))
                                                
                                                (call-yail-primitive yail-list-add-to-list! 
                                                    (*list-for-runtime* 
                                                        (lexical-value newList) 
                                                        //this is where the mapped value is calculated (call-yail-primitive + (*list-for-runtime* (lexical-value $item) (lexical-value $localIndex) ) '(number number ) "+") 
                                                    ) 
                                                    '(list any ) 
                                                    "add items to list"
                                                ) 
                                            )
                                            (set-lexical! fixedIndex (call-yail-primitive + (*list-for-runtime* (lexical-value fixedIndex) 1 ) '(number number ) "+"))
                                        )
                                    )
                                ) 
                            ) 
                        ) 
                    ) 
                    (lexical-value newList)
                ) 
            )





//this is simple map from the app inventor source
(map_nondest $item   //item is the element in the array
    //input function 
    //original list
)



(filter_nondest $item (get-var g$list) (get-var g$list))
(reduceovereach (get-var g$init) $answerSoFar $item (get-var g$value) (get-var g$list))




(set-var! g$init (call-yail-primitive yail-list-sort (*list-for-runtime* (get-var g$list) ) '(list) "sort "))
(set-var! g$init (sortcomparator_nondest $item1 $item2 (get-var g$value) (get-var g$list)))
(set-var! g$init (sortkey_nondest $item (get-var g$value) (get-var g$list)))

(set-var! g$init (mincomparator-nondest $item1 $item2 (get-var g$value) (get-var g$list)))
(set-var! g$init (maxcomparator-nondest $item1 $item2 (get-var g$value) (get-var g$list)))

(set-var! g$init (call-yail-primitive yail-list-but-first (*list-for-runtime* (get-var g$list) ) '(list) "butFirst of list"))
(set-var! g$init (call-yail-primitive yail-list-but-last (*list-for-runtime* (get-var g$list) ) '(list) "butLast of list"))

(foreach $item (begin #f) (get-var g$list))
(foreach $item (let ( ($key (call-yail-primitive yail-list-get-item (*list-for-runtime* (lexical-value $item) 1) '(list number) "select list item")) ($value (call-yail-primitive yail-list-get-item (*list-for-runtime* (lexical-value $item) 2) '(list number) "select list item")))#f) (get-var g$value))


