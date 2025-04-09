
import { prismaClient } from "../database/prismaClient.js";

export class ItemRepository {
  async createItem(data) {
    return await prismaClient.item.create({ data });
  }

}
