import React, { useState } from 'react';
import axios from 'axios';
import'./App.css';

const LoginPage = ({ setToken }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const sendOtp = async () => {
    try {
      const response = await axios.post(
        'https://storebh.bhaaraterp.com/api/login/',
        {
          mobile_number: mobileNumber,
        }
      );
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        'https://storebh.bhaaraterp.com/api/verify-login-otp/',
        {
          mobile_otp: otp,
          mobile_number: mobileNumber,
          type: 'web',
          registration_token: '',
        }
      );
      setToken(response.data.token); // Assuming the API returns a "token"
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className='container'>
      <div className='image'>
        <img src= "image.png" id="Img"alt='image'/>
      </div>
      <div className='login-area'>
      <h2>Login Page</h2>
      <h2>Welcome</h2>
      <p>Enter your Mobile number to start Shopping</p>
      {otpSent ? (
        <>
        <p>Kindly input the OTP that was sent to your mobile.</p>
          <input type="text" placeholder="Enter OTP" value={otp} 
          onChange={(e) => setOtp(e.target.value)}/>
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      ) : (
        <>
          <input type="text" placeholder="Enter Mobile Number" value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
/> <br /><br />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      </div>
    </div>
  );
};

export default LoginPage;
