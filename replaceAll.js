function replaceAll(string, search, replacement){

    let i=0
    while (i<string.length){
        if (string.indexOf(search)!==-1) {
            string = string.replace(search, replacement)
            i+=replacement.length
        } else {
            return string
        }
    }


}

console.log("aabbaabb".replaceAll("bb", "bbc"))