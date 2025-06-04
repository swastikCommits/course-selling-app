const express = require("express");
const app = express();
const mongoose = require ("mongoose");
const dotenv = require('dotenv').config();
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const jwt=require("jsonwebtoken");

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(){ 
    await mongoose.connect(process.env.DB);
    app.listen(process.env.PORT);
    console.log("db running");
    
    
}

main();
