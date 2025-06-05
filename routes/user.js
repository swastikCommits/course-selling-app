const { Router } = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const userRouter = Router();
const jwt=require("jsonwebtoken");
const JWT_USER_PASSWORD = "swastikSecret";
const { userModel } = require("../db");

userRouter.post("/signup", async (req, res) => {
    
    const Schema = zod.object({
        email: zod.string().email(),
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

userRouter.get("/signin", async (req, res) => {
    const Schema = zod.object({
        email: zod.string().email(),
        password: zod.string()
    });

    const response = Schema.safeParse(req.body);
    if (!response.success) {
        return res.status(411).json({ msg: "Incorrect Inputs" });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(403).json({ msg: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(403).json({ msg: "Incorrect credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);
    res.json({ token });
});




userRouter.post("/purchases", (req,res)=>{
    res.json({
        msg: "Hello baka!"
        })
})

module.exports = { 
    userRouter : userRouter 
};
