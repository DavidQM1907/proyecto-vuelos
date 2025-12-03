const express = require("express");
const app = express();

app.use(express.json());

// Ruta principal para Monday.com
app.post("/webhook", (req, res) => {
  console.log("Webhook recibido:");
  console.log(req.body);

  // Monday.com siempre requiere un 200 OK
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente en Render.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor corriendo en puerto:", port);
});
