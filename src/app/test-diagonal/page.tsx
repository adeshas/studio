
"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { testGalleryMedia } from '@/lib/test-gallery-data';
import Header from '@/components/header';
import Footer from '@/components/footer';

const Wall = () => {

  const swiperParams = {
    modules: [Autoplay],
    slidesPerView: 'auto' as const,
    spaceBetween: 16,
    loop: true,
    centeredSlides: true,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  };

  const allVideos = testGalleryMedia.filter(item => item.type === 'video');

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
        <Header />
        <main className="flex-1 flex items-center justify-center overflow-hidden">
            <div className="relative w-[150vw] h-[150vh] flex items-center justify-center">
                <div className="grid grid-cols-1 gap-4 -rotate-[22.5deg] scale-110">
                    <Swiper
                        {...swiperParams}
                        speed={10000}
                        className="w-full"
                    >
                        {allVideos.map((item, index) => (
                            <SwiperSlide key={`r1-${index}`} style={{ width: '400px' }}>
                                <div className="aspect-video w-[400px] h-[225px] rounded-lg overflow-hidden bg-muted">
                                    <video src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        {...swiperParams}
                        speed={12000}
                        autoplay={{ ...swiperParams.autoplay, reverseDirection: true }}
                        className="w-full"
                    >
                        {[...allVideos].reverse().slice(3).map((item, index) => (
                            <SwiperSlide key={`r2-${index}`} style={{ width: '300px' }}>
                                <div className="aspect-video w-[300px] h-[169px] rounded-lg overflow-hidden bg-muted">
                                    <video src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        {...swiperParams}
                        speed={9000}
                        className="w-full"
                    >
                        {allVideos.slice(6).map((item, index) => (
                           <SwiperSlide key={`r3-${index}`} style={{ width: '500px' }}>
                                <div className="aspect-video w-[500px] h-[281px] rounded-lg overflow-hidden bg-muted">
                                    <video src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                     <Swiper
                        {...swiperParams}
                        speed={11000}
                        autoplay={{ ...swiperParams.autoplay, reverseDirection: true }}
                        className="w-full"
                    >
                        {allVideos.slice(9).map((item, index) => (
                           <SwiperSlide key={`r4-${index}`} style={{ width: '350px' }}>
                                <div className="aspect-video w-[350px] h-[197px] rounded-lg overflow-hidden bg-muted">
                                   <video src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </main>
        <Footer />
        <style jsx global>{`
          .swiper-wrapper {
            transition-timing-function: linear !important;
          }
          .swiper-slide {
            flex-shrink: 0;
          }
        `}</style>
    </div>
  );
};

export default Wall;
