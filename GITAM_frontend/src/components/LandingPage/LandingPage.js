import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    const goToDashboard = () => {
        window.location.href = "/dashboard";
    };

    return (
        <div className="container universityname">
            <h1>Greenness Investigation Tool for Analytical Method (GITAM) Software<br />
                developed by UNIVERSITY 
            </h1>
            <button className="explore-button" onClick={goToDashboard}>Let's explore</button>
        </div>
    );
};

export default LandingPage;
