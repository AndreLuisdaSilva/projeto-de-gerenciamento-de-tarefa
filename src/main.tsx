import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import LandingPage from '../src/pages/Landing/Landing.tsx'
import NotFoundPage from '../src/pages/NotFound/NotFound.tsx'
import LoginPage from '../src/pages/Login/Login.tsx'
import RegisterPage from '../src/pages/Register/Register.tsx'
import HomePage from '../src/pages/Home/Home'
import { AuthProvider, AuthContext } from '../src/context/AuthContext.tsx'
import PrivateRoutes from './Utils/PrivateRoutes.tsx';
import { useContext } from "react";



function Root() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<Root />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route element={<PrivateRoutes />} >
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
)
