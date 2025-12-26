import { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryListProps {
  categories: Category[];
  selectedId?: string;
  onSelect?: (category: Category) => void;
  className?: string;
}

export function CategoryList({
  categories,
  selectedId,
  onSelect,
  className,
}: CategoryListProps) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto scrollbar-hide px-4', className)}>
      <button
        className={cn(
          'flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-smooth',
          !selectedId
            ? 'bg-foreground text-background'
            : 'bg-muted text-muted-foreground hover:bg-accent'
        )}
        onClick={() => onSelect?.(null as any)}
      >
        Все
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={cn(
            'flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth',
            selectedId === category.id
              ? 'bg-foreground text-background'
              : 'bg-muted text-muted-foreground hover:bg-accent'
          )}
          onClick={() => onSelect?.(category)}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
