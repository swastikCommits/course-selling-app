const { Router } = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const userRouter = Router();
const jwt=require("jsonwebtoken");
const JWT_USER_PASSWORD = "swastikSecret";
const { userModel } = require("../db");

userRouter.post("/signup", async (req, res) => {
    
    const Schema = zod.object({
        email: zod.string(),
        password: zod.string(),
        firstName: zod.string(),
        lastName: zod.string()
    });

    const response = Schema.safeParse(req.body);
    if (!response.success) {
        return res.status(411).json({
            msg: "Invalid input"
        });
    }
    
    const { email, password, firstName, lastName } = req.body;

    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        res.json({
            msg: "Signup successful!"
        });
    } catch (e) {
        res.status(500).json({
            msg: "Error creating user",
            error: e.message
        });
    }
});

userRouter.get("/signin", async (req,res)=>{
 
    const scehma = zod.object({
        email: zod.string().email(),
        passwprd: zod.string()
    })
    const response = schema.safeParse(req.body);
    if(!response.success){
        res.status(411).json({
            msg: "Incorrect Inputs"
        })
    }

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.find({
        email,
        password: hashedPassword
    })

    if(user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);


        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            msg: "Incorrect credentials"
        })
    }

    res.json({
        msg: "Signup successful!"
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
