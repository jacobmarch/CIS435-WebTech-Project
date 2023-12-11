import React, { useState, useEffect } from 'react';
import { supabase, handleSignPetition, handleSubmitComment } from '../App';

const MainFeed = () => {
    const [petitions, setPetitions] = useState([]);
    const [comments, setComments] = useState([]); // Example state for comments
    const [signedPetitions, setSignedPetitions] = useState([]); // Example state for signed petitions

    useEffect(() => {
        // Fetch petitions and other data when the component mounts
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
    }, []);

    const onSignPetition = async (petitionId) => {
        const success = await handleSignPetition(petitionId);
        if (success) {
            console.log('Petition signed successfully');
            // Update the UI by adding the petition to the signedPetitions state
            setSignedPetitions((prevSignedPetitions) => [...prevSignedPetitions, petitionId]);
        } else {
            console.error('Error signing petition');
        }
    };

    const onSubmitComment = async (petitionId, comment) => {
        const success = await handleSubmitComment(petitionId, comment);
        if (success) {
            console.log('Comment submitted successfully');
            // Update the UI by adding the comment to the comments state
            setComments((prevComments) => [...prevComments, { petitionId, text: comment }]);
        } else {
            console.error('Error submitting comment');
        }
    };

    return (
        <div className="main-feed-container">
            <div className="petitions-container">
                <h2 className="main-feed-title">Main Petition Feed</h2>
                <div className="petition-list">
                    {petitions.map((petition) => (
                        <PetitionCard
                            key={petition.petitionid}
                            title={petition.title}
                            description={petition.description}
                            imageUrl={petition.users.profilepic || '/profile-default.png'}
                            user={petition.users.name}
                            onSign={() => onSignPetition(petition.petitionid)}
                            onComment={(comment) => onSubmitComment(petition.petitionid, comment)}
                            isSigned={signedPetitions.includes(petition.petitionid)} // Check if the petition is signed
                            comments={comments.filter((c) => c.petitionId === petition.petitionid)} // Filter comments for this petition
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const PetitionCard = ({
    title,
    description,
    imageUrl,
    user,
    onSign,
    onComment,
    isSigned,
    comments,
}) => {
    const actionButtonStyles = {
        background: 'black',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '15px',
        marginRight: '10px',
    };

    return (
        <div className="petition-card">
            <img
                src={imageUrl}
                alt="Profile"
                className="profile-image" // CSS class for profile image
            />
            <div className="container">
                <div className="username-container">
                    <h3 className="username">{user}</h3>
                </div>
                <div className="petition-actions">
                    <button
                        className={`sign-button ${isSigned ? 'signed' : ''}`} // Apply 'signed' class when signed
                        style={actionButtonStyles}
                        onClick={onSign}
                        disabled={isSigned}
                    >
                        {isSigned ? 'Signed' : 'Sign'}
                    </button>

                    <button
                        className="comment-button" // CSS class for comment button
                        style={actionButtonStyles}
                        onClick={() => {
                            const comment = prompt('Enter your comment:');
                            if (comment) {
                                onComment(comment);
                            }
                        }}
                    >
                        Comment
                    </button>
                </div>
            </div>
            <div className="petition-info">
                <h3 className="petition-title">
                    <u>{title}</u>
                </h3>
                <p className="petition-description">{description}</p>
                <div className="comments-section">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <strong>{comment.user}:</strong> {comment.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainFeed;
