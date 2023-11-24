const {verifyJwt} = require('../utils/jwtUtils')
const {failureResponse} = require('../utils/apiResponse')
const {failureMessage }= require("../utils/appMessage")
const {getLoginDetails} = require("../service/loginDetailsService")



const authenticateJWT = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json(failureResponse(null,failureMessage.unauthorized));
  }

 let tokenData = verifyJwt(token)
 if(!tokenData.valid){
    return res.status(401).json(failureResponse(null,failureMessage.tokenError));
 }
 
 req.user = tokenData.decoded;


let loginData = await getLoginDetails(tokenData.decoded.loginId,req,res);


if(!loginData){
    return res.status(401).json(failureResponse(null,failureMessage.tokenError));
 }
 
if(!loginData.active){
    return res.status(401).json(failureResponse(null,failureMessage.tokenError));
 }

 next()


};

module.exports = { authenticateJWT };