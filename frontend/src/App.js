import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

function App() {
    const [session, setSession] = useState(supabase.auth.session());

    useEffect(() => {
        document.title = 'Dearborn Voice';

        const authStateChanged = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            authStateChanged.unsubscribe();
        };
    }, []);

    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    {session && <Route path="/" element={<MainFeed />} />}
                    {!session && <Route path="/signup" element={<SignUpPage />} />}
                    {!session && <Route path="/login" element={<LoginPage />} />}
                    {session && <Route path="/userprofile" element={<UserProfile />} />}
                    {session && <Route path="/settings" element={<Settings />} />}
                    {session && <Route path="/logout" element={<LogoutPage />} />}
                    {!session && <Route path="*" element={<Navigate replace to="/login" />} />}
                    {session && <Route path="*" element={<Navigate replace to="/" />} />}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
