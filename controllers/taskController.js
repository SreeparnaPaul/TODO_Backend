const Task=require("../models/taskModel")
const { taskRequestValidate } = require("../validations/taskRequestValidation")
const { failureResponse, successResponse } = require("../utils/apiResponse");
const { failureMessage, successMessage } = require("../utils/appMessage");
const {isValidObjectId} =require("../utils/common")

const addTask=async(req,res)=>{
try {
    const {title,createdBy,status} =req.body
    let validateResponse =   taskRequestValidate(req.body)

    if(validateResponse.error){
        return res.status(400).json(failureResponse(validateResponse.error.details,failureMessage.badRequest))
    }

    const taskData = {title,createdBy,status}

    const taskDetails = new Task(taskData);
    const result= await taskDetails.save();

    res.status(201).json(successResponse(result,successMessage.created));
} catch (error) {
    res
        .status(500)
        .json(failureResponse(error,failureMessage.internalServer));
    }

}

const updateTask= async(req,res)=>{

}

const deleteTask = async (req, res) => {
    try {
      const taskId = req.query.taskId;
  
      if (!isValidObjectId(taskId)) {
        return res.status(400).json(failureResponse(null,failureMessage.badRequest));
      }
  
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json(failureResponse(deletedTask,failureMessage.invalidTask));
      }
  
      res.status(200).json(successResponse(deletedTask,successMessage.deleted));
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(failureResponse(error,failureMessage.internalServer));
    }
  };
  
const getTasks=async(req,res)=>{

}

module.exports={addTask,updateTask,deleteTask,getTasks}