import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = ({ token }) => {
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    date_of_birth: '',
    profile_picture: '',
  });

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        'https://storebh.bhaaraterp.com/api/my-profile/',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [token]);

  const updateProfile = async () => {
    try {
      const response = await axios.post(
        'https://storebh.bhaaraterp.com/api/update-profile/',
        profileData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Profile updated:', response.data);
      // You can handle success feedback here
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({ ...profileData, profile_picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='container'>
      <div className='image'>
        <img src= "image.png" id="Img"alt='image'/>
      </div>
      <div className="Profile_data">
      <h2>Fill your Information for Profile Data</h2>
      <label>
        First Name:
        <input type="text" value={profileData.first_name}
          onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })
          }
        />
      </label>
      <br /><br />
      <label>
        Last Name:
        <input type="text" value={profileData.last_name}onChange={(e) =>
         setProfileData({ ...profileData, last_name: e.target.value })}
        />
      </label><br /><br />
      <label>
        Email:
        <input type="text"value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })
          }/>
      </label>
      <br /><br />
      <label>
        Date of Birth:
        <input
          type="text" value={profileData.date_of_birth}
          onChange={(e) => setProfileData({ ...profileData, date_of_birth: e.targetvalue })
          }/>
      </label><br /><br />
      <label>
        Profile Picture:
        <input type="file" accept="image/*" onChange={handleProfilePictureChange}/>
      </label><br /><br />
      {profileData.profile_picture && (
        <img src={profileData.profile_picture} alt="Profile Picture"
          style={{ maxWidth: '100px', maxHeight: '100px' }} />
      )}
      <br /><br />
      <button onClick={updateProfile}>Update Profile</button>
      </div>
    </div>
  );
};

export default ProfilePage;
