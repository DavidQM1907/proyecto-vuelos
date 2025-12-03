const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Monday puede mandar JSON o texto plano.
// Aceptamos AMBOS formatos sin romper nada.
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "*/*" }));

app.post("/webhook", (req, res) => {
  console.log("Webhook recibido:");
  console.log(req.body);

  // Cuando Monday valida el webhook manda:
  // { challenge: "xxxxx" }
  //
  // PERO A VECES lo manda como texto plano:
  // challenge=xxxxx
  //
  // Debemos manejar AMBAS formas.
  
  let body = req.body;

  // Caso 1: JSON normal (lo más común)
  if (typeof body === "object" && body.challenge) {
    console.log("Responding challenge (JSON)...");
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(body.challenge);
  }

  // Caso 2: texto plano tipo: "challenge=xxxxx"
  if (typeof body === "string" && body.startsWith("challenge=")) {
    const challengeValue = body.split("=")[1];
    console.log("Responding challenge (TEXT)...");
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(challengeValue);
  }

  // Si no es challenge, es un webhook normal
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente en Render.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor corriendo en puerto:", port);
});
