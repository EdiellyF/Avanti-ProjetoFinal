import { useEffect, useState } from "react"
import { Typography, Box, Grid, Container, CircularProgress, Alert, Button, Paper, Divider } from "@mui/material"
import { Add, Search } from "@mui/icons-material"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import SearchBar from "../components/SearchBar"
import ItemCard from "../components/ItemCard"
import { getItems } from "../services/itemService"
import { getCategories } from "../services/categoryService"

const HomePage = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({ category: "", status: "" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, filters, items])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [itemsResponse, categoriesResponse] = await Promise.all([getItems(), getCategories()])

      let itemsData = []
      if (itemsResponse) {
        if (itemsResponse.itens && Array.isArray(itemsResponse.itens)) {
          itemsData = itemsResponse.itens
        } else if (Array.isArray(itemsResponse)) {
          itemsData = itemsResponse
        }
      }

      setItems(itemsData)
      setFiltered(itemsData)
      setCategories(categoriesResponse || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(typeof error === "string" ? error : "Erro ao carregar dados. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let result = [...items]

    // Apply search term filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter((item) =>
        [item.nome, item.descricao, item.localizacao]
          .filter(Boolean)
          .some((field) => field && field.toLowerCase().includes(term)),
      )
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((item) => item.categoriaId === filters.category)
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter((item) => item.status === filters.status)
    }

    setFiltered(result)
  }

  const handleSearch = () => {
    applyFilters()
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <Layout>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            mb: 2,
          }}
        >
          Findy
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Encontre seus pertences perdidos ou ajude alguém a encontrar o que perdeu
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
          <Button variant="contained" color="primary" component={Link} to="/item/novo" startIcon={<Add />} size="large">
            Cadastrar Item
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/buscar" startIcon={<Search />} size="large">
            Buscar Itens
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "background.default",
          py: 4,
          borderRadius: 3,
        }}
      >
        <Container 
        sx={{
          maxWidth: "lg", // Define um limite máximo para a largura
          width: "100%", // Garante que o contêiner ocupe toda a largura disponível
        }}
        >
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
            Itens Recentes
          </Typography>

          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
            categories={categories}
            onFilterChange={handleFilterChange}
          />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          ) : filtered.length === 0 ? (
            <Alert severity="info" sx={{ mb: 4 }}>
              Nenhum item encontrado com os filtros selecionados.
            </Alert>
          ) : (
            <Grid container
                  spacing={3}
                
                  >
              {filtered.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <ItemCard item={item} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Paper>

      <Box sx={{ mt: 6, mb: 4, textAlign: "center" }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
          Como Funciona
        </Typography>
        <Divider sx={{ mb: 4, width: "80px", mx: "auto", borderWidth: 2, borderColor: "primary.main" }} />

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 3,
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
                1. Cadastre o Item
              </Typography>
              <Typography variant="body1">
                Perdeu algo ou encontrou um objeto? Cadastre com detalhes como local, data e uma foto.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 3,
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
                2. Busque na Plataforma
              </Typography>
              <Typography variant="body1">
                Utilize nossa ferramenta de busca para encontrar itens por categoria, local ou descrição.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 3,
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
                3. Entre em Contato
              </Typography>
              <Typography variant="body1">
                Encontrou seu item ou o dono do objeto? Entre em contato diretamente pelo telefone cadastrado.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default HomePage
