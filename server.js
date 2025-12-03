const express = require("express");
const app = express();

app.use(express.json());

// Ruta para Webhooks de Monday.com
app.post("/webhook", (req, res) => {
  console.log("Webhook recibido:");
  console.log(req.body);

  // Monday Challenge: si viene un challenge, respondemos con él
  if (req.body.challenge) {
    return res.status(200).send(req.body.challenge);
  }

  // Respuesta normal a webhooks
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente en Render.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor corriendo en puerto:", port);
});
