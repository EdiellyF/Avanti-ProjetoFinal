import { Router } from "express";
import { ItemRepository } from "../repositories/item.repository.js";
import { ItemService } from "../services/item.service.js";
import { ItemController } from "../controllers/item.controller.js";
import {
  authMiddleware,
  isAdminMiddleware,
  isUser,
} from "../middlewares/auth.js";

const router = Router();

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService);

router.post("/", authMiddleware, (req, res) =>
  itemController.createItem(req, res)
);
router.get("/", (req, res) => itemController.getAllItens(req, res));
router.get("/:id", (req, res) => itemController.getItemById(req, res));
router.delete("/:id", authMiddleware, isUser, (req, res) => {
  itemController.deleteItemById(req, res);
});

router.put("/:id", authMiddleware, isUser, (req, res) => {
  itemController.updateItemById(req, res);
});

export default router;
