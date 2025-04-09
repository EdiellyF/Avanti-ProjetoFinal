export class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async createUser(req, res) {
    try {
      const { name, email, phone, password } = req.body;

      if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await this.userService.getUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = await this.userService.createUser({
        name,
        email,
        phone,
        password,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.user.id;

      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Error get user:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await this.userService.verifyPassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = await this.userService.generateAuthToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error);

      return res.status(500).json({ message: "Internal server error 5" });
    }
  }


  async update(req, res) {
    try{
          const id = req.params.id;
          const { email, password} = req.body;
          
          if (!id || (!email && !password )) {
            return res.status(400).json({ message: "ID and at least one field are required" });
          }


          const existingUser = await this.userService.getUserByEmail(email);

          if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
          }
          
          const updatedUser = await this.userService.updateUser({ id, email, password });

            return res.status(200).json(updatedUser);
    }catch(error){
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Internal server error" }); 
    }
  }
}
