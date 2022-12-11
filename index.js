const express = require("express");
require("dotenv").config();

const { connection } = require("./config/db");

const { userRouter } = require("./routes/user.route");

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.listen(process.env.port, async() => {

    try{
        await connection
        console.log("Connected to db successfully");
    }
    catch(err) {
        console.log("Db falied");
        console.log(err)
    }
    console.log(`Listening to PORT ${process.env.port}`)
})
