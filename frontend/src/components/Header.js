import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { supabase } from '../App';

//Create the handleSearch function
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  window.location.href = `/?query=${searchInput.value}`;
}

/**
 * Renders the header component.
 *
 * @return {JSX.Element} The header component.
 */
const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = supabase.auth.getSession();
    const user = supabase.auth.getUser();
  
    setIsLoggedIn(session !== null && user !== null);
  
    supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(session !== null && user !== null);
    });
  }, []);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'black', padding: '20px 20px',marginTop:'5px'}}>
      
      {/* Left section: Logo and Title */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        < Link to="/">
          <img src="/DearbornVoice2.png" alt="Logo" style={{ height: '75px', width: '100px' }} />
        </Link>
      </div>


    {/* Center section: Search bar */}
    {isLoggedIn ? (
    <div style={{ flex: 1, paddingLeft: '20px', paddingRight: '20px'}}>
      <form className='search-form' onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        id="search-input"
        style={{
          width: '40%', // Adjusted to take the full width of the parent div
          padding: '10px',
          borderRadius: '20px',
          backgroundColor: '#ffffff',
          border: 'none',
          color: '#000000',
          fontFamily: 'inherit',
          fontSize: '20px',
          outline: '0',
          marginRight:'225px'
        }}
      />
    </form>
    </div>) : (
      <div>

      </div>
    )}

      {/* Right section: Icons */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/trending">
            <img src="/trend.png" alt="Fire" style={{ marginRight: '20px', height: '30px', width: '30px' }} />
          </Link>
          <img src="/hamburger-menu.png" alt="Menu" style={{ height: '30px', width: '30px' }} onClick={toggleMenu} />
      </div>
        {/* Dropdown Menu */}
        {menuOpen && (
          <div style={{ position: 'absolute', right: '20px', top: '70px', backgroundColor: 'darkgray', borderRadius: '5px', padding: '10px', zIndex: '100' }}>
            {isLoggedIn ? (
              <>
                <Link to="/" className='menu-link'>Home</Link>
                <Link to="/Settings" className='menu-link'>Settings</Link>
                <Link to="/UserProfile" className='menu-link'>User Profile</Link>
                <Link to="/Logout" className='menu-link'>Logout</Link>
              </>
            ) : (
              <>
              <Link to="/Login" className='menu-link'>Login</Link>
              <Link to="/Signup" className='menu-link'>Signup</Link>
              </>
            )
            }
          </div>
        )}
    </div>
  );
}

export default Header;
