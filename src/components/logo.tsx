import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Sparkles className="h-6 w-6 text-accent" />
      <span className="text-lg font-semibold text-foreground">
        Catalyst Creative
      </span>
    </div>
  );
}
