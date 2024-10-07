import React from 'react'

function CarouselCard({ image, title, description }) {
    return (
      <div className='bg-white shadow-md rounded-lg overflow-hidden'>
        <img src={image} alt={title} className='w-full h-48 object-cover'/>
        <div className='p-4'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <p className='text-gray-600'>{description}</p>
        </div>
      </div>
    );
  }
export default CarouselCard
