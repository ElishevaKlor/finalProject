const Task=require('../model/Task')
const Student=require('../model/Student')
const getAllTasks=async(req,res)=>{
const tasks=await Task.find().lean()
if (!tasks)
    return res.status(400).send("No tasks")
res.json(tasks)
}
const getTaskByStudentId=async(req,res)=>{
    const task=await Task.find({student_id:req.user.id}).lean()
    if (!task)
        return res.status(400).send("No task")
    res.json(task)
    }
 const getTaskByTeacherAndName=async(req,res)=>{
        const {task_name}=req.params
        const tasks=await Task.find({status:{$in:["done","checked"]},name:task_name,teacher_id:req.user.id}).lean()
        if(!tasks)
            return res.status(400).send("no tasks")
        res.json(tasks)
    }
    const getTaskByTeacherAndStudentId=async(req,res)=>{
        const {studentId}=req.params
        const task=await Task.find({studentId:studentId,teacher_id:req.user.id,status:$in["done","cheked"]}).lean()
        if (!task)
            return res.status(400).send("No task")
        res.json(task)
        }
    const getTaskById=async()=>{
        const{_id}=req.params
        const task=await Task.find({_id}).lean()
        if (!task)
            return res.status(400).send("No task")
        res.json(task)
    }
const createTask=async(req,res)=>{
    const {content,last_date,comments,name}=req.body
    if(!name||!content)
        return res.status(400).json({message:'field is required'})
    const duplicate = await Task.findOne({name,teacher_id:req.user.id}).lean()
    if(duplicate){
       return res.status(409).json({message:"Duplicate name"})}
    const task=await Task.create( {content,last_date,comments,name,teacher_id:req.user.id})
        if (!task)
            return res.status(400).send("Create Failed")
    res.json(task)
 }
 const createTaskByClass=async(req,res)=>{
    const {content,last_date,comments,name,classST}=req.body
    if(!name||!content||!class_)
        return res.status(400).json({message:'field is required'})
    const duplicate = await Task.findOne({name,teacher_id:req.user.id}).lean()
    if(duplicate){
       return res.status(409).json({message:"Duplicate name"})}
    const students=Student.find({studentClass:class_})
    const tasks=students.map(async(student)=>{
        const task=await Task.create( {content,last_date,comments,name,teacher_id:req.user.id})
        if (!task)
            return res.status(400).send("Create Failed")
        return task
    })
    res.json(tasks)
 }
//  const updateTask=async(req,res)=>{
//     const {_id,student_id,grade,content,status,last_date,comments,name,teacher_id}=req.body
//         if(!_id||!student_id||!teacher_id)
//             return res.status(400).json({message:'field is required'})
//         const task=await Task.findById(_id).exec()
//         if (!task)
//             return res.status(400).send("No task")
//         const duplicate = await Task.findOne({name,teacher_id}).lean()
//         if(duplicate){
//             return res.status(409).json({message:"Duplicate name"})}
//         task.student_id=student_id
//         task.teacher_id=teacher_id
//         task.name=name
//         task.grade=grade
//         task.content=content
//         task.status=status
//         task.last_date=last_date
//         task.comments=comments
//         const savedTask=await task.save()
//         if (!savedTask)
//             return res.status(400).send("Update Failed")
//         res.json(savedTask)
//  }
 const updateTaskTeacher=async(req,res)=>{
    const {_id,student_id,grade,content,status,last_date,comments,name}=req.body
        if(!_id||!student_id)
            return res.status(400).json({message:'field is required'})
        const task=await Task.findById(_id).exec()
        if (!task)
            return res.status(400).send("No task")
        const duplicate = await Task.findOne({name,teacher_id}).lean()
        if(duplicate){
            return res.status(409).json({message:"Duplicate name"})}
        task.student_id=student_id
        task.teacher_id=teacher_id
        task.name=name
        task.grade=grade
        task.content=content
        task.status=status
        task.last_date=last_date
        task.comments=comments
        const savedTask=await task.save()
        if (!savedTask)
            return res.status(400).send("Update Failed")
        res.json(savedTask)
 }
 const updateTaskTeacherByClass=async(req,res)=>{
    const {_id,student_id,grade,content,status,last_date,comments,name,teacher_id}=req.body
        if(!_id||!student_id||!teacher_id)
            return res.status(400).json({message:'field is required'})
        const task=await Task.findById(_id).exec()
        if (!task)
            return res.status(400).send("No task")
        const duplicate = await Task.findOne({name,teacher_id}).lean()
        if(duplicate){
            return res.status(409).json({message:"Duplicate name"})}
        task.student_id=student_id
        task.teacher_id=teacher_id
        task.name=name
        task.grade=grade
        task.content=content
        task.status=status
        task.last_date=last_date
        task.comments=comments
        const savedTask=await task.save()
        if (!savedTask)
            return res.status(400).send("Update Failed")
        res.json(savedTask)
 }
 const updateTaskStudent=async(req,res)=>{
    const {_id,status,comments,file}=req.body
        if(!_id)
            return res.status(400).json({message:'field is required'})
        const task=await Task.findById(_id).exec()
        if (!task)
            return res.status(400).send("No task")
        task.status=status
        task.comments=comments
        task.file=file
        const savedTask=await task.save()
        if (!savedTask)
            return res.status(400).send("Update Failed")
        res.json(savedTask)
 }
 const deleteTask=async(req,res)=>{
 const {_id}=req.body
 if (!_id)
    return res.status(400).send("id is required")
 const task=await Task.findById(_id).exec()
 if (!task)
     return res.status(400).send("No task")
const deletedTask=await Task.deleteOne()

 if (!deletedTask)
     res.status(400).send("Delete Failed")
 
 }
module.exports={getTaskByStudentId,getAllTasks,getTaskById,createTask,updateTaskTeacher,updateTaskStudent,deleteTask,getTaskByTeacherAndStudentId,getTaskByTeacherAndName}