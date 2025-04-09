import { Router } from "express";
import { ItemRepository } from "../repositories/itens.repository.js";
import { itemService } from "../services/itens.service.js";
import { ItemController } from "../controllers/itens.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

const itensRepository = new ItemRepository();
const itensService = new itemService(itensRepository);
const itensController = new ItemController(itensService);

router.post("/", authMiddleware, (req, res) => itensController.createItens(req,res));

export default router;