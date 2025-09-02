import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
