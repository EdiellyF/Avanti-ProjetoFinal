"use client"

import { useEffect, useState } from "react"
import { Typography, Box, Grid, Container, CircularProgress, Alert, Pagination, Paper } from "@mui/material"
import Layout from "../components/Layout"
import SearchBar from "../components/SearchBar"
import ItemCard from "../components/ItemCard"
import { getItems } from "../services/itemService"
import { getCategories } from "../services/categoryService"

const SearchPage = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({ category: "", status: "" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalCount: 0,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [itemsResponse, categoriesResponse] = await Promise.all([
          getItems({ page: pagination.page, limit: 9 }),
          getCategories(),
        ])

        const itemsData = Array.isArray(itemsResponse) ? itemsResponse : itemsResponse.itens || []

        setItems(itemsData)
        setFiltered(itemsData)
        setCategories(categoriesResponse || [])

        if (itemsResponse.totalPages) {
          setPagination({
            page: itemsResponse.page || 1,
            totalPages: itemsResponse.totalPages || 1,
            totalCount: itemsResponse.totalCount || 0,
          })
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Erro ao carregar dados. Por favor, tente novamente.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [pagination.page])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, filters, items])

  const applyFilters = () => {
    let result = [...items]

    // Apply search term filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter((item) =>
        [item.nome, item.descricao, item.localizacao]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(term)),
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

  const handlePageChange = (event, value) => {
    setPagination((prev) => ({ ...prev, page: value }))
  }

  return (
    <Layout>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
          Buscar Itens
        </Typography>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          categories={categories}
          onFilterChange={handleFilterChange}
        />

        <Paper
          elevation={0}
          sx={{
            bgcolor: "background.default",
            py: 4,
            borderRadius: 3,
          }}
        >
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
            <>
              <Grid container spacing={3}>
                {filtered.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <ItemCard item={item} />
                  </Grid>
                ))}
              </Grid>

              {pagination.totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={pagination.totalPages}
                    page={pagination.page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Layout>
  )
}

export default SearchPage
