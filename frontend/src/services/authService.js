import api from "./axios"

/**
 * Decodifica um token JWT sem depender de bibliotecas externas
 * @param {string} token - Token JWT
 * @returns {Object} - Payload decodificado do token
 */
const decodeToken = (token) => {
  try {
    // JWT tem o formato: header.payload.signature
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )

    const decoded = JSON.parse(jsonPayload)

    return decoded
  } catch (error) {
    console.error("Erro ao decodificar token:", error)
    return null
  }
}

/**
 * Realiza o login do usuário
 * @param {string} token - Token JWT de autenticação
 */
export const login = (token) => {
  localStorage.setItem("token", token)
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  return token
}

/**
 * Realiza o logout do usuário
 */
export const logout = () => {
  localStorage.removeItem("token")
  delete api.defaults.headers.common["Authorization"]
}

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} - Verdadeiro se o usuário estiver autenticado
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token")
  return !!token
}

/**
 * Obtém informações do usuário a partir do token JWT
 * @returns {Object|null} - Objeto com informações do usuário ou null se não estiver autenticado
 */
export const getUserInfo = () => {
  const token = localStorage.getItem("token")
  if (!token) {
    console.log("Nenhum token encontrado")
    return null
  }

  try {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.id) {
      console.warn("Token inválido ou sem ID de usuário")
      return null
    }

   
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    }
  } catch (error) {
    console.error("Erro ao decodificar token:", error)
    return null
  }
}

/**
 * Verifica se o token está expirado
 * @returns {boolean} - Verdadeiro se o token estiver expirado
 */
export const isTokenExpired = () => {
  const token = localStorage.getItem("token")
  if (!token) return true

  try {
    const decoded = decodeToken(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch (error) {
    return true
  }
}
