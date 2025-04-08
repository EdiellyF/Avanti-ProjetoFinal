import { prismaClient } from "../database/prismaClient.js";

export class CategoryRepository {
  async create(data) {
    return await prismaClient.category.create({ data });
  }

async getCategories() {
    const categories = await prismaClient.category.findMany({
        select: {
            name: true
        }
    });
    return categories;
}

  
}
