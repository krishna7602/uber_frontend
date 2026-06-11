import React from "react";
import { Link, useLocation } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Ridding = () => {
  const location = useLocation();
  const ride = location.state?.ride;

  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-gray-50">
      {/* Home Link */}
      <Link
        to="/home"
        className="fixed right-4 top-4 z-20 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        <i className="ri-home-5-line text-lg font-bold"></i>
      </Link>

      {/* Map Area */}
      <div className="flex-1 w-full">
        <LiveTracking />
      </div>

      {/* Ride Info Card */}
      <div className="bg-white p-6 shadow-2xl rounded-t-3xl z-30 lg:fixed lg:left-4 lg:bottom-4 lg:w-[400px] lg:rounded-3xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <img 
               className="h-12 w-16 object-contain" 
               src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367349/assets/d7/3d4b80-1571-11e9-82d0-3b59ed752368/original/Luxury-SUV.png" 
               alt="Car"
             />
             <div className="text-right flex-1">
               <h2 className="text-lg font-bold text-gray-900">
                 {ride?.captain?.fullName?.firstName || "Ramkrishna"}
               </h2>
               <h4 className="text-sm font-bold text-gray-500 uppercase tracking-tighter">
                 {ride?.captain?.vehicle?.plate || "WB 57 AB 3333"}
               </h4>
               <p className="text-xs text-gray-400">
                 {ride?.captain?.vehicle?.vehicleType || "Maruti Suzuki Alto"}
               </p>
             </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
            <i className="ri-map-pin-2-fill text-green-500 text-lg mt-0.5"></i>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Destination</p>
              <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                {ride?.destination || "uttarpara, berhampore"}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
             <div className="flex items-center gap-4">
                <i className="ri-money-rupee-circle-fill text-blue-600 text-lg"></i>
                <div>
                   <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Fare</p>
                   <h3 className="text-sm font-bold text-blue-900">₹{ride?.fare || "20"}</h3>
                </div>
             </div>
             <div className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">
                Cash Payment
             </div>
          </div>
        </div>

        <button className="w-full py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-900 transition-all shadow-lg active:scale-[0.98]">
           Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Ridding;
