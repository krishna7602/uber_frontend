import React from "react";

const LookingForDreiver = (props) => {
  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
          <div className="animate-spin">
            <i className="ri-loader-4-line text-3xl text-black"></i>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Looking for a Driver
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Please wait while we find a driver near you...
        </p>
      </div>

      <div className="space-y-2 text-left">
        <div className="flex items-start gap-3 p-2.5 bg-green-50 rounded-lg">
          <i className="ri-map-pin-2-fill text-green-600 mt-0.5"></i>
          <p className="text-sm text-gray-700 line-clamp-2">
            {props.pickup || "Pickup location"}
          </p>
        </div>
        <div className="flex items-start gap-3 p-2.5 bg-red-50 rounded-lg">
          <i className="ri-map-pin-line text-red-500 mt-0.5"></i>
          <p className="text-sm text-gray-700 line-clamp-2">
            {props.destination || "Destination"}
          </p>
        </div>
        {props.ride?.otp && (
          <div className="flex items-center gap-3 p-2.5 bg-yellow-50 rounded-lg border border-yellow-100">
            <i className="ri-shield-keyhole-line text-yellow-600"></i>
            <div>
              <p className="text-xs font-bold text-yellow-700 uppercase tracking-widest">
                Your OTP
              </p>
              <p className="text-lg font-bold text-gray-900 tracking-[0.35em]">
                {props.ride.otp}
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => props.setVehicleFound(false)}
        className="w-full mt-4 py-2.5 border-2 border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-all text-sm"
      >
        Cancel
      </button>
    </div>
  );
};

export default LookingForDreiver;
