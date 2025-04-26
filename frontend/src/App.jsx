import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import HomePage from "./pages/HomePage"
import LoginPages from "./pages/LoginPages"
import RegisterUser from "./pages/RegisterUser"
import RegisterItem from "./pages/RegisterItem"
import ItemDetail from "./pages/ItemDetail"
import SearchPage from "./pages/SearchPage"
import UserItems from "./pages/UserItems"
import ProtectedRoute from "./utils/ProtectedRoute"
import UserProfile from "./pages/UserProfile"

import EditItem from "./pages/EditItem"


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/cadastrar" element={<RegisterUser />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/item/:id" element={<ItemDetail />} />

          <Route
            path="/item/novo"
            element={
              <ProtectedRoute>
                <RegisterItem />
              </ProtectedRoute>
            }
          />

          <Route
            path="/item/editar/:id"
            element={
              <ProtectedRoute>
                <EditItem />

              </ProtectedRoute>
            }
          />
          <Route
            path="/meus-itens"
            element={
              <ProtectedRoute>
                <UserItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
