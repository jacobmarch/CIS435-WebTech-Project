import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SignUpPage from './pages/Signup';
import LoginPage from './pages/Login';
import UserProfile from './pages/UserProfile';
import MainFeed from './pages/MainFeed';
import Settings from './pages/Settings';
import './App.css';

function App() {
    return (
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/settings" element={<Settings />} />
                    {/* If no other routes match, you can have a catch-all redirect or a 404 component */}
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </div>
    );
}

export default App;
