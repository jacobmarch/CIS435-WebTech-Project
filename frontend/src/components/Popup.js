import React, { useState } from 'react';
import './Popup.css';
import { supabase } from '../App';

function Popup(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = (await supabase.auth.getUser()).data.user.id;
        const category = 1;

        // Insert data into the Supabase database
        const { data, error } = await supabase
            .from('petitions')
            .insert([
                { title, description, createdUserID: user, categoryid: category }
            ]);

        if (error) {
            console.error('Error inserting data:', error);
        } else {
            console.log('Data inserted successfully:', data);
            // Reset form fields
            setTitle('');
            setDescription('');
            // Close the popup
            props.setTrigger(false);
        }
    };

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                <form className="popup-form" onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />

                    <label>Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} />

                    <input type="submit" value="Submit" />
                </form>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;
