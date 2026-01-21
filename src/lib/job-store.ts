'use client';

import { Job, jobs as initialJobs } from './data';

export function getJobs(): Job[] {
  if (typeof window === 'undefined') {
    return initialJobs;
  }
  
  const newJobs = JSON.parse(localStorage.getItem('newJobs') || '[]');
  return [...newJobs, ...initialJobs];
}

export function addJob(jobData: Omit<Job, 'id' | 'companyLogo'>) {
  if (typeof window === 'undefined') return;

  const newJob: Job = {
    ...jobData,
    id: `job-${Date.now()}`,
    companyLogo: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/100/100`,
  };

  const newJobs: Job[] = JSON.parse(localStorage.getItem('newJobs') || '[]');
  newJobs.unshift(newJob);
  localStorage.setItem('newJobs', JSON.stringify(newJobs));
}
