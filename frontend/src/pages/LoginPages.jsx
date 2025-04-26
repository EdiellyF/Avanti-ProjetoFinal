import { useContext, useState } from "react"
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom"
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material"
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material"
import { AuthContext } from "../context/AuthContext"
import { loginUser } from "../services/userService"
import Layout from "../components/Layout"

function LoginPages() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")

    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.")
      return
    }

    try {
      setLoading(true)
      const data = { email, password }
      const token = await loginUser(data)

      if (token) {
        login(token)
        navigate(from, { replace: true })
      } else {
        throw new Error("Não foi possível obter o token de autenticação")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      setErrorMessage(
        typeof error === "string" ? error : "Falha no login. Verifique suas credenciais e tente novamente.",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 450,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
          >
            Login
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              required
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ textAlign: "right", mt: 1 }}>
              <Link component={RouterLink} to="/recuperar-senha" variant="body2">
                Esqueceu a senha?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                ou
              </Typography>
            </Divider>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1">
                Ainda não tem uma conta?{" "}
                <Link component={RouterLink} to="/cadastrar" variant="body1" sx={{ fontWeight: "bold" }}>
                  Cadastre-se
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Layout>
  )
}

export default LoginPages
