import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser({ name, email, phone, password }) {
    const hashedPassword = await bcrypt.hash(password, 6);

    const newUser = await this.userRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const token = await this.generateAuthToken(newUser);

    return {
      user: newUser,
      token,
    };
  }

  async getUserByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }

  async getUserById(id) {
    return await this.userRepository.findById(id);
  }

  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async generateAuthToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  }

  async updateUser({ id, email, password }) {
    if (!id) {
      throw new Error("ID is required to update a user");
    }

    const dataToUpdate = {};

    if (email) {
      dataToUpdate.email = email;
    }

    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 6);
    }

    if (Object.keys(dataToUpdate).length === 0) {
      throw new Error("At least one field (email or password) is required to update");
    }

    return await this.userRepository.updateUser({ id, ...dataToUpdate });
  }
}
