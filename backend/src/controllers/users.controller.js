import { NotFoundError } from "../utils/customErrors.js"
import { sendErrorResponse } from "../middlewares/sendErrorResponse.js"
import { isValidUUID } from "../utils/isValidUUID.js"

export class UserController {
  constructor(userService) {
    this.userService = userService
  }
  async createUser(req, res) {
    try {
      const { name, email, phone, password } = req.body

      if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" })
      }

      const existingUser = await this.userService.getUserByEmail(email)

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" })
      }

      const newUser = await this.userService.createUser({
        name,
        email,
        phone,
        password,
      })

      return res.status(201).json(newUser)
    } catch (error) {
      console.error("Error creating user:", error)
      return res.status(500).json({
        message: "Internal server error",
      })
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params
      console.log(`Buscando usuário com ID: ${id}`)

      const user = await this.userService.getUserById(id)

      if (!user) {
        console.log(`Usuário com ID ${id} não encontrado`)
        throw new NotFoundError("User not found")
      }

      console.log(`Usuário encontrado: ${user.id}, Retornando dados`)
      return res.status(200).json(user)
    } catch (error) {
      console.error("Erro ao buscar usuário:", error)
      const statusCode = error.statusCode || 500
      return sendErrorResponse(res, statusCode, error.message)
    }
  }

  async login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    try {
      const user = await this.userService.getUserByEmail(email)

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
      }

      const isPasswordValid = await this.userService.verifyPassword(password, user.password)

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" })
      }

      const token = await this.userService.generateAuthToken(user)

      return res.status(200).json({ token })
    } catch (error) {
      console.error("Error logging in:", error)

      return res.status(500).json({ message: "Internal server error 5" })
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      const { email, password } = req.body

      if (!id || (!email && !password)) {
        return res.status(400).json({ message: "ID and at least one field are required" })
      }

      const existingUser = await this.userService.getUserByEmail(email)

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" })
      }

      const updatedUser = await this.userService.updateUser({
        id,
        email,
        password,
      })

      return res.status(200).json(updatedUser)
    } catch (error) {
      console.error("Error updating user:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      if (!isValidUUID(id)) {
        return res.status(400).json({
          message: "ID não está no formato UUID",
        })
      }

      if (!id) {
        return res.status(400).json({ message: "ID is required" })
      }

      const user = await this.userService.getUserById(id)

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      await this.userService.deleteUser(id)

      return res.status(204).send()
    } catch (error) {
      console.error("Error deleting user:", error)
      const statusCode = error.statusCode || 500
      return sendErrorResponse(res, statusCode, error.message)
    }
  }
}
