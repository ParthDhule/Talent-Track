import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export function JobReadiness({ jobs }: { jobs: any[] }) {
  // Mock readiness data
  const readinessData = [
    { full: 45, partial: 30, not: 25 },
    { full: 60, partial: 20, not: 20 },
    { full: 35, partial: 45, not: 20 },
  ];

  return (
    <Card className="hover-elevate transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-lg">Job Readiness Overview</CardTitle>
        <CardDescription>Candidate suitability by role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {jobs.slice(0, 3).map((job, i) => {
          const stats = readinessData[i % readinessData.length];
          const isUrgent = i === 0; // First job is urgent mock
          
          return (
            <div key={job.id || i} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-sm line-clamp-1" title={job.title}>{job.title}</div>
                  {isUrgent && (
                    <Badge variant="secondary" className="text-[10px] h-5 bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 gap-1 px-1.5">
                      <Clock className="w-3 h-3" /> Closes in 3 days
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  {Math.floor(Math.random() * 50) + 10} candidates
                </div>
              </div>
              
              <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-secondary">
                <div className="bg-emerald-500 h-full" style={{ width: `${stats.full}%` }} title={`Fully Eligible: ${stats.full}%`} />
                <div className="bg-blue-400 h-full" style={{ width: `${stats.partial}%` }} title={`Partially Eligible: ${stats.partial}%`} />
                <div className="bg-slate-300 h-full" style={{ width: `${stats.not}%` }} title={`Not Eligible: ${stats.not}%`} />
              </div>
              
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Eligible</div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Partial</div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Not</div>
              </div>
            </div>
          );
        })}
        
        {jobs.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-4">
            No active jobs found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
