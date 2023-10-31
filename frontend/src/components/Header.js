import React from 'react';

/**
 * Renders the header component.
 *
 * @return {JSX.Element} The header component.
 */
const Header = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'black', padding: '10px 20px' }}>
      
      {/* Left section: Logo and Title */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="path_to_your_logo_icon.png" alt="Logo" style={{ marginRight: '10px', height: '30px', width: '30px' }} />
      </div>

      {/* Center section: Search bar */}
      <div style={{ flex: 1, paddingLeft: '20px', paddingRight: '20px' }}>
        <input type="text" placeholder="Search..." style={{ width: '50%', padding: '10px', borderRadius: '20px' }} />
      </div>

      {/* Right section: Icons */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="path_to_your_fire_icon.png" alt="Fire" style={{ marginRight: '20px', height: '30px', width: '30px' }} />
        <img src="path_to_your_menu_icon.png" alt="Menu" style={{ height: '30px', width: '30px' }} />
      </div>

    </div>
  );
}

export default Header;
