"use client"

import { createContext, useState, useEffect } from "react"
import { getUserInfo, isAuthenticated, login as authLogin, logout as authLogout } from "../services/authService"
import { getUserById } from "../services/userService" // Import userService

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      if (token) {
        try {
          setLoading(true)
          // Obter informações do usuário a partir do token
          const userInfo = getUserInfo()
          console.log("Informações do usuário obtidas do token:", userInfo)

          if (userInfo) {
            // Tentar buscar informações adicionais do usuário do backend
            try {
              console.log("Buscando dados adicionais do usuário com ID:", userInfo.id)
              const userData = await getUserById(userInfo.id)
              console.log("Dados adicionais do usuário recebidos:", userData)

              setUser({
                ...userInfo,
                ...userData,
                isLoggedIn: true,
              })
            } catch (error) {
              console.warn("Não foi possível obter dados adicionais do usuário:", error)
              // Fallback para as informações básicas do token
              setUser({
                ...userInfo,
                isLoggedIn: true,
              })
            }
          } else {
            // Se não conseguir obter informações do usuário, fazer logout
            console.warn("Não foi possível obter informações do usuário do token")
            logout()
          }
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error)
          logout()
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    loadUserData()
  }, [token])

  const login = (userData) => {
    const newToken = authLogin(userData)
    setToken(newToken)
  }

  const logout = () => {
    authLogout()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        isAuthenticated: isAuthenticated(),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
