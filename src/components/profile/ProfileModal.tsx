import { useState } from 'react';
import {
  X,
  Crown,
  FileText,
  Bookmark,
  History,
  Settings,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ user, isOpen, onClose }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'articles' | 'favorites' | 'activity'>('profile');

  if (!isOpen) return null;

  const menuItems = [
    {
      icon: FileText,
      label: 'Мои статьи',
      value: user.articles_count,
      tab: 'articles' as const,
    },
    {
      icon: Bookmark,
      label: 'Избранное',
      tab: 'favorites' as const,
    },
    {
      icon: History,
      label: 'История активности',
      tab: 'activity' as const,
    },
    {
      icon: Settings,
      label: 'Настройки',
      tab: 'profile' as const,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal - Full screen on mobile */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-card animate-slide-up',
          'md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg'
        )}
      >
        {/* Handle bar for mobile */}
        <div className="sticky top-0 z-10 flex justify-center bg-card pt-3 md:hidden">
          <div className="h-1 w-12 rounded-full bg-border" />
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="p-6">
          {/* Profile Header */}
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={user.avatar_url}
                alt={user.first_name}
                className="h-20 w-20 rounded-full border-2 border-border"
              />
              {user.is_premium && (
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
                  <Crown className="h-3 w-3" />
                </div>
              )}
            </div>

            <h2 className="mb-1 font-heading text-xl font-semibold">
              {user.first_name} {user.last_name}
            </h2>
            <p className="mb-3 text-sm text-muted-foreground">@{user.username}</p>

            <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{user.reputation}</span>
              <span className="text-sm text-muted-foreground">репутации</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center justify-between rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
                onClick={() => setActiveTab(item.tab)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value !== undefined && (
                    <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-sm">
                      {item.value}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>

          {/* Premium CTA */}
          {!user.is_premium && (
            <div className="mt-6">
              <Button className="w-full gap-2" size="lg">
                <Crown className="h-4 w-4" />
                Перейти на Premium
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
