import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SignUpPage from './pages/Signup';
import LoginPage from './pages/Login';
import AccountPage from './pages/Account';
import MainFeed from './pages/MainFeed';
import './App.css';

function App() {
    return (
            <div className="App">
                <Header/>
                <LoginPage />
            </div>
    );
}

export default App;
