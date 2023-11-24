const { generateRandomCode } = require("../utils/randomString");
const LoginDetails = require("../models/loginModel");
const {failureResponse} = require("../utils/apiResponse")
const {failureMessage} =require("../utils/appMessage")

const createLoginDetails = async (req,res) => {
    try {
      const {email}  = req.body;
      const loginId= generateRandomCode(10)

      const loginData = {email,loginId,loginAt:new Date(),active:true}

      console.log("loginData ",loginData)
     
       const newLoginData = new LoginDetails(loginData);
        const result= await newLoginData.save();
     
        console.log("result ",result)
     return result.loginId
     
    } catch (error) {
    console.log("logindetails not saved")
      return null;
    }
  };

  const getLoginDetails = async (loginId,req,res)=>{
        try {
            const loginData= await LoginDetails.findOne({loginId})
            if (!loginData) {
                 res.status(400).json(failureResponse(null,failureMessage.invalidUser))
              }
              return loginData;
        } catch (error) {
             return null;
        }
  }


  const updateLoginDetails = async (loginDetails,req,res)=>{
    try {
        console.log("data update ",loginDetails)
        let loginId = loginDetails.loginId;
        const loginData= await LoginDetails.findOneAndUpdate({ loginId:loginId }, loginDetails, {
            new: true, 
          }); 
        return loginData;        
    } catch (error) {
        return null;
    }
}

module.exports={createLoginDetails,updateLoginDetails,getLoginDetails}