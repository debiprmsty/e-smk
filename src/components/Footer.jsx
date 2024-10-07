import React from 'react';

function Footer() {
  return (
    <div className='bg-slate-700 w-full py-8 px-4 mt-12'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Contact Column */}
        <div className='text-white'>
          <h2 className='text-xl font-semibold mb-4'>Hubungi Kami</h2>
          <p>Address: 1234 Main St, Anytown, USA</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@example.com</p>
        </div>

        {/* Maps Column */}
        <div className='text-white'>
          <h2 className='text-xl font-semibold mb-4'>Lokasi</h2>
          <div className='w-full h-64'>
            <iframe
              title='Google Maps'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096347!2d144.95373631531097!3d-37.81627937975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5773e4b3b9c110a!2sMelbourne%20CBD!5e0!3m2!1sen!2sau!4v1633332364695!5m2!1sen!2sau'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
