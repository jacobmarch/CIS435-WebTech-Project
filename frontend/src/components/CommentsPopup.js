import React, { useState, useEffect } from 'react';
import { supabase } from '../App';
import './Popup.css';

function CommentsPopup({ trigger, setTrigger, petitionId }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if(trigger) {
            fetchComments();
        }
    }, [trigger, petitionId]);

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select(`commentID,
            userID,
            commentText,
            petitionID,
            users!inner (
                userID,
                name
            )`)
            .eq('petitionID', petitionId);
        if(error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = supabase.auth.getUser();

        if (!user) {
            alert('You must be logged in to comment');
            return;
        }

        const { data, error } = await supabase
            .from('comments')
            .insert([
                { petitionID: petitionId, commentText: comment, userID: (await user).data.user.id }
            ]);

        if (error) {
            console.error('Error posting comment:', error);
        } else {
            console.log('Comment added:', data);
            // Reset comment field and close the popup
            setComment('');
            setTrigger(false);
        }
    };

    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => setTrigger(false)}>close</button>
                <form className="popup-form" onSubmit={handleSubmit}>
                    <label>Comment:</label>
                    <textarea 
                        maxLength={150}
                        style={{ /* Your Textarea Style Here */ }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <input type="submit" value="Submit Comment" />
                </form>
                <div className="comments-section">
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <strong>{comment.users.name}: </strong>{comment.commentText}
                    </div>
                ))}
            </div>
            </div>
        </div>
    ) : "";
}

export default CommentsPopup;
