import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { applications, students } from '@/lib/data';

export default function StudentDashboardPage() {
  const student = students[0]; // Mock current user
  const studentApplications = applications.filter(app => app.student.id === student.id);
  const offeredCount = studentApplications.filter(app => app.status === 'Offered').length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          Welcome back, {student.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's your career progress at a glance. Let's land your dream job.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Applications
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              Total job applications submitted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Offers Received
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offeredCount}</div>
            <p className="text-xs text-muted-foreground">
              Congratulations on your offers!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resume Score</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.resumeScore}%</div>
            <p className="text-xs text-muted-foreground">
              Based on general best practices
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline">
            Ready for Your Next Opportunity?
          </CardTitle>
          <CardDescription>
            Our AI has found job openings that match your skills and
            experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/student/jobs">
            <Button>
              View My Job Matches <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
