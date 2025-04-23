import React, { useEffect, useState } from "react";
import ToolBarFindy from "../components/ToolBarFindy";
import FooterFindy from "../components/FooterFindy";
import "./../styles/RegisterItem.css";
import { Grid } from "@mui/material";
import { getCategories } from "../services/categoryService";
import { createItem } from "../services/itemService";


export function RegisterItem() {
  const [preview, setPreview] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [categoria, setCategoria] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

 const [successMessage, setSuccessMessage] = React.useState(false);
const [errorMessage, setErrorMessage] = React.useState("");

  const [formData, setFormData] = useState({
    categoriaId: '',        
    status: '',         
    data: '',             
    localizacao: '',  
    contato: 'oii',   
    descricao: '',       
    foto: ''          
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

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value, // Atualiza o valor da categoriaId
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData.foto)
    
    const itemData = {
      categoriaId: '9ed491a3-c88c-4f48-9532-fe542006a8a2',  
      status: formData.status,
      data:  "2025-04-10T10:00:00Z",
      localizacao: formData.localizacao,
      descricao: formData.descricao,
      contato: '1111111',  // Pode ser dinâmico ou fixo, conforme necessário
      nome: "framboesa",  
    };
    try {
      await createItem(itemData, localStorage.getItem("token"));
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      setErrorMessage(`Erro: ${error.message}`);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prevData) => ({ ...prevData, foto: file }));
    }
  };

  return (
    <div className="register-page">
      <ToolBarFindy />

      <div className="register-content">
        <h2>Cadastrar Item </h2>

        <Grid></Grid>

        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group" sx={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
              <label>Categoria</label>
            <select
                name="categoria"
                value={formData.categoriaId}
                onChange={handleInputChange}
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
              <select value={formData.status} onChange={handleInputChange} name="status">
                <option value="">Selecione</option>
                <option value="perdido" >PERDIDO</option>
                <option value="encontrado">ENCONTRADO</option>
              </select>
            </div>

            <div className="form-group">
              <label>Data:</label>
              <input
                type="date"
                name="data" 
                value={formData.data ? formData.data.split("T")[0] : ""}
                onChange={handleInputChange}
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
              <input type="text" placeholder="Ex: Bloco A, Sala 101"   value={formData.localizacao}onChange={handleInputChange} name="localizacao"
               />
            </div>

            <div className="form-group">
              <label>Descrição:</label>
              <textarea placeholder="Insira aqui a descrição do objeto..." value={formData.descricao} onChange={handleInputChange} name="descricao"></textarea>
            </div>

            <div className="form-group-row">
              <label className="file-button">
                Upload da Imagem
                <input type="file" onChange={handleImageChange}   name="foto" hidden  />
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