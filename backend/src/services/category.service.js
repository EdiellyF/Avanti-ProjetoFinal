
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
  }




}
