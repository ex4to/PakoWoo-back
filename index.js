const express = require("express");
const app = express();

app.use(express.json());

const port = 8080;

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.post("/api", (req, res) => {
  console.log(req.body);
  res.send("Catch it");
});

app.listen(port, () => {
  console.log("Listening " + port);
});
