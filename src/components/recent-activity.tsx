'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, FileText, UserPlus } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    { 
      type: 'application', 
      message: 'New application received for Software Engineer',
      time: '2 hours ago',
      icon: FileText,
      color: 'text-blue-500'
    },
    { 
      type: 'interview', 
      message: 'Interview scheduled with Brenda Smith',
      time: '4 hours ago',
      icon: Clock,
      color: 'text-violet-500'
    },
    { 
      type: 'offer', 
      message: 'Offer accepted for Mechanical Design Engineer',
      time: '1 day ago',
      icon: CheckCircle2,
      color: 'text-green-500'
    },
    { 
      type: 'candidate', 
      message: '15 new candidates matched your criteria',
      time: '2 days ago',
      icon: UserPlus,
      color: 'text-amber-500'
    },
  ];

  return (
    <Card className="hover-elevate transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Latest updates on your hiring pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className={`mt-0.5 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
