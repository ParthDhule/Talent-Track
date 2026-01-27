'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

export function PlacementCalendar() {
  const events = [
    { 
      date: 'Jan 28', 
      day: 'Mon',
      title: 'Tech Interview Round - Software Engineer',
      type: 'interview',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    },
    { 
      date: 'Jan 30', 
      day: 'Wed',
      title: 'Campus Visit - State University',
      type: 'campus',
      color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
    },
    { 
      date: 'Feb 2', 
      day: 'Sat',
      title: 'Virtual Hiring Fair',
      type: 'event',
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    },
    { 
      date: 'Feb 5', 
      day: 'Tue',
      title: 'Offer Deadline - Data Analyst Intern',
      type: 'deadline',
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
    },
  ];

  return (
    <Card className="hover-elevate transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
            <CardDescription>Your placement schedule</CardDescription>
          </div>
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map((event, i) => (
            <div key={i} className="flex gap-3 items-start p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center min-w-[40px] text-center">
                <span className="text-xs text-muted-foreground uppercase">{event.day}</span>
                <span className="text-lg font-bold leading-tight">{event.date.split(' ')[1]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight line-clamp-1">{event.title}</p>
                <Badge variant="secondary" className={`mt-1 text-[10px] h-5 ${event.color}`}>
                  {event.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
