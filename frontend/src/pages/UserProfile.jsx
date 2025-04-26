"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
} from "@mui/material"
import {
  Person,
  Email,
  Phone,
  Edit,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  Lock,
  PhotoCamera,
} from "@mui/icons-material"
import Layout from "../components/Layout"
import { AuthContext } from "../context/AuthContext"
import { getUserById, updateUser } from "../services/userService"
import { getItems } from "../services/itemService"
import ItemCard from "../components/ItemCard"

const UserProfile = () => {
  const navigate = useNavigate()
  const { user, token, logout } = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [userItems, setUserItems] = useState([])
  const [tabValue, setTabValue] = useState(0)
  const [profileImage, setProfileImage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.id) {
        setError("Usuário não autenticado")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        console.log("Buscando dados do usuário com ID:", user.id)

        const data = await getUserById(user.id)
        console.log("Dados do usuário recebidos com sucesso:", data)

        setUserData(data)
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          currentPassword: "",
          newPassword: "",
        })

        // Buscar itens do usuário
        const itemsResponse = await getItems()
        let itemsData = []
        if (itemsResponse) {
          if (itemsResponse.itens && Array.isArray(itemsResponse.itens)) {
            itemsData = itemsResponse.itens
          } else if (Array.isArray(itemsResponse)) {
            itemsData = itemsResponse
          }
        }

        console.log("Total de itens recebidos:", itemsData.length)
        console.log("ID do usuário atual:", user.id)

        // Filtrar apenas os itens do usuário logado
        // Verificar tanto usuarioId quanto o id do usuário nos dados do item
        const userItems = itemsData.filter((item) => {
          const isUserItem = item.usuarioId === user.id || (item.user && item.user.id === user.id)
          if (isUserItem) {
            console.log("Item encontrado para o usuário:", item.id, item.nome)
          }
          return isUserItem
        })

        console.log("Itens do usuário encontrados:", userItems.length)
        setUserItems(userItems)
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error)
        setError(typeof error === "string" ? error : "Erro ao carregar dados do usuário. Por favor, tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchUserData()
    } else {
      navigate("/login")
    }
  }, [user, token, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(URL.createObjectURL(file))
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    try {
      setLoading(true)
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }

      console.log("Dados do usuário atualizados:", updateData)

      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword
        updateData.newPassword = formData.newPassword
      }

      await updateUser(user.id, updateData)
      setSuccessMessage("Perfil atualizado com sucesso!")
      setEditMode(false)

      // Atualizar dados do usuário
      const updatedUserData = await getUserById(user.id)

      setUserData(updatedUserData)
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      setError(typeof error === "string" ? error : "Erro ao atualizar perfil. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      currentPassword: "",
      newPassword: "",
    })
    setEditMode(false)
    setError("")
    setSuccessMessage("")
  }

  if (loading && !userData) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    )
  }

  const lostItems = userItems.filter((item) => item.status === "PERDIDO")
  const foundItems = userItems.filter((item) => item.status === "ENCONTRADO")

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
          Meu Perfil
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage("")}>
            {successMessage}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Seção de Perfil */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Avatar
                  src={profileImage}
                  alt={userData?.name || "Usuário"}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    bgcolor: "primary.main",
                    fontSize: "3rem",
                  }}
                >
                  {userData?.name?.charAt(0).toUpperCase() || <Person fontSize="large" />}
                </Avatar>

                {editMode && (
                  <Button variant="outlined" component="label" startIcon={<PhotoCamera />} sx={{ mb: 2 }}>
                    Alterar foto
                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                  </Button>
                )}

                <Typography variant="h5" fontWeight="bold">
                  {userData?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userData?.email}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Estatísticas
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card sx={{ bgcolor: "error.light", color: "error.contrastText" }}>
                      <CardContent sx={{ textAlign: "center", py: 1 }}>
                        <Typography variant="h4" fontWeight="bold">
                          {lostItems.length}
                        </Typography>
                        <Typography variant="body2">Itens Perdidos</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ bgcolor: "success.light", color: "success.contrastText" }}>
                      <CardContent sx={{ textAlign: "center", py: 1 }}>
                        <Typography variant="h4" fontWeight="bold">
                          {foundItems.length}
                        </Typography>
                        <Typography variant="body2">Itens Encontrados</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {!editMode ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => setEditMode(true)}
                    fullWidth
                  >
                    Editar Perfil
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{ flex: 1 }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                      onClick={handleSubmit}
                      sx={{ flex: 1 }}
                    >
                      Salvar
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Seção de Informações */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              {editMode ? (
                <Box component="form" onSubmit={handleSubmit}>
                  <Typography variant="h6" gutterBottom>
                    Editar Informações
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Nome Completo"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="E-mail"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Telefone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Alterar Senha (opcional)
                        </Typography>
                      </Divider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Senha Atual"
                        name="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nova Senha"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle new password visibility"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                edge="end"
                              >
                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Informações Pessoais
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Nome Completo
                        </Typography>
                        <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                          <Person fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
                          {userData?.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          E-mail
                        </Typography>
                        <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                          <Email fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
                          {userData?.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Telefone
                        </Typography>
                        <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                          <Phone fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
                          {userData?.phone}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Seção de Itens */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Meus Itens
                </Typography>

                <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                  <Tab label="Todos" />
                  <Tab label="Perdidos" />
                  <Tab label="Encontrados" />
                </Tabs>

                {userItems.length === 0 ? (
                  <Alert severity="info">Você ainda não cadastrou nenhum item.</Alert>
                ) : (
                  <Grid container spacing={3}>
                    {(tabValue === 0 ? userItems : tabValue === 1 ? lostItems : foundItems).map((item) => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <ItemCard item={item} showQuickStatusChange={true} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default UserProfile
