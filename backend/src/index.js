import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { green, cyan, yellow, bold, underline } from "colorette";

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
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log("");
  console.log(
    green(
      `🚀 ${bold("[Server]")} Servidor executando em: ${underline(
        cyan(`http://localhost:${PORT}`)
      )}`
    )
  );
  console.log(
    yellow(
      `📘 ${bold("[Swagger]")} Documentação disponível em: ${underline(
        cyan(`http://localhost:${PORT}/api/v1/docs`)
      )}`
    )
  );
  console.log("");
});
