const failureMessage = {
    unauthorized : "Unauthorized",
    tokenError:"Token expired or validation failed",
    badRequest:"Invalid Request Body",
    invalidUser:"User not found or Invalid credentials",
    internalServer:"Something went wrong",
}

const successMessage = {
    login:"User logged in successfully",
    logout:"Logged out successfully",
    created:"Task created",
    updated:"Task updated",
}

module.exports={successMessage,failureMessage}
