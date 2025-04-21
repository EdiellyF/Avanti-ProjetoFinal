import React, { useContext, useState } from "react";
import ToolBarFindy from "../components/ToolBarFindy";
import {AuthContext} from "../context/AuthContext.jsx"
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  AppBar,
  Toolbar,
  Container,
  Paper,
  Alert
} from "@mui/material";
import "./../styles/LoginPages.css";


import { loginUser } from "../services/userService.js";

function LoginPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const { logar} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = {
      email: email,
      password: password
    };

    try{
      const res = await loginUser(data);
    
      logar(res);
    }catch(error){
      setErrorMessage(`Erro: ${error.message}`);
    }
    


    console.log("E-mail:", email);
    console.log("Senha:", password);
  };

  return (
    <>
              {errorMessage && (
                      <Alert severity="error" className="error-alert">
                        {errorMessage}
                      </Alert>
                    )}
        
      <AppBar position="fixed" sx={{ backgroundColor: "#1c1c1c" }}>
        <Toolbar disableGutters>
          <ToolBarFindy />
        </Toolbar>
      </AppBar>

      <Container className="login-page" maxWidth="sm">
        <Paper
          elevation={3}
          className="login-container"
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          
          <TextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link
            href="#"
            underline="hover"
            sx={{ display: "block", textAlign: "right", marginTop: 1 }}
          >
            Esqueceu a senha?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "#2d6a4f",
              "&:hover": { backgroundColor: "#1b4332" },
            }}
          >
            ENTRAR
          </Button>
          <Typography align="center" marginTop={3}>
            Ainda não tem uma conta?{" "}
            <Link href="#" underline="hover">
              Cadastre-se.
            </Link>
          </Typography>
        </Paper>
      </Container>
      <Box>
        <footer className="footer">
          <Typography variant="body2" align="center" color="textSecondary">
            © {new Date().getFullYear()} Findy. Todos os direitos reservados.
          </Typography>
        </footer>
      </Box>
  

    </>
  );
}

export default LoginPages;
