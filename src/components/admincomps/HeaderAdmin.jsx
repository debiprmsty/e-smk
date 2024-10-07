import React from 'react';

function HeaderAdmin({ toggleSidebar }) {
  return (
    <div className="bg-gray-800 shadow-lg p-4 flex justify-between items-center">
      <div className='flex justify-between w-full'>
        <button
          className="sm:hidden text-white p-2"
          onClick={toggleSidebar}
        >
          &#9776; {/* Simbol untuk hamburger menu */}
        </button>
        <button className="text-white text-end hover:text-gray-400 transition-colors duration-200 w-full">
          Logout
        </button>
      </div>
    </div>
  );
}

export default HeaderAdmin;
