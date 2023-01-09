(begin 
    (do-after-form-creation 
        (set-and-coerce-property! 'Screen1 'AppName "loopback" 'text)
        (set-and-coerce-property! 'Screen1 'ShowListsAsJson #t 'boolean)
        (set-and-coerce-property! 'Screen1 'Sizing "Responsive" 'text)
        (set-and-coerce-property! 'Screen1 'Title "Screen1" 'text)
    )

    (add-component Screen1 com.google.appinventor.components.runtime.Button Button1 
        (set-and-coerce-property! 'Button1 'Text "Fetch" 'text)
    )

    (add-component Screen1 com.google.appinventor.components.runtime.WebViewer WebViewer1 
    )
    
)


(begin 
    (define-event Button1 Click()
        (set-this-form)
        (set-and-coerce-property! 'WebViewer1 'FollowLinks #t 'boolean)
        (call-component-method 'WebViewer1 'RunJavaScript 
            (*list-for-runtime* 
                "
                    let filename = \"imageName.png\";         
                    let dataURI = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVBhXY/zPwYAVMEFpDDAYJRgYANNxARctcOwfAAAAAElFTkSuQmCC\";         
                    let size = 129;          
                    
                    var byteString;          
                    if (dataURI.split(',')[0].indexOf('base64') >= 0) {             
                        byteString = atob(dataURI.split(',')[1]);         
                    } else {             
                        byteString = unescape(dataURI.split(',')[1]);         
                    }          
                    
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];          
                    
                    var ia = new Uint8Array(byteString.length);          
                    for (var i = 0; i < byteString.length; i++) {             
                        ia[i] = byteString.charCodeAt(i);         
                    }          
                    
                    let blob = new Blob([ia], { type: mimeString });         
                    
                    document.write(JSON.stringify(blob));           
                    
                    let url = `http://127.0.0.1:8001/?filename=` + filename;          
                    
                    let result = fetch(url, {             
                        method: 'OPTIONS'         
                    })             
                    .then((response) => {response.json();})             
                    .then((data) => { 
                        fetch(url, {                     
                            method: 'PUT',                     
                            headers: {                         
                                \"Content-length\": size                     
                            },                     
                            body: ia                 
                        })
                        .then((response) => {response.json();})                     
                        .then((data) => {document.write(\"put complete\");});             
                    })
                "
            ) 
            '(text)
        )
    )
)



(begin 
    (define-event Screen1 Initialize()
        (set-this-form)
        (call-component-method 'Screen1 'AskForPermission 
            (*list-for-runtime* 
                (static-field com.google.appinventor.components.common.Permission "WriteExternalStorage")
            ) 
            '(text)
        )
    )
)

(begin 
    (call-Initialize-of-components 'Screen1 'Button1 'WebViewer1)
)
