const mongoose=require('mongoose')
const StudentSchema=new mongoose.Schema(
{
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
         required:true
    },
    lastname:{
        type:String,
         required:true
    },
    password:{
        type:String,
         required:true,
         match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    },
    address:{
        type:String,
         required:true,
         minLength:5,

    },
    phone:{
        type:String,
        maxLength:10,
        minLength:9
    },
    email:{
        type:String,
        trim:true,
        tolowercase:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    // profil:{
    //     type:String
    // }



    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:User
    // },
    studentClass:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Class
    }

}
,{timestamps:true}
)
module.exports= mongoose.model('Student',StudentSchema)