import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-100"></div>
      <p className="ml-4">
      </p>
    </div>
  );
};

export default Loading;
