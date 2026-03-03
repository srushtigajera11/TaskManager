require("dotenv").config();
const app =  require("./app");
const connectDB = require("./config/db")
const port = process.env.PORT || 5000 ;

connectDB();
// require("./cron/expiryJob");
app.listen(port,()=>{
console.log(`server is running on ${port}`);
})