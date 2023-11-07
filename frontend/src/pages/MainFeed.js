import React from "react";


const MainFeed = () => {
     React.useEffect(() => {
          const originalStyle = window.getComputedStyle(document.body).overflow;
          document.body.style.overflow = 'hidden';

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
               
               <div className="petitions-container" style={{ flexGrow: '1', overflowY: 'hidden', background: 'linear-gradient(180deg, #000 16.15%, #FFF 100%)', color: 'white' }}>
                    <h2>Main Petition Feed</h2>
                    <div className="petitions-list" style={{
                         overflowY: 'auto', // Enable scrolling
                         maxHeight: 'calc(100vh - 60px)', // Set maximum height (viewport height minus some offset)
                         padding: '200px',
                         display: 'flex',
                         flexDirection: 'column'
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
          marginTop: '10px'
     };

     return (
          <div className="petition-card" style={{
               background: 'white',
               color: 'black',
               marginBottom: '10px',
               padding: '20px',
               display: 'flex',
               justifyContent: 'space-between',
               border: '1px solid black',
               width: '100%',
               height: '100%',
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

export default MainFeed;