import React from 'react';
import Image from 'next/image';

type LogoProps = {
  variant?: 'color' | 'white';
};

export default function Logo({ variant = 'color' }: LogoProps) {
  const logos = {
    color: "https://pub-dff2dcf3e9c045f2bd47bede1998375e.r2.dev/uploads/oa3-logo.png",
    white: "https://pub-dff2dcf3e9c045f2bd47bede1998375e.r2.dev/uploads/OA LOGO WHITE NO BACK COLOR-CORRECT.png"
  };

  const src = logos[variant] || logos.color;

  return (
    <Image
      src={src}
      alt="Oyewole & Adesina Logo"
      width={1024}
      height={variant === 'color' ? 332 : 221}
      style={{ maxWidth: '100%', height: 'auto' }}
      priority
    />
  );
}
