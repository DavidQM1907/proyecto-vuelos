const express = require("express");
const app = express();

// Monday challenge viene a veces como JSON y a veces como texto plano
app.use(express.text({ type: "*/*" }));
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("---- Webhook recibido ----");
  console.log(req.body);

  let challenge = null;

  // Caso 1: JSON estándar
  if (req.body && typeof req.body === "object" && req.body.challenge) {
    challenge = req.body.challenge;
  }

  // Caso 2: texto plano: "challenge=xxxx"
  if (typeof req.body === "string" && req.body.startsWith("challenge=")) {
    challenge = req.body.split("=")[1];
  }

  // Responder challenge de Monday
  if (challenge) {
    console.log("Devolviendo challenge:", challenge);
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(challenge);
  }

  // Webhook regular
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Servidor Monday Webhook funcionando en Render.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor activo en puerto:", port);
});
