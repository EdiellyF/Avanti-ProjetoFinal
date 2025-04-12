import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger-output.json" assert { type: "json" };

import routes from "./routes/routes.js";
import { notFoundMiddleware } from "./middlewares/notFound.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log("Documentação disponível em http://localhost:3000/api-docs");
});
