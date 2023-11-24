// src/App.js
import React, { useState } from 'react';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';

function App() {
  const [token, setToken] = useState('');

  return (
    <div>
      {token ? (
        <ProfilePage token={token} />
      ) : (
        <LoginPage setToken={setToken} />
      )}
    </div>
  );
}

export default App;
