import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '@/types';
import { ArticleCard } from './ArticleCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ArticleCarouselProps {
  title: string;
  articles: Article[];
  className?: string;
}

export function ArticleCarousel({ title, articles, className }: ArticleCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={cn('relative', className)}>
      <div className="mb-4 flex items-center justify-between px-4">
        <h2 className="font-heading text-xl font-semibold">{title}</h2>
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
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant="featured"
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
          />
        ))}
      </div>
    </section>
  );
}
