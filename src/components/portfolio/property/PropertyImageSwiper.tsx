"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

type Props = {
  images: string[];
  title: string;
};

export default function PropertyImageSwiper({ images, title }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const hasMultiple = images.length > 1;

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-[20px]">
        <Swiper
          modules={[Pagination]}
          loop={hasMultiple}
          pagination={hasMultiple ? { clickable: true } : false}
          onSwiper={setSwiper}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={src} className="relative w-full h-full">
              <Image
                src={src}
                alt={`${title} — photo ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/70 hover:bg-white transition-colors"
          >
            <svg
              aria-hidden="true"
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L1 9L9 17"
                stroke="#0e8944"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/70 hover:bg-white transition-colors"
          >
            <svg
              aria-hidden="true"
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L9 9L1 17"
                stroke="#0e8944"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
