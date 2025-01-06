// const mongoose=require('mongoose')
// const UserSchema=new mongoose.Schema(
// {
//     id:{
//         type:String,
//         required:true,
//         // unique:true
//     },
//     name:{
//         type:String,
//          required:true
//     },
//     lastname:{
//         type:String,
//          required:true
//     },
//     password:{
//         type:String,
//          required:true,
//          match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
//     },
//     address:{
//         type:String,
//          required:true,
//          minLength:5,

//     },
//     phone:{
//         type:String,
//         maxLength:10,
//         minLength:9
//     },
//     email:{
//         type:String,
//         trim:true,
//         tolowercase:true,
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//     },
//     role:{
//         type:String,
//         default:Student,
//         tolowercase:true,
//         enum:['student','teacher']
//     }
//     // profil:{
//     //     type:String
//     // }



// }
// ,{timestamps:true}
// )
// module.exports= mongoose.model('User',UserSchema)
