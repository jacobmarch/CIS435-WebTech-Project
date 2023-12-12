import React from 'react';
import { useState} from 'react';
import { supabase } from '../App';

const UserProfile = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [petitions, setPetitions] = useState([]);
  let realID;
  
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
              setUserId(user.id);
              realID = user.id;
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
        
    
        //fetchUserData();

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
          .filter('users.userID', 'eq', realID);

          if (error) {
               console.error('error fetching petitions: ', error)
          } else {
               setPetitions(data)
               console.log(data)
          }
     };
     //fetchPetitions();

     const intervalId = setInterval(fetchUserData, 2500); // 2500 milliseconds = 2.5 seconds
     const intervalId2 = setInterval(fetchPetitions, 5000); // 5000 milliseconds = 5 seconds


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
  

  const PetitionCard = ({title, description, imageUrl, user}) => {
    const actionButtonStyles = {
         background: 'black',
         color: 'white',
         padding: '10px 20px',
         border: 'none',
         cursor: 'pointer',
         marginTop: '10px',
         borderRadius: '20px',
         margin: '5px'
    };
    
    return (
      <div className="petition-card" style={{
           background: 'linear-gradient(180deg, #FFF 16.15%, #888 100%)',
           color: 'black',
           marginBottom: '10px',
           padding: '20px',
           display: 'flex',
           alignItems: 'center',
           border: '1px solid black',
           borderRadius: '10px',
           minWidth: '75vw',
           maxWidth: '75vw'
         }}>
           <img src={imageUrl} alt="Profile" style={{
             width: '100px',
             height: '100px',
             borderRadius: '50%',
             marginRight: '20px',
           }} />
           <div className="container">
             <div className="username-container">
               <h3>{user}</h3>
             </div>
             <div className="petition-actions">
               <button className="sign" style={actionButtonStyles}>Sign</button>
               
               <button className="comments" style={actionButtonStyles}>Comment</button>
             </div>
           </div>
           <div className="petition-info" style={{marginLeft: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '50vw', maxWidth: '50vw'}}>
             <h3><u>{title}</u></h3>
             <p>{description}</p>
           </div>
      </div>
    );
};

export default UserProfile;
