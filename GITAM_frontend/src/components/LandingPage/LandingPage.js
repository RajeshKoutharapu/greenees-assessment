import React from 'react';
import './LandingPage.css';
import bgImage from '../../backgroundImages/homepageimage.jpeg';

const LandingPage = () => {
    const goToDashboard = () => {
        window.location.href = "/dashboard";
    };

    return (
        <div className="landing-container" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="overlay">
                <div className="content-box text-center text-white">
                    <h1 className="display-5 fw-bold mb-5">
                        GITAM (Greenness Investigation Tool for Analytical Method) Software
                      
                    </h1>
                    <div className="row mb-4">
                        <div className="col-md-4 text-start">
                            <h5>Created By:</h5>
                            <ul>
                                <li>Leela Prasad Kowtharapu</li>
                                <li>Siva Krishna Muchakayala</li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-center">
                            <h5>Guided By:</h5>
                            <ul>
                                <li>Vishnu Murthy Marisetti</li>
                                <li>Naresh Kumar Katari</li>
                                <li>Rambabu Gundla</li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-end">
                            <h5>Developed By:</h5>
                            <ul>
                                <li>Rajesh Koutharapu</li>
                            </ul>
                        </div>
                    </div>
                    <button className="btn btn-success btn-lg explore-button" onClick={goToDashboard}>
                        START
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
