const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  deadline: Date,
  priority: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
