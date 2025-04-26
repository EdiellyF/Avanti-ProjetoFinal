"use client"

import { useState, useContext } from "react"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import {
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  Avatar,
  Alert,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material"
import { Visibility, VisibilityOff, Email, Person, Phone, Lock, PhotoCamera } from "@mui/icons-material"
import { registerUser } from "../services/userService"
import Layout from "../components/Layout"
import { AuthContext } from "../context/AuthContext"

function RegisterUser() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [profileImage, setProfileImage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(URL.createObjectURL(file))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
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

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    }

    try {
      const response = await registerUser(userData)
      setSuccessMessage(true)

      if (response && response.token) {
        setTimeout(() => {
          login(response.token)
          navigate("/")
        }, 2000)
      } else {
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error)
      setErrorMessage(typeof error === "string" ? error : "Erro ao registrar usuário. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: 900, mx: "auto", mb: 4 }}>
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
            Criar Conta
          </Typography>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Usuário registrado com sucesso! Redirecionando para o login...
            </Alert>
          )}

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          )}

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  src={profileImage}
                  alt="Foto de Perfil"
                  sx={{
                    width: 150,
                    height: 150,
                    mb: 2,
                    border: "3px solid",
                    borderColor: "primary.main",
                  }}
                />

                <Button variant="outlined" component="label" startIcon={<PhotoCamera />} sx={{ mb: 1 }}>
                  Selecionar foto
                  <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </Button>

                <Typography variant="body2" color="text.secondary">
                  A foto precisa ser em um local iluminado e o rosto bem visível.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="name"
                  label="Nome Completo"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="phone"
                  label="Telefone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  required
                  name="password"
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  helperText={errors.password}
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

                <TextField
                  fullWidth
                  margin="normal"
                  required
                  name="confirmPassword"
                  label="Confirmar Senha"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Registrar"}
                </Button>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    ou
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1">
                    Já tem uma conta?{" "}
                    <Link component={RouterLink} to="/login" variant="body1" sx={{ fontWeight: "bold" }}>
                      Faça login
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  )
}

export default RegisterUser
