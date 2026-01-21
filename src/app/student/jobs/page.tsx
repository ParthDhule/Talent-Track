'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { suggestRelevantJobs } from '@/ai/flows/suggest-relevant-jobs';
import { Job, students } from '@/lib/data';
import { getJobs } from '@/lib/job-store';
import { MapPin, ArrowRight } from 'lucide-react';

type SuggestedJob = Job & { matchScore: number };

export default function JobsPage() {
  const [suggestedJobs, setSuggestedJobs] = useState<SuggestedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const student = students[0]; // Mock current user
    const allJobs = getJobs();

    // The AI flow needs a simplified job object
    const jobsForAI = allJobs.map(({ id, title, description, company, location }) => ({
        id, title, description, company, location
    }));
    
    suggestRelevantJobs({
      resumeText: student.resumeText,
      jobs: jobsForAI,
    })
      .then(suggestions => {
        const fullJobDetails = suggestions.map(suggestion => {
          const originalJob = allJobs.find(j => j.id === suggestion.jobId);
          return originalJob ? {
            ...originalJob,
            matchScore: suggestion.matchScore,
          } : null;
        }).filter((job): job is SuggestedJob => job !== null);
        
        setSuggestedJobs(fullJobDetails);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const renderSkeleton = () => (
    <Card className="flex flex-col">
        <CardHeader className="flex-row items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" /> <Skeleton className="h-4 w-20" />
            </div>
             <div>
                <div className="mb-2 flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-2 w-full" />
            </div>
        </CardContent>
        <CardFooter>
            <Skeleton className="h-10 w-full" />
        </CardFooter>
    </Card>
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          AI-Powered Job Matches
        </h1>
        <p className="text-muted-foreground">
          Based on your resume, here are jobs where you'd be a great fit.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <>
            {renderSkeleton()}
            {renderSkeleton()}
            {renderSkeleton()}
          </>
        ) : (
          suggestedJobs.map((job) => (
            <Card key={job.id} className="flex flex-col">
              <CardHeader className="flex-row items-start gap-4">
                 {job.companyLogo && (
                  <Image
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    width={48}
                    height={48}
                    className="rounded-md"
                    data-ai-hint="logo tech"
                  />
                 )}
                <div className="flex-1">
                  <CardTitle className="font-headline text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {job.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {job.location}
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-primary">Match Score</span>
                    <span>{Math.round(job.matchScore * 100)}%</span>
                  </div>
                  <Progress
                    value={job.matchScore * 100}
                    aria-label={`${Math.round(job.matchScore * 100)}% match`}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="#">
                    View Details & Analyze Fit <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
