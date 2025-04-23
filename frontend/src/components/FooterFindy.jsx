"use client"

import { Box, Container, Typography, Link, Grid, Divider, useTheme } from "@mui/material"
import { Email, Phone, LocationOn } from "@mui/icons-material"
import LogoFindy from "../public/logoFindy.png"

function FooterFindy() {
  const theme = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img src={LogoFindy} alt="Logo Findy" style={{ width: 100, height: 50, marginRight: 10 }} />
              <Typography variant="h6" fontWeight="bold">
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Plataforma para ajudar pessoas a encontrarem seus pertences perdidos ou reportarem itens encontrados.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Links Úteis
            </Typography>
            <Link href="/" color="inherit" sx={{ display: "block", mb: 1 }}>
              Página Inicial
            </Link>
            <Link href="/item/novo" color="inherit" sx={{ display: "block", mb: 1 }}>
              Cadastrar Item
            </Link>
            <Link href="/buscar" color="inherit" sx={{ display: "block", mb: 1 }}>
              Buscar Itens
            </Link>
            <Link href="/sobre" color="inherit" sx={{ display: "block", mb: 1 }}>
              Sobre Nós
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contato
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Email fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">contato@achadoseperdidos.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Phone fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">(00) 1234-5678</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOn fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Av. Principal, 1000 - Centro</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: theme.palette.primary.light }} />

        <Typography variant="body2" align="center">
          © {currentYear} Findy. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  )
}

export default FooterFindy
