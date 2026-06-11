import React from "react";

const ConfirmedRide = (props) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-gray-900 text-center">
        Confirm Your Ride
      </h3>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
          <i className="ri-map-pin-2-fill text-green-600 text-lg mt-0.5"></i>
          <div>
            <p className="text-xs text-gray-500 font-medium">PICKUP</p>
            <p className="text-sm font-medium text-gray-800 line-clamp-2">
              {props.pickUp || "Not set"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
          <i className="ri-map-pin-line text-red-500 text-lg mt-0.5"></i>
          <div>
            <p className="text-xs text-gray-500 font-medium">DESTINATION</p>
            <p className="text-sm font-medium text-gray-800 line-clamp-2">
              {props.destination || "Not set"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <i className="ri-money-rupee-circle-line text-blue-600 text-lg"></i>
          <div>
            <p className="text-xs text-gray-500 font-medium">VEHICLE & FARE</p>
            <p className="text-sm font-medium text-gray-800">
              {props.vehicleType?.charAt(0).toUpperCase() +
                props.vehicleType?.slice(1) || "Not selected"}{" "}
              — ₹{props.fare[props.vehicleType] || "--"}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          props.createRide();
        }}
        className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all text-sm"
      >
        <i className="ri-check-line mr-1"></i>
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmedRide;