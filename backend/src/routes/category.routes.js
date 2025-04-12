import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { CategoryService } from "../services/category.service.js";
import { CategoryRepository } from "../repositories/categories.repository.js";
import { authMiddleware } from "../middlewares/auth.js";
import { isAdminMiddleware } from "../middlewares/auth.js";

const router = Router();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

router.post("/", authMiddleware, isAdminMiddleware, (req, res) =>
  categoryController.createcategory(req, res)
);
router.delete("/:id", authMiddleware, isAdminMiddleware, (req, res) =>
  categoryController.deleteCategory(req, res)
);
router.get("/", (req, res) => categoryController.getAllCategory(req, res));
router.get("/:id", (req, res) => categoryController.findCategoryById(req, res));
router.put("/:id", authMiddleware, isAdminMiddleware, (req, res) =>
  categoryController.updateCategory(req, res)
);

export default router;
