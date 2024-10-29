import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfilePage({ user, updateUser }) {
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUpdateProfile = () => {
    updateUser(updatedUser);
    navigate('/profile');
  };

  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>
      <input
        type="text"
        name="username"
        value={updatedUser.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={updatedUser.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <button onClick={handleUpdateProfile}>Save Changes</button>
    </div>
  );
}

export default EditProfilePage;
