const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API PROCESSOS",
    description: "Documentação gerada automaticamente",
  },
  host: "http://localhost:3002",
  schemes: ["https"],
  tags: [
    {
      name: "Cargo",
      description: "Endpoints relacionados a cargos",
    },
    {
      name: "Processos",
      description: "Endpoints relacionados a processos",
    },
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
