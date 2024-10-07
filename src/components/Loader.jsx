// Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="loader"></div> {/* Ganti dengan loader yang sesuai */}
    </div>
  );
};

export default Loading;
