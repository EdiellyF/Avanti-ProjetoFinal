
import dotenv from "dotenv";

dotenv.config();

export class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createcategory({ name }) {
    const newcategory = await this.categoryRepository.create({
      name
    });
    return newcategory;
  }

  async findAllCategories(){
      const listaCategories = await this.categoryRepository.getCategories();
      return listaCategories;
    }

  async findCategoryById({id}){
     const category = await this.categoryRepository.getCategoryById(id);
     return category;
  }



}
