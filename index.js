const express=require("express");
const app=express();
const jwt=require("jsonwebtoken");

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);


app.listen(3000);