'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${role}`);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3">
          <Icons.logo className="h-10 w-10 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Talent Track
          </h1>
        </div>
        <p className="max-w-md text-muted-foreground">
          Your AI-powered bridge between campus and career. Log in to unlock
          your potential.
        </p>
      </div>

      <Card className="mt-8 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Select your role and enter your credentials to continue.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" aria-label="Select role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="tpo">TPO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                defaultValue="test@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                defaultValue="password"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
      <footer className="mt-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Talent Track Inc. All rights reserved.
      </footer>
    </main>
  );
}
