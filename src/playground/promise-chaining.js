require("../db/mongoose");

const User = require("../models/users");

// User.findByIdAndUpdate("61d5e8c02881cccf870fefce", { name: "Ridi" })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ name: "Jaima" });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAndCount = async (id, name) => {
  const user = await User.findByIdAndUpdate(id, { name: name });
  const count = await User.countDocuments({ name: "Jaima" });
  return count;
};

updateAndCount("61d5e8c02881cccf870fefce", "Karishma")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
