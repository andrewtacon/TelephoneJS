////////////////////////////////////////////////////////
///// crypto ///////////////////////////////////////////
////////////////////////////////////////////////////////

require("google-closure-library");
goog.require("goog.crypt.Sha1");
goog.require("goog.crypt.Hmac")
goog.require("goog.Uri.QueryData")

function sha1(input) {
    let hasher = new goog.crypt.Sha1();
    hasher.update(string_to_bytes(input));
    return (bytes_to_hexstring(hasher.digest()));
};

function string_to_bytes(input) {
    let z = [];
    for (let i = 0; i < input.length; i++)
        z.push(input.charCodeAt(i));
    return z;
};

function bytes_to_hexstring(input) {
    let z = [];
    for (let i = 0; i < input.length; i++)
        z.push(Number(256 + input[i]).toString(16).substring(1, 3));
    return z.join("");
};


/////////////////////////////////////////
/// SEND MESSAGE HMAC HASHING CODE //////
/////////////////////////////////////////

function hmac(input) {
    var googhash = new goog.crypt.Hmac(new goog.crypt.Sha1(), string_to_bytes("emulator"), 64);
    return (bytes_to_hexstring(googhash.getHmac(string_to_bytes(input))));
};

exports.sha1 = sha1
exports.hmac = hmac