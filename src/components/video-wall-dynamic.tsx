'use client';

import dynamic from 'next/dynamic';
import type { GalleryItem } from '@/db/schema';

const VideoWall = dynamic(() => import('@/components/video-wall'), {
  ssr: false,
  loading: () => <div className="min-h-[50vh]" />,
});

export default function VideoWallDynamic({ items }: { items: GalleryItem[] }) {
  return <VideoWall items={items} />;
}
