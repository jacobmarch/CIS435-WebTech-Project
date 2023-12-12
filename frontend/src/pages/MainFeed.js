import React, { useState, useEffect } from 'react';
import { supabase } from '../App';
import PetitionCard from '../components/PetitionCard';

const MainFeed = () => {
  const [petitions, setPetitions] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const fetchPetitions = async () => {
      const { data, error } = await supabase
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
        console.error('Error fetching petitions:', error);
      } else {
        setPetitions(data);
      }
    };

    fetchPetitions();

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleSignPetition = async (petitionId) => {
    const user = supabase.auth.user();

    if (user) {
      // Check if the user has already signed the petition
      const { data: existingSignatures, error: signatureError } = await supabase
        .from('signatures')
        .select('petitionid')
        .eq('userid', user.id)
        .eq('petitionid', petitionId);

      if (signatureError) {
        console.error('Error checking existing signature:', signatureError);
        return;
      }

      if (existingSignatures.length > 0) {
        console.log(`You have already signed this petition with ID: ${petitionId}`);
      } else {
        // Insert a new signature
        const { data: newSignature, error: insertError } = await supabase
          .from('signatures')
          .insert([
            {
              petitionid: petitionId,
              userid: user.id,
            },
          ]);

        if (insertError) {
          console.error('Error signing the petition:', insertError);
        } else {
          console.log(`Signed petition with ID: ${petitionId}`);
        }
      }
    }
  };

  const handleCommentPetition = async (petitionId) => {
    const user = supabase.auth.user();

    if (user) {
      // Implement logic to add a comment to the petition
      // You can use Supabase or your preferred backend service here
      const commentText = 'This is a test comment. Replace with user input.';
      const { data: newComment, error: commentError } = await supabase
        .from('comments')
        .insert([
          {
            petitionid: petitionId,
            userid: user.id,
            text: commentText,
          },
        ]);

      if (commentError) {
        console.error('Error adding a comment:', commentError);
      } else {
        console.log(`Commented on petition with ID: ${petitionId}`);
      }
    }
  };

  return (
    <div className="main-feed-container" style={{ display: 'flex', backgroundColor: 'white', height: '100vh', overflow: 'hidden' }}>
      <div className="petition-list" style={{
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 200px)',
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
            onSign={() => handleSignPetition(petition.petitionid)}
            onComment={() => handleCommentPetition(petition.petitionid)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainFeed;
