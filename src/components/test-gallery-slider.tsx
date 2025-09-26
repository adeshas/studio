"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { testGalleryMedia } from '@/lib/test-gallery-data';
import { Card } from './ui/card';

export default function TestGallerySlider() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full max-w-4xl mx-auto"
      >
        {testGalleryMedia.map((media, index) => (
          <SwiperSlide key={index}>
            <Card className="overflow-hidden rounded-xl shadow-lg">
              <div className="relative aspect-video bg-black">
                {media.type === 'video' ? (
                  <video
                    src={media.src}
                    controls={false}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    className="object-cover"
                    data-ai-hint={media.hint}
                  />
                )}
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: hsl(var(--primary-foreground));
          background-color: hsl(var(--background) / 0.5);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 20px;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
            background-color: hsl(var(--primary-foreground));
        }
        .swiper-pagination-bullet-active {
            background-color: hsl(var(--primary));
        }
      `}</style>
    </>
  );
}
