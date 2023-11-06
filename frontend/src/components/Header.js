import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders the header component.
 *
 * @return {JSX.Element} The header component.
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', padding: '10px 0' }}>

      {/* Header container */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 20px' }}>
        
        {/* Left section: Logo */}
        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <img src="/logo-icon.png" alt="Logo" style={{ marginRight: '10px', height: '40px', width: '30px' }} />
          </Link> 
        </div>

        {/* Center section: Search bar */}
        <div style={{ flex: '3', width: '100%' }}>
          <input type="text" placeholder="Search..." style={{ width: '60%', padding: '10px', borderRadius: '20px' }} />
        </div>

        {/* Right section: Icons and Menu */}
        <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/trending">
            <img src="/trend.png" alt="Fire" style={{ height: '40px', width: '40px', cursor: 'pointer' }} />
          </Link>
          <img src="/hamburger-menu.png" alt="Menu" style={{ height: '40px', width: '50px', cursor: 'pointer', marginLeft: '20px' }} onClick={toggleMenu} />
        </div>
      </div>
      
      {/* Dropdown Menu */}
      {menuOpen && (
        <div style={{ position: 'absolute', right: '20px', top: '60px', backgroundColor: 'darkgray', borderRadius: '5px', padding: '10px', zIndex: '100' }}>
          <Link to="/" className='menu-link'>Home</Link>
          <Link to="/about" className='menu-link'>About</Link>
          <Link to="/contact" className='menu-link'>Contact</Link>
        </div>
      )}

    </div>
  );
};

export default Header;
