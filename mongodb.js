const { MongoClient, ObjectID, ObjectId } = require("mongodb");
const connectionUrl = "mongodb://127.0.0.1:27017";

const databaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log(error);
    }

    console.log("connected");

    const db = client.db(databaseName);
    // db.collection("users").insertOne(
    //   {
    //     name: "mim",
    //     age: 25,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log(error);
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Learn node.js by this month",
    //       completed: false,
    //     },
    //     {
    //       description: "Clean the house",
    //       completed: true,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log(error);
    //     }

    //     console.log(result.ops);
    //   }
    // );

    db.collection("tasks").findOne(
      { _id: ObjectId("61d59ef955ca57c93dd210cd") },
      (error, result) => {
        if (error) {
          return console.log(error);
        }

        console.log(result);
      }
    );

    db.collection("tasks")
      .find({})
      .count((error, result) => {
        if (error) {
          return console.log(error);
        }

        console.log(result);
      });

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       _id: ObjectId("61d59ef955ca57c93dd210cd"),
    //     },
    //     {
    //       $set: {
    //         description: "Clean the bed room",
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .deleteOne({
        description: "Clean the bed room",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
