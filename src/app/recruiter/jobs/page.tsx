'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { applications, Job } from '@/lib/data';
import { getJobs } from '@/lib/job-store';
import { Users, MapPin, ArrowRight, PlusCircle } from 'lucide-react';

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(getJobs());
  }, []);

  const jobsWithCandidateCount = jobs.map(job => ({
    ...job,
    candidateCount: applications.filter(app => app.job.id === job.id).length,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">
            Your Job Postings
          </h1>
          <p className="text-muted-foreground">
            Manage your jobs and view suggested candidates.
          </p>
        </div>
        <Button asChild>
          <Link href="/recruiter/jobs/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {jobsWithCandidateCount.map(job => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {job.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Users className="h-5 w-5" />
                <span>{job.candidateCount} Candidates</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {job.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/recruiter/jobs/${job.id}/matches`}>
                  View AI Matches <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
