const express = require('express');
const { connectDB } = require('./db');
const router = require('./router/userRouter');
const session = require('express-session');

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(session({
    secret:"kjdbfhsdgfh",
    resave:false,
    saveUnInitalized:false
}))
app.use("/",router)

app.listen(4000,()=>{
    console.log("running...");
})