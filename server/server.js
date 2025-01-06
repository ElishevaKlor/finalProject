const express=require('express')
const mongoose=require('mongoose')
const corsOptions=require('./config/corsOptions')
const connectToDB=require("./config/connectToDB.JS")
const app=express()
const PORT=process.env.PORT||1000
app.use(cors(corsOptions))
app.use(express.json())
app.use('/tasks',require('./routes/TaskRoute'))
connectToDB()
mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})
})
mongoose.connection.on('error',()=>{
    if (err) throw err
})
