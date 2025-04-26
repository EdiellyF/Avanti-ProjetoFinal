"use client"

import { createContext, useState, useEffect } from "react"
import { getUserInfo, isAuthenticated, login as authLogin, logout as authLogout } from "../services/authService"
import { getUserById } from "../services/userService" 

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
          const userInfo = getUserInfo()
          

          if (userInfo) {
           
            try {
             
              const userData = await getUserById(userInfo.id)
           

              setUser({
                ...userInfo,
                ...userData,
                isLoggedIn: true,
              })
            } catch (error) {
              console.warn("Não foi possível obter dados adicionais do usuário:", error)
          
              setUser({
                ...userInfo,
                isLoggedIn: true,
              })
            }
          } else {
           
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
