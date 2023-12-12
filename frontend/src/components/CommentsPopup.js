import React, { useState } from 'react';
import { supabase } from '../App';
import './Popup.css';

function CommentsPopup({ trigger, setTrigger, petitionId }) {
    const [comment, setComment] = useState('');

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
            </div>
        </div>
    ) : "";
}

export default CommentsPopup;
