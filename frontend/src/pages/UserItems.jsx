"use client"

import { useEffect, useState, useContext } from "react"
import { Typography, Box, Grid, Container, CircularProgress, Alert, Button, Paper, Tabs, Tab } from "@mui/material"
import { Add } from "@mui/icons-material"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import ItemCard from "../components/ItemCard"
import { getItems } from "../services/itemService"
import { AuthContext } from "../context/AuthContext"

const UserItems = () => {
  const { token, user } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [tabValue, setTabValue] = useState("all")

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        

        const response = await getItems()

        let itemsData = []
        if (response) {
          if (response.itens && Array.isArray(response.itens)) {
            itemsData = response.itens
          } else if (Array.isArray(response)) {
            itemsData = response
          }
        }

        console.log("Total de itens recebidos:", itemsData.length)
        console.log("ID do usuário atual:", user?.id)

        // Filtrar apenas os itens do usuário logado
        // Verificar tanto usuarioId quanto o id do usuário nos dados do item
        if (user && user.id) {
          const userItems = itemsData.filter((item) => {
            const isUserItem = item.usuarioId === user.id || (item.user && item.user.id === user.id)

            if (isUserItem) {
              console.log("Item encontrado para o usuário:", item.id, item.nome)
            }

            return isUserItem
          })

          console.log("Itens filtrados do usuário:", userItems.length)
          setItems(userItems)
          setFilteredItems(userItems)
        } else {
          console.log("Usuário não identificado")
          setItems([])
          setFilteredItems([])
        }
      } catch (error) {
        console.error("Error fetching user items:", error)
        setError(typeof error === "string" ? error : "Erro ao carregar seus itens. Por favor, tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchData()
    }
  }, [token, user])

  useEffect(() => {
    if (tabValue === "all") {
      setFilteredItems(items)
    } else {
      setFilteredItems(items.filter((item) => item.status === tabValue))
    }
  }, [tabValue, items])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  if (!token) {
    return (
      <Layout>
        <Alert severity="warning">Você precisa estar logado para ver seus itens.</Alert>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Meus Itens
          </Typography>

          <Button variant="contained" color="primary" component={Link} to="/item/novo" startIcon={<Add />}>
            Novo Item
          </Button>
        </Box>

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Todos" value="all" />
            <Tab label="Perdidos" value="PERDIDO" />
            <Tab label="Encontrados" value="ENCONTRADO" />
          </Tabs>
        </Paper>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : filteredItems.length === 0 ? (
          <Alert severity="info" sx={{ mb: 4 }}>
            Você ainda não tem itens{" "}
            {tabValue === "PERDIDO" ? "perdidos" : tabValue === "ENCONTRADO" ? "encontrados" : ""} cadastrados.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <ItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  )
}

export default UserItems
