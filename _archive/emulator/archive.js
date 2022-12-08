
//this is the legacy development method to load data directory from the yail file
//is depreciated in favour of the integrated approad of loading from dynamic array
async function loadScreenFromFile(screen, firstLoad = true) {
    //need to load the assets associated with the item
    //  await loadAssets()


    //this is default system code that seems to need to be sent so the emulator
    //actually runs code in the first place
    let system1 = `
(define-syntax protect-enum   
    (lambda (x)     
        (syntax-case x ()       
            ((_ enum-value number-value)         
                (if (< com.google.appinventor.components.common.YaVersion:BLOCKS_LANGUAGE_VERSION 34)           
                #'number-value           
                #'enum-value)
            )
        )
    )
)
(clear-current-form)`

    //need to have a yail maker here

    //this reads the generated yail code and loads it into the program
    let system2 = fs.readFileSync(`${screen}.yail`, "utf-8")

    //send first message so things load
    if (!firstLoad) {
        system2 = "(clear-current-form)" + system2
    } else {
        system2 = system1 + system2

        // let msg = buildMessage(system1)
        // sendMessage(msg)
    }

    //send the actual yail program code
    msg = buildMessage(system2)
    enqueueMessage(msg)
    //    sendMessage(msg)

    //store updated sequence number for next run
    updateSequenceNumber(seq)
}