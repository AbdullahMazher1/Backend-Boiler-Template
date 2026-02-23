const moongo = require('moongose');

const User = moongo.schema({
    name: {
        required: true,
    },
    email: {
        type: email,
        required: true,
    },
    password: {
        type: password,
        required: true
    }
})

module.export = { User }