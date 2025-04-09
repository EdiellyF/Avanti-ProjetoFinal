

export class Itens {
     #descricao;
     #foto;
     #status;
     #categoria;

     constructor(descricao, foto, status, categoria) {
          this.#descricao = descricao;
          this.#foto = foto;
          this.#status = status;
          this.#categoria = categoria;
        
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



}