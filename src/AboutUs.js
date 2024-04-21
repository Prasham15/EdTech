import React from 'react';
import './About.css';

const AboutUs = () => {
    return (
        <div>
            <div className='about_center'>About Us</div>
            <div className="card-container-1">
                <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Team Member 1" />
                    <div className="card-content">
                        <h3>Team Member 1</h3>
                        <p>Role: Developer</p>
                        <p>Experience: 5 years</p>
                    </div>
                </div>
                <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Team Member 2" />
                    <div className="card-content">
                        <h3>Team Member 2</h3>
                        <p>Role: Designer</p>
                        <p>Experience: 3 years</p>
                    </div>
                </div>
            </div>
            <div className='card-container-2'>
                <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Team Member 3" />
                    <div className="card-content">
                        <h3>Team Member 3</h3>
                        <p>Role: Manager</p>
                        <p>Experience: 7 years</p>
                    </div>
                </div>
                <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Team Member 4" />
                    <div className="card-content">
                        <h3>Team Member 4</h3>
                        <p>Role: Engineer</p>
                        <p>Experience: 4 years</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
