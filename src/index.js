const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users");
const tasksRouter = require("./routers/tasks");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// app.use((req, res, next) => {
//   if (req.method == "GET") {
//     res.status(503).send("Sorry!!!Currently unavailable");
//   }
//   //res.status(503).send("Sorry!!!Currently unavailable");
// });

app.use(userRouter);
app.use(tasksRouter);

app.listen(port, () => {
  console.log("connected");
});
