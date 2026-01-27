'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileSearch, Mail, Video } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { label: 'Schedule Interview', icon: Calendar, href: '#', variant: 'default' as const },
    { label: 'Browse Resumes', icon: FileSearch, href: '/recruiter/jobs', variant: 'secondary' as const },
    { label: 'Send Bulk Email', icon: Mail, href: '#', variant: 'outline' as const },
    { label: 'Host Virtual Fair', icon: Video, href: '#', variant: 'outline' as const },
  ];

  return (
    <Card className="hover-elevate transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, i) => (
            <Button 
              key={i} 
              variant={action.variant} 
              size="sm" 
              className="justify-start gap-2 h-10"
              asChild
            >
              <Link href={action.href}>
                <action.icon className="h-4 w-4" />
                <span className="text-xs">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
