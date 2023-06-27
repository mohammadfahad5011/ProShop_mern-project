
// const bycrpt = require('bcryptjs') 
const bycrpt = require('bcrypt')

const users = [
    {
        name: "aaaaaa",
        email: "abcd@gmail.com",
        password : bycrpt.hashSync( "123456" , 10),
        isAdmin : true
    },
    {
        name: "bbbb",
        email: "abcde@gmail.com",
        password : bycrpt.hashSync( "123456" , 10),
    },
    {
        name: "cccc",
        email: "abcdef@gmail.com",
        password : bycrpt.hashSync( "123456" , 10),
    },
    {
        name: "ssss",
        email: "abcdefg@gmail.com",
        password : bycrpt.hashSync( "123456" , 10),
    }
]

module.exports =  users 