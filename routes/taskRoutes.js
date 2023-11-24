const express = require("express");
const {addTask,updateTask,deleteTask,getTasks}=require("../controllers/taskController")
const { authenticateJWT } = require("../middleware/auth");
const router = express.Router();


router.post("/addTask",authenticateJWT,addTask );
router.put("/updateTask",authenticateJWT, updateTask);
router.delete("/deleteTask",authenticateJWT,deleteTask)
router.get("/getTasks",authenticateJWT,getTasks)


module.exports = router;