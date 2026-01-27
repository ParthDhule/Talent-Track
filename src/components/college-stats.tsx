import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";

export function CollegeStats() {
  const colleges = [
    { name: "Tech Institute of City", cgpa: "8.5", acceptance: 92, joining: 88 },
    { name: "State University", cgpa: "7.8", acceptance: 85, joining: 80 },
    { name: "National Engineering College", cgpa: "9.1", acceptance: 95, joining: 94 },
  ];

  return (
    <Card className="hover-elevate transition-all duration-300">
      <CardHeader>
        <CardTitle>College Intelligence</CardTitle>
        <CardDescription>Performance metrics by partner institution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {colleges.map((college, i) => (
            <div key={i} className="group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <div className="font-medium text-sm">{college.name}</div>
                <div className="text-xs text-muted-foreground flex gap-3 mt-1 sm:mt-0">
                  <span>Avg CGPA: <span className="font-semibold text-foreground">{college.cgpa}</span></span>
                  <span>Joining Rate: <span className="font-semibold text-foreground">{college.joining}%</span></span>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-muted-foreground">Offer Acceptance Rate</span>
                  <span className="text-xs font-medium text-foreground">{college.acceptance}%</span>
                </div>
                <Progress value={college.acceptance} className="h-2" />
              </div>
              {i < colleges.length - 1 && <div className="h-px bg-border mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
