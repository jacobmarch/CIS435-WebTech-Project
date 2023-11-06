import React, {useState} from 'react';
import { Link } from "react-router-dom";

/**
 * Renders the header component.
 *
 * @return {JSX.Element} The header component.
 */
const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'black', padding: '20px 20px',marginTop:'5px'}}>
      
      {/* Left section: Logo and Title */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        < Link to="/">
          <img src="/DearbornVoice.png" alt="Logo" style={{ marginRight: '10px', height: '40px', width: '70px' }} />
        </Link>
      </div>


  {/* Center section: Search bar */}
  <div style={{ flex: 1, paddingLeft: '20px', paddingRight: '20px'}}>
    <input
      type="text"
      placeholder="Search..."
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
  </div>

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
                <Link to="/" className='menu-link'>Home</Link>
                <Link to="/account" className='menu-link'>Account</Link>
            </div>
        )}

    </div>
  );
}

export default Header;
