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
                <Settings />
            </div>
    );
}

export default App;
