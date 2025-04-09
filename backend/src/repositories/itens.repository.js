
import { prismaClient } from "../database/prismaClient.js";

export class ItensRepository {
  async create(data) {
    return await prismaClient.item.create({ data });
  }

}
