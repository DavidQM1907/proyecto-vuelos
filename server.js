const express = require("express");
const app = express();

app.use(express.text({ type: "*/*" }));
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("---- Webhook recibido ----");
  console.log(req.body);

  let challenge = null;
  let body = req.body;

  // CASO 3: JSON stringificado
  if (typeof body === "string" && body.startsWith("{") && body.endsWith("}")) {
    try {
      const parsed = JSON.parse(body);
      if (parsed.challenge) {
        body = parsed;
      }
    } catch (err) {
      console.log("Error parseando JSON stringificado.");
    }
  }

  // CASO 1: JSON normal
  if (typeof body === "object" && body.challenge) {
    challenge = body.challenge;
  }

  // CASO 2: Texto plano tipo "challenge=xxxx"
  if (typeof body === "string" && body.startsWith("challenge=")) {
    challenge = body.split("=")[1];
  }

  // RESPONDER CHALLENGE
  if (challenge) {
    console.log("Devolviendo challenge:", challenge);
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(challenge);
  }

  // Webhook normal
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Servidor Monday Webhook funcionando en Render.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor activo en puerto:", port);
});
