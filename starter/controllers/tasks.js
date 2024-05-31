const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks }); //tasks:tasks is same as tasks : 200 is successful request from client to server
});

// need try and catch to catch errors, else it will crash
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task }); //201 : creation of a new resource
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    //if task iis null, (didnt find any matching task)
    return res.status(404).json({ msg: `no task with id: ${taskID}` }); //need return so you dont send multiple responses - 404 code is does not exist
  }
  res.status(200).json(task);
  //400 is bad request, could not understand because of invalid syntax
  // res.json({id:req.params.id})
});

const updateTask = asyncWrapper(async (req, res) => {
  //must remember to set up validators

  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, //new:true returns the new object, not the old one
    runValidators: true, //makes sure the parameters are valid
  });
  if (!task) {
    return res.status(404).json({ msg: `no task with id: ${taskID}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper (async (req, res) => {

    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      res.status(404).json({ msg: `No task with id : ${taskID}` });
    }
    res.status(200).json({ task });
})


module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
