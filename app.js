const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profile");
const postsRoutes = require("./routes/posts");
const bodyParser = require("body-parser");

const app = express();
// cors
app.use(cors());

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
app.use(passport.initialize());

require("./config/passport")(passport);

// connection to mongoDB

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("DB is Connected Successfully"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
