const express = require("express");
const app = express();

app.use(express.json());

// Ruta para Webhooks de Monday.com
app.post("/webhook", (req, res) => {
  console.log("Webhook recibido:");
  console.log(req.body);

  // Monday Challenge: si viene "challenge", devolverlo tal cual
  if (req.body.challenge) {
    console.log("Responding challenge back...");
    return res.status(200).send(req.body.challenge);
  }

  // Respuesta normal a otros webhooks
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente en Render.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor corriendo en puerto:", port);
});
