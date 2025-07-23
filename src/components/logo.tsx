import React from 'react';
import Image from 'next/image';

type LogoProps = {
  variant?: 'color' | 'white';
};

export default function Logo({ variant = 'color' }: LogoProps) {
  const logos = {
    color: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/oa3-logo.png",
    white: "https://oyewoleadesina.com/wp-content/uploads/2025/07/OA-Logo-2-1024x221.png"
  };

  const src = logos[variant] || logos.color;

  return (
    <Image
      src={src}
      alt="Oyewole & Adesina Logo"
      width={variant === 'color' ? 1024 : 1024}
      height={variant === 'color' ? 332 : 221}
      className="w-full h-auto"
    />
  );
}
