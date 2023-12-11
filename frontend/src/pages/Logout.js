import React from 'react';
import { supabase } from '../App';

const LogoutPage = () => {

    supabase.auth.signOut();
    // A page that renders for three seconds before redirecting to the home page
    React.useEffect(() => {
        const timer = setTimeout(() => {
            // Redirect to the home page
            window.location.href = "/";
        }, 1500);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default LogoutPage;