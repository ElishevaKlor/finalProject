const bcrypt=require('bcrypt')
const Student=require('../model/Student')
const jwt= require('jsonwebtoken')
const logIn=async(req,res)=>{
 const{id,password}=req.body
 if (!id || !password) {
    return res.status(400).json({message:'All fields are required'})
    }
    const foundStudent = await Student.findOne({id}).lean()
    if (!foundStudent) {
        return res.status(401).json({ message: 'Unauthorized' })
        }
    const match = await bcrypt.compare(password, foundStudent.password)
    if(!match)
        return res.status(401).json({message:'Unauthorized' })
    res.send("Logged In")
    const studentInfo= {_id:foundStudent._id,
        roles:"student", id:foundStudent.id,
        studentClass:foundStudent.studentClass}
    const accessToken = jwt.sign(studentInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
} 
const signUp=async(req,res)=>{
    const {lastname,name,password,email,phone,id,profil,role,studentClass}=req.body
    if(!lastname||!name||!password||!phone||!id||!role||!studentClass)
        return res.status(400).json({message:'All fields are required'})
    const duplicate = await Student.findOne({id:id}).lean()
    if(duplicate){
       return res.status(409).json({message:"Duplicate id"})
}
    const hashedPwd = await bcrypt.hash(password, 10)
    const studentObject={lastname,name,password:hashedPwd,email,phone,id,profil,role,studentClass}
    const student = await Student.create(studentObject)
    if (student) { 
        return res.status(201).json({message:`New student ${student.name} created` })
        } else {
        return res.status(400).json({message:'Invalid student received'})
        }
}
const updateStudent=async(req,res)=>{
    const {_id,lastname,name,email,phone,id,profil,role,studentClass}=req.body
         if(!_id||!lastname||!name||!password||!phone||!id||!role||!studentClass)
             return res.status(400).json({message:'All fields are required'})
        const student=await Student.findById(id).exec()
        if (!student)
            return res.status(400).send("No student")
        const duplicate = await Student.findOne({id:id}).lean()
        if(duplicate){
           return res.status(409).json({message:"Duplicate id"})
}
        student.id=id
        student.name=name
        student.lastname=lastname
        student.email=email
        student.phone=phone
        student.role=role
        student.profil=profil
        student.studentClass=studentClass
        const savedStudent=await student.save()
        if (!savedStudent)
            return res.status(400).send("Update Failed")
        res.json(savedStudent)
 }
 const deleteStudent=async(req,res)=>{
    const {_id}=req.body
    if (!_id)
       return res.status(400).send("id is required")
    const student=await Student.findById(_id).exec()
    if (!student)
        return res.status(400).send("No student")
   const deletedStudent=await Student.deleteOne()
   
    if (!deletedStudent)
        res.status(400).send("Delete Failed")
    
    }
const getStudentByClass=async(req,res)=>{
     const {studentClass}=req.params
     const students=await Student.find({studentClass:studentClass}).lean()
     if (!students)
        return res.status(400).send("No students")
    res.json(students)
    }

