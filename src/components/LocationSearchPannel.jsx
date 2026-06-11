import React from "react";

const LocationSearchPannel = ({
  suggestions,
  setPickup,
  setDestination,
  setPanelOpen,
  setVehiclePanelOpen,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
  };

  return (
    <div className="py-2 px-1">
      {Array.isArray(suggestions) && suggestions.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          Type at least 3 characters to search...
        </p>
      ) : (
        Array.isArray(suggestions) &&
        suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(suggestion)}
            className="flex gap-3 p-2.5 rounded-lg items-center cursor-pointer hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
          >
            <div className="bg-gray-100 h-8 w-8 min-w-[2rem] flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill text-sm text-gray-600"></i>
            </div>
            <p className="text-sm text-gray-700 leading-tight line-clamp-2">
              {suggestion}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default LocationSearchPannel;
