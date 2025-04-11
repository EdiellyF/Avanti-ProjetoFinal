import dotenv from "dotenv";

dotenv.config();

export class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createcategory({ name }) {
    if(!name){
      throw new Error("name is required to create a category")
    }

    const newcategory = await this.categoryRepository.create({
      name
    });
    return newcategory;
  }

  async findAllCategories(){
      const listaCategories = await this.categoryRepository.getCategories();
      return listaCategories;
    }

  async findCategoryById(id) {
    if (!id) {
      throw new Error("ID is required to fetch a category");
    }

    const category = await this.categoryRepository.getCategoryById(id);

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  
  async deleteCategoryById(id){
    if (!id) {
      throw new Error("ID is required to delete a category");
    }

    const deletedCategory = await this.categoryRepository.deleteCategoryById(id);
    return deletedCategory; 

  }



}
