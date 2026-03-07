import express from "express";
import http from "http";

import { matchRouter } from "./route/matches.js";
import { attatchWebSocketServer } from "./ws/server.js";

const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

const server = http.createServer(app);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.use("/matches", matchRouter);

const { broadcastMatchCreated } = attatchWebSocketServer(server);

app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(PORT, HOST, () => {
  const baseUrl =
    HOST === "0.0.0.0" ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`Server started on port ${baseUrl}`);
  console.log(`Websocket endpoint available at ${baseUrl.replace("http", "ws")}/ws`);
});
