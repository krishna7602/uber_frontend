import React from "react";
import { Link, useLocation } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;

  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="fixed p-4 top-0 z-20 flex items-center justify-between w-full pointer-events-none">
        <img
          className="w-14 pointer-events-auto drop-shadow-md"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-lg pointer-events-auto"
        >
          <i className="ri-home-4-line text-lg"></i>
        </Link>
      </div>

      {/* Map Area - Fills remaining space */}
      <div className="flex-1 w-full">
        <LiveTracking />
      </div>

      {/* Ride Details / Controls Sidebar/Footer */}
      <div className="bg-white p-6 shadow-2xl rounded-t-3xl z-30 lg:fixed lg:right-4 lg:bottom-4 lg:w-[400px] lg:rounded-3xl border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">On Trip</h4>
            <h3 className="text-xl font-bold text-gray-900">Heading to Destination</h3>
          </div>
          <div className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
            ₹{rideData?.fare || "--"}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <i className="ri-map-pin-line text-blue-600"></i>
             </div>
             <p className="text-sm text-gray-600 line-clamp-1">{rideData?.destination || "Destination"}</p>
          </div>
        </div>

        <Link
          to="/captain/home"
          className="w-full block text-center py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-900 transition-all shadow-lg"
        >
          Complete Ride
        </Link>
      </div>
    </div>
  );
};

export default CaptainRiding;
