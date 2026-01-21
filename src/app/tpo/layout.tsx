import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Building,
  LayoutGrid,
  Users,
} from 'lucide-react';

const navItems = [
  { href: '/tpo', label: 'Dashboard', icon: LayoutGrid, tooltip: 'Dashboard' },
  { href: '/tpo/students', label: 'Students', icon: Users, tooltip: 'Student Directory' },
  { href: '/tpo/companies', label: 'Companies', icon: Building, tooltip: 'Company Partners' },
];

export default function TpoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      navItems={navItems}
      userName="David Chen"
      userRole="Placement Officer"
      userAvatar="https://picsum.photos/seed/105/100/100"
    >
      {children}
    </DashboardLayout>
  );
}
