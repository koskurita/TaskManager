const mongoose = require("mongoose");


// add validation, so empty strings can not be sent
const TaskSchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true, 'must provide name'], //requires this response for it to be valid
    trim: true, // gets rid of spaces
    maxlength: [20, 'name cannot be more than 20 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
});

 module.exports = mongoose.model('Task', TaskSchema)