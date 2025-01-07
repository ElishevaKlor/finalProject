const express=require('express')
const TaskController=require('../controllers/TaskController')
const route=express.Router()


route.get("/",TaskController.getAllTasks)
route.get("taskbystudentid/",TaskController.getTaskByStudentId)//student role
route.get("taskbyteachstu/:studentId/",TaskController.getTaskByTeacherAndStudentId)//teacher role
route.get("taskbyteachtask/:task_name/",TaskController.getTaskByTeacherAndName)//teacher role
route.get("taskbytaskid/:_id",TaskController.getTaskById)//teacher&idteacher student&idstudent
route.post("/",TaskController.createTask)
route.put("/teacher",TaskController.updateTaskTeacher)
route.put("/student",TaskController.updateTaskStudent)
// route.put("/",TaskController.updateTask)
route.delete("/",TaskController.deleteTask)
module.exports=route
