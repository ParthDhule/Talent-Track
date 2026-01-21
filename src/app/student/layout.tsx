import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Briefcase,
  FileText,
  LayoutGrid,
  ClipboardCheck,
} from 'lucide-react';
import { students } from '@/lib/data';

const navItems = [
  { href: '/student', label: 'Dashboard', icon: LayoutGrid, tooltip: 'Dashboard' },
  { href: '/student/resume', label: 'AI Resume Builder', icon: FileText, tooltip: 'Resume Builder' },
  { href: '/student/jobs', label: 'Job Matches', icon: Briefcase, tooltip: 'Job Matches' },
  { href: '/student/applications', label: 'Applications', icon: ClipboardCheck, tooltip: 'My Applications' },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const student = students[0]; // Mock current user
  return (
    <DashboardLayout
      navItems={navItems}
      userName={student.name}
      userRole="Student"
      userAvatar={student.avatar}
    >
      {children}
    </DashboardLayout>
  );
}
