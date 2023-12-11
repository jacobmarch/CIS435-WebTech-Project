import React, { useState } from 'react';

/**
 * Renders the component for displaying petition information on main feed or profile page.
 *
 * @return {JSX.element} The petition component.
 */
const Petition = ({ title, description, onSign, onComment }) => {
    const [commentText, setCommentText] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);

    const handleSignClick = () => {
        // Call the onSign function to handle signing logic
        onSign();
    };

    const handleCommentClick = () => {
        // Toggle the comment input interface
        setIsCommenting(!isCommenting);
    };

    const handleCommentSubmit = () => {
        // Call the onComment function to handle comment submission
        onComment(commentText);
        setCommentText('');
        setIsCommenting(false);
    };

    return (
        <div className="petition-container">
            <div className="header-section">
                <div className="title-section">
                    <h2>{title}</h2>
                </div>
            </div>
            <div className="petition-summary">
                <p>{description}</p>
            </div>
            <div className="actions-section">
                <button className="sign-button" onClick={handleSignClick}>
                    Sign
                </button>
                <button className="comments-button" onClick={handleCommentClick}>
                    {isCommenting ? 'Cancel' : 'Comment'}
                </button>
            </div>
            {isCommenting && (
                <div className="comment-input">
                    <textarea
                        rows="4"
                        cols="50"
                        placeholder="Write your comment here..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button className="comment-submit-button" onClick={handleCommentSubmit}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Petition;
