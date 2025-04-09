

export class Itens {
    #descricao;
    #foto;
    #status;
    #categoria;
    #user;

    constructor(descricao, foto, status, categoria, user) {
        this.#descricao = descricao;
        this.#foto = foto;
        this.#status = status;
        this.#categoria = categoria;
        this.#user = user;
    }

    get descricao() {
        return this.#descricao;
    }

    get foto() {
        return this.#foto;
    }

    get status() {
        return this.#status;
    }

    get categoria() {
        return this.#categoria;
    }

    get user() {
        return this.#user;
    }


    set descricao(descricao) {
        this.#descricao = descricao;
    }

    set foto(foto) {
        this.#foto = foto;
    }

    set status(status) {
        if (status !== 'ativo' && status !== 'inativo') {
            throw new Error("Status inválido. Use 'ativo' ou 'inativo'.");
        }
        this.#status = status;
    }

    set categoria(categoria) {
        this.#categoria = categoria;
    }

    set user(user) {
        this.#user = user;
    }
}