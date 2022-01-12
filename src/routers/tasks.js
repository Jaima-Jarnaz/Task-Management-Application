const express = require("express");
const Tasks = require("../models/tasks");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  // const task = new Tasks(req.body);
  // task
  //   .save()
  //   .then(() => {
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });

  try {
    const task = new Tasks(req.body);
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//``````````````Tasks Api`````````````````````//

router.get("/tasks", (req, res) => {
  Tasks.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Tasks.findById(_id)
    .then((task) => {
      res.send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.patch("/tasks/update/:id", async (req, res) => {
  try {
    const data = Object.keys(req.body);
    console.log(data);
    const allowedField = ["description", "completed"];
    const checkFields = data.every((item) => allowedField.includes(item));

    if (!checkFields) {
      return res.status(400).send("Sorry!!this is no right field");
    }
    const updatedData = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) {
      return res.status(404).send();
    }

    res.send(updatedData);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/tasks/delete/:id", async (req, res) => {
  try {
    const taskDeleted = await Tasks.findByIdAndDelete(req.params.id);
    if (!taskDeleted) {
      return res.status(400).send();
    }
    res.send(taskDeleted);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
