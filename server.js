import express, { json } from "express";
import queues from "./queues.js";
import subjects from "./subjects.js";
import pakoUsers from "./pakoUsers.js";
import pakoRooms from "./pakoRooms.js";

const app = express();
const port = 8080;

app.use(json());

app.get("/subjects/all", (req, res) => {
  res.statusCode = 200;
  res.json(JSON.stringify(subjects));
});

app.get("/queues/all", (req, res) => {
  res.statusCode = 200;
  res.json(JSON.stringify(queues));
});

app.post("/subjects/add", (req, res) => {
  console.log(req.body);
  res.send("Catch it");
});

app.post("/queues/add", (req, res) => {
  const baza = queues.findIndex(
    (a) => a.subject === req.body.subject && a.date === req.body.date
  );
  if (baza === -1) {
    const response = {
      id: Date.now(),
      subject: req.body.subject,
      date: req.body.date,
      participants: req.body.participants,
    };
    queues.push(response);
  }
  res.send("Catch it");
});

app.post("/queues/insert", (req, res) => {
  const idx = queues.findIndex((e) => e.id === req.body.selectedItem.id);
  queues[idx].participants.push(req.body.userName);
  res.send("Added to queue");
});

app.post("/queues/delete", (req, res) => {
  const idx = queues.findIndex((e) => e.id === req.body.selectedItem.id);
  queues[idx].participants = queues[idx].participants.filter(
    (e) => e !== req.body.userName
  );
  if (queues[idx].participants.length < 1)
    queues = queues.filter((e, index) => queues[index] !== queues[idx]);
  res.send("Deleted to queue");
});

app.post("/api/v1/isPakoUser", (req, res) => {
  res.send(pakoUsers.findIndex((e) => e.id === req.body.userID));
}); 

app.listen(port, () => {
  console.log("Listening " + port);
});
