import React from 'react';

/**
 * Renders the header component.
 *
 * @return {JSX.Element} The header component.
 */
const Header = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'black', padding: '20px 20px',marginTop:'5px' }}>
      
      {/* Left section: Logo and Title */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="path_to_your_logo_icon.png" alt="Logo" style={{ marginRight: '10px', height: '30px', width: '30px' }} />
      </div>


  {/* Center section: Search bar */}
  <div style={{ flex: 1, paddingLeft: '20px', paddingRight: '20px'}}>
        <input
          type="text"
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
        <img src="/trend.png" alt="Fire" style={{ marginRight: '20px', height: '30px', width: '30px' }} />
        <img src="/hamburger-menu.png" alt="Menu" style={{ height: '30px', width: '30px' }} />
      </div>

    </div>
  );
}

export default Header;
