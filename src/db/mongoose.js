const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

// const Task = mongoose.model("Tasks", {
//   description: { type: String, required: true, trim: true },
//   completed: { type: Boolean, required: true,default:false },
// });

// const taskInstance = new Task({
//   description: "Learn AWS for CCP",
//   completed: false,
// });

// taskInstance
//   .save()
//   .then(() => {
//     console.log("Congratulations");
//   })
//   .catch(() => {
//     console.log("Sorry!!!");
//   });

// const User = mongoose.model("Users", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Sorry email is not valid");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minLength: 8,
//   },
// });

// const userInstance = new User({
//   name: "     Jarnaz",
//   email: "jarnaz12@gmail.com",
//   password: "12345mim",
// });

// userInstance
//   .save()
//   .then((result) => {
//     console.log("User saved", result);
//   })
//   .catch((error) => {
//     console.log("Sorry!!!Data not saved", error);
//   });
