;wipe out everything
(clear-current-form)

;create the screen
(try-catch (let ((attempt (delay (set-form-name "Screen1")))) (force attempt)) (exception java.lang.Throwable 'notfound))

(do-after-form-creation (set-and-coerce-property! 'Screen1 'AppName "loopback" 'text)
 (set-and-coerce-property! 'Screen1 'ShowListsAsJson #t 'boolean)
 (set-and-coerce-property! 'Screen1 'Sizing "Responsive" 'text)
 (set-and-coerce-property! 'Screen1 'Title "Screen1" 'text)
)

;load the webviewer component
(add-component Screen1 com.google.appinventor.components.runtime.WebViewer WebViewer1 
)

;get thing movin'
(init-runtime)

;this is a global variable (as a list) that will hold all the pieces of javscript code that need to be joined
(def g$jsScript 
    (call-yail-primitive make-yail-list 
        (*list-for-runtime* ) 
        '() 
        "make a list"
    )
)

; these functions each contain a portion of the javascript to be executed. It is broken into chunks so they can be sent separately so that the webrtc data limit is not hit
(def 
    (p$p1 )  
    (call-yail-primitive yail-list-add-to-list! 
        (*list-for-runtime* 
            (get-var g$jsScript) 
            "    let filename = \"autolinkedTest.png\";         let dataURI = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVBhXY/zPwYAVMEFpDDAYJRgYANNxARctcOwfAAAAAElFTkSuQmCC\";         let size = 129;          var byteString;          if (dataURI.split(',')[0].indexOf('base64') >= 0) {             byteString = atob(dataURI.split(',')[1]);         } else {             byteString = unescape(dataURI.split(',')[1]);         }          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];          var ia = new Uint8Array(byteString.length);          for (var i = 0; i < byteString.length; i++) {             ia[i] = byteString.charCodeAt(i);         }          let blob = new Blob([ia], { type: mimeString });         document.write(JSON.stringify(blob));" 
        ) 
        '(list any ) 
        "add items to list"
    )
)

; second javascript function
(def 
    (p$p2 )  
    (call-yail-primitive yail-list-add-to-list! 
        (*list-for-runtime* 
            (get-var g$jsScript) 
            "           let url = `http://127.0.0.1:8001/?filename=` + filename;          let result = fetch(url, {             method: 'OPTIONS'         })             .then((response) => {                 response.json();                 document.write(\"opt response\");             })             .then((data) => {                 document.write(\"opt complete\");                  fetch(url, {                     method: 'PUT',                     headers: {                         \"Content-length\": size                     },                     body: ia                 }).then((response) => {                     response.json();                     document.write(\"put response\");                 })                     .then((data) => {                         document.write(\"put complete\");   window.AppInventor.setWebViewString( 'done' );                  }                     );             })" 
        ) 
        '(list any ) 
        "add items to list"
    )
)


;runs when the screen is loaded
(define-event Screen1 Initialize()
    (set-this-form)

    ;need permission to write to the external data store or cannot save information
    (call-component-method 
        'Screen1 
        'AskForPermission 
        (*list-for-runtime* 
            (static-field com.google.appinventor.components.common.Permission "WriteExternalStorage")
        ) 
        '(text)
    )

    ;run the JS building functions insequence to load the data
    ((get-var p$p1))
    ((get-var p$p2))
    
    (let 
        ;merge all the javascript portions together into a string so it can be loaded and executed
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
        ;load and execute the javascript - it will change the webviewstring when completed and trigger the close screen listener
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


;this is the listener - when the file is uploaded it triggers this which sends a "poscreen" back to the nodeJS controller so it knows to send the next bit of data
(define-event WebViewer1 WebViewStringChange($value)
    (set-this-form)
    (if 
        (call-yail-primitive yail-equal? 
            (*list-for-runtime* (lexical-value $value) "done") 
            '(any any) 
            "="
        ) 
        (begin   
            (call-yail-primitive close-screen (*list-for-runtime* ) '() "close screen")
        )
    )
)

;initialize all the components
(call-Initialize-of-components 'Screen1 'WebViewer1)
