import React, { useState } from 'react';
import './Popup.css';
import { supabase } from '../App';

function Popup(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Insert data into the Supabase database
        const { data, error } = await supabase
            .from('petitions')
            .insert([
                { title, description }
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
                    <input maxLength={26} style={{  marginBottom:'15px',borderRadius:'20px' , height:'25px'}} value={title} onChange={(e) => setTitle(e.target.value)} />

                    <label>Description</label>
                    <textarea maxLength={150} style={{ width: '100%',padding: '12px 20px', paddingBottom:'160px', boxSizing: 'border-box',border: '2px solid #ccc',borderRadius: '4px',backgroundColor: '#f8f8f8',fontSize: '16px', overflow: 'hidden',resize: 'none',}} value={description} onChange={(e) => setDescription(e.target.value)} />

                    <input type="submit" value="Submit" />
                </form>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;
