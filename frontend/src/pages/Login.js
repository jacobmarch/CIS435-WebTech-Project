import React, { useState } from 'react';
import { supabase } from '../App';

/**
 * Renders the Login page component.
 *
 * @return {JSX.Element} The Login page component.
 */
const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { user, session, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
        } else {
            // Redirect or perform any action after successful login
            console.log('User logged in:', user, session);
            setIsLoggedIn(true);
        }
        setLoading(false);
    };

    return (
        <div className='SignUpContainer' style={{
            display: 'flex',
            background: '#050000',
            width: '100%',
            maxWidth: ' 1165px',
            margin: 'auto',
            height: '80vh',
            borderRadius: '152px 120px 120px 176px',
            border: '0px solid #FFF',
            overflow: 'hidden',
            padding:'0px'
        }}>
            <img src="/DearbornVoice.png" alt="logo" style={{ borderRadius: '0px 176px 176px 0px', width: '650px', height: '100%', objectFit: 'cover' }} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                padding: '2%',
            }}>

                <form onSubmit={handleLogin} 
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    marginBottom: '5%'
                }}>
                    <div style={{ background: '#FFF', width: '200px', height: '200px', borderRadius: '50%', marginBottom: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src="/user_alt.svg" alt="profile" style={{ border:'none',height: '161px', width: '165px', display: 'block', margin: 'auto' }} />
                    </div>

                    <input
                        placeholder="Email"
                        type="email"
                        style={inputStyle}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        style={inputStyle}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={loading} style={buttonStyle}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <label style={{ color: 'white', marginBottom: '20px' }}>or you can login with</label>
                    <div style={{ display: 'flex', width: '120px', height: '48px', justifyContent: 'space-between' }}>
                        <button style={{
                            width: '48px',
                            height: '48px',
                            background: 'white',
                            borderRadius: '50%',
                            border: 'none',
                            padding: '0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src="/logo-google.svg" alt="Google" style={{ marginLeft:'4px',width: '70%', height: '85%' }} />
                        </button>
                        <button style={{
                            width: '48px',
                            height: '48px',
                            background: 'white',
                            borderRadius: '50%',
                            border: 'none',
                            padding: '0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src="/logo-apple.svg" alt="Apple" style={{ width: '70%', height: '85%' }} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Input styles
const inputStyle = {
    width: '359px',
    height: '54px',
    borderRadius: '27px',
    border: 'none',
    marginBottom: '25px',
    paddingLeft: '15px',
    background: 'white',
    boxSizing: 'border-box',
    textAlign: 'center'
};

// Button styles
const buttonStyle = {
    width: '150px',
    height: '49px',
    borderRadius: '20px 20px 29px 29px',
    border: 'none',
    marginBottom: '20px',
    background: '#2DC7FF',
    boxSizing: 'border-box',
    color: 'white',
    cursor: 'pointer',
    fontSize: '20px'
}
export default LoginPage;
