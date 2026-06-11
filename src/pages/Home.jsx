import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPannel from "../components/LocationSearchPannel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDreiver from "../components/LookingForDreiver";
import WaitingForDriver from "../components/WaitingForDriver";
import LiveTracking from "../components/LiveTracking";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  // Step-based flow: "search" | "vehicle" | "confirm" | "looking" | "waiting"
  const [step, setStep] = useState("search");

  // Mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pickupDebounceRef = useRef(null);
  const destinationDebounceRef = useRef(null);

  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  // Join socket room on mount
  useEffect(() => {
    if (socket && user?._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [socket, user]);

  // Listen for ride accepted event
  useEffect(() => {
    if (socket) {
      socket.on("ride-accepted", (data) => {
        console.log("Ride accepted:", data);
        setRide(data.ride);
        setStep("waiting");
      });

      socket.on("ride-started", (data) => {
        console.log("Ride started:", data);
        navigate("/riding", { state: { ride: data.ride } });
      });

      return () => {
        socket.off("ride-accepted");
        socket.off("ride-started");
      };
    }
  }, [socket, navigate]);

  // --- Handlers ---

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);

    if (value.length < 3) {
      setPickupSuggestions([]);
      return;
    }

    if (pickupDebounceRef.current) clearTimeout(pickupDebounceRef.current);
    pickupDebounceRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPickupSuggestions(response.data);
      } catch (error) {
        console.error("Pickup suggestion error:", error.response?.data || error.message);
        setPickupSuggestions([]);
      }
    }, 500);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length < 3) {
      setDestinationSuggestions([]);
      return;
    }

    if (destinationDebounceRef.current)
      clearTimeout(destinationDebounceRef.current);
    destinationDebounceRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDestinationSuggestions(response.data);
      } catch (error) {
        console.error("Destination suggestion error:", error.response?.data || error.message);
        setDestinationSuggestions([]);
      }
    }, 500);
  };

  async function findTrip() {
    if (pickup.length < 3 || destination.length < 3) {
      alert("Please enter valid pickup and destination locations");
      return;
    }

    setStep("vehicle");
    setActiveField(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data);
    } catch (error) {
      console.error("Error getting fare:", error);
      setFare({ auto: 50, car: 120, motorcycle: 30 });
    }
  }

  const createRide = async () => {
    if (!pickup || pickup.length < 3) {
      alert("Please enter a valid pickup location");
      return;
    }
    if (!destination || destination.length < 3) {
      alert("Please enter a valid destination");
      return;
    }
    if (!vehicleType) {
      alert("Please select a vehicle type");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup: pickup.trim(),
          destination: destination.trim(),
          vehicleType: vehicleType.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Ride created:", response.data);
      setRide(response.data);
      setStep("looking");
    } catch (error) {
      console.error("Error creating ride:", error.response?.data || error.message);
      const errorMsg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.error ||
        "Failed to create ride. Please try again.";
      alert(errorMsg);
    }
  };

  const resetFlow = () => {
    setStep("search");
    setPickup("");
    setDestination("");
    setPickupSuggestions([]);
    setDestinationSuggestions([]);
    setFare({});
    setVehicleType(null);
    setRide(null);
    setActiveField(null);
  };

  // --- Step titles ---
  const stepTitles = {
    search: "Find a Ride",
    vehicle: "Choose Vehicle",
    confirm: "Confirm Ride",
    looking: "Finding Driver",
    waiting: "Driver Found",
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row relative overflow-hidden bg-gray-100">
      {/* ===== Map Area ===== */}
      <div className="flex-1 relative">
        {/* Logo */}
        <img
          className="w-14 absolute left-4 top-4 z-20 drop-shadow-lg"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        {/* Mobile toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden absolute right-4 top-4 z-20 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
        >
          <i
            className={`ri-${sidebarOpen ? "close" : "menu"}-line text-xl`}
          ></i>
        </button>

        <div className="h-full w-full">
          <LiveTracking />
        </div>
      </div>

      {/* ===== Right Sidebar ===== */}
      <div
        className={`
          fixed lg:relative right-0 top-0 h-full z-30
          w-full sm:w-[400px] lg:w-[400px]
          bg-white shadow-2xl lg:shadow-lg
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            {step !== "search" && step !== "looking" && step !== "waiting" && (
              <button
                onClick={() => {
                  if (step === "vehicle") setStep("search");
                  if (step === "confirm") setStep("vehicle");
                }}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <i className="ri-arrow-left-s-line text-lg"></i>
              </button>
            )}
            <h2 className="text-lg font-bold text-gray-900">
              <i className="ri-map-pin-line mr-1 text-blue-600"></i>
              {stepTitles[step]}
            </h2>
          </div>
          {/* Close on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* Sidebar Content - scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* ---- STEP: SEARCH ---- */}
          {step === "search" && (
            <div className="space-y-3">
              {/* Pickup Input */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Pickup Location
                </label>
                <div className="relative">
                  <i className="ri-map-pin-2-fill absolute left-3 top-3 text-green-500"></i>
                  <input
                    onClick={() => setActiveField("pickup")}
                    value={pickup}
                    onChange={handlePickupChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    type="text"
                    placeholder="Enter pickup location"
                  />
                  {pickup && (
                    <button
                      onClick={() => {
                        setPickup("");
                        setPickupSuggestions([]);
                      }}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      <i className="ri-close-circle-fill"></i>
                    </button>
                  )}
                </div>

                {/* Pickup Suggestions */}
                {activeField === "pickup" && pickupSuggestions.length > 0 && (
                  <div className="mt-1 max-h-40 overflow-y-auto border border-gray-100 rounded-xl bg-white shadow-sm">
                    <LocationSearchPannel
                      suggestions={pickupSuggestions}
                      setPickup={(val) => {
                        setPickup(val);
                        setPickupSuggestions([]);
                        setActiveField("destination");
                      }}
                      setDestination={setDestination}
                      activeField="pickup"
                    />
                  </div>
                )}
              </div>

              {/* Destination Input */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Destination
                </label>
                <div className="relative">
                  <i className="ri-map-pin-line absolute left-3 top-3 text-red-400"></i>
                  <input
                    onClick={() => setActiveField("destination")}
                    value={destination}
                    onChange={handleDestinationChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    type="text"
                    placeholder="Where to?"
                  />
                  {destination && (
                    <button
                      onClick={() => {
                        setDestination("");
                        setDestinationSuggestions([]);
                      }}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      <i className="ri-close-circle-fill"></i>
                    </button>
                  )}
                </div>

                {/* Destination Suggestions */}
                {activeField === "destination" &&
                  destinationSuggestions.length > 0 && (
                    <div className="mt-1 max-h-40 overflow-y-auto border border-gray-100 rounded-xl bg-white shadow-sm">
                      <LocationSearchPannel
                        suggestions={destinationSuggestions}
                        setPickup={setPickup}
                        setDestination={(val) => {
                          setDestination(val);
                          setDestinationSuggestions([]);
                          setActiveField(null);
                        }}
                        activeField="destination"
                      />
                    </div>
                  )}
              </div>

              {/* Find Ride Button */}
              <button
                onClick={findTrip}
                disabled={pickup.length < 3 || destination.length < 3}
                className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                <i className="ri-search-line"></i>
                Find a Ride
              </button>
            </div>
          )}

          {/* ---- STEP: VEHICLE ---- */}
          {step === "vehicle" && (
            <div>
              {/* Show selected locations */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-map-pin-2-fill text-green-500"></i>
                  <span className="text-gray-600 truncate">{pickup}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-map-pin-line text-red-400"></i>
                  <span className="text-gray-600 truncate">{destination}</span>
                </div>
              </div>
              <hr className="mb-4 border-gray-100" />

              <VehiclePanel
                createRide={createRide}
                setVehicleType={setVehicleType}
                fare={fare}
                setConfirmRidePanel={() => setStep("confirm")}
                setVehiclePanelOpen={() => {}}
                setSelectedVehicle={() => {}}
              />
            </div>
          )}

          {/* ---- STEP: CONFIRM ---- */}
          {step === "confirm" && (
            <ConfirmedRide
              createRide={createRide}
              pickUp={pickup}
              fare={fare}
              destination={destination}
              vehicleType={vehicleType}
              setConfirmRidePanel={() => setStep("vehicle")}
              setVehicleFound={() => setStep("looking")}
              setVehiclePanelOpen={() => {}}
            />
          )}

          {/* ---- STEP: LOOKING ---- */}
          {step === "looking" && (
            <LookingForDreiver
              pickup={pickup}
              destination={destination}
              ride={ride}
              setVehicleFound={(val) => {
                if (!val) resetFlow();
              }}
            />
          )}

          {/* ---- STEP: WAITING ---- */}
          {step === "waiting" && (
            <WaitingForDriver
              ride={ride}
              setDriverFound={(val) => {
                if (!val) resetFlow();
              }}
            />
          )}
        </div>

        {/* Sidebar Footer */}
        {step !== "search" && step !== "looking" && step !== "waiting" && (
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <button
              onClick={resetFlow}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <i className="ri-restart-line mr-1"></i>
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
