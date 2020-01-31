let mongoose = require('mongoose');
let iWish = mongoose.Schema;


let newWish = new iWish({
    thing: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    color: [{
        type: String,
        default: undefined
    }],
    store: [{
        type: String,
        default: undefined
    }],
    description: {
        type: String
    },
    link: {
        type: String
    },
    extraInfo: {
        type: String
    },
    topThree: {
        type: Boolean,
        default: false
    },
    heartWish: {
        type: Boolean,
        default: false
    }
});


//Första parametern är namnet på collectionen,
//betyder att det är där allt hamnar och det som åker dit baseras på det som står i Schemat
module.exports = mongoose.model('wishlist', newWish);

//NetNinja MongoDB Tutorial #4 - Models and Collections:
//Kan även skrivas med att döpa om (kan namnet användas direkt i index.js-filen då?) exv:
/* const nyttNamn = mongoose.model('testSchema', courseSchema);
module.exports = nyttNamn; */
//Sen: var myChar = new nyttNamn ({})


//Lägga in obestämt antal av något = nesting med array
//NetNinja MongoDB Tutorial #16 - Nesting Sub Documents