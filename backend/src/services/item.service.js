import { ForbiddenError, ValidationError } from "../utils/customErrors.js";


export class ItemService{

    constructor(itemRepository){
        this.itemRepository = itemRepository;
    }

    async createItem(itemData, usuarioId) {
        if (!this.#validateRequiredFields(itemData)) {
            throw new ValidationError('Missing required fields');
        }

        itemData.status = itemData.status.toUpperCase();
        if (!this.#validateStatus(itemData.status)) {
            throw new ValidationError(`Status inválido: ${itemData.status}. Valores permitidos: PERDIDO, ENCONTRADO`);
        }

        const data = {
            ...itemData,
            usuarioId
        };

        try {
            return await this.itemRepository.createItem(data);
        } catch (error) {
            console.error("Erro ao criar item:", error);
            throw new Error("Erro ao criar item no banco de dados");
        }
    }


    async deleteItemById({ id, userId }) {
        if (!id) {
            throw new ValidationError("Missing required fields");
        }
    
        const item = await this.itemRepository.findByIdItem(id);
    
        if (!item) {
            throw new NotFoundError("Item not found");
        }
    
        if (item.usuarioId !== userId) {
            throw new ForbiddenError("Você só pode deletar itens relacionados a você");
        }
    
        try {
            return await this.itemRepository.deleteItemById(id);
        } catch (error) {
            console.error("Error deleting item:", error);
            throw new Error("Erro ao deletar item");
        }
    }


    async getAllItens(){
            const lista = await this.itemRepository.findAllItens();
            return lista;
    }




    #validateRequiredFields(data) {
        const requiredFields = ['nome', 'descricao', 'localizacao', 'contato', 'categoriaId'];
        return requiredFields.every(field => !!data[field]);
    }

    #validateStatus(status){
        const validStatuses = ["PERDIDO", "ENCONTRADO"];
        return validStatuses.includes(status?.toUpperCase());
    }
}