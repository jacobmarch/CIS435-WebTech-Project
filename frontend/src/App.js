import React, { useState, useEffect } from 'react';
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

// Initialize Supabase client
const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseAnonKey);

// Function to handle petition signing
const handleSignPetition = async (petitionId) => {
    const user = supabase.auth.user();
    if (user) {
        const { error } = await supabase
            .from('signatures')
            .insert([{ user_id: user.id, petition_id: petitionId }]);
        return !error;
    }
    return false;
};

// Function to handle comment submission
const handleSubmitComment = async (petitionId, commentText) => {
    const user = supabase.auth.user();
    if (user) {
        const { error } = await supabase
            .from('comments')
            .insert([{ user_id: user.id, petition_id: petitionId, text: commentText }]);
        return !error;
    }
    return false;
};

function App() {
    const [session, setSession] = useState(supabase.auth.getSession());

    useEffect(() => {
        document.title = 'Dearborn Voice';

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session !== null);
        });

        return () => {
            authListener.unsubscribe();
        };
    }, []);

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {session && <Route path="/" element={<MainFeed />} />}
                    {!session && <Route path="/signup" element={<SignUpPage />} />}
                    {!session && <Route path="/login" element={<LoginPage />} />}
                    {session && <Route path="/userprofile" element={<UserProfile />} />}
                    {session && <Route path="/settings" element={<Settings />} />}
                    {session && <Route path="/logout" element={<LogoutPage />} />}
                    {/* Redirect based on session state */}
                    {!session && <Route path="*" element={<Navigate replace to="/login" />} />}
                    {session && <Route path="*" element={<Navigate replace to="/" />} />}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
export { supabase, handleSignPetition, handleSubmitComment };
