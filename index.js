const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./database/dbConnection");
const userRouter = require("./routes/userRoutes");
const app = express();

require("dotenv").config();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});