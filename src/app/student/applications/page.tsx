import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { applications, students } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function ApplicationsPage() {
  const student = students[0]; // Mock current user
  const studentApplications = applications.filter(app => app.student.id === student.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">My Job Applications</CardTitle>
        <CardDescription>
          Track the status of all your submitted applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] hidden sm:table-cell">Logo</TableHead>
              <TableHead>Company & Role</TableHead>
              <TableHead className="hidden md:table-cell">Applied</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentApplications.map(app => (
              <TableRow key={app.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    src={app.job.companyLogo}
                    alt={`${app.job.company} logo`}
                    width={40}
                    height={40}
                    className="rounded-md"
                    data-ai-hint="logo business"
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{app.job.company}</div>
                  <div className="text-sm text-muted-foreground">
                    {app.job.title}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(app.appliedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn({
                      'bg-yellow-100 text-yellow-800 border-yellow-300': app.status === 'Interviewing',
                      'bg-green-100 text-green-800 border-green-300': app.status === 'Offered',
                      'bg-blue-100 text-blue-800 border-blue-300': app.status === 'Applied',
                      'bg-red-100 text-red-800 border-red-300': app.status === 'Rejected',
                    })}
                  >
                    {app.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
