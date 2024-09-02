const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/users").then(
      (response) => response.json()
    );
    res.send(data);
  } catch (error) {
    console.log("Error", error);

    res.status(500).send(error);
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
