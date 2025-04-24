"use client"

import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Avatar,
  ButtonGroup,
} from "@mui/material"
import {
  LocationOn,
  CalendarToday,
  Person,
  Phone,
  Category,
  Edit,
  Delete,
  ArrowBack,
  SwapHoriz,
} from "@mui/icons-material"
import { getItemById, deleteItem, updateItem } from "../services/itemService"
import { AuthContext } from "../context/AuthContext"
import { formatDate } from "../utils/formatters"
import Layout from "../components/Layout"

const ItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token, user } = useContext(AuthContext)
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true)
        const data = await getItemById(id)

        if (!data) {
          throw new Error("Item não encontrado")
        }

        setItem(data)
      } catch (error) {
        console.error("Error fetching item:", error)
        setError(typeof error === "string" ? error : "Erro ao carregar detalhes do item. Por favor, tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchItem()
    }
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este item?")) {
      return
    }

    try {
      setDeleteLoading(true)
      setDeleteError("")

      await deleteItem(id, localStorage.getItem("token"))

      navigate("/")
    } catch (error) {
      console.error("Error deleting item:", error)
      setDeleteError("Erro ao excluir item. Por favor, tente novamente.")
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleStatusChange = async () => {
    try {
      setStatusUpdateLoading(true)
      const newStatus = item.status === "PERDIDO" ? "ENCONTRADO" : "PERDIDO"

      const response = await updateItem(id, { status: newStatus })

      // Atualizar o item na interface
      setItem((prev) => ({
        ...prev,
        status: newStatus,
      }))
    } catch (error) {
      console.error("Error updating item status:", error)
      setError("Erro ao atualizar status do item. Por favor, tente novamente.")
    } finally {
      setStatusUpdateLoading(false)
    }
  }

  const isOwner = user && item && (user.id === item.usuarioId || user.role === "ADMIN")

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button component={RouterLink} to="/" startIcon={<ArrowBack />} variant="outlined">
          Voltar para a página inicial
        </Button>
      </Layout>
    )
  }

  if (!item) {
    return (
      <Layout>
        <Alert severity="warning" sx={{ mb: 4 }}>
          Item não encontrado.
        </Alert>
        <Button component={RouterLink} to="/" startIcon={<ArrowBack />} variant="outlined">
          Voltar para a página inicial
        </Button>
      </Layout>
    )
  }

  const statusColor = item.status === "PERDIDO" ? "error" : "success"
  const statusLabel = item.status === "PERDIDO" ? "Perdido" : "Encontrado"

  return (
    <Layout>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Button component={RouterLink} to="/" startIcon={<ArrowBack />} sx={{ mb: 3 }}>
          Voltar
        </Button>

        {deleteError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {deleteError}
          </Alert>
        )}

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 400,
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "background.default",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: { xs: 2, md: 0 },
                }}
              >
                {item.foto ? (
                  <img
                    src={item.foto || "/placeholder.svg"}
                    alt={item.nome}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "grey.100",
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Sem imagem disponível
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  {item.nome}
                </Typography>
                <Chip label={statusLabel} color={statusColor} size="medium" sx={{ fontWeight: "bold" }} />
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="body1" paragraph>
                {item.descricao}
              </Typography>

              <Box sx={{ my: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LocationOn color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        <strong>Local:</strong> {item.localizacao}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <CalendarToday color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        <strong>Data:</strong> {formatDate(item.data)}
                      </Typography>
                    </Box>
                  </Grid>

                  {item.categoria && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Category color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1">
                          <strong>Categoria:</strong> {item.categoria.name}
                        </Typography>
                      </Box>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Phone color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        <strong>Contato:</strong> {item.contato}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {isOwner && (
                <Box sx={{ mt: 4 }}>
                  <ButtonGroup variant="contained" sx={{ mb: 2, width: "100%" }}>
                    <Button
                      color={item.status === "PERDIDO" ? "success" : "error"}
                      startIcon={<SwapHoriz />}
                      onClick={handleStatusChange}
                      disabled={statusUpdateLoading}
                      sx={{ flex: 1 }}
                    >
                      {statusUpdateLoading
                        ? "Atualizando..."
                        : item.status === "PERDIDO"
                          ? "Marcar como Encontrado"
                          : "Marcar como Perdido"}
                    </Button>
                  </ButtonGroup>

                  <ButtonGroup variant="outlined" sx={{ width: "100%" }}>
                    <Button
                      color="primary"
                      startIcon={<Edit />}
                      component={RouterLink}
                      to={`/item/editar/${item.id}`}
                      sx={{ flex: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      color="error"
                      startIcon={<Delete />}
                      onClick={handleDelete}
                      disabled={deleteLoading}
                      sx={{ flex: 1 }}
                    >
                      {deleteLoading ? "Excluindo..." : "Excluir"}
                    </Button>
                  </ButtonGroup>
                </Box>
              )}
            </Grid>
          </Grid>

          {item.user && (
            <>
              <Divider sx={{ my: 4 }} />

              <Card variant="outlined" sx={{ bgcolor: "background.default" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Publicado por: {item.user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.user.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.user.phone}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </>
          )}
        </Paper>
      </Box>
    </Layout>
  )
}

export default ItemDetail
