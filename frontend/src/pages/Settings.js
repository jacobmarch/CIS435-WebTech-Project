import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './SettingsPage.css'; // Import your CSS file for styling

const ProfileImage = ({ src }) => (
  <img src={src} alt="Profile" className="profile-image" />
);

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('View Profile');

  const handleNavButtonClick = (section) => {
    setActiveSection(section);
  };

  React.useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    }
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'View Profile':
        return (
          <div className="settings-section">
            <ProfileImage src="/user_alt.svg" />
            <h3>Profile Information</h3>
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
            <button className="interactive-button">Edit Profile</button>
          </div>
        );

      case 'Account':
        return (
          <div className="settings-section">
            <h3>Account Settings</h3>
            <label>
              Username:
              <input type="text" defaultValue="JohnDoe123" className="input-style" />
            </label>
            <label>
              Email:
              <input type="email" defaultValue="johndoe@example.com" className="input-style" />
            </label>
            <button className="interactive-button">Save Changes</button>
          </div>
        );

      case 'Security':
        return (
          <div className="settings-section">
            <h3>Security Settings</h3>
            <button className="interactive-button">Update Security</button>
          </div>
        );

      case 'Notifications':
        return (
          <div className="settings-section">
            <h3>Notification Settings</h3>
            <p>Sample notification: Your petition has been signed!</p>
            <button className="interactive-button">Save Notification Settings</button>
          </div>
        );

      case 'Password':
        return (
          <div className="settings-section">
            <h3>Change Password</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                Current Password:
                <input type="password" className="input-style" />
              </label>
              <label>
                New Password:
                <input type="password" className="input-style" />
              </label>
              <label>
                Confirm New Password:
                <input type="password" className="input-style" />
              </label>
              <button type="submit" className="interactive-button">Change Password</button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <aside className="sidebar">
        <nav className="nav">
          {Object.keys(sections).map((sectionName) => (
            <button
              key={sectionName}
              className={activeSection === sectionName ? 'nav-button active' : 'nav-button'}
              onClick={() => handleNavButtonClick(sectionName)}
            >
              {sectionName}
            </button>
          ))}
        </nav>
      </aside>
      <main className="main">
        <CSSTransition
          in={true}
          appear={true}
          timeout={300}
          classNames="fade"
        >
          <div className="section-content">{renderActiveSection()}</div>
        </CSSTransition>
      </main>
    </div>
  );
};

const sections = {
  'View Profile': 'View Profile',
  'Account': 'Account',
  'Security': 'Security',
  'Notifications': 'Notifications',
  'Password': 'Password',
};

export default SettingsPage;
