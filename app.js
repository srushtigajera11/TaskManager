const express = require('express')
const authRoute = require("./routes/auth.route")
const userRoute = require("./routes/user.route")
const planRoute = require("./routes/plan.route")
const errorMiddleware = require("./middlewares/error.middleware")
const webhookRoute = require("./routes/webhook.route")
const commentRoute = require("./routes/comment.route");
const taskRoute = require("./routes/task.rotue");
const projectRoute = require("./routes/project.route");
const activityRoute = require("./routes/activity.route");

const app = express();

app.use("/api/webhooks/razorpay", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route mounting
app.use("/api/webhooks",webhookRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/plans", planRoute);
app.use("/api/projects", projectRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/comments", commentRoute);
app.use("/api/activities", activityRoute);
app.get('/',(req,res)=>{
    res.send("TaskManager API is working!");
});
app.use(errorMiddleware);

module.exports =  app;