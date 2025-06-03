const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signin", (req,res)=>{
    res.json({
        msg: ""
        })
})

userRouter.post("/user/signup", (req,res)=>{

})

userRouter.post("/user/purchases", (req,res)=>{

})

module.exports = { userRouter : userRouter };
