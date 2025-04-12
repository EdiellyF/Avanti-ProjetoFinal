import { prismaClient } from "../database/prismaClient.js";

export class CategoryRepository {
  async create(data) {
    return await prismaClient.category.create({ data });
  }

  async getCategories() {
    const categories = await prismaClient.category.findMany({
      select: {
        name: true,
      },
    });
    return categories;
  }

  async getCategoryById(id) {
    const categorie = await prismaClient.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
    return categorie;
  }

  async deleteCategoryById(id) {
    const category = await this.getCategoryById(id);
    if (category) {
      return await prismaClient.category.delete({
        where: { id },
      });
    }
    return null;
  }

  updateCategoryById(id, name) {
    return prismaClient.category.update({
      where: { id },
      data: { name },
    });
  }
}
