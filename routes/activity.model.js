const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({

   task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true
   },

   changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   oldStatus: {
      type: String,
      enum: [
         "to-do",
         "in-progress",
         "done",
         "testing",
         "qa-verified",
         "re-open",
         "deployment"
      ],
      required: true
   },

   newStatus: {
      type: String,
      enum: [
         "to-do",
         "in-progress",
         "done",
         "testing",
         "qa-verified",
         "re-open",
         "deployment"
      ],
      required: true
   },

   company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
   }

},{ timestamps:true });

module.exports = mongoose.model("Activity", activitySchema);