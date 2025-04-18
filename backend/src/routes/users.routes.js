import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";
import { UserService } from "../services/users.service.js";
import { UserRepository } from "../repositories/users.repository.js";
import {
  authMiddleware,
  isAdminMiddleware,
  isUser,
} from "../middlewares/auth.js";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/", (req, res) => userController.createUser(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.get("/:id", authMiddleware, isUser, (req, res) =>
  userController.getUserById(req, res)
);

router.put("/:id", authMiddleware, isUser, (req, res) => {
  userController.update(req, res);
});

router.delete("/:id", authMiddleware, isAdminMiddleware, (req, res) => {
  userController.delete(req, res);
});

export default router;
