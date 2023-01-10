(begin 
    (do-after-form-creation 
        (set-and-coerce-property! 'Screen1 'AppName "loopback" 'text)
        (set-and-coerce-property! 'Screen1 'ShowListsAsJson #t 'boolean)
        (set-and-coerce-property! 'Screen1 'Sizing "Responsive" 'text)
        (set-and-coerce-property! 'Screen1 'Title "Screen1" 'text)
    )

    (add-component Screen1 com.google.appinventor.components.runtime.Button Button2 
        (set-and-coerce-property! 'Button2 'Text "Folder Contents" 'text)
    )

    (add-component Screen1 com.google.appinventor.components.runtime.Button Button1 
        (set-and-coerce-property! 'Button1 'Text "Fetch" 'text)
    )

    (add-component Screen1 com.google.appinventor.components.runtime.WebViewer WebViewer1 
    )

    (add-component Screen1 com.google.appinventor.components.runtime.TextBox TextBox1 
        (set-and-coerce-property! 'TextBox1 'Height -2 'number)
        (set-and-coerce-property! 'TextBox1 'Hint "Hint for TextBox1" 'text)
        (set-and-coerce-property! 'TextBox1 'Width -2 'number)
    )

    (add-component Screen1 com.google.appinventor.components.runtime.Web Web1 
    )

    (add-component Screen1 com.google.appinventor.components.runtime.File File1 
    )
    
)


(begin (define-event Button1 Click()(set-this-form)
    (set-and-coerce-property! 'WebViewer1 'FollowLinks #t 'boolean)
    (set-and-coerce-property! 'TextBox1 'Text "" 'text)
    (call-component-method 'WebViewer1 'RunJavaScript 
        (*list-for-runtime* "    let filename = \"onedotred.png\";         let dataURI = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVBhXY/zPwYAVMEFpDDAYJRgYANNxARctcOwfAAAAAElFTkSuQmCC\";         let size = 129;          var byteString;          if (dataURI.split(',')[0].indexOf('base64') >= 0) {             byteString = atob(dataURI.split(',')[1]);         } else {             byteString = unescape(dataURI.split(',')[1]);         }          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];          var ia = new Uint8Array(byteString.length);          for (var i = 0; i < byteString.length; i++) {             ia[i] = byteString.charCodeAt(i);         }          let blob = new Blob([ia], { type: mimeString });         document.write(JSON.stringify(blob));           let url = `http://127.0.0.1:8001/?filename=` + filename;          let result = fetch(url, {             method: 'OPTIONS'         })             .then((response) => {                 response.json();                 document.write(\"opt response\");             })             .then((data) => {                 document.write(\"opt complete\");                  fetch(url, {                     method: 'PUT',                     headers: {                         \"Content-length\": size                     },                     body: ia                 }).then((response) => {                     response.json();                     document.write(\"put response\");                 })                     .then((data) => {                         document.write(\"put complete\");                     }                     );             })") '(text))
    )
)


(begin (define-event Button2 Click()(set-this-form)
    (set-and-coerce-property! 'TextBox1 'Text 
        (call-yail-primitive string-append 
            (*list-for-runtime* 
                (get-property 'TextBox1 'Text) 
                (call-component-method-with-blocking-continuation 'File1 'ListDirectory 
                    (*list-for-runtime* 
                        (static-field com.google.appinventor.components.common.FileScope "App")  "/assets/") '(com.google.appinventor.components.common.FileScopeEnum text)
                    ) 
                )
                '(text text ) 
                "join"
            ) 
            'text
        )
    )
)

(begin 
    (define-event Screen1 Initialize()(set-this-form)
        (call-component-method 'Screen1 'AskForPermission 
            (*list-for-runtime* 
                (static-field com.google.appinventor.components.common.Permission "WriteExternalStorage")
            ) 
            '(text)
        )
    )
)

(begin 
    (call-Initialize-of-components 'Screen1 'Button2 'Button1 'WebViewer1 'TextBox1 'Web1 'File1)
)
