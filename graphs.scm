(begin (require <com.google.youngandroid.runtime>) (process-repl-input -1 (begin (do-after-form-creation (set-and-coerce-property! 'Screen1 'AppName "db" 'text)
 (set-and-coerce-property! 'Screen1 'ShowListsAsJson #t 'boolean)
 (set-and-coerce-property! 'Screen1 'Sizing "Responsive" 'text)
 (set-and-coerce-property! 'Screen1 'Title "Screen1" 'text)
)

(add-component Screen1 com.google.appinventor.components.runtime.Chart Chart1 
(set-and-coerce-property! 'Chart1 'BackgroundColor #xFF00FF00 'number)

(set-and-coerce-property! 'Chart1 'Description "chart description" 'text)

(set-and-coerce-property! 'Chart1 'GridEnabled #f 'boolean)

(set-and-coerce-property! 'Chart1 'Height -2 'number)

(set-and-coerce-property! 'Chart1 'LegendEnabled #f 'boolean)

(set-and-coerce-property! 'Chart1 'LabelsFromString "a" 'text)
(set-and-coerce-property! 'Chart1 'Type "2" 'com.google.appinventor.components.common.ChartTypeEnum)
line - default - no value
scatter "1"
area "2"
bar  "3" 
pie "4"

(set-and-coerce-property! 'Chart1 'Width -2 'number)

(set-and-coerce-property! 'Chart1 'XFromZero #t 'boolean)

(set-and-coerce-property! 'Chart1 'YFromZero #t 'boolean)
(set-and-coerce-property! 'Chart1 'Visible #f 'boolean)
)

(add-component Chart1 com.google.appinventor.components.runtime.ChartData2D ChartData2D1 
(set-and-coerce-property! 'ChartData2D1 'Color #xFF888888 'number)

(set-and-coerce-property! 'ChartData2D1 'ElementsFromPairs "1,2,3,4,5,6" 'text)

(set-and-coerce-property! 'ChartData2D1 'Label "line" 'text)

(set-and-coerce-property! 'ChartData2D1 'LineType "1" 'com.google.appinventor.components.common.LineTypeEnum)
curved "1"
stepped "2"
linear - default - no value

(set-and-coerce-property! 'ChartData2D1 'PointShape "1" 'com.google.appinventor.components.common.PointStyleEnum)
circle - default = no value
square "1"
triangle "2"
cross "3"
x "4"


)
)))



---------------------------------------------------------------


(begin (require <com.google.youngandroid.runtime>) (process-repl-input "]_1GhRoDie;!DPP+A}8R" 
(begin 
(define-event Chart1 EntryClick($series $x $y)
    (set-this-form)
    (call-component-method 'ChartData2D1 'AddEntry (*list-for-runtime*   ) '(text text))
    (call-component-method 'ChartData2D1 'ChangeDataSource (*list-for-runtime*   ) '(component text))
    (call-component-method 'ChartData2D1 'Clear (*list-for-runtime*) '())
    (call-component-method 'ChartData2D1 'ImportFromCloudDB (*list-for-runtime*   ) '(component text))
    (call-component-method 'ChartData2D1 'ImportFromDataFile (*list-for-runtime*     ) '(component text text))
    (call-component-method 'ChartData2D1 'ImportFromList (*list-for-runtime* ) '(list))
    (call-component-method 'ChartData2D1 'ImportFromSpreadsheet (*list-for-runtime*       ) '(component text text boolean))
    (call-component-method 'ChartData2D1 'ImportFromTinyDB (*list-for-runtime*   ) '(component text))
    (call-component-method 'ChartData2D1 'ImportFromWeb (*list-for-runtime*     ) '(component text text))
    (call-component-method 'ChartData2D1 'RemoveDataSource (*list-for-runtime*) '())
    (call-component-method 'ChartData2D1 'RemoveEntry (*list-for-runtime*   ) '(text text))
    (set-and-coerce-property! 'ChartData2D1 'Color  'number)
    (set-and-coerce-property! 'ChartData2D1 'Colors  'list)
    (set-and-coerce-property! 'ChartData2D1 'Label  'text)
    (set-var! g$name (call-component-method 'ChartData2D1 'DoesEntryExist (*list-for-runtime*   ) '(text text)))
    (set-var! g$name (call-component-method 'ChartData2D1 'GetAllEntries (*list-for-runtime*) '()))
    (set-var! g$name (call-component-method 'ChartData2D1 'GetEntriesWithXValue (*list-for-runtime* ) '(text)))
    (set-var! g$name (call-component-method 'ChartData2D1 'GetEntriesWithYValue (*list-for-runtime* ) '(text)))
    (set-var! g$name (get-property 'ChartData2D1 'Color))
    (set-var! g$name (get-property 'ChartData2D1 'Colors))
    (set-var! g$name (get-property 'ChartData2D1 'Label))
    
    ))))

    --------------------------
(begin (require <com.google.youngandroid.runtime>) (process-repl-input "B43vRb/A}CnwLj9.J$XL" 
(begin (define-event Screen1 Initialize()(set-this-form)
    (call-component-method 'Chart1 'SetDomain (*list-for-runtime*   ) '(number number))
    (call-component-method 'Chart1 'SetRange (*list-for-runtime*   ) '(number number))
    
    
    
    
    ))))

