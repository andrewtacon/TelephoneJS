(call-yail-primitive string-append 
    (*list-for-runtime* 
        (get-property 'TextBox1 'Text) 
        "text to append" 
    ) 
    '(text text ) 
    "join"
)


