import React from 'react';
import Image from 'next/image';

type LogoProps = {
  variant?: 'color' | 'white';
};

export default function Logo({ variant = 'color' }: LogoProps) {
  const logos = {
    color: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/oa3-logo.png",
    white: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/OA%20LOGO%20WHITE%20NO%20BACK%20COLOR-CORRECT.png"
  };

  const src = logos[variant] || logos.color;

  return (
    <img
      src={src}
      alt="Oyewole & Adesina Logo"
      width={1024}
      style={{ maxWidth: '100%', height: 'auto' }}
      loading="eager"
    />
  );
}
