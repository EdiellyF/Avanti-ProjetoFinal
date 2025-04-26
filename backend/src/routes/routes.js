import { Router } from "express";

import userRouter from "./users.routes.js";
import categoryRouter from "./category.routes.js";
import itemRouter from "./item.routes.js";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Healthcheck successful" });
});

routes.use("/users", userRouter);
routes.use("/categories", categoryRouter);
routes.use("/item", itemRouter);

export default routes;
