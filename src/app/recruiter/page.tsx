'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Briefcase, PlusCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { applications } from '@/lib/data';
import { getJobs } from '@/lib/job-store';

export default function RecruiterDashboardPage() {
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    setTotalJobs(getJobs().length);
  }, []);

  const totalApplications = applications.length;
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          Recruiter Dashboard
        </h1>
        <p className="text-muted-foreground">
          Find and manage the best talent for your company.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Job Postings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              Total active jobs on the platform
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Candidates
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              Applications received across all jobs
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Manage Your Postings</CardTitle>
          <CardDescription>
            Create new job postings or view candidates for existing ones.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/recruiter/jobs">
              View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/recruiter/jobs/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Post a New Job
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
