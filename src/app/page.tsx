'use client';

import{ motion } from "framer-motion";
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
  const[email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); //preveny page reload

    
    console.log({
      role,
      email,
      password,
    });
    router.push(`/${role}`);
  };

  return (
    <motion.main
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.6}}
    className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3">
          <Icons.logo className="h-10 w-10 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Tatent Track
          </h1>
        </div>
        <p className="max-w-md text-muted-foreground">
          Your AI-powered bridge between campus and career. Log in to unlock
          your potential.
        </p>
      </div>

        <motion.div
        initial={{scale:0.95, opacity:0}}
        animate={{scale:1, opacity:1}}
        transition={{delay:0.2}}
        >
          <div className="flex justify-center">
      <Card className="mt-8 w-full max-w-md rounded-2xl border bg-white/80 backdrop-blur shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
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
                placeholder="example@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
      </div>

      {/*HOME PAGE CONTENT STARTS HERE*/} 
      {/*About website section*/}
      <section className="mt=20 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">
          About Talent Track
        </h1>

        <p className="mt-4 text-gray-600">
          Talent Track is a smart placement management platform that connects
          Students, Recruiters and Training and Placement Officers on a single platform.
        </p>

        <p className="mt-2 text-gray-500">
          It simplifies the journey from campus to career by making hiring transparent, fas and organized.
        </p>
      </section>

      {/*role section*/}
      <section className="mt-16 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/*Student*/}
        <div className="p-6 border rounded-xl hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">
            Student
          </h2>
          <p className ="text-sm text-gray-600">
            Create your profile, track skills, apply for jobs and internships, and monitor your application status in real time.
          </p>
        </div>

        {/*Recruiter*/}
        <div className="p-6 border rounded-xl hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">
            Recruiter
          </h2>
          <p className ="text-sm text-gray-600">
            Post job openings, browse eligible student profiles, shortlist candidates, and manage the hiring process efficiently.
          </p>
        </div>

        {/*TPO*/}
        <div className="p-6 border rounded-xl hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">
            TPO
          </h2>
          <p className ="text-sm text-gray-600">
            Manage campus drives, track placement records and coordinate between students and recruiters smoothly.
          </p>
        </div>
      </section>

      {/*Why Talent Track*/}
      <section className="mt-20 grid text-center max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Why Talent Track?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 border rounded-lg">
            <h3 className="font-semibold mb-2"> Easy to use</h3>
            <p className="text-sm text-gray-600">
              Clean and simple interface for everyone.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h3 className="font-semibold mb-2"> Organized</h3>
            <p className="text-sm text-gray-600">
              All placement data in one secure palce.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h3 className="font-semibold mb-2"> Efficient</h3>
            <p className="text-sm text-gray-600">
              Faster communication between colleges and companies.
            </p>
          </div>
        </div>
      </section>

      </motion.div>
      <footer className="mt-8 text-sm text-muted-foreground">
        {new Date().getFullYear()} Talent Track 
      </footer>
    </motion.main>
  );
}

