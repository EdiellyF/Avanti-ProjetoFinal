import { Router } from "express";

import userRouter from "./users.routes.js";
import categoryRouter from "./category.routes.js"
import itemRouter from "./itens.routes.js"

const routes = Router();

routes.use("/users", userRouter);
routes.use("/categories", categoryRouter);
routes.use("/item", itemRouter );


export default routes;
