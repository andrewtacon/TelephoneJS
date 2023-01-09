

/*

side load string should be fine -> use file to save a string

Scheme code to sideload image from base64 sent string

(  (get-var p$loadAsSaveBase64Image) 100 100 "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVBhXY/zPwYAVMEFpDDAYJRgYANNxARctcOwfAAAAAElFTkSuQmCC" "redder.png"))

(def 
    (p$loadAsSaveBase64Image $width $height $base64data $filename)  
    (set-and-coerce-property! 'Canvas1 'Width (lexical-value $width) 'number)
    (set-and-coerce-property! 'Canvas1 'Height (lexical-value $height) 'number)
    (set-and-coerce-property! 'Canvas1 'BackgroundImageinBase64 (lexical-value $base64data) 'text)
    (let 
        ( ($externalFileName (call-component-method 'Canvas1 'SaveAs (*list-for-runtime* (lexical-value $filename)) '(text)))  )   
        (set-and-coerce-property! 'TextBox1 'Text (lexical-value $externalFileName) 'text)
        (let 
            ((
                $name 
                (call-component-method-with-blocking-continuation 
                    'File1 
                    'CopyFile 
                    (*list-for-runtime* 
                        (static-field com.google.appinventor.components.common.FileScope "App")  
                        (lexical-value $filename)  
                        (static-field com.google.appinventor.components.common.FileScope "App")  
                        (call-yail-primitive string-append 
                            (*list-for-runtime* 
                                "/assets/" 
                                (lexical-value $filename)  
                             ) 
                            '(text text ) 
                            "join"
                        )
                    ) 
                    '(com.google.appinventor.components.common.FileScopeEnum text com.google.appinventor.components.common.FileScopeEnum text)
                )
            ))   
            (call-component-method 
                'File1 
                'Delete 
                (*list-for-runtime* 
                    (lexical-value $filename)
                ) 
                '(text)
            ) 
        ) 
    )
)


*/