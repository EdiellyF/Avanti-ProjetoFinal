import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1"
})



// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para tratamento de erros nas respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento de erros específicos
    if (error.response) {
      // Erro de autenticação
      if (error.response.status === 401) {
        localStorage.removeItem("token")
        // Redirecionar para login se necessário
        if (window.location.pathname !== "/login" && window.location.pathname !== "/cadastrar") {
          window.location.href = "/login"
        }
      }

      // Retorna a mensagem de erro do servidor se disponível
      if (error.response.data && error.response.data.message) {
        return Promise.reject(error.response.data.message)
      }
    }

    return Promise.reject(error.message || "Ocorreu um erro na comunicação com o servidor")
  },
)

export default api
