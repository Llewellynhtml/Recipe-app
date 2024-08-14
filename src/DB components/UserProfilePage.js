import React from 'react';
import { Link } from 'react-router-dom';

function UserProfilePage({ user }) {
  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <Link to="/edit-profile">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
}

export default UserProfilePage;
