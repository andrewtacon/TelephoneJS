(
    do-after-form-creation 
    (set-and-coerce-property! 'Screen1 'AppName "loopback" 'text)
    (set-and-coerce-property! 'Screen1 'ShowListsAsJson #t 'boolean)
    (set-and-coerce-property! 'Screen1 'Sizing "Responsive" 'text)
    (set-and-coerce-property! 'Screen1 'Title "Screen1" 'text)
)

(add-component Screen1 com.google.appinventor.components.runtime.WebViewer WebViewer1 
)

(init-runtime)


    
;create a globalvariable to hold the data pieces

(def g$jsScript 
    (call-yail-primitive make-yail-list (*list-for-runtime* ) '() "make a list")
)

(define-event Screen1 Initialize()
    (set-this-form)
    
    ;get write permission - this probably isn't needed
    ;(call-component-method 'Screen1 'AskForPermission (*list-for-runtime* (static-field com.google.appinventor.components.common.Permission "WriteExternalStorage")) '(text))
    
    ;add one of each of these blocks for the code pieces
    ; js chunk1
    (call-yail-primitive yail-list-add-to-list! 
        (*list-for-runtime* 
            (get-var g$jsScript) 
            "    let filename = \"patchTest.png\";         let dataURI = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVBhXY/zPwYAVMEFpDDAYJRgYANNxARctcOwfAAAAAElFTkSuQmCC\";         let size = 129;          var byteString;          if (dataURI.split(',')[0].indexOf('base64') >= 0) {             byteString = atob(dataURI.split(',')[1]);         } else {             byteString = unescape(dataURI.split(',')[1]);         }          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];          var ia = new Uint8Array(byteString.length);          for (var i = 0; i < byteString.length; i++) {             ia[i] = byteString.charCodeAt(i);         }          let blob = new Blob([ia], { type: mimeString });         document.write(JSON.stringify(blob));" 
        ) 
        '(list any ) 
        "add items to list"
    )

    ; js chunk 2
    (call-yail-primitive yail-list-add-to-list! 
        (*list-for-runtime* 
            (get-var g$jsScript) 
            "           let url = `http://127.0.0.1:8001/?filename=` + filename;          let result = fetch(url, {             method: 'OPTIONS'         })             .then((response) => {                 response.json();                 document.write(\"opt response\");             })             .then((data) => {                 document.write(\"opt complete\");                  fetch(url, {                     method: 'PUT',                     headers: {                         \"Content-length\": size                     },                     body: ia                 }).then((response) => {                     response.json();                     document.write(\"put response\");                 })                     .then((data) => {                         document.write(\"put complete\");                     }                     );             })" 
        ) 
        '(list any ) 
        "add items to list"
    )

    (let 
        ((
                $generatedJSScript 
                (call-yail-primitive yail-list-join-with-separator 
                    (*list-for-runtime* 
                        (get-var g$jsScript) 
                        ""
                    ) 
                    '(list text) 
                    "join with separator"
                )
        ))   
        (call-component-method 
            'WebViewer1 
            'RunJavaScript 
            (*list-for-runtime* 
                (lexical-value $generatedJSScript)
            ) 
            '(text)
        )
    )



)



(call-Initialize-of-components 'Screen1 'WebViewer1)