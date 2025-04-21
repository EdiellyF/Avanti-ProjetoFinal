import React, { useState } from "react";
import ToolBarFindy from "../components/ToolBarFindy";
import FooterFindy from "../components/FooterFindy";
import "./../styles/RegisterItem.css";

function RegisterItem() {
  const [preview, setPreview] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="register-page">
      <ToolBarFindy />

      <div className="register-content">
        <h2>Cadastrar Item </h2>

        <div className="register-container">
          <form className="register-form">
            <div className="form-group">
              <label>Categoria:</label>
              <select>
                <option value="">Selecione</option>
                <option value="documento">Documento</option>
                <option value="eletronico">Eletrônico</option>
                <option value="roupa">Roupa</option>
              </select>
            </div>

            <div className="form-group">
              <label>Condição:</label>
              <select>
                <option value="">Selecione</option>
                <option value="novo">Novo</option>
                <option value="usado">Usado</option>
              </select>
            </div>

            <div className="form-group">
              <label>Data:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Período:</label>
              <select>
                <option value="">Selecione</option>
                <option value="manha">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </select>
            </div>

            <div className="form-group">
              <label>Local onde foi encontrado ou perdido:</label>
              <input type="text" placeholder="Ex: Bloco A, Sala 101" />
            </div>

            <div className="form-group">
              <label>Descrição:</label>
              <textarea placeholder="Insira aqui a descrição do objeto..."></textarea>
            </div>

            <div className="form-group-row">
              <label className="file-button">
                Upload da Imagem
                <input type="file" onChange={handleImageChange} hidden />
              </label>

              <button
                type="button"
                className="remove-button"
                onClick={() => setPreview(null)}
              >
                Remover Imagem
              </button>
            </div>

            <div className="image-preview">
              {preview ? (
                <img src={preview} alt="Pré-visualização" />
              ) : (
                <span>Nenhuma imagem selecionada</span>
              )}
            </div>

            <button type="submit" className="submit-button">
              Cadastrar item
            </button>
          </form>
        </div>
      </div>

      <FooterFindy />
    </div>
  );
}

export default RegisterItem;