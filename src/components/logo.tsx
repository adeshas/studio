import React from 'react';
import { Scale } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Scale className="h-6 w-6 text-accent" />
      <span className="text-lg font-semibold text-foreground">
        Oyewole &amp; Adesina
      </span>
    </div>
  );
}
