
export class itemService{

    constructor(itensRepository){
        this.itensRepository = itensRepository;
    }

    async createItem(itemData, usuarioId){
        if (!this.#validateRequiredFields(itemData)) {
            throw new Error('Missing required fields');
        }

        const data = {
            ...itemData,
            usuarioId
        };
 
        this.itensRepository.createItem(data);
       
    }

    #validateRequiredFields(data) {
        const requiredFields = ['nome', 'descricao', 'localizacao', 'contato', 'categoriaId'];
        return requiredFields.every(field => !!data[field]);
    }
}