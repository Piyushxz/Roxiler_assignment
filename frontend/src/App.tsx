import { AdminDashboard } from './pages/AdminDashboard'
import { UserDashboard } from './pages/UserDashboard'
import { OwnerDashboard } from './pages/OwnerDashboard'
import { Route, Routes, Navigate } from 'react-router'
import { Login } from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import {  LandingPage } from './pages/Home'


function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login/>}/>

      <Route path='/user' element={<ProtectedRoute allowedRoles={['NORMAL_USER']}>
        <UserDashboard/>
      </ProtectedRoute>}/>

      <Route path='/owner' element={<ProtectedRoute allowedRoles={['STORE_OWNER']}>
        <OwnerDashboard/>
      </ProtectedRoute>}/>

      <Route path='/admin' element={<ProtectedRoute allowedRoles={['SYSTEM_ADMIN']}>
        <AdminDashboard/>
      </ProtectedRoute>}/>
    </Routes>
  )
}

export default App
