import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { students } from '@/lib/data';
import { Progress } from '@/components/ui/progress';

export default function TpoStudentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Student Directory</CardTitle>
        <CardDescription>
          View and manage all registered students on the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="hidden sm:table-cell">Course</TableHead>
              <TableHead className="hidden md:table-cell">Year</TableHead>
              <TableHead>Resume Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="person portrait" />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {student.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {student.course}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {student.year}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={student.resumeScore} className="w-24" />
                    <span>{student.resumeScore}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
