
"use client";
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { testGalleryMedia } from '@/lib/test-gallery-data';

const VideoWall = () => {
  const [mediaReady, setMediaReady] = useState(false);
  const [shuffledMedia, setShuffledMedia] = useState<typeof testGalleryMedia>([]);

  useEffect(() => {
    const videos = testGalleryMedia.filter(item => item.type === 'video');
    const images = testGalleryMedia.filter(item => item.type === 'image');

    const shuffleArray = (array: any[]) => array.sort(() => 0.5 - Math.random());

    const randomVideos = shuffleArray(videos).slice(0, 3);
    const randomImages = shuffleArray(images).slice(0, 13);

    const combinedMedia = shuffleArray([...randomVideos, ...randomImages]);
    const duplicatedMedia = [...combinedMedia, ...combinedMedia, ...combinedMedia, ...combinedMedia];

    setShuffledMedia(duplicatedMedia);
    setMediaReady(true);
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
      return <video key={`${item.src}-${index}`} src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />;
    }
    return <div className="relative w-full h-full">
      <Image key={`${item.src}-${index}`} src={item.src} alt={item.alt} fill className="w-full h-full object-cover" data-ai-hint={item.hint} />
      </div>;
  };

  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
            <h2 className="text-3xl font-light font-headline tracking-tighter sm:text-5xl">Our World in Motion</h2>
            <p className="max-w-[900px] mx-auto mt-4 text-muted-foreground md:text-xl/relaxed">A dynamic view into the industries we serve and the sectors we help shape.</p>
        </div>
        <div className="w-full h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center">
          {mediaReady && (
            <div className="relative w-[150vw] h-auto flex items-center justify-center">
                <div className="grid grid-cols-1 gap-4 scale-110">
                    <Swiper
                        {...swiperParams}
                        speed={10000}
                        className="w-full"
                    >
                        {shuffledMedia.map((item, index) => (
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
                        {shuffledMedia.map((item, index) => (
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
                        {shuffledMedia.map((item, index) => (
                           <SwiperSlide key={`r4-${index}`} style={{ width: '350px' }}>
                                <div className="aspect-video w-[350px] h-[197px] rounded-lg overflow-hidden bg-muted">
                                   {renderMedia(item, index)}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            )}
        </div>
        <style jsx global>{`
          .swiper-wrapper {
            transition-timing-function: linear !important;
          }
          .swiper-slide {
            flex-shrink: 0;
          }
        `}</style>
    </section>
  );
};

export default VideoWall;
