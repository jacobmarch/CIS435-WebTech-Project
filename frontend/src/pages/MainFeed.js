import React from "react";
import Popup from "../components/Popup";
import { useState } from 'react';
import { supabase } from '../App';


const MainFeed = () => {
const [petitions, setPetitions] = useState([]);
     React.useEffect(() => {
          const originalStyle = window.getComputedStyle(document.body).overflow;
          document.body.style.overflow = 'hidden';

          const fetchPetitions = async () => {
               const {data, error} = await supabase
               .from('petitions')
               .select(`
                    petitionid,
                    title,
                    description,
                    createduserid,
                    categoryid,
                    users!inner (
                         userid,
                         profilepic,
                         name
                    )
               `);

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
     {/* variables for popup */ }
     const [buttonPopup, setButtonPopup] = useState(false);

     return (
          <div className="main-feed-container" style={{
               display: 'flex',
               backgroundColor: 'white',
               height: '100vh',
               overflow: 'hidden'
          }}>

               <div className="petitions-container" style={{ flexGrow: '1', overflowY: 'hidden', background: 'linear-gradient(180deg, #000 16.15%, #FFF 100%)', color: 'white' }}>
                    {/* ADD button for petition  */}

                    <div className="New_petition_button" style={{ width: '86.5%', display: 'flex', justifyContent: 'flex-end' }}>
                         <button onClick={() => setButtonPopup(true)} style={{ borderRadius: '15px', width: '100px', height: '40px', }} >NEW</button>
                         <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                             
                         </Popup>
                    </div>

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

export default MainFeed;