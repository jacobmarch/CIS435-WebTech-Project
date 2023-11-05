import React, { useState } from "react";
import { Link } from 'react-router-dom';

/**
 * Renders the component for displaying petition information on main feed or profile page.
 *
 * @return {JSX.element} The petition component.
 */
const Petition = () => {

    return (
        <div className="petition-container">
            <div className="header-section">
                <div className="image-section">
                    <img src="/user_alt.svg" alt="Profile"/>
                </div>
                <div className="title-section">
                    Title
                </div>
            </div>
            <div className="petition-summary">
                Petition Summary
            </div>
            <div className="actions-section">
                <button className="sign-button">Sign</button>
                <button className="comments-button">Comments</button>
            </div>
        </div>
    );
}