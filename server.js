import express from "express";
import queues from "./queues.js";
import subjects from "./subjects.js";
import pakoUsers from "./pakoUsers.js";
import pakoRooms from "./pakoRooms.js";

const app = express();
const port = 8080;

app.use(express.json());

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
  res.json({ isUser: pakoUsers.findIndex((e) => e.vkId === req.body.userID) });
});

app.post("/api/v1/createNewPakoUser", (req, res) => {
  const newPakoUser = {
    pakoId: pakoUsers.length + 1,
    vkId: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photo: req.body.photo,
  };

  pakoUsers.push(newPakoUser);
  res.json(newPakoUser);
});

app.get("/api/v1/pakos/:id", (req, res) => {
  const idxPako = pakoUsers.findIndex((e) => e.vkId === Number(req.params.id));
  res.json(pakoUsers[idxPako]);
});

app.get("/api/v1/rooms/getPakoRooms", (req, res) => {
  const token = Number(req.headers.authentication);
  const roomsIn = pakoRooms.filter((e) => e.participants.indexOf(token) !== -1);
  res.json(roomsIn);
});

app.post("/api/v1/rooms/enterRoom/:id", (req, res) => {
  const pass = req.headers.authentication;
  const roomNum = Number(req.params.id);
  const room = pakoRooms.find((e) => e.id === roomNum);

  if (room.pass === pass) {
    room.participants.push(req.body.id);
    res.json({ added: true });
  } else {
    res.status(403);
  }
});

app.listen(port, () => {
  console.log("Listening " + port);
});
