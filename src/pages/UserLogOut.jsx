import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogOut = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem('token'); // Remove the token from local storage
          navigate('/user/login'); // Navigate to the login page
        }
      } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message);
        navigate('/user/login'); // Redirect to login even if logout fails
      }
    };

    logout();
  }, [token, navigate]); // Dependency array ensures the function runs once on component mount

  return (
    <div>
      <h1 className="text-2xl">You have been logged out</h1>
    </div>
  );
};

export default UserLogOut;
