const bcrypt = require('bcryptjs');
const userModel = require('../model/userModel');

const register  = async(req,resp) =>{
    try {
        const {uname,email,pass} = req.body
        const hashPassword = await bcrypt.hash(pass,10)
        await userModel.create({uname,email,pass:hashPassword})
        resp.redirect("/login")
    } catch (error) {
        console.log(error);
    }
}

const login = async (req,resp) => {
    try {
        const {uname,pass} = req.body
        const user = await userModel.findOne({uname})
        if (user && bcrypt.compare(pass,user.pass)) {
            req.session.name = uname
            resp.redirect("/dashboard")
        } else {
            resp.redirect("/login")
        }
    } catch (error) {
        console.log(error);
    }
}

const dashboard = async(req,resp)=>{
    if (req.session.name) {
        resp.render("dashboard",{uname:req.session.name})
    } else {
        resp.redirect("/login")
    }
}

const logout = async (req,resp) => {
    req.session.destroy(()=>{
        resp.redirect("/login")
    })
}

module.exports = {register, login, dashboard, logout}