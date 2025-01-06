const mongoose=require("mongoose")
const TaskScheme=new mongoose.Schema({
name:{
    type:String,
    unique:true,
    // name and teacher_id
    required:true                                                                                                                                                                                                                                                                                                                                
},
student_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Student,
    required:true
},
teacher_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Teacher,
    required:true
},
grade:{
    type:Number,
    min:0,
    max:100
},
content:{
    type:String,
    required:true
},
status:{
    type:String,
    enum:["undone","done","checked"],
    default:"undone"
},
last_date:{
    type:mongoose.Schema.Types.Date
},
comments:{  
    type:
    [
        {msg:String,
         user:mongoose.Schema.Types.ObjectId,
         ref:User
        }
    ]
},
file:{
    type:String
}
},{timestamps:true})

module.exports=mongoose.model('Task',TaskScheme)