
(set-var! g$init (map_nondest $item (get-var g$list) (get-var g$list)))
(set-var! g$init (filter_nondest $item (get-var g$list) (get-var g$list)))
(set-var! g$init (reduceovereach (get-var g$init) $answerSoFar $item (get-var g$value) (get-var g$list)))

(set-var! g$init (call-yail-primitive yail-list-sort (*list-for-runtime* (get-var g$list) ) '(list) "sort "))
(set-var! g$init (sortcomparator_nondest $item1 $item2 (get-var g$value) (get-var g$list)))
(set-var! g$init (sortkey_nondest $item (get-var g$value) (get-var g$list)))

(set-var! g$init (mincomparator-nondest $item1 $item2 (get-var g$value) (get-var g$list)))
(set-var! g$init (maxcomparator-nondest $item1 $item2 (get-var g$value) (get-var g$list)))

(set-var! g$init (call-yail-primitive yail-list-but-first (*list-for-runtime* (get-var g$list) ) '(list) "butFirst of list"))
(set-var! g$init (call-yail-primitive yail-list-but-last (*list-for-runtime* (get-var g$list) ) '(list) "butLast of list"))

(foreach $item (begin #f) (get-var g$list))
(foreach $item (let ( ($key (call-yail-primitive yail-list-get-item (*list-for-runtime* (lexical-value $item) 1) '(list number) "select list item")) ($value (call-yail-primitive yail-list-get-item (*list-for-runtime* (lexical-value $item) 2) '(list number) "select list item")))#f) (get-var g$value))


