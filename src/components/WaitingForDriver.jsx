import React from "react";

const WaitingForDriver = (props) => {
  const ride = props.ride;

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-4">
        <i className="ri-check-double-line text-green-500 mr-1"></i>
        Driver Assigned!
      </h3>

      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <i className="ri-user-3-fill text-xl text-gray-500"></i>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-gray-900">
            {ride?.captain?.fullName?.firstName || "Driver"}
          </h4>
          <p className="text-xs text-gray-500">
            {ride?.captain?.vehicle?.plate || "Vehicle info"}
          </p>
          <p className="text-xs text-gray-400">
            {ride?.captain?.vehicle?.vehicleType || "Car"}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {ride?.otp && (
          <div className="flex items-center justify-between gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <div>
              <p className="text-xs font-bold text-yellow-700 uppercase tracking-widest">
                Share this OTP
              </p>
              <p className="text-xl font-bold text-gray-900 tracking-[0.35em] mt-1">
                {ride.otp}
              </p>
            </div>
            <i className="ri-shield-keyhole-line text-2xl text-yellow-600"></i>
          </div>
        )}
        <div className="flex items-start gap-3 p-2.5 bg-green-50 rounded-lg">
          <i className="ri-map-pin-2-fill text-green-600 mt-0.5"></i>
          <p className="text-sm text-gray-700 line-clamp-2">
            {ride?.pickup || "Pickup location"}
          </p>
        </div>
        <div className="flex items-start gap-3 p-2.5 bg-red-50 rounded-lg">
          <i className="ri-map-pin-line text-red-500 mt-0.5"></i>
          <p className="text-sm text-gray-700 line-clamp-2">
            {ride?.destination || "Destination"}
          </p>
        </div>
        <div className="flex items-center gap-3 p-2.5 bg-blue-50 rounded-lg">
          <i className="ri-money-rupee-circle-line text-blue-600"></i>
          <p className="text-sm font-semibold text-gray-800">
            ₹{ride?.fare || "--"}
          </p>
        </div>
      </div>

      <button
        onClick={() => props.setDriverFound(false)}
        className="w-full py-2.5 border-2 border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-all text-sm"
      >
        Close
      </button>
    </div>
  );
};

export default WaitingForDriver;
