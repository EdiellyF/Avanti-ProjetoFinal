"use client"

import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Alert,
  FormHelperText,
  Divider,
  CircularProgress,
} from "@mui/material"
import { PhotoCamera, Delete, ArrowBack } from "@mui/icons-material"
import { getCategories } from "../services/categoryService"
import { getItemById, updateItem } from "../services/itemService"
import { AuthContext } from "../context/AuthContext"
import Layout from "../components/Layout"

export function EditItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token, user } = useContext(AuthContext)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [errors, setErrors] = useState({})
  const [originalItem, setOriginalItem] = useState(null)
 

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    data: "",
    localizacao: "",
    contato: "",
    status: "",
    categoriaId: "",
    foto: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true)
        const [itemResponse, categoriesResponse] = await Promise.all([getItemById(id), getCategories()])

        setOriginalItem(itemResponse)
        setCategories(categoriesResponse || [])

        // Verificar se o usuário tem permissão para editar este item
        if (user && itemResponse && itemResponse.usuarioId !== user.id && user.role !== "ADMIN") {
          setErrorMessage("Você não tem permissão para editar este item.")
          return
        }

        // Preencher o formulário com os dados do item
        setFormData({
          nome: itemResponse.nome || "",
          descricao: itemResponse.descricao || "",
          data: itemResponse.data ? new Date(itemResponse.data).toISOString().split("T")[0] : "",
          localizacao: itemResponse.localizacao || "",
          contato: itemResponse.contato || "",
          status: itemResponse.status || "",
          categoriaId: itemResponse.categoriaId || "",
          foto: null,
        })

        // Definir a pré-visualização da imagem se existir
        if (itemResponse.foto) {
          setPreview(itemResponse.foto)
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        setErrorMessage(
          typeof error === "string" ? error : "Erro ao carregar dados do item. Por favor, tente novamente.",
        )
      } finally {
        setFetchLoading(false)
      }
    }

    if (id && token && user) {
      fetchData()
    }
  }, [id, token, user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Verificar o tamanho do arquivo (5MB máximo)
      const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB em bytes

      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("A imagem é muito grande. O tamanho máximo permitido é 5MB.")
        return
      }

      setPreview(URL.createObjectURL(file))
      setFormData((prev) => ({ ...prev, foto: file }))

      if (errors.foto) {
        setErrors((prev) => ({ ...prev, foto: "" }))
      }
    }
  }

  const removeImage = () => {
    setPreview(null)
    setFormData((prev) => ({ ...prev, foto: null }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome do item é obrigatório"
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória"
    }

    if (!formData.data) {
      newErrors.data = "Data é obrigatória"
    }

    if (!formData.localizacao.trim()) {
      newErrors.localizacao = "Localização é obrigatória"
    }

    if (!formData.contato.trim()) {
      newErrors.contato = "Contato é obrigatório"
    }

    if (!formData.status) {
      newErrors.status = "Status é obrigatório"
    }

    if (!formData.categoriaId) {
      newErrors.categoriaId = "Categoria é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrorMessage("")

    try {
      // Convert image to base64 if available
      let fotoBase64 = null
      if (formData.foto) {
        fotoBase64 = await convertToBase64(formData.foto)
      }

      const itemData = {
        ...formData,
        foto: fotoBase64 || originalItem.foto, // Manter a foto original se não houver nova
      }

      await updateItem(id, itemData)
      setSuccessMessage("Item atualizado com sucesso!")

      // Redirect after success
      setTimeout(() => {
        navigate(`/item/${id}`)
      }, 2000)
    } catch (error) {
      console.error("Erro ao atualizar item:", error)
      setErrorMessage(typeof error === "string" ? error : "Erro ao atualizar item. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
          // Criar um canvas para comprimir a imagem
          const canvas = document.createElement("canvas")

          // Determinar o novo tamanho mantendo a proporção
          let width = img.width
          let height = img.height
          const MAX_WIDTH = 800
          const MAX_HEIGHT = 600

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width)
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height)
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height

          // Desenhar a imagem redimensionada no canvas
          const ctx = canvas.getContext("2d")
          ctx.drawImage(img, 0, 0, width, height)

          // Converter para base64 com qualidade reduzida (0.7 = 70% de qualidade)
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7)
          resolve(dataUrl)
        }

        img.onerror = (error) => {
          reject(error)
        }
      }

      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  if (!token) {
    return (
      <Layout>
        <Alert severity="warning">Você precisa estar logado para editar um item.</Alert>
      </Layout>
    )
  }

  if (fetchLoading) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    )
  }

  if (errorMessage && !formData.nome) {
    return (
      <Layout>
        <Alert severity="error">{errorMessage}</Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Voltar
        </Button>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Voltar
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
          >
            Editar Item
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMessage}
            </Alert>
          )}

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="nome"
                  name="nome"
                  label="Nome do Item"
                  value={formData.nome}
                  onChange={handleInputChange}
                  error={!!errors.nome}
                  helperText={errors.nome}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors.categoriaId}>
                  <InputLabel id="categoria-label">Categoria</InputLabel>
                  <Select
                    labelId="categoria-label"
                    id="categoriaId"
                    name="categoriaId"
                    value={formData.categoriaId}
                    label="Categoria"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={String(category.id ?? "")}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.categoriaId && <FormHelperText>{errors.categoriaId}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors.status}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    value={formData.status}
                    label="Status"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    <MenuItem value="PERDIDO">Perdido</MenuItem>
                    <MenuItem value="ENCONTRADO">Encontrado</MenuItem>
                  </Select>
                  {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="data"
                  name="data"
                  label="Data"
                  type="date"
                  value={formData.data}
                  onChange={handleInputChange}
                  error={!!errors.data}
                  helperText={errors.data}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="localizacao"
                  name="localizacao"
                  label="Local onde foi encontrado ou perdido"
                  placeholder="Ex: Bloco A, Sala 101"
                  value={formData.localizacao}
                  onChange={handleInputChange}
                  error={!!errors.localizacao}
                  helperText={errors.localizacao}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="contato"
                  name="contato"
                  label="Contato"
                  placeholder="Telefone ou e-mail para contato"
                  value={formData.contato}
                  onChange={handleInputChange}
                  error={!!errors.contato}
                  helperText={errors.contato}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="descricao"
                  name="descricao"
                  label="Descrição"
                  multiline
                  rows={4}
                  placeholder="Descreva o item com detalhes que ajudem na identificação..."
                  value={formData.descricao}
                  onChange={handleInputChange}
                  error={!!errors.descricao}
                  helperText={errors.descricao}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Foto do Item
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                    Selecionar Imagem
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                  </Button>

                  {preview && (
                    <Button variant="outlined" color="error" onClick={removeImage} startIcon={<Delete />}>
                      Remover Imagem
                    </Button>
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
                  Tamanho máximo: 5MB. Imagens maiores serão redimensionadas automaticamente.
                </Typography>

                <Paper
                  variant="outlined"
                  sx={{
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "background.default",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {preview ? (
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Pré-visualização"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Nenhuma imagem selecionada
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{ minWidth: 200, py: 1.5 }}
              >
                {loading ? "Atualizando..." : "Atualizar Item"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Layout>
  )
}

export default EditItem
