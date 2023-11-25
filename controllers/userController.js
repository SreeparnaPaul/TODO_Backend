const User = require("../models/userModel");
const { signJwt } = require("../utils/jwtUtils");
const loginRequestValidate = require("../validations/loginRequestValidation");
const { failureResponse, successResponse } = require("../utils/apiResponse");
const { failureMessage, successMessage } = require("../utils/appMessage");
const {createLoginDetails,updateLoginDetails,getLoginDetails,updateAllLoginDetails} = require("../service/loginDetailsService")


const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    let validateResponse =   loginRequestValidate(req.body);

    if(validateResponse.error){
        return res.status(400).json(failureResponse(validateResponse.error.details,failureMessage.badRequest))
    }
    const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json(failureResponse(null,failureMessage.invalidUser))
      }

      if(user.password !== password){
        return res.status(400).json(failureResponse(null,failureMessage.invalidUser))
      } 
     

     const loginId = await createLoginDetails(req,res);

     if(loginId){
        const jwtPayload = {email,loginId}

        const token =  signJwt(jwtPayload);
      
          res.status(200).json(successResponse({token,name:user.name},successMessage.login));
     }else{
        res
        .status(500)
        .json(failureResponse(null,failureMessage.internalServer));
     }
 
     
    } catch (error) {
      res
        .status(500)
        .json(failureResponse(error,failureMessage.internalServer));
    }
  };
  
  const logout = async (req, res) => {

  const userData = req.user;

  let loginDetails =  await getLoginDetails(userData.loginId,req,res);

  loginDetails.active = false;
  loginDetails.logoutAt = new Date();

  const updatedData = await updateLoginDetails(loginDetails);
  if(updatedData){
    res.status(200).json(successResponse(null,successMessage.logout));
  }else{
    res
    .status(500)
    .json(failureResponse(null,failureMessage.internalServer));
  }
  
  };


  const logoutFromAllDevices = async (req, res) => {

    const userData = req.user;
  
    const updatedData = await updateAllLoginDetails(userData.email);
    if(updatedData){
      res.status(200).json(successResponse(null,successMessage.logout));
    }else{
      res
      .status(500)
      .json(failureResponse(null,failureMessage.internalServer));
    }
    
    };

  module.exports={login,logout,logoutFromAllDevices}