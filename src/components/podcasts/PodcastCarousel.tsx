import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Headphones } from 'lucide-react';
import { Podcast } from '@/types';
import { PodcastCard } from './PodcastCard';
import { PodcastPlayerModal } from './PodcastPlayerModal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PodcastCarouselProps {
  title: string;
  podcasts: Podcast[];
  className?: string;
}

export function PodcastCarousel({ title, podcasts, className }: PodcastCarouselProps) {
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 260;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <section className={cn('relative', className)}>
        <div className="mb-4 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-heading text-xl font-semibold">{title}</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-4"
        >
          {podcasts.map((podcast, index) => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              onPlay={setSelectedPodcast}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </section>

      <PodcastPlayerModal
        podcast={selectedPodcast}
        isOpen={!!selectedPodcast}
        onClose={() => setSelectedPodcast(null)}
      />
    </>
  );
}
