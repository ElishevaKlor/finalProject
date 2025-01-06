const bcrypt=require('bcrypt')
const Teacher=require('../model/Teacher')
const jwt= require('jsonwebtoken')
const logIn=async()=>{
 const{id,password}=req.body
 if (!id || !password) {
    return res.status(400).json({message:'All fields are required'})
    }
    const foundTeacher = await Teacher.findOne({id}).lean()
    if (!foundTeacher) {
        return res.status(401).json({ message: 'Unauthorized' })
        }
    const match = await bcrypt.compare(password, foundTeacher.password)
    if(!match)
        return res.status(401).json({message:'Unauthorized' })
    res.send("Logged In")
    const teacherInfo= {_id:foundTeacher._id,
        roles:"teacher", id:foundTeacher.id,
        classes:foundTeacher.classes}
    const accessToken = jwt.sign(teacherInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
} 
const signUp=async()=>{
    const {lastname,name,password,email,phone,id,profil,classes}=req.body
    if(!lastname||!name||!password||!phone||!id||!classes)
        return res.status(400).json({message:'All fields are required'})
    const duplicate = await Teacher.findOne({id:id}).lean()
    if(duplicate){
       return res.status(409).json({message:"Duplicate id"})
}
    const hashedPwd = await bcrypt.hash(password, 10)
    const teacherObject={lastname,name,password:hashedPwd,email,phone,id,profil,role,classes}
    const teacher = await Teacher.create(teacherObject)
    if (teacher) { 
        return res.status(201).json({message:`New teacher ${teacher.name} created` })
        } else {
        return res.status(400).json({message:'Invalid teacher received'})
        }
}
const updateTeacher=async(req,res)=>{
    const {_id,lastname,name,email,phone,id,profil,classes}=req.body
         if(!_id||!lastname||!name||!password||!phone||!id||!classes)
             return res.status(400).json({message:'All fields are required'})
        const teacher=await Teacher.findById(id).exec()
        if (!teacher)
            return res.status(400).send("No teacher")
        const duplicate = await Teacher.findOne({id:id}).lean()
        if(duplicate){
           return res.status(409).json({message:"Duplicate id"})
}
        teacher.id=id
        teacher.name=name
        teacher.lastname=lastname
        teacher.email=email
        teacher.phone=phone
        teacher.profil=profil
        teacher.classes=classes
        const savedTeacher=await teacher.save()
        if (!savedTeacher)
            return res.status(400).send("Update Failed")
        res.json(savedTeacher)
 }
 const deleteTeacher=async(req,res)=>{
    const {_id}=req.body
    if (!_id)
       return res.status(400).send("id is required")
    const teacher=await Teacher.findById(_id).exec()
    if (!teacher)
        return res.status(400).send("No teacher")
   const deletedTeacher=await Teacher.deleteOne()
   
    if (!deletedTeacher)
        res.status(400).send("Delete Failed")
    
    }

