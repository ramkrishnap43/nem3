const { application } = require("express");
const express = require("express");

const { UserModel } = require("../Models/User.model");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const params = req.query;

  try {
    const page = 1;
    const limitValue = req.query.limit || 2;
    // const skipValue = req.query.skip || 0;
    const users = await UserModel.find(params)
     .limit(limitValue)
      .skip(page * limitValue);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something Went wrong" });
  }[]
});

const validator = (req, res, next) => {
  if (req.method === "POST") {
    const payload = req.body;
    if (payload.title && payload.note && payload.tags) {
      if (
        typeof payload.title === "string" &&
        typeof payload.note === "string" &&
        typeof payload.tags === "string"
      ) {
        next();
      } else {
        res.send("Validation Failed");
      }
    } else {
      res.send("Validation Failed");
    }
  }
};

userRouter.use(validator);

userRouter.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const user = new UserModel(payload);
    await user.save();
    res.send("Post Successfully");
  } catch (err) {
    console.log(err);
    res.send({ err: "Something Went wrong" });
  }
});

const validatorPatch = (req, res, next) => {
  if (req.method === "PATCH") {
    const payload = req.body;
    if (payload.title || payload.note || payload.tags) {
      if (
        typeof payload.title === "string" &&
        typeof payload.note === "string" &&
        typeof payload.tags === "string"
      ) {
        next();
      } else {
        res.send("Validation Failed");
      }
    } else {
      res.send("Validation Failed");
    }
  }
};
//Update

application.use(validatorPatch)

userRouter.patch("/edit/:userID", async (req, res) => {
  const userID = req.params.userID;
  const payload = req.body;

  try {
    const query = await UserModel.findByIdAndUpdate({ _id: userID }, payload);

    res.send("Updated Successfully");
  } catch (err) {
    console.log(err);
    res.send({ err: "Something Went wrong" });
  }
});

//delete
userRouter.delete("/delete/:userID", async (req, res) => {
  const userID = req.params.userID;
  // console.log(req.params)
  try {
    await UserModel.findByIdAndDelete({ _id: userID });
    res.send("Deleted successfully");
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong" });
  }
});

module.exports = { userRouter };
