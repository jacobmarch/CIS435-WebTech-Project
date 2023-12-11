import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from './components/Header';
import SignUpPage from './pages/Signup';
import LoginPage from './pages/Login';
import UserProfile from './pages/UserProfile';
import MainFeed from './pages/MainFeed';
import Settings from './pages/Settings';
import LogoutPage from './pages/Logout';
import './App.css';



const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseURL, supabaseAnonKey);

export { supabase };

function App() {
    useEffect(() => {
        document.title = 'Dearborn Voice';
    })

    return (
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<MainFeed />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/Logout" element={<LogoutPage />} />
                    {/* If no other routes match, you can have a catch-all redirect or a 404 component */}
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </div>
    );
}

export default App;
