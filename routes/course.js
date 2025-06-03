const { Router } = require("express");
const courseRouter = Router ();

courseRouter.post("/purchase", (req, res)=>{
    res.json({
        msg: "Hello baka!"
        })
})
courseRouter.get("/preview", (req, res)=>{
    res.json({
        msg: "Hello baka!"
        })
})

module.exports = { 
    courseRouter : courseRouter 
};