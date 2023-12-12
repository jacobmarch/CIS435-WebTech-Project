import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './SettingsPage.css'; // Import your CSS file for styling
import { supabase } from '../App';

const ProfileImage = ({ src }) => (
  <img src={src} alt="Profile" className="profile-image" />
);

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('View Profile');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState(''); // For Change Password
  const [newPassword, setNewPassword] = useState(''); // For Change Password
  const [confirmPassword, setConfirmPassword] = useState(''); // For Change Password


  const handleNavButtonClick = (section) => {
    setActiveSection(section);
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match.');
        return;
    }

    try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            console.error('Error changing password:', error);
            alert('Error changing password. Please try again.');
        } else {
            alert('Password changed successfully!');
            // Reset Password fields
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    } catch (error) {
        console.error('Error changing password:', error);
        alert('Error changing password. Please try again.');
    }
};

  React.useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
    
        if (error) {
          throw error;
        }

        
          const user = data.session.user;
        
    
        if (data) {
    
          const { data, error: userError } = await supabase
            .from('users')
            .select('name')
            .eq('userID', user.id);
    
          if (userError) {
            throw userError;
          }
    
          setUserName(data[0].name);
          setEmail(user.email);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();

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
            <p>Name: {userName}</p>
            <p>Email: {email}</p>
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
      case 'Password':
        return (
          <div className="settings-section">
            <h3>Change Password</h3>
            <form onSubmit={handleSubmit}>                
              <input type="password" className="input-style" placeholder="Current Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
              <input type="password" className="input-style" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <input type="password" className="input-style" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button type="submit" className="interactive-button ">Change Password</button>
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
  'Password': 'Password',
};

export default SettingsPage;
