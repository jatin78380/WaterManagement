const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const cors = require('cors');
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use("/admin",adminRouter);


app.listen(3000,()=>{
  console.log("Server is running");
})