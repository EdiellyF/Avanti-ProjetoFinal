import { sendErrorResponse } from "../middlewares/sendErrorResponse.js";
import { NotFoundError } from "../utils/customErrors.js";
import { isValidUUID } from "../utils/isValidUUID.js";

export class ItemController {
  constructor(itemService) {
    this.itemService = itemService;
  }

  async createItem(req, res) {
    try {
      const itemData = this.#extractItemData(req);
      const usuarioId = req.user.id;
      const novoItem = await this.itemService.createItem(itemData, usuarioId);
      return res.status(201).json(novoItem);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      return sendErrorResponse(res, statusCode, error.message);
    }
  }

  async deleteItemById(req, res) {
    try {
      const { id: itemId } = req.params;
      const userId = req.user.id;

      const isDeleteItem = await this.itemService.deleteItemById({
        id: itemId,
        userId,
        req,
      });

      if (isDeleteItem) {
        return res.status(204).end();
      }

      throw new NotFoundError("Item não encontrado ou acesso negado");
    } catch (error) {
      const statusCode = error.statusCode || 500;
      return sendErrorResponse(res, statusCode, error.message);
    }
  }

  async getAllItens(req, res) {
    try {
      const { page: pageQuery = 1, limit: limitQuery = 10 } = req.query;

      const page = parseInt(pageQuery, 10);
      const limit = parseInt(limitQuery, 10);

      if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        return res
          .status(400)
          .json({ message: "Page and limit must be positive numbers" });
      }

      const paginationOptions = { page, limit };

      const itens = await this.itemService.getAllItens(paginationOptions);

      return res.status(200).json(itens);
    } catch (error) {
      console.error("Error fetching items:", error);
      return res.status(500).json({ message: "Erro ao buscar itens" });
    }
  }

  async updateItemById(req, res) {
    try {
      const { id: itemId } = req.params;
      const userId = req.user.id;
      const updateData = req.body;

      const updatedItem = await this.itemService.updateItemById({
        id: itemId,
        userId,
        updateData,
        role: req.user.role,
      });

      return res
        .status(200)
        .json({ message: "Item atualizado com sucesso", item: updatedItem });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      return sendErrorResponse(res, statusCode, error.message);
    }
  }

  async getItemById(req, res) {
    try {
      const { id: itemId } = req.params;

      const id = req.params.id;

      if (!isValidUUID(id)) {
        return res.status(400).json({
          message: "ID não está no formato UUID",
        });
      }

      const item = await this.itemService.getItemById(itemId);

      if (!item) {
        return res.status(404).json({ message: "Item não encontrado" });
      }

      return res.status(200).json(item);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      return sendErrorResponse(res, statusCode, error.message);
    }
  }

  #extractItemData(req) {
    const {
      nome,
      descricao,
      data,
      localizacao,
      contato,
      foto,
      status,
      categoriaId,
    } = req.body;

    if (
      !nome ||
      !descricao ||
      !data ||
      !localizacao ||
      !contato ||
      !status ||
      !categoriaId
    ) {
      throw new ValidationError("Campos obrigatórios estão faltando");
    }

    return {
      nome,
      descricao,
      data,
      localizacao,
      contato,
      foto,
      status,
      categoriaId,
    };
  }
}
