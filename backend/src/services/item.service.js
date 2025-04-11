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


    async deleteItemById({ id, userId, role}) {
        if (!id) {
            throw new ValidationError("Missing required fields");
        }
    
        const item = await this.itemRepository.findByIdItem(id);
    
        if (!item) {
            throw new NotFoundError("Item not found");
        }
    
        if (item.usuarioId !== userId || role !== "ADMIN") {
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


    async updateItemById({ id, userId, role, updateData }) {
        if (!id) {
            throw new ValidationError("Missing required fields");
        }

        const item = await this.itemRepository.findByIdItem(id);

        if (!item) {
            throw new NotFoundError("Item not found");
        }

        if (item.usuarioId !== userId && role !== "ADMIN") {
            throw new ForbiddenError("Você só pode editar itens relacionados a você");
        }

     
        const allowedFields = ["nome", "descricao", "data", "localizacao", "contato", "status"];
        const filteredData = {};

        for (const [key, value] of Object.entries(updateData)) {
            if (allowedFields.includes(key) && value !== undefined) {
            if (key === 'status') {
                const upperStatus = value.toUpperCase();
                if (!this.#validateStatus(upperStatus)) {
                throw new ValidationError(`Status inválido: ${value}. Valores permitidos: PERDIDO, ENCONTRADO`);
                }
                filteredData[key] = upperStatus;
            } else {
                filteredData[key] = value;
            }
            }
        }

        updateData = filteredData;

       
       

        if (Object.keys(updateData).length === 0) {
            throw new ValidationError("Nenhum campo válido para atualização foi fornecido");
        }

        try {
            return await this.itemRepository.updateItemById(id, updateData);
        } catch (error) {
            console.error("Erro ao atualizar item:", error);
            throw new Error("Erro ao atualizar item no banco de dados");
        }
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