import React, { useEffect, useState } from "react";
import ToolBarFindy from "../components/ToolBarFindy";
import FooterFindy from "../components/FooterFindy";
import "./../styles/RegisterItem.css";
import { Box, MenuItem, TextField } from "@mui/material";
import { getCategories } from "../services/categoryService";

export function RegisterItem() {
  const [preview, setPreview] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [categoria, setCategoria] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = React.useState({
  nome: "",
    descricao: "",
    data: "",
    localizacao: "",
    contato: "",
   });


  useEffect(() => {
      const buscarCategorias = async () => {
        try{
          const response = await getCategories();
          setCategoria(response);
        } catch(error){
          console.log("error")
        }
        
      };
      buscarCategorias();
  }, []);



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
            <div className="form-group" sx={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
              <label>Categoria</label>
            <select
                name="categoria"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value.toString())}
              >
                            {categoria
            
                            .map((c) => (
            
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                            ))}
              </select>


              
            </div>

            <div className="form-group">
              <label>STATUS:</label>
              <select>
                <option value="">Selecione</option>
                <option value="perdido">PERDIDO</option>
                <option value="encontrado">ENCONTRADO</option>
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

            {/* <div className="form-group">
              <label>Período:</label>
              <select>
                <option value="">Selecione</option>
                <option value="manha">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </select>
            </div> */}



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