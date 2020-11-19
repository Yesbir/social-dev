const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profile");
const postsRoutes = require("./routes/posts");

const app = express();
// dotenv.config()

// connection to mongoDb

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("DB is Connected Successfully"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
