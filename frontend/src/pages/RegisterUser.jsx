import React from "react";
import ToolBarFindy from "../components/ToolBarFindy";
import './../styles/RegisterUser.css';
import { registerUser } from "../api/userService.js";

import {
    Button,
    TextField,
    Typography,
    Link,
    AppBar,
    Toolbar,
    Container,
    Grid,
    Avatar,
} from "@mui/material";



function ImageUpload({ profileImage, onImageUpload }) {
  return (
    <Grid className="img-container-register">
      <Avatar
        src={profileImage}
        alt="Foto de Perfil"
        className="profile-avatar-register"
      />
      <Button
        variant="outlined"
        component="label"
        className="upload-button-register"
      >
        Selecionar foto de perfil
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={onImageUpload}
        />
      </Button>
      <Typography variant="body2" className="upload-description-register">
        A foto precisa ser em um local iluminado e o rosto bem visível.
      </Typography>
    </Grid>
  );
}

export function RegisterUser() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = React.useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const userData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
    try{
      await registerUser(userData);

     alert("Usuário registrado com sucesso!");
    }catch(error){
      alert("erro")
    }
    

   
    
  };

  return (
    <>
      <AppBar position="fixed" className="appbar">
        <Toolbar disableGutters>
          <ToolBarFindy />
        </Toolbar>
      </AppBar>
      <Container className="register-page" maxWidth="lg">
        <Grid container spacing={3} className="register-container">
          {/* Componente de Upload de Imagem */}
          <Grid className="img-container-register">
            <ImageUpload
              profileImage={profileImage}
              onImageUpload={handleImageUpload}
            />
          </Grid>

          {/* Coluna do Formulário */}
          <Grid className="form-container-register">
            <form onSubmit={handleSubmit} className="form-fields-register">
              <TextField
                fullWidth
                name="name"
                label="Nome Completo"
                variant="outlined"
                margin="normal"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                name="email"
                label="E-mail"
                variant="outlined"
                margin="normal"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <TextField
               name="phone"
                label="phone"
                variant="outlined"
                margin="normal"
                value={formData.phone}
                onChange={handleInputChange}
              ></TextField>

              <TextField
                fullWidth
                name="password"
                label="Senha"
                type="password"
                variant="outlined"
                margin="normal"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirmar Senha"
                type="password"
                variant="outlined"
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="submit-button-register"
              >
                Registrar
              </Button>
              <Typography variant="body2" className="login-text">
                Já tem uma conta?{" "}
                <Link href="/login" className="login-link-register">
                  Faça login
                </Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default RegisterUser;