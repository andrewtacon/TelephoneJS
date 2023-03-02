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

(call-component-method 'Chart1 'SetDomain (*list-for-runtime*  xxx xxx ) '(number number))
(call-component-method 'Chart1 'SetRange (*list-for-runtime*  xxx xxx ) '(number number))



(define-event Chart1 EntryClick($series $x $y)
    //event details
)



---------------------------------------





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

(call-component-method 'ChartData2D1 'AddEntry (*list-for-runtime*  xxx xxx ) '(text text))
(call-component-method 'ChartData2D1 'ChangeDataSource (*list-for-runtime* xxx xxx  ) '(component text))
(call-component-method 'ChartData2D1 'Clear (*list-for-runtime*) '())
(call-component-method 'ChartData2D1 'ImportFromCloudDB (*list-for-runtime*  xxx xxx ) '(component text))
(call-component-method 'ChartData2D1 'ImportFromDataFile (*list-for-runtime*   xxx xxx xxx  ) '(component text text))
(call-component-method 'ChartData2D1 'ImportFromList (*list-for-runtime* xxx) '(list))
(call-component-method 'ChartData2D1 'ImportFromSpreadsheet (*list-for-runtime*  xxx xxx xxx xxx     ) '(component text text boolean))
(call-component-method 'ChartData2D1 'ImportFromTinyDB (*list-for-runtime*  xxx xxx ) '(component text))
(call-component-method 'ChartData2D1 'ImportFromWeb (*list-for-runtime*  xxx xxx xxx   ) '(component text text))
(call-component-method 'ChartData2D1 'RemoveDataSource (*list-for-runtime*) '())
(call-component-method 'ChartData2D1 'RemoveEntry (*list-for-runtime*  xxx xxx ) '(text text))
(call-component-method 'ChartData2D1 'DoesEntryExist (*list-for-runtime*  xxx xxx ) '(text text))
(call-component-method 'ChartData2D1 'GetAllEntries (*list-for-runtime*) '())
(call-component-method 'ChartData2D1 'GetEntriesWithXValue (*list-for-runtime* xxx) '(text))
(call-component-method 'ChartData2D1 'GetEntriesWithYValue (*list-for-runtime* xxx) '(text))

(set-and-coerce-property! 'ChartData2D1 'Color xxx 'number)
(set-and-coerce-property! 'ChartData2D1 'Colors xxx 'list)
(set-and-coerce-property! 'ChartData2D1 'Label xxx 'text)

(get-property 'ChartData2D1 'Color)
(get-property 'ChartData2D1 'Colors)
(get-property 'ChartData2D1 'Label)
    

    --------------------------

