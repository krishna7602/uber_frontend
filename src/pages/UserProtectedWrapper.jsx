import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    
    // Check for token and navigate to login if absent
    if (!userToken) {
      navigate('/user/login');
      return;
    }

    // Fetch user profile
    axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        .then((response) => {
            setUser(response.data.user);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error);
            navigate('/user/login');
        });
  }, [navigate, setUser]);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div>
      {localStorage.getItem('token') ? children : null}
    </div>
  );
};

export default UserProtectedWrapper;
