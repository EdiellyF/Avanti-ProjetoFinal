import React, { useState } from "react";
import ToolBarFindy from "../components/ToolBarFindy";
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
} from "@mui/material";
import "../Styles/SignPage.css";


export function SignPage(){

    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("não confere");
            return;
        }
        console.log("Nome:", name);
        console.log("E-mail:", email);
        console.log("Senha:", password);
    };

    return (
        <>
        <AppBar position="fixed" sx={{ backgroundColor: "#1c1c1c" }}>
            <Toolbar disableGutters>
            <ToolBarFindy />
            </Toolbar>
        </AppBar>

        <Container className="sign-page" maxWidth="sm">
            <Paper
            elevation={4}
            className="sign-container"
            component="form"
            onSubmit={handleSubmit}
            >
            <Typography variant="h5" align="center" gutterBottom>
                Cadastro
            </Typography>
            <TextField
                fullWidth
                label="Nome"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
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
            <TextField
                fullWidth
                label="Confirmar Senha"
                type="password"
                variant="outlined"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
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
                CADASTRAR
            </Button>
            <Typography align="center" marginTop={3}>
                Já tem uma conta?{" "}
                <Link href="/login" underline="hover">
                Faça login.
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