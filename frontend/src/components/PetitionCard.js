import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient'; // Ensure you have your Supabase client correctly set up

const PetitionCard = ({ petitionID, userID }) => {
  const [signaturesCount, setSignaturesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch signatures count
      const { count, error: signaturesError } = await supabase
        .from('signatures')
        .select('*', { count: 'exact' })
        .eq('petitionID', petitionID);

      if (signaturesError) {
        console.error('Error fetching signatures count:', signaturesError);
      } else {
        setSignaturesCount(count);
      }

      // Fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('petitionID', petitionID);

      if (commentsError) {
        console.error('Error fetching comments:', commentsError);
      } else {
        setComments(commentsData);
      }
    };

    fetchData();
  }, [petitionID]);

  const handleSignPetition = async () => {
    const { error } = await supabase
      .from('signatures')
      .insert([{ userID, petitionID }]);

    if (error) {
      console.error('Error signing petition:', error);
    } else {
      setSignaturesCount(signaturesCount + 1);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('comments')
      .insert([{ text: newComment, petitionID }]);

    if (error) {
      console.error('Error posting comment:', error);
    } else {
      setComments([...comments, data[0]]);
      setNewComment('');
    }
  };

  const toggleComments = () => setShowComments(!showComments);

  return (
    <div className="petition-card">
      {/* JSX for the PetitionCard component */}
    </div>
  );
};

export default PetitionCard;
