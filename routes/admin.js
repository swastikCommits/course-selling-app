const { Router } = require("express");
const { adminModel } = require("../db");
const adminRouter = Router();

adminRouter.get("/signin", (req,res)=>{
    res.json({
        msg: "Hello baka!"
        })
})

adminRouter.post("/signup", (req,res)=>{
    res.json({
        msg: "Hello baka!"
        })
})

adminRouter.get("/course", (req ,res)=>{
    res.json({
        msg: "Hello baka!"
        })
})

adminRouter.post("/course", (req,res)=>{
    res.json({
        msg: "Hello baka!"
        })
})
adminRouter.get("/course/bulk", (req,res)=>{
    res.json({
        msg: "Hello baka!"
        })
})

module.exports = { 
    adminRouter : adminRouter
};
