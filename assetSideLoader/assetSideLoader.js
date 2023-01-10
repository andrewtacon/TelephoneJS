const fs = require('fs')
const mime = require('mime-types')

function* genNumber(){
    let count = 0
    while(true){
        count++
        yield count
    }
}

let counter = genNumber()


function prepareJS(assetName){

    const stats = fs.statSync(assetName);
    const fileSizeInBytes = stats.size;
    let base64data = fs.readFileSync(assetName, 'base64')
    let mimeType = mime.lookup(assetName)
  
    let dataUri = `data:${mimeType};base64,${base64data}`
   
    let codeBase = `
       
    let dataURI = '${dataUri}';              
    
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

    let url = 'http://127.0.0.1:8001/?filename=${assetName}';          
            
    let result = fetch(url, {method: 'OPTIONS'})             
    .then((response) => {response.json();})             
    .then((data) => {                 
        fetch(url, {                     
            method: 'PUT',                     
            headers: {                         
                'Content-length': ${fileSizeInBytes}                     
                },                     
                body: ia                 
        })
        .then((response) => {response.json();})                     
        .then((data) => {window.AppInventor.setWebViewString( 'done' );});             
    })`


    return codeBase
}


function prepareScheme(jsCode) {
    let schemeFragments = []

    let message1 = `
    (begin 
        (require <com.google.youngandroid.runtime>) 
        (process-repl-input -1 
            (begin 
                (define-syntax protect-enum   
                    (lambda (x)     
                        (syntax-case x ()       
                        ((_ enum-value number-value)         
                            (if 
                                (< com.google.appinventor.components.common.YaVersion:BLOCKS_LANGUAGE_VERSION 34)           
                                #'number-value           
                                #'enum-value
                            )
                        ))
                    )
                )
                (clear-current-form)
            )
        )
    )
    `
    
    let message2 = `
    (begin 
        (require <com.google.youngandroid.runtime>) 
        (process-repl-input -1 
            (begin 
                (try-catch 
                    (let 
                        (
                            (attempt 
                                (delay 
                                    (set-form-name "Screen1")
                                )
                            )
                        ) 
                        (force attempt)
                    ) 
                    (exception java.lang.Throwable 'notfound)
                )
            )
        )
    )
    `

    let message3 = `
    (begin 
        (require <com.google.youngandroid.runtime>) 
        (process-repl-input -1 
            (begin 
                (do-after-form-creation 
                    (set-and-coerce-property! 'Screen1 'AppName "loopback" 'text)
                    (set-and-coerce-property! 'Screen1 'ShowListsAsJson #t 'boolean)
                    (set-and-coerce-property! 'Screen1 'Sizing "Responsive" 'text)
                    (set-and-coerce-property! 'Screen1 'Title "Screen1" 'text)
                )

                (add-component Screen1 com.google.appinventor.components.runtime.WebViewer WebViewer1 
                )
            )
        )
    )
    `

    let message4 = `
        (begin 
            (require <com.google.youngandroid.runtime>) 
            (process-repl-input -1 
                (begin 
                    (init-runtime)
                )
            )
        )
    `

    let message5 = `
    (begin 
        (require <com.google.youngandroid.runtime>) 
        (process-repl-input "block${counter.next().value}" 
            (begin 
                (def g$jsScript 
                    (call-yail-primitive make-yail-list 
                        (*list-for-runtime* ) 
                        '() 
                        "make a list"
                    )
                )
            )
        )
    )
    `

    schemeFragments.push(message1)
    schemeFragments.push(message2)
    schemeFragments.push(message3)
    schemeFragments.push(message4)
    schemeFragments.push(message5)



    let pieceLength = 16000  //for testing, limiting to 100 bytes per piece
    let jsLength = jsCode.length
    if (jsCode.length>1983233){
        console.log("File size warning: Asset file size is greater than the largest known value that uploads. It may not work. Max known size is 1452 KB. Good luck.")
    }
    let jsPieces = Math.ceil(jsLength / pieceLength) 

    let schemeProcedureCalls = ""

    for (let i=0; i< jsPieces; i++){
        let jsPiece = jsCode.substring(i*pieceLength, Math.min((i+1)*pieceLength, jsCode.length)   )
        let jsPieceSchemeCode = `
        (begin 
            (require <com.google.youngandroid.runtime>) 
            (process-repl-input "block${counter.next().value}" 
                (begin 
                    (def (p$p${i} )  
                        (call-yail-primitive yail-list-add-to-list! 
                            (*list-for-runtime* 
                                (get-var g$jsScript) 
                                "${jsPiece}" 
                            ) 
                            '(list any ) 
                            "add items to list"
                        )
                    )
                )
            )
        )
        `
        schemeFragments.push(jsPieceSchemeCode)

        schemeProcedureCalls +=`((get-var p$p${i}))\n`
    }

    let message6 = `
    (begin 
        (require <com.google.youngandroid.runtime>) 
        (process-repl-input "block${counter.next().value}" 
            (begin 
                (define-event Screen1 Initialize()
                    (set-this-form)
                    (call-component-method 
                        'Screen1 
                        'AskForPermission 
                        (*list-for-runtime* 
                            (static-field com.google.appinventor.components.common.Permission "WriteExternalStorage")
                        ) 
                        '(text)
                    )
                    
                    ${schemeProcedureCalls}
                    
                    (let 
                        ( 
                            (   
                                $generatedJSScript 
                                (call-yail-primitive yail-list-join-with-separator 
                                    (*list-for-runtime* 
                                        (get-var g$jsScript) 
                                        ""
                                    ) 
                                    '(list text) 
                                    "join with separator"
                                )
                            )  
                        )   
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
            )
        )
    )
    `

    let message7 = `
    (begin 
        (require <com.google.youngandroid.runtime>) 
        (process-repl-input "block${counter.next().value}" 
            (begin 
                (define-event WebViewer1 WebViewStringChange($value)
                    (set-this-form)
                    (if 
                        (call-yail-primitive yail-equal? 
                            (*list-for-runtime* 
                                (lexical-value $value) 
                                "done"
                            ) 
                            '(any any) 
                            "="
                        ) 
                        
                        (begin   
                            (call-yail-primitive open-another-screen 
                                (*list-for-runtime* "AssetLoader") 
                                '(text) 
                                "open another screen"
                            )
                        )

                    )
                )
            )
        )
    )
    `

    let message8 = `
    (begin 
        (require <com.google.youngandroid.runtime>) 
        (process-repl-input -1 
            (begin 
                (call-Initialize-of-components 'Screen1 'WebViewer1)
            )
        )
    )
    `


    schemeFragments.push(message6)
    schemeFragments.push(message7)
    schemeFragments.push(message8)

    return schemeFragments

}


function main(assetName) {
    let jsCode = prepareJS(assetName)
    let schemeFragments = prepareScheme(jsCode)
    return schemeFragments
}

exports.run = main
