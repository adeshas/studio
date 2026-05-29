
"use client";
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import { testGalleryMedia } from '@/lib/test-gallery-data';
import Header from '@/components/header';
import Footer from '@/components/footer';

const STREAM_HOST = 'https://customer-evsgrse8zm7f6r0v.cloudflarestream.com';

const Wall = () => {
  const [shuffledMedia, setShuffledMedia] = useState<typeof testGalleryMedia>([]);

  useEffect(() => {
    const videos = testGalleryMedia.filter(item => item.type === 'video');
    const images = testGalleryMedia.filter(item => item.type === 'image');

    const shuffleArray = (array: any[]) => array.sort(() => 0.5 - Math.random());

    const randomVideos = shuffleArray(videos).slice(0, 8);
    const randomImages = shuffleArray(images).slice(0, 8);

    const combinedMedia = shuffleArray([...randomVideos, ...randomImages]);
    // Duplicate the array to ensure seamless looping
    setShuffledMedia([...combinedMedia, ...combinedMedia]);
  }, []);

  const swiperParams = {
    modules: [Autoplay],
    slidesPerView: 'auto' as const,
    spaceBetween: 16,
    loop: true,
    centeredSlides: false,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  };

  const renderMedia = (item: typeof testGalleryMedia[0], index: number) => {
    if (item.type === 'video') {
      if (!item.streamId) {
        return <div key={`${item.src}-${index}`} className="relative w-full h-full"><video src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" /></div>;
      }
      const posterUrl = `${STREAM_HOST}/${item.streamId}/thumbnails/thumbnail.jpg?time=&height=600`;
      return (
        <div key={`${item.src}-${index}`} className="relative w-full h-full">
          <iframe
            src={`${STREAM_HOST}/${item.streamId}/iframe?muted=true&loop=true&autoplay=true&controls=false&poster=${encodeURIComponent(posterUrl)}`}
            loading="lazy"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            className="w-full h-full absolute inset-0"
            style={{ border: 'none', position: 'absolute', inset: 0 }}
          />
        </div>
      );
    }
    return <img key={`${item.src}-${index}`} src={item.src} alt={item.alt} className="w-full h-full object-cover absolute inset-0" data-ai-hint={item.hint} style={{ objectFit: 'cover', position: 'absolute', inset: 0 }} loading="lazy" />;
  };

  const mediaForSwiper = (start: number, end: number) => {
    return shuffledMedia.slice(start, end);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center overflow-hidden py-12">
        <div className="w-full h-[80vh] overflow-hidden flex items-center justify-center">
          <div className="relative w-[150vw] h-[150vh] flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 -rotate-[22.5deg] scale-110">
              <Swiper
                {...swiperParams}
                speed={10000}
                className="w-full"
              >
                {mediaForSwiper(0, 8).map((item, index) => (
                  <SwiperSlide key={`r1-${index}`} style={{ width: '400px' }}>
                    <div className="aspect-video w-[400px] h-[225px] rounded-lg overflow-hidden bg-muted">
                      {renderMedia(item, index)}
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
                {mediaForSwiper(8, 16).map((item, index) => (
                  <SwiperSlide key={`r2-${index}`} style={{ width: '300px' }}>
                    <div className="aspect-video w-[300px] h-[169px] rounded-lg overflow-hidden bg-muted">
                      {renderMedia(item, index)}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                {...swiperParams}
                speed={9000}
                className="w-full"
              >
                {shuffledMedia.map((item, index) => (
                  <SwiperSlide key={`r3-${index}`} style={{ width: '500px' }}>
                    <div className="aspect-video w-[500px] h-[281px] rounded-lg overflow-hidden bg-muted">
                      {renderMedia(item, index)}
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
                {mediaForSwiper(4, 12).map((item, index) => (
                  <SwiperSlide key={`r4-${index}`} style={{ width: '350px' }}>
                    <div className="aspect-video w-[350px] h-[197px] rounded-lg overflow-hidden bg-muted">
                      {renderMedia(item, index)}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
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
