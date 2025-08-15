import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<any>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null) as any;
  const [token, setToken] = useState(null) as any;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        try {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const id = toast.loading('Logging in...')
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`,{
        email,
        password
      });
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      toast.success('Logged in successfully')
      
      redirectBasedOnRole(user.role);
    } catch (error) {
      toast.error('Could not login')
    }
    finally{
        toast.dismiss(id)
    }
  };

    const signup = async (userData: any) => {
    const id = toast.loading('Signing up...')
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/sign-up`,userData);
      

      toast.success('Signed up successfully')
      
      // Automatically login after signup
      await login(userData.email, userData.password);
      
    } catch (error) {
      toast.error('Could not signup')
    }
    finally{
        toast.dismiss(id)
    }
  };

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case 'SYSTEM_ADMIN':
        navigate('/admin');
        break;
      case 'STORE_OWNER':
        navigate('/owner');
        break;
      case 'NORMAL_USER':
        navigate('/user');
        break;
      default:
        navigate('/login');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value: any = {
    user,
    token,
    login,
    signup,
    logout,
    loading,
    redirectBasedOnRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};