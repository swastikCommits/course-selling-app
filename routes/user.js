const { Router } = require("express");

const userRouter = Router();

userRouter.get("/signin", (req,res)=>{
    res.json({
        msg: "Hello baka!"
        })
})

userRouter.post("/signup", (req,res)=>{
    res.json({
        msg: "Hello baka!"
        })
})

userRouter.post("/purchases", (req,res)=>{
    res.json({
        msg: "Hello baka!"
        })
})

module.exports = { 
    userRouter : userRouter 
};
