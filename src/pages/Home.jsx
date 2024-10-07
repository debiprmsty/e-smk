import React, { useRef } from 'react';
import CarouselCard from '../components/CarouselCard.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';

function Home() {
  const cards = [
    { id: 1, image: 'https://via.placeholder.com/300x200?text=Promo+1', title: 'Promo 1', description: 'Description for promo 1' },
    { id: 2, image: 'https://via.placeholder.com/300x200?text=Promo+2', title: 'Promo 2', description: 'Description for promo 2' },
    { id: 3, image: 'https://via.placeholder.com/300x200?text=Promo+3', title: 'Promo 3', description: 'Description for promo 3' },
    { id: 4, image: 'https://via.placeholder.com/300x200?text=Promo+4', title: 'Promo 4', description: 'Description for promo 4' },
    { id: 5, image: 'https://via.placeholder.com/300x200?text=Promo+5', title: 'Promo 5', description: 'Description for promo 5' },
    { id: 6, image: 'https://via.placeholder.com/300x200?text=Promo+6', title: 'Promo 6', description: 'Description for promo 6' },
  ];

  const promoRef = useRef(null);
  const terbaruRef = useRef(null);
  const terlarisRef = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className='w-full mx-auto overflow-hidden'>

      {/* Promo */}
      <div className='md:max-w-6xl max-w-lg mx-auto mt-8 relative px-4 overflow-hidden'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl sm:text-4xl text-slate-900 font-semibold'>Promo</h1>
          <Link className='text-slate-900 font-semibold' to='/market'>
            <h5 className='text-sm sm:text-base'>Tampilkan Semua</h5>
          </Link>
        </div>
        <button
          className='hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10'
          onClick={() => scrollLeft(promoRef)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div
          className='flex overflow-x-auto space-x-4 mt-4 pb-4 scrollbar-hide'
          ref={promoRef}
          style={{ scrollSnapType: 'x mandatory', }}

        >
          {cards.map((card) => (
            <div
              key={card.id}
              className='flex-shrink-0 flex flex-col items-center w-60 scroll-snap-align-start'
            >
              <Link to={`/product/${card.id}`}>
                <CarouselCard
                  image={card.image}
                  title={card.title}
                  description={card.description}
                />
              </Link>
            </div>
          ))}
        </div>
        <button
          className='hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10'
          onClick={() => scrollRight(promoRef)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      {/* Produk Terbaru */}
      <div className='max-w-6xl mx-auto mt-8 relative px-4 overflow-hidden'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl sm:text-4xl text-slate-900 font-semibold'>Produk Terbaru</h1>
          <Link className='text-slate-900 font-semibold' to='/market'>
            <h5 className='text-sm sm:text-base'>Tampilkan Semua</h5>
          </Link>
        </div>
        <button
          className='hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10'
          onClick={() => scrollLeft(terbaruRef)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div
          className='flex overflow-x-auto space-x-4 mt-4 pb-4 scrollbar-hide'
          ref={terbaruRef}
          style={{ scrollSnapType: 'x mandatory', }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className='flex-shrink-0 flex flex-col items-center w-60 scroll-snap-align-start'
            >
              <Link to={`/product/${card.id}`}>
                <CarouselCard
                  image={card.image}
                  title={card.title}
                  description={card.description}
                />
              </Link>
            </div>
          ))}
        </div>
        <button
          className='hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10'
          onClick={() => scrollRight(terbaruRef)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      {/* Produk Terlaris */}
      <div className='max-w-6xl mx-auto mt-8 relative px-4 overflow-hidden'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl sm:text-4xl text-slate-900 font-semibold'>Produk Terlaris</h1>
          <Link className='text-slate-900 font-semibold' to='/market'>
            <h5 className='text-sm sm:text-base'>Tampilkan Semua</h5>
          </Link>
        </div>
        <button
          className='hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10'
          onClick={() => scrollLeft(terlarisRef)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div
          className='flex overflow-x-auto space-x-4 mt-4 pb-4 scrollbar-hide'
          ref={terlarisRef}
          style={{ scrollSnapType: 'x mandatory', }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className='flex-shrink-0 flex flex-col items-center w-60 scroll-snap-align-start'
            >
              <Link to={`/product/${card.id}`}>
                <CarouselCard
                  image={card.image}
                  title={card.title}
                  description={card.description}
                />
              </Link>
            </div>
          ))}
        </div>
        <button
          className='hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10'
          onClick={() => scrollRight(terlarisRef)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
