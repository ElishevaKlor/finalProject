// const bcrypt=require('bcrypt')
// const User=require('../model/User')
// const logIn=()=>{

// }
// const signUp=async()=>{
//     const {lastname,name,password,email,phone,id,profil,role}=req.body
//     if(!lastname||!name||!password||!phone||!id||!role)
//         return res.status(400).json({message:'All fields are required'})
//     const hashedPwd = await bcrypt.hash(password, 10)
//     const userObject={lastname,name,password:hashedPwd,email,phone,id,profil,role}
//     const user = await User.create(userObject)
//     if (user) { 
//         return res.status(201).json({message:`New user ${user.username}
//         created` })
//         } else {
//         return res.status(400).json({message:'Invalid user received'})
//         }
// }
