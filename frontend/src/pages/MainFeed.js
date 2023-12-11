import React from "react";
import Popup from "../components/Popup";
import { useState} from 'react';


const MainFeed = () => {
     
     React.useEffect(() => {
          const originalStyle = window.getComputedStyle(document.body).overflow;
          document.body.style.overflow = 'hidden';

          return () => {
               document.body.style.overflow = originalStyle;
          }
     }, []);
     {/* variables for popup */}
     const [buttonPopup, setButtonPopup] = useState (false);

     return (
          <div className="main-feed-container" style={{
               display: 'flex',
               backgroundColor: 'white',
               height: '100vh',
               overflow: 'hidden'
          }}>
               
               <div className="petitions-container" style={{ flexGrow: '1', overflowY: 'hidden', background: 'linear-gradient(180deg, #000 16.15%, #FFF 100%)', color: 'white' }}>
                    {/* ADD button for petition  */}
                    
                    <div className= "New_petition_button" style={{ width:'86.5%', display: 'flex', justifyContent:'flex-end'}}>
                     <button onClick={()=> setButtonPopup(true)} style={{  borderRadius: '15px',width:'100px', height:'40px', }} >NEW</button>    
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
                         alignItems: 'center'
                    }}>
                         <PetitionCard />
                         <PetitionCard />
                         <PetitionCard />
                         <PetitionCard />
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
         justifyContent: 'space-between',
         border: '1px solid black',
         }}>
       <div className="petition-actions" style={{ display:'grid'}}>
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

export default MainFeed;