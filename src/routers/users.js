const express = require("express");
const User = require("../models/users");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send("Bad Request!!!!!!!!");
  }
});

router.post("/users/create", (req, res) => {
  const userData = new User(req.body);
  userData
    .save()
    .then(() => {
      res.send(userData);
    })
    .catch((error) => {
      res.send(error);
    });
});
router.get("/users", auth, async (req, res) => {
  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });

  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  // const _id = req.params.id;
  // User.findById(_id)
  //   .then((user) => {
  //     res.send(user);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });

  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!_id) {
      return res.status(400).send("Sorry data not available");
    }
    res.send(user);
  } catch (error) {
    res.status(500), send(error);
  }
});

router.patch("/users/update/:id", async (req, res) => {
  const fields = Object.keys(req.body);
  const allowedFields = ["name", "email", "password"];

  const filteredAllowedFields = fields.every((item) =>
    allowedFields.includes(item)
  );

  if (!filteredAllowedFields) {
    return res.status(400).send("Sorry Fields are not matching");
  }

  try {
    const user = await User.findById(req.params.id);
    fields.forEach((data) => (user[data] = req.body[data]));
    user.save();
    // const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) {
      return res.status(400).send("User not found!!!!");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Internal Server Error!!!");
  }
});

router.delete("/users/delete/:id", async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);

    if (!userDeleted) {
      return res.status(400).send();
    }
    res.send(userDeleted);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
