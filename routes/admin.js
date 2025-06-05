const { Router } = require("express");
const { adminModel } = require("../db");
const adminRouter = Router();
const { JWT_ADMIN_PASSWORD } = require("../config")
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middlewares/admin")


adminRouter.post("/signup", async (req,res)=>{
    
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
        await adminModel.create({
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
            msg: "Error creating admin",
            error: e.message
        });
    }
    
})


adminRouter.get("/signin", async (req, res) => {
    const Schema = zod.object({
        email: zod.string().email(),
        password: zod.string()
    });

    const response = Schema.safeParse(req.body);
    if (!response.success) {
        return res.status(411).json({
            msg: "Incorrect Inputs"
        });
    }

    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin) {
        return res.status(403).json({
            msg: "Admin not found"
        });
    }

    const passwordMatch = bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
        return res.status(403).json({
            msg: "Incorrect credentials"
        });
    }

    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);

    return res.json({
        token: token
    });
});



adminRouter.post("/course", adminMiddleware, async (req ,res)=>{
    
})

adminRouter.put("/course", (req,res)=>{
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
