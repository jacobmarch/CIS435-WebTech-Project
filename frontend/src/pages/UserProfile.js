import React from 'react';
import { useState } from 'react';
import { supabase } from '../App';

const UserProfile = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [petitions, setPetitions] = useState([]);
  
    React.useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        const fetchUserData = async () => {
          try {
            const { session, error } = supabase.auth.getSession();
            const user = (await supabase.auth.getSession()).data.user;
    
            if (error) {
              throw error;
            }
    
            if (user && session) {
    
              
              const { data, error: userError } = await supabase
                .from('users')
                .select('name')
                .eq('userID', user.id);
    
              if (userError) {
                throw userError;
              }
    
              // Update state with the user's name and ID
              setUserName(data.name);
              setUserId(user.id);
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
    
        fetchUserData();

        const fetchPetitions = async () => {
          const {data, error} = await supabase
          .from('petitions')
          .select(`
               petitionid,
               title,
               description,
               createdUserID,
               categoryid,
               users!inner (
                    userID,
                    profilepic,
                    name
               )
          `)
          .eq('users.userID', userId);

          if (error) {
               console.error('error fetching petitions: ', error)
          } else {
               setPetitions(data)
               console.log(data)
          }
     };
     fetchPetitions();

        return () => {
            document.body.style.overflow = originalStyle;
        }
    }, []);

    return (
      <div className="user-profile-container" style={{
          display: 'flex',
          backgroundColor: 'white',
          height: '100vh',
          overflow: 'hidden'
        }}>
        <div className="profile-sidebar" style={{
          flexBasis: '25%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(180deg, #000 16.15%, #FFF 100%)',
          color: 'white'
        }}>
          <img src="/user_alt.svg" alt="User avatar" className="avatar" style={{
              borderRadius: '50%',
              backgroundColor: 'white',
              width: '100px', // Set a fixed width for the image
              height: '100px', // Set a fixed height for the image
              objectFit: 'cover' // Ensure the image covers the area without distortion
          }} />
          <h1>{userName}</h1>
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
        <div className="petitions-container" style={{ flexGrow: '1', overflowY: 'hidden', background: 'linear-gradient(180deg, #000 16.15%, #FFF 100%)', color: 'white' }}>

                    <div className="petition-list" style={{
                         overflowY: 'auto', // Enable scrolling
                         maxHeight: 'calc(100vh - 200px)', // Set maximum height (viewport height minus some offset)
                         display: 'flex',
                         padding: '20px',
                         marginRight: '20px',
                         flexDirection: 'column',
                         alignItems: 'center',
                    }}>
                         {petitions.map((petition) => (
                              <PetitionCard 
                                   key={petition.petitionid} 
                                   title={petition.title} 
                                   description={petition.description}
                                   imageUrl={petition.users.profilepic || '/profile-default.png'}
                                   user={petition.users.name}
                              />
                         ))}
                    </div>
               </div>
      </div>
    );
  };
  

const PetitionCard = () => {

    const actionButtonStyles = {
      background: 'black',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px'
    };
    
  return (
    <div className="petition-card" style={{
        background: 'linear-gradient(180deg, #FFF 16.15%, #888 100%)',
        color: 'black',
        marginBottom: '10px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid black',
        }}>
      <div className="petition-actions">
        <button className="sign" style={actionButtonStyles}>Sign</button>
        <button className="comments" style={actionButtonStyles}>Comment</button>
      </div>
      <div className="petition-info" >
        <h3><u>Title</u></h3>
        <p>This is a summary of the petition. It is a very useful and descriptive summary. I am so glad that this awesome website includes a summary to display for each petition.</p>
      </div>
    </div>
  );
};

export default UserProfile;
