import React from 'react';
import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="https://oyewoleadesina.com/wp-content/uploads/2019/08/logo_v3.png"
      alt="Oyewole & Adesina Logo"
      width={160}
      height={42}
      priority
    />
  );
}
