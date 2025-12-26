import { Home, Layers, PenSquare, Bookmark, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Главная', href: '/', active: true },
  { icon: Layers, label: 'Хаб', href: '/hub' },
  { icon: PenSquare, label: 'Написать', href: '/create' },
  { icon: Bookmark, label: 'Избранное', href: '/favorites' },
  { icon: User, label: 'Профиль', href: '/profile' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl pb-safe-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.href}
            className={cn(
              'flex touch-target flex-col items-center justify-center gap-1 px-4 py-2 transition-smooth',
              item.active
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
