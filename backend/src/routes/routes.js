import { Router } from "express";

import userRouter from "./users.routes.js";
import categoryRouter from "./category.routes.js"

const routes = Router();

routes.use("/users", userRouter);
routes.use("/categories", categoryRouter)


export default routes;
