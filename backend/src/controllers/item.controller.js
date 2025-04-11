import { sendErrorResponse } from "../middlewares/sendErrorResponse.js";
import { NotFoundError } from "../utils/customErrors.js";


export class ItemController {
    constructor(itemService) {
        this.itemService = itemService; 
    }

    async createItem(req, res) {
        try {
            const itemData = this.#extractItemData(req);
            const usuarioId = req.user.id;
            const novoItem = await this.itemService.createItem(itemData, usuarioId );
            return res.status(201).json(novoItem);
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return  sendErrorResponse(res, statusCode,  error.message);
        }
    }


    async deleteItemById(req, res) {
        try {
            const { id: itemId } = req.params; 
            const userId = req.user.id; 

            const isDeleteItem = await this.itemService.deleteItemById({ id: itemId, userId });

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
            const itens = await this.itemService.getAllItens();
            return res.status(200).json(itens);
        } catch (error) {
            console.error("Error fetching items:", error);
            return res.status(500).json({ message: "Erro ao buscar itens" });
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
            categoriaId
        } = req.body;

        return {
            nome,
            descricao,
            data,
            localizacao,
            contato,
            foto,
            status,
            categoriaId
        };
    }

   

   
}
