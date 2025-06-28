import { Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Login from "./pages/Login"
import { AuthProvider } from "./contexts/AuthContext";
import Hardware from "./pages/Hardware";
import Users from "./pages/Users";
import ToastContainer from "./components/ToastContainer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/equipos" element={
              <ProtectedRoute>
                <Hardware />
              </ProtectedRoute>
            } />
            
            <Route path="/usuarios" element={
              <ProtectedRoute requireRole="admin" redirectTo="/equipos">
                <Users />
              </ProtectedRoute>
            } />
          </Route>
      </Routes>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
