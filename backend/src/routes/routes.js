import { Router } from "express";

import userRouter from "./users.routes.js";

const routes = Router();

routes.use("/users", userRouter);

export default routes;
