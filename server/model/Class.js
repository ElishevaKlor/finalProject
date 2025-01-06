const mongoose=require('mongoose')
const ClassSchema=new mongoose.Schema(
{
    grade:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        min:1,
        max:5
    }
    
}
,{timestamps:true}
)
module.exports= mongoose.model('Class',ClassSchema)