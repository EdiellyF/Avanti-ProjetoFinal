import React, { useState } from "react";
import ToolBarFindy from "../components/ToolBarFindy";
import FooterFindy from "../components/FooterFindy";
import "./../styles/AdmPages.css";
import {
  AppBar,
  Toolbar,
  TextField,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function AdmPages() {
  const [searchTerm, setSearchTerm] = useState("");

  const items = [
    {
      id: 1,
      user: "Carlos",
      objectName: "Chave do laboratório",
      date: "12/04/2025",
      location: "Biblioteca",
      status: "Confirmar Recebimento",
      statusColor: "warning",
    },
    {
      id: 2,
      user: "Marina",
      objectName: "Celular Samsung",
      date: "10/04/2025",
      location: "Auditório",
      status: "Retirado",
      statusColor: "info",
    },
    {
      id: 3,
      user: "João",
      objectName: "Carteira Preta",
      date: "08/04/2025",
      location: "Cantina",
      status: "Entregue",
      statusColor: "success",
    },
  ];

  const filteredItems = items.filter((item) =>
    `${item.user} ${item.objectName} ${item.date} ${item.location} ${item.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AppBar position="fixed" className="appbar">
        <Toolbar disableGutters>
          <ToolBarFindy />
        </Toolbar>
      </AppBar>

      <Container className="adm-page" maxWidth="md">
        <Box className="adm-search-bar">
          <TextField
            fullWidth
            placeholder="Buscar por usuário, objeto, local, data..."
            variant="outlined"
            size="medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Grid className="adm-item-list">
          {filteredItems.map((item) => (
            <Grid item key={item.id}>
              <Card className="adm-item-card">
                <Box className="adm-item-content">
                  <Box className="adm-item-image" />

                  <CardContent className="adm-item-info">
                    <Typography variant="subtitle2" color="text.secondary">
                      Enviado por <strong>{item.user}</strong>
                    </Typography>
                    <Typography variant="body1">{item.objectName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Data: {item.date} — Local: {item.location}
                    </Typography>
                  </CardContent>

                  <Box className="adm-item-button-container">
                    <Button
                      variant="contained"
                      color={item.statusColor}
                      className="adm-item-button"
                    >
                      {item.status}
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}

          {filteredItems.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" color="text.secondary">
                Nenhum item encontrado para a busca: <strong>{searchTerm}</strong>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>

      <Box>
        <FooterFindy />
      </Box>
    </>
  );
}

export default AdmPages;
