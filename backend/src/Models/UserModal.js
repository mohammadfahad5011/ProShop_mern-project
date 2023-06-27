const mongoose = require("mongoose");
// const bycrpt = require("bcryptjs");

const bycrpt = require('bcrypt')

const userScema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
); 

userScema.methods.matchPassword = async function (password) {
    return  await bycrpt.compare(password, this.password )
} 


userScema.pre('save' , async function(next){

  // Only run this function if password was moddified (not on other update functions)
  if(!this.isModified('password')){
    next()
  }

  this.password = await bycrpt.hash(this.password , 10)
})



module.exports = mongoose.model("Users", userScema);
