import React from 'react';
import Image from 'next/image';

type LogoProps = {
  variant?: 'color' | 'white';
};

export default function Logo({ variant = 'color' }: LogoProps) {
  const logos = {
    color: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2019/08/logo_v3.png",
    white: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2019/08/logo_v3_white.png"
  };

  const src = logos[variant] || logos.color;

  return (
    <Image
      src={src}
      alt="Oyewole & Adesina Logo"
      width={160}
      height={42}
      priority
    />
  );
}
