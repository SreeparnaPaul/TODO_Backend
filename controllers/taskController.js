const Task=require("../models/taskModel")
const { taskRequestValidate } = require("../validations/taskRequestValidation")
const { failureResponse, successResponse } = require("../utils/apiResponse");
const { failureMessage, successMessage } = require("../utils/appMessage");
const {isValidObjectId} =require("../utils/common")
const User=require("../models/userModel")

const addTask=async(req,res)=>{
try {
   
    const {title,status} =req.body
    const email=req.user.email
    const userDetails= await User.findOne({email})
    let validateResponse =   taskRequestValidate(req.body)

    if(validateResponse.error){
        return res.status(400).json(failureResponse(validateResponse.error.details,failureMessage.badRequest))
    }
    
    const taskData = {title,createdBy:userDetails._id,status}

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
    try {
    const taskId = req.query.taskId;
  
      if (!isValidObjectId(taskId)) {
        return res.status(400).json(failureResponse(null,failureMessage.badRequest));
      }
   
  
    } catch (error) {
        
    }
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
  const getTasks = async (req, res) => {
    try {
      const email = req.user.email;
      const userDetails = await User.findOne({ email });
  
      if (!userDetails) {
        return res.status(404).json(failureResponse(null, failureMessage.invalidUser));
      }
  
      const userId = userDetails._id;
      const taskId = req.query.taskId;
  
      if (taskId) {
        if (!isValidObjectId(taskId)) {
          return res.status(400).json(failureResponse(null, failureMessage.badRequest));
        }
  
        const selectedTask = await Task.findOne({ _id: taskId, createdBy: userId });
  
        if (!selectedTask) {
          return res.status(404).json(failureResponse(null, failureMessage.invalidTask));
        }
  
        res.status(200).json(successResponse(selectedTask, successMessage.singleTask));
      } else {
        const allTasks = await Task.find({ createdBy: userId });
  
        res.status(200).json(successResponse(allTasks, successMessage.allTask));
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(failureResponse(error, failureMessage.internalServer));
    }
  };


module.exports={addTask,updateTask,deleteTask,getTasks}