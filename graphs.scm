(call-component-method 'Chart1 'SetDomain (*list-for-runtime*  xxx xxx ) '(number number))
(call-component-method 'Chart1 'SetRange (*list-for-runtime*  xxx xxx ) '(number number))



(define-event Chart1 EntryClick($series $x $y)
    //event details
)



---------------------------------------





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

