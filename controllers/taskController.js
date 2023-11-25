const Task=require("../models/taskModel")
const { taskRequestValidate } = require("../validations/taskRequestValidation")
const { failureResponse, successResponse } = require("../utils/apiResponse");
const { failureMessage, successMessage } = require("../utils/appMessage");
const {isValidObjectId, generateRandomCode} =require("../utils/common")
const User=require("../models/userModel")


const addTask=async(req,res)=>{
try {
   
    const {title,status,description} =req.body
    const email=req.user.email
    const userDetails= await User.findOne({email})
    let validateResponse =   taskRequestValidate(req.body)

    if(validateResponse.error){
        return res.status(400).json(failureResponse(validateResponse.error.details,failureMessage.badRequest))
    }

   let taskId =  generateRandomCode(10);
    
    const taskData = {taskId,title,description,createdBy:userDetails._id,status}

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
    

    const {taskId,title,status,description} =req.body


    if (!taskId || taskId === "") {
      return res.status(400).json(failureResponse(null,failureMessage.badRequest));
    }

      let updatedData = {}

      let  query = {taskId};


      if(title && title!==""){
        updatedData.title = title
      }

      if(status && status!==""){
        updatedData.status = status
        if(status === "complete"){
          query.status="pending"
        }
      }

      if(description && description!==""){
        updatedData.description = description
      }
  
      

      const updatedTask = await Task.findOneAndUpdate(query,updatedData,{ new: true });

      

      if(!updateTask){
        res.status(404).json(failureResponse(null,failureMessage.invalidTask));
        return;
      }
     

      res.status(200).json(successResponse(updatedTask,successMessage.updated));
  
    } catch (error) {
      res
      .status(500)
      .json(failureResponse(error,failureMessage.internalServer));
    }
}

const deleteTask = async (req, res) => {
    try {
      const taskId = req.query.taskId;
  
      if (!taskId || taskId === "") {
        return res.status(400).json(failureResponse(null,failureMessage.badRequest));
      }
  
      const deletedTask = await Task.findOneAndDelete({taskId});
  
      if (!deletedTask) {
         res.status(404).json(failureResponse(deletedTask,failureMessage.invalidTask));
          return;
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
           res.status(400).json(failureResponse(null, failureMessage.badRequest));
           return
        }
  
        const selectedTask = await Task.findOne({ taskId, createdBy: userId });
  
        if (!selectedTask) {
           res.status(404).json(failureResponse(null, failureMessage.invalidTask));
           return;
        }
  
        res.status(200).json(successResponse(selectedTask, successMessage.singleTask));
      } else {

        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit;

        const allTasksWithPagination = await Task.find({ createdBy: userId }).skip(skip).limit(limit);

        const allTasks = await Task.find({ createdBy: userId });

        const result = {total:allTasks.length , taskList:allTasksWithPagination}
  
        res.status(200).json(successResponse(result, successMessage.allTask));
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(failureResponse(error, failureMessage.internalServer));
    }
  };


module.exports={addTask,updateTask,deleteTask,getTasks}