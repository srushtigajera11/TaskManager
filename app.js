const express = require('express')
const authRoute = require("./routes/auth.route")
const companyRoute = require("./routes/company.route")
const userRoute = require("./routes/user.route")
const errorMiddleware = require("./middlewares/error.middleware")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route mounting
app.use("/api/auth", authRoute);
app.use("/api/companies",companyRoute);
app.use("/api/users", userRoute);

app.get('/',(req,res)=>{
    res.send("TaskManager API is working!");
});
app.use(errorMiddleware);

module.exports =  app;