
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loginSchema = new Schema(
  {
    loginId: {
      type: String,
      required: true,
    },
   
    email: {
      type: String,
      required: true,
    },

    loginAt:{
      type: Date,
      required: true, 
    },

    logoutAt:{
      type: Date,
    },

    active:{
      type: Boolean,
      required:true
    }
  
  },
);

module.exports = mongoose.model("LoginDetails", loginSchema);