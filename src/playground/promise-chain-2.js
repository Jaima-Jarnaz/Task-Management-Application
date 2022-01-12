require("../db/mongoose");

const Task = require("../models/tasks");

// Task.findByIdAndDelete("61d71ba280d880d668c2e260")
//   .then((data) => {
//     console.log(data);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((countData) => {
//     console.log("Total Count", countData);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteAndTask = async (id) => {
  const deletedData = await Task.findByIdAndDelete(id);
  console.log(deletedData);
  const countAfterDeletion = await Task.countDocuments({ completed: false });
  return countAfterDeletion;
};

deleteAndTask("61d7e626b1c28d0e6ebd522d")
  .then((count) => {
    console.log("Total not completed data", count);
  })
  .catch((e) => {
    console.log(e);
  });
