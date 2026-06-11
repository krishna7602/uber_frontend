import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const captainToken = localStorage.getItem('token');
        
        // Check for token and navigate to login if absent
        if (!captainToken) {
            navigate('/captain/login');
            return;
        }

        // Fetch captain profile
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
                headers: {
                    Authorization: `Bearer ${captainToken}`,
                },
            })
            .then((response) => {
                setCaptain(response.data.captain);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                navigate('/captain/login');
            });
    }, [navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {localStorage.getItem('token') ? children : null}
        </div>
    );
};

export default CaptainProtectedWrapper;
