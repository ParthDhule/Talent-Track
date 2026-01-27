'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Briefcase, PlusCircle, Users, Building2, AlertCircle, TrendingUp } from 'lucide-react';
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
import { HiringFunnel } from '@/components/hiring-funnel';
import { CollegeStats } from '@/components/college-stats';
import { JobReadiness } from '@/components/job-readiness';
import { SkillDemandChart } from '@/components/skill-demand-chart';
import { RecentActivity } from '@/components/recent-activity';
import { QuickActions } from '@/components/quick-actions';
import { PlacementCalendar } from '@/components/placement-calendar';

export default function RecruiterDashboardPage() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const allJobs = getJobs();
    setTotalJobs(allJobs.length);
    setActiveJobs(allJobs);
  }, []);

  const totalApplications = applications.length;
  
  // Mock data for the dashboard
  const stats = {
    colleges: 12,
    students: 845,
    activeJobs: totalJobs,
    urgentRoles: 2
  };

  return (
    <div className={`flex flex-col gap-8 ${mounted ? 'animate-in fade-in slide-in-from-bottom-4 duration-500' : 'opacity-0'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Recruiter Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Overview of your hiring pipeline and campus intelligence.
          </p>
        </div>
        <Button asChild size="default">
          <Link href="/recruiter/jobs/new" data-testid="button-post-job">
            <PlusCircle className="mr-2 h-4 w-4" /> Post New Job
          </Link>
        </Button>
      </div>

      {/* 1. Dashboard Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Colleges" 
          value={stats.colleges} 
          icon={Building2} 
          description="Registered partners"
          delay={0}
        />
        <DashboardCard 
          title="Total Students" 
          value={stats.students} 
          icon={Users} 
          description="Available candidates"
          delay={1}
        />
        <DashboardCard 
          title="Active Openings" 
          value={stats.activeJobs} 
          icon={Briefcase} 
          description="Currently hiring"
          delay={2}
        />
        <DashboardCard 
          title="Urgent Roles" 
          value={stats.urgentRoles} 
          icon={AlertCircle} 
          description="Closing soon"
          highlight
          delay={3}
        />
      </div>

      {/* Quick Actions Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col justify-center">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <CardTitle className="text-lg">Hiring Velocity</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">+23%</span>
                <span className="text-sm text-muted-foreground">vs last quarter</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Average time-to-hire reduced by 5 days
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* College Intelligence */}
          <CollegeStats />
          
          {/* Hiring Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring Funnel Snapshot</CardTitle>
              <CardDescription>Pipeline conversion for Senior Backend Developer</CardDescription>
            </CardHeader>
            <CardContent>
              <HiringFunnel />
            </CardContent>
          </Card>

          {/* Skill Demand Chart */}
          <SkillDemandChart />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Job Readiness */}
          <JobReadiness jobs={activeJobs} />

          {/* Placement Calendar */}
          <PlacementCalendar />

          {/* Top Candidate Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Candidate Match</CardTitle>
              <CardDescription>Based on recent applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    AJ
                  </div>
                  <div>
                    <div className="font-semibold">Alex Johnson</div>
                    <div className="text-sm text-muted-foreground">Computer Science</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skill Match</span>
                    <span className="font-medium text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CGPA</span>
                    <span className="font-medium">3.8/4.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">College</span>
                    <span className="font-medium">State University</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full text-xs h-8" data-testid="button-view-profile">
                  View Full Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon: Icon, description, highlight, delay = 0 }: any) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const duration = 1000;
    const steps = 20;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card 
      className={`transition-all duration-300 ${highlight ? 'border-l-4 border-l-amber-500' : ''} ${mounted ? 'animate-in fade-in slide-in-from-bottom-2' : 'opacity-0'}`}
      style={{ animationDelay: `${delay * 100}ms` }}
      data-testid={`card-stat-${title.toLowerCase().replace(/\s/g, '-')}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${highlight ? 'text-amber-500' : 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
