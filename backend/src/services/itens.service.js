import { ValidationError } from "../utils/customErrors.js";


export class itemService{

    constructor(itensRepository){
        this.itensRepository = itensRepository;
    }

    async createItem(itemData, usuarioId){
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
 
        try{
           return await this.itensRepository.createItem(data); 
        } catch(error){
            throw new Error("Erro ao criar item no serviço")
        }
    }

    #validateRequiredFields(data) {
        const requiredFields = ['nome', 'descricao', 'localizacao', 'contato', 'categoriaId', 'status'];
        console.log(requiredFields);
        return requiredFields.every(field => !!data[field]);
    }

    #validateStatus(status){
        const validStatuses = ["PERDIDO", "ENCONTRADO"];
        return validStatuses.includes(status?.toUpperCase());
    }
}