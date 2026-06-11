import React, {useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  
  return (
    <div>
      <div className="flex items-center justify-between">
              <div className="flex items-center justify-start  gap-4">
                <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeqtG57Uu7JPn6AOyafNXcwz_mlutmNqLG1Q&s" alt="" />
                <h4 className="text-lg font-medium">
                  {captain?.fullName?.firstName} {captain?.fullName?.lastName}
                </h4>
              </div>
              <div>
                <h4 className="text-xl font-semibold">$ 295.2</h4>
                <p className="">earned</p>
              </div>
             </div>
             <div className="flex p-5 bg-gray-100 rounded-3xl  justify-center gap-5 items-start m-2 ">
                <div className="text-center">
                <i class=" text-2xl font-thin ri-time-line"></i>
                <h5 className="text-lg font-medium">10.2</h5>
                <p>Hours Online</p>
                </div>
                <div className="text-center">
                <i class=" text-2xl font-thin ri-speed-up-line"></i>
                <h5 className="text-lg font-medium">10.2</h5>
                <p>Hours Online</p>
                </div>
                <div className="text-center">
                <i class=" text-2xl font-thin ri-booklet-line"></i>
                <h5 className="text-lg font-medium">10.2</h5>
                <p>Hours Online</p>
                </div>
             </div>
    </div>
  )
}

export default CaptainDetails
