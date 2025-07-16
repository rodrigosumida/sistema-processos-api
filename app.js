const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rotas
const cargo = require("./routes/cargo.routes");
const area = require("./routes/area.routes");
const responsavel = require("./routes/responsavel.routes");
const areaCargoResponsavel = require("./routes/area-cargo-responsavel.routes");
const processo = require("./routes/processo.routes");

// const token = require("./routes/token.routes");

// Endereços
app.use("/api/cargo", cargo);
app.use("/api/area", area);
app.use("/api/responsavel", responsavel);
app.use("/api/area-cargo-responsavel", areaCargoResponsavel);
app.use("/api/processo", processo);

// app.use("/api/token", token);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.API_PORT || 3002);
app.set("port", port);

app.listen(port, () => {
  console.log("Servidor iniciado na porta " + port + "!!!");
});
console.log("Servidor iniciado");
