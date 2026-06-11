import React, { useContext } from 'react'
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

const RidePopup = (props) => {
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  const handleDecline = () => {
    if (socket && props.rideData?._id) {
      socket.emit('decline-ride', {
        rideId: props.rideData._id,
        captainId: captain._id
      });
    }
    props.setRidePopup(false);
  };

  const handleConfirm = () => {
    props.setConfirmRidePopup(true);
  };

  if (!props.rideData) {
    return null;
  }

  return (
    <div>
      <h5
        onClick={handleDecline}
        className="text-center cursor-pointer mb-5 text-gray-600 hover:text-black transition"
      >
        <i className="ri-arrow-down-wide-fill text-2xl sm:text-3xl"></i>
      </h5>
      <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-center">
        New Ride Available
      </h3>

        <div className='flex justify-between'>
        <div className="flex items-center justify-start  gap-4">
                <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeqtG57Uu7JPn6AOyafNXcwz_mlutmNqLG1Q&s" alt="" />
                <h4 className="text-lg font-medium">{props.rideData.user?.fullName?.firstName} {props.rideData.user?.fullName?.lastName}</h4>
              </div>
              <div>
                <h4 className="text-lg font-semibold">{props.rideData.distance ? `${(props.rideData.distance / 1000).toFixed(1)}KM` : '2.2KM'}</h4> 
              </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className="w-full">
            <div className="flex items-center gap-5 p-3 mb-2">
                <i className=" text-lg ri-user-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">{props.rideData.user?.fullName?.firstName}</h3>
                    <p className="text-lg">Enjoy your ride</p>
                </div>
                </div>
                <div>
                <div className="flex items-center gap-5 p-3 mb-2">
                <i className=" text-lg ri-map-pin-line"></i>
                <div>
                    <h3 className="text-lg font-medium">{props.rideData.pickup}</h3>
                    <p className="text-lg text-gray-600">Pickup location</p>
                </div>
                </div>
                </div>
                <div>
                <div className="flex items-center gap-5 p-3 mb-2">
                <i className=" text-lg ri-map-pin-2-line"></i>
                <div>
                    <h3 className="text-lg font-medium">{props.rideData.destination}</h3>
                    <p className="text-lg text-gray-600">Destination</p>
                </div>
                </div>
                </div>
                <div>
                <div className="flex items-center gap-5 p-3 mb-2">
                <i className=" text-lg ri-money-dollar-circle-line"></i>
                <div>
                    <h3 className="text-lg font-medium">₹{props.rideData.fare}</h3>
                    <p className="text-lg">Fare</p>
                </div>
                </div>
                </div>

            </div>
        </div>

      <button onClick={handleConfirm}  className="w-full mb-2 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">
        Confirm Ride
      </button>
      <button onClick={handleDecline}  className="w-full mt-2 py-3 bg-red-300 text-white rounded-lg hover:bg-red-400 transition-all">
        Ignore
      </button>
    </div>
  )
}

export default RidePopup
