'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Award,
  Briefcase,
  GraduationCap,
  User,
  CheckCircle,
} from 'lucide-react';
import { suggestStudentProfiles } from '@/ai/flows/suggest-student-profiles';
import { students, Student, Job } from '@/lib/data';
import { getJobs } from '@/lib/job-store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

type MatchedStudent = Student & {
  matchScore: number;
  reasoning: string;
};

export default function JobMatchesPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [job, setJob] = useState<Job | null>(null);
  const [matchedStudents, setMatchedStudents] = useState<MatchedStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<MatchedStudent | null>(
    null
  );
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [offeredStudents, setOfferedStudents] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const currentJob = getJobs().find(j => j.id === id) || null;
    setJob(currentJob);

    if (currentJob) {
      // Prepare data for the AI flow
      const studentProfilesForAI = students.map(({ id, name, resumeText }) => ({
        id,
        name,
        resumeText,
      }));

      suggestStudentProfiles({
        jobDescription: currentJob.description,
        studentProfiles: studentProfilesForAI,
      })
        .then(suggestions => {
          const fullStudentDetails = suggestions
            .map(suggestion => {
              const originalStudent = students.find(
                s => s.id === suggestion.studentId
              );
              return originalStudent
                ? {
                    ...originalStudent,
                    matchScore: suggestion.matchScore,
                    reasoning: suggestion.reasoning,
                  }
                : null;
            })
            .filter((student): student is MatchedStudent => student !== null);

          setMatchedStudents(fullStudentDetails);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleMakeOffer = (student: MatchedStudent) => {
    setOfferedStudents(prev => [...prev, student.id]);
    toast({
      title: 'Offer Extended!',
      description: `An offer has been made to ${student.name}.`,
    });
  };

  const handleViewResume = (student: MatchedStudent) => {
    setSelectedStudent(student);
    setIsResumeDialogOpen(true);
  };

  const renderSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <div>
          <div className="mb-2 flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-1/2" />
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-5 w-2/3" />
        <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {renderSkeleton()}
          {renderSkeleton()}
          {renderSkeleton()}
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Job not found</h1>
        <p>The job you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link href="/recruiter/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Postings
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/recruiter/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>
          <h1 className="font-headline text-3xl font-bold">
            AI-Suggested Candidates
          </h1>
          <p className="text-muted-foreground">
            Top student matches for your{' '}
            <span className="font-semibold text-primary">{job.title}</span>{' '}
            role.
          </p>
        </div>

        {matchedStudents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {matchedStudents.map(student => (
              <Card key={student.id} className="flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={student.avatar}
                      alt={student.name}
                      data-ai-hint="person portrait"
                    />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="font-headline">
                      {student.name}
                    </CardTitle>
                    <CardDescription className="mt-1 flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" /> {student.course}
                      </span>
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Year {student.year}
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-primary">
                        Match Score
                      </span>
                      <span>{Math.round(student.matchScore * 100)}%</span>
                    </div>
                    <Progress value={student.matchScore * 100} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Reasoning:</p>
                    <p className="text-sm text-muted-foreground">
                      {student.reasoning}
                    </p>
                  </div>
                </CardContent>
                <CardContent className="flex gap-2">
                  <Button
                    className="w-full"
                    onClick={() => handleMakeOffer(student)}
                    disabled={offeredStudents.includes(student.id)}
                  >
                    {offeredStudents.includes(student.id) ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" /> Offer Made
                      </>
                    ) : (
                      <>
                        <Briefcase className="mr-2 h-4 w-4" /> Make Offer
                      </>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => handleViewResume(student)}
                  >
                    <Award className="mr-2 h-4 w-4" /> View Resume
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <CardTitle>No Matches Found</CardTitle>
            <CardDescription className="mt-2">
              Our AI couldn't find any suitable candidates at the moment. Try
              adjusting your job description.
            </CardDescription>
          </Card>
        )}
      </div>

      <AlertDialog
        open={isResumeDialogOpen}
        onOpenChange={setIsResumeDialogOpen}
      >
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline">
              {selectedStudent?.name}'s Resume
            </AlertDialogTitle>
            <AlertDialogDescription>
              Review the candidate's full resume below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedStudent && (
            <ScrollArea className="h-[60vh] rounded-md border p-4">
              <pre className="whitespace-pre-wrap font-body text-sm">
                {selectedStudent.resumeText}
              </pre>
            </ScrollArea>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
