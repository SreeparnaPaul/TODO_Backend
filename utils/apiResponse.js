const successResponse = (data,message)=>{
    return {
        status : "SUCCESS",
        message,
        data
    }
}

const failureResponse = (data,message)=>{
    return {
        status : "FAILURE",
        message,
        data
    }
}

module.exports={successResponse,failureResponse}