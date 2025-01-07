const express=require('express')
const TaskController=require('../controllers/TaskController')
const route=express.Router()


route.get("/",TaskController.getAllTasks)
route.get("/byteacher/:task_name",TaskController.getTaskByTeacherAndName)//teacher
route.get("/byteachstud/:student_id",TaskController.getTaskByTeacherAndStudentId)//teacher
route.get("/bystududent",TaskController.getTaskByStudentId)//stundent role
route.get("/taskbyid/:id",TaskController.getTaskById)//student...
//route.post("/",TaskController.createTask)
route.post("/taskbyclass",TaskController.createTaskByClass)
route.put("/teachers",TaskController.updateTaskTeacher)
route.put("/byclass",TaskController.updateTaskTeacherByClass)
route.put("/students",TaskController.getTaskByStudentId)
//route.put("/",TaskController.updateTask)
route.delete("/",TaskController.deleteTask)
route.delete("/byclass",TaskController.deleteTaskByClassName)
module.exports=route



//module.exports={deleteTaskByClassName,updateTaskTeacherByClass,getTaskByStudentId,getAllTasks,getTaskById,createTaskByClass,updateTaskTeacher,updateTaskStudent,deleteTask,getTaskByTeacherAndStudentId,getTaskByTeacherAndName}
