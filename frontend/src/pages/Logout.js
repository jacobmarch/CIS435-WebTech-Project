import React from 'react';
import { supabase } from '../App';
import { Link } from 'react-router-dom';

const LogoutPage = () => {
  supabase.auth.signOut();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>User successfully logged out</h1>
      <Link to="/Login" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'black', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Back to Login</Link>
    </div>
  );
}

export default LogoutPage;