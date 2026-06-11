import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import LiveTracking from "../components/LiveTracking";
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from "axios";

const CaptainHome = () => {
  const [ridePopup, setRidePopup] = useState(false);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const [rideData, setRideData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  const { socket } = useContext(SocketContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);

  // Step state for UI: "dashboard" | "new-request" | "confirm-details"
  const [step, setStep] = useState("dashboard");

  // Join socket room on mount
  useEffect(() => {
    if (socket && captain?._id) {
      socket.emit("join", { userType: "captain", userId: captain._id });
      console.log('Captain joined socket room:', captain._id);
    }
  }, [socket, captain]);

  // Set initial status
  useEffect(() => {
    if (captain?.status) {
      setIsActive(captain.status === 'active');
    }
  }, [captain]);

  // Listen for new ride requests
  useEffect(() => {
    if (socket) {
      socket.on('new-ride-request', (data) => {
        console.log('Incoming real-time ride request:', data);
        setRideData(data.ride);
        setStep("new-request");
        setRidePopup(true);
      });

      return () => {
        socket.off('new-ride-request');
      };
    }
  }, [socket]);

  // Handle location updates
  const handleLocationChange = (location) => {
    if (socket && captain?._id && isActive) {
      socket.emit('update-location-captain', {
        userId: captain._id,
        location: location
      });
    }
  };

  const toggleStatus = async () => {
    try {
      setIsTogglingStatus(true);
      const newStatus = isActive ? 'inactive' : 'active';
      
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/toggle-status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      setIsActive(!isActive);
      setCaptain({ ...captain, status: newStatus });
    } catch (error) {
      console.error('Status toggle error:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to update status.';
      alert(errorMsg);
    } finally {
      setIsTogglingStatus(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row relative overflow-hidden bg-gray-50">
      {/* Map Area */}
      <div className="flex-1 relative">
        <img
          className="w-14 absolute left-4 top-4 z-20 drop-shadow-md"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        
        <div className="h-full w-full">
          <LiveTracking onLocationChange={handleLocationChange} />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[400px] h-full bg-white shadow-2xl flex flex-col z-30">
        <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-steering-2-line text-blue-600"></i>
              Captain Dashboard
            </h2>
          </div>
          
          {/* Right side of header: Toggle + Logout */}
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center cursor-pointer group">
              <span className={`mr-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-green-500' : 'text-gray-400'}`}>
                {isActive ? 'Online' : 'Offline'}
              </span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isActive} 
                  onChange={toggleStatus}
                  disabled={isTogglingStatus}
                />
                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
              </div>
            </label>
            
            <Link
              to="/captain/login"
              className="w-8 h-8 bg-gray-50 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              title="Logout"
            >
              <i className="ri-logout-box-r-line text-lg"></i>
            </Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {step === "dashboard" && (
            <div className="space-y-6">
              <CaptainDetails />
              
              {!isActive && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-xs text-blue-700 text-center font-medium leading-relaxed">
                      You are currently offline. Toggle the switch above or click the button below to start receiving ride requests.
                    </p>
                  </div>
                  
                  <button 
                    onClick={toggleStatus}
                    disabled={isTogglingStatus}
                    className="w-full py-4 bg-green-500 text-white font-bold rounded-2xl shadow-lg hover:bg-green-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <i className="ri-flashlight-line animate-pulse"></i>
                    GO ONLINE
                  </button>
                </div>
              )}
            </div>
          )}

          {step === "new-request" && (
            <RidePopup 
              rideData={rideData} 
              setConfirmRidePopup={() => setStep("confirm-details")} 
              setRidePopup={(val) => {
                if(!val) setStep("dashboard");
                setRidePopup(val);
              }}
            />
          )}

          {step === "confirm-details" && (
            <ConfirmRidePopup 
              rideData={rideData} 
              setConfirmRidePopup={(val) => {
                if(!val) setStep("new-request");
                setConfirmRidePopup(val);
              }} 
              setRidePopup={setRidePopup}
            />
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
           <div className="flex justify-between items-center text-xs text-gray-400">
             <span>v1.2.0-beta</span>
             <span>ID: {captain?._id?.substring(0, 8)}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
