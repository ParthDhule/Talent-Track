import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
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
import { suggestRelevantJobs } from '@/ai/flows/suggest-relevant-jobs';
import { jobs, students } from '@/lib/data';
import { MapPin, ArrowRight } from 'lucide-react';

export default async function JobsPage() {
  const student = students[0]; // Mock current user
  // In a real app, you might fetch real job postings and then have the AI score them.
  // For this demo, we'll use the AI to generate some plausible matches.
  const suggestedJobs = await suggestRelevantJobs({
    resumeText: student.resumeText,
  });

  // Let's find the original job data to get all details like logos
  const fullJobDetails = suggestedJobs.map(suggestedJob => {
    const originalJob = jobs.find(j => j.title === suggestedJob.jobTitle && j.company === suggestedJob.companyName);
    return {
      ...suggestedJob,
      ...originalJob,
    };
  });


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
        {fullJobDetails.map((job, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4">
               {job.companyLogo && (
                <Image
                  src={job.companyLogo}
                  alt={`${job.companyName} logo`}
                  width={48}
                  height={48}
                  className="rounded-md"
                  data-ai-hint="logo tech"
                />
               )}
              <div className="flex-1">
                <CardTitle className="font-headline text-lg">{job.jobTitle}</CardTitle>
                <CardDescription>{job.companyName}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {job.jobDescription}
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
        ))}
      </div>
    </div>
  );
}
