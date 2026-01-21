import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Briefcase,
  Gift,
  LayoutGrid,
} from 'lucide-react';

const navItems = [
  { href: '/recruiter', label: 'Dashboard', icon: LayoutGrid, tooltip: 'Dashboard' },
  { href: '/recruiter/jobs', label: 'Job Postings', icon: Briefcase, tooltip: 'Job Postings' },
  { href: '/recruiter/offers', label: 'Offers', icon: Gift, tooltip: 'Manage Offers' },
];

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      navItems={navItems}
      userName="Emily Carter"
      userRole="Recruiter"
      userAvatar="https://picsum.photos/seed/106/100/100"
    >
      {children}
    </DashboardLayout>
  );
}
