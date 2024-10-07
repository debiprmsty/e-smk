import React, { useState } from 'react';
import Banner from "../assets/images/banner.png"

const Carousel = () => {
    const [selectedSlide, setSelectedSlide] = useState(1);
    const slides = [
        { id: 1, image: Banner, caption: 'Slide 1' },
        { id: 2, image: Banner, caption: 'Slide 2' },
        { id: 3, image: Banner, caption: 'Slide 3' }
    ];

    const handlePrevClick = () => {
        setSelectedSlide(selectedSlide === 1 ? slides.length : selectedSlide - 1);
    };

    const handleNextClick = () => {
        setSelectedSlide(selectedSlide === slides.length ? 1 : selectedSlide + 1);
    };

    return (
        <div className="carousel relative shadow-2xl bg-white">
            <div className="carousel-inner relative overflow-hidden w-full">
                {slides.map((slide) => (
                    <React.Fragment key={slide.id}>
                        <input
                            className="carousel-open"
                            type="radio"
                            id={`carousel-${slide.id}`}
                            name="carousel"
                            aria-hidden="true"
                            hidden
                            checked={selectedSlide === slide.id}
                            onChange={() => setSelectedSlide(slide.id)}
                        />
                        <div
                            className={`carousel-item absolute opacity-0 ${selectedSlide === slide.id ? 'opacity-100' : ''}`}
                            style={{ height: '50vh' }}
                        >
                            <div
                                className="block h-full w-full bg-cover bg-center text-5xl text-center cursor-pointer"
                                style={{ backgroundImage: `url(${slide.image})` }}
                                onClick={() => alert(`Saat ini promo belum tersedia`)}
                            >

                            </div>
                        </div>
                    </React.Fragment>
                ))}
                <label
                    htmlFor={`carousel-${(selectedSlide - 1) <= 0 ? slides.length : selectedSlide - 1}`}
                    className="prev control w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-slate-800 rounded-full bg-blue-700 hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
                    onClick={handlePrevClick}
                >
                    ‹
                </label>
                <label
                    htmlFor={`carousel-${(selectedSlide % slides.length) + 1}`}
                    className="next control w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-blue-700 hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
                    onClick={handleNextClick}
                >
                    ›
                </label>
                <ol className="carousel-indicators">
                    {slides.map((slide) => (
                        <li className="inline-block mr-3" key={slide.id}>
                            <label
                                htmlFor={`carousel-${slide.id}`}
                                className={`carousel-bullet cursor-pointer block text-4xl text-slate-900 hover:text-blue-700 ${selectedSlide === slide.id ? 'text-blue-700' : ''}`}
                                onClick={() => setSelectedSlide(slide.id)}
                            >
                                •
                            </label>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Carousel;
