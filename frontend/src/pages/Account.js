import React from 'react';

const UserProfile = () => {
  return (
    <div className="user-profile-container" style={{
        display: 'flex',
        backgroundColor: 'white',
      }}>
      <div className="profile-sidebar" style={{
        flexBasis: '25%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: '20px',
        backgroundColor: 'black',
        color: 'white'
      }}>
        <img src="/user_alt.svg" alt="User avatar" className="avatar" style={{
            borderRadius: '50%',
            backgroundColor: 'white'
        }} />
        <h1>John Smith</h1>
        <p>October 31, 2023</p>
        <button className="edit-profile" style={{
            backgroundColor: 'darkgray',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px'
        }}>Edit Profile</button>
      </div>
      <div className="petitions-container" style={{ flexGrow: '1'}}>
        <h2>John Smith's Petitions</h2>
        <div className="petitions-list" style={{display: 'flex', flexDirection: 'column', padding: '20px'}}>
            <PetitionCard />
            <PetitionCard />
            <PetitionCard />
        </div>
      </div>
    </div>
  );
};

const PetitionCard = () => {

    const actionButtonStyles = {
        backgroundColor: 'darkgray',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px'
      };
    
  return (
    <div className="petition-card" style={{
        backgroundColor: 'black',
        color: 'white',
        marginBottom: '10px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between'
        }}>
      <div className="petition-actions">
        <button className="sign" style={{actionButtonStyles}}>Sign</button>
        <button className="comments" style={{actionButtonStyles}}>Comment</button>
      </div>
      <div className="petition-info" >
        <h3><u>Title</u></h3>
        <p>This is a summary of the petition. It is a very useful and descriptive summary. I am so glad that this awesome website includes a summary to display for each petition.</p>
      </div>
    </div>
  );
};

export default UserProfile;
