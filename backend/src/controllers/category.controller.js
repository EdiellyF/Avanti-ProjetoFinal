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
  
    async findCategoryById(req, res) {
      try {
        const id = req.params.id;
        const category = await this.categoryService.findCategoryById(id);
  
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
  
    async getAllCategory(req, res){
        try{
            const categories = await this.categoryService.findAllCategories();
            return res.status(200).json(categories);
        
        }catch(error){
            return res.status(500).json({
                message: "Internal server error",
              });
        }
    }


    async deleteCategory(req, res) {
      try {
        const id = req.params.id;
        const category = await this.categoryService.deleteCategoryById(id);

        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ message: "Category deleted successfully" });
      } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
    }
 

  }
