const failureMessage = {
    unauthorized : "Unauthorized",
    tokenError:"Token expired or validation failed",
    badRequest:"Invalid Request Body",
    invalidUser:"User not found or Invalid credentials",
    internalServer:"Something went wrong",
    invalidTask:"Task not found"
}

const successMessage = {
    login:"User logged in successfully",
    logout:"Logged out successfully",
    created:"Task created successfully",
    updated:"Task updated successfully",
    deleted:"Task deleted successfully"
}

module.exports={successMessage,failureMessage}
