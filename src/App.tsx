import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Charts from './pages/Charts';
import AdminPanel from './pages/AdminPanel';
import Layout from './components/Layout';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface ProcessedFile {
  id: string;
  name: string;
  headers: string[];
  data: any[][];
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleFileProcessed = (file: ProcessedFile) => {
    setProcessedFiles(prev => [...prev.filter(f => f.id !== file.id), file]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <AnimatePresence mode="wait">
          <Routes>
            {!user ? (
              <>
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route path="/signup" element={<Signup onLogin={login} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <Route path="/" element={<Layout user={user} onLogout={logout} />}>
                <Route index element={<Dashboard user={user} />} />
                <Route path="upload" element={<Upload user={user} onFileProcessed={handleFileProcessed} />} />
                <Route path="charts" element={<Charts user={user} processedFiles={processedFiles} />} />
                {user.role === 'admin' && (
                  <Route path="admin" element={<AdminPanel />} />
                )}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            )}
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
