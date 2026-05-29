"use client";

import Image from "next/image";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import { testGalleryMedia } from '@/lib/test-gallery-data';

const STREAM_HOST = 'https://customer-evsgrse8zm7f6r0v.cloudflarestream.com';

const VideoWall = () => {
  const [mediaReady, setMediaReady] = useState(false);
  const [shuffledMedia, setShuffledMedia] = useState<typeof testGalleryMedia>([]);

  const shuffleArray = <T,>(array: T[]) => [...array].sort(() => 0.5 - Math.random());

  const buildShuffledMedia = () => {
    const videos = shuffleArray(testGalleryMedia.filter(item => item.type === 'video'));
    const images = shuffleArray(testGalleryMedia.filter(item => item.type === 'image'));

    const selectedVideos = videos.slice(0, Math.min(videos.length, 10));
    const selectedImages = images.slice(0, Math.min(images.length, 10));

    const interleaveMedia = (videoItems: typeof testGalleryMedia, imageItems: typeof testGalleryMedia) => {
      const result: typeof testGalleryMedia = [];
      const totalPairs = Math.min(videoItems.length, imageItems.length);

      for (let index = 0; index < totalPairs; index += 1) {
        result.push(videoItems[index]);
        result.push(imageItems[index]);
      }

      return result;
    };

    const combinedMedia = interleaveMedia(selectedVideos, selectedImages);

    const normalizedMedia = combinedMedia.filter((item, index) => {
      return index === 0 || item.src !== combinedMedia[index - 1]?.src;
    });

    const duplicatedMedia: typeof testGalleryMedia = [];

    for (let block = 0; block < 3; block += 1) {
      const nextBlock = shuffleArray(normalizedMedia);

      if (duplicatedMedia.length > 0 && duplicatedMedia[duplicatedMedia.length - 1]?.src === nextBlock[0]?.src) {
        const swapIndex = nextBlock.findIndex(item => item.src !== duplicatedMedia[duplicatedMedia.length - 1]?.src);
        if (swapIndex > 0) {
          [nextBlock[0], nextBlock[swapIndex]] = [nextBlock[swapIndex], nextBlock[0]];
        }
      }

      duplicatedMedia.push(...nextBlock);
    }

    return duplicatedMedia;
  };

  useEffect(() => {
    setShuffledMedia(buildShuffledMedia());
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
    return <div className="relative w-full h-full">
      <Image
        key={`${item.src}-${index}`}
        src={item.src}
        alt={item.alt}
        fill
        className="w-full h-full object-cover absolute inset-0"
        data-ai-hint={item.hint}
        style={{ objectFit: 'cover', position: 'absolute', inset: 0 }}
        loading="lazy"
      />
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
