import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

    const handleLogin = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole(null);
    };

    return (
        <Router>
            {isAuthenticated && <Navbar onLogout={handleLogout} />}
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register onLogin={handleLogin} />} />
                {isAuthenticated ? (
                    <> 
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/book-appointment" element={<BookAppointment />} />
                        <Route path="/my-appointments" element={<MyAppointments />} />
                        {userRole === 'admin' && <Route path="/admin" element={<AdminDashboard />} />} 
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;