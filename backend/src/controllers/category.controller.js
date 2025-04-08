export class CategoryController {
    constructor(categoryService) {
      this.categoryService = categoryService;
    }
    async createcategory(req, res) {  
        
    

      try {
        const name  = req.body; 
  
        if (!name) {
          return res.status(400).json({ message: "All fields are required" });
        }
  
  
        const newcategory = await this.categoryService.createcategory(name);
  
        return res.status(201).json(newcategory);
      } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  
    async getcategoryById(req, res) {
      try {
        const categoryId = req.category.id;
  
        const category = await this.categoryService.getcategoryById(categoryId);
  
        if (!category) {
          return res.status(404).json({ message: "category not found" });
        }
  
        return res.status(200).json(category);
      } catch (error) {
        console.error("Error get category:", error);
  
        return res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  
 

  }
  