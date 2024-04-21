// ProfilePage.js
import React from 'react';
import './Profile.css'

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <div className="card">
        <img src="https://via.placeholder.com/150" alt="Team Member 1" />
        <div className="card-content">
          <h3>Team Member 1</h3>
          <p>Role: Designer</p>
          <p>Experience: 3 years</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;