const jwt = require("jsonwebtoken");

 const  signJwt=  (object) => {
    const token = jwt.sign(object, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
    return token;
  }
 const  verifyJwt= (token) => {
    try {
      const decoded = jwt.verify(token,  process.env.JWT_SECRET);
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } catch (e) {
      console.error(e);
      return {
        valid: false,
        expired: e.message === "jwt expired",
        decoded: null,
      };
    }
  }
  module.exports={signJwt,verifyJwt}

