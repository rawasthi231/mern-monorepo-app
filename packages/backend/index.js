const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    import("node-fetch")
      .then(async ({ default: fetch }) => {
        const data = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        ).then((response) => response.json());
        res.send(data);
      })
      .catch((err) => {
        console.log("Error in importing node-fetch: ", err);
      });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error);
  }
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
