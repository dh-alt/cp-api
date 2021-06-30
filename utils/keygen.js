const fakeKeyGen = (keyLength) => {
    var i, key = "", characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var charactersLength = characters.length;

    for (i = 0; i < keyLength; i++) {
        key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
    }

    return key;
}

module.exports = fakeKeyGen;
