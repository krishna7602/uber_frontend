import React from "react";

const VehiclePanel = (props) => {
  const vehicles = [
    {
      type: "car",
      name: "UberGo",
      seats: 4,
      eta: "2 mins away",
      desc: "Affordable, compact rides",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367349/assets/d7/3d4b80-1571-11e9-82d0-3b59ed752368/original/Luxury-SUV.png",
    },
    {
      type: "motorcycle",
      name: "UberMoto",
      seats: 1,
      eta: "3 mins away",
      desc: "Affordable motorcycle rides",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    },
    {
      type: "auto",
      name: "UberAuto",
      seats: 3,
      eta: "3 mins away",
      desc: "Affordable auto rides",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold mb-3 text-gray-900">Choose a Vehicle</h3>
      <div className="space-y-2">
        {vehicles.map((v) => (
          <div
            key={v.type}
            onClick={() => {
              props.setVehicleType(v.type);
              props.setConfirmRidePanel(true);
            }}
            className="flex border-2 border-gray-100 active:border-black hover:border-gray-300 rounded-xl w-full p-3 items-center justify-between cursor-pointer transition-all hover:shadow-sm"
          >
            <img
              className="h-12 w-16 object-contain"
              src={v.img}
              alt={v.name}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="ml-2 flex-1">
              <h4 className="font-semibold text-sm">
                {v.name}{" "}
                <span className="text-gray-500 font-normal">
                  <i className="ri-user-3-fill text-xs"></i>
                  {v.seats}
                </span>
              </h4>
              <h5 className="font-medium text-xs text-gray-500">{v.eta}</h5>
              <p className="text-xs text-gray-400">{v.desc}</p>
            </div>
            <h2 className="text-base font-bold text-gray-900 ml-2">
              ₹{props.fare[v.type] || "--"}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclePanel;