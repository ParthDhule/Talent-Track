'use client';

import { Application, applications as initialApplications, Job, Student, students } from './data';
import { getJobs } from './job-store';

function hydrateApplications(dehydratedApps: any[]): Application[] {
    const allJobs = getJobs();
    return dehydratedApps.map((app: any) => {
        const job = allJobs.find(j => j.id === app.jobId);
        const student = students.find(s => s.id === app.studentId);
        if (job && student) {
            return {
                id: app.id,
                job,
                student,
                status: app.status,
                appliedDate: app.appliedDate,
            };
        }
        return null;
    }).filter((app): app is Application => app !== null);
}

function dehydrateApplications(apps: Application[]): any[] {
     return apps.map(app => ({
        id: app.id,
        jobId: app.job.id,
        studentId: app.student.id,
        status: app.status,
        appliedDate: app.appliedDate,
    }));
}

function getApplicationsFromStore(): Application[] {
    if (typeof window === 'undefined') {
        return initialApplications;
    }
    const stored = localStorage.getItem('applications');
    if (stored) {
        return hydrateApplications(JSON.parse(stored));
    }
    // If nothing is in the store, initialize it with the default data
    localStorage.setItem('applications', JSON.stringify(dehydrateApplications(initialApplications)));
    return initialApplications;
}

function saveApplicationsToStore(apps: Application[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('applications', JSON.stringify(dehydrateApplications(apps)));
}

// Public API for the store
export function getApplications(): Application[] {
    return getApplicationsFromStore();
}

export function makeOffer(studentId: string, jobId: string) {
    if (typeof window === 'undefined' || !jobId) return;

    const allApps = getApplicationsFromStore();
    const existingAppIndex = allApps.findIndex(
        app => app.student.id === studentId && app.job.id === jobId
    );
    
    if (existingAppIndex > -1) {
        // App exists, update status
        allApps[existingAppIndex].status = 'Offered';
    } else {
        // App doesn't exist, create it
        const student = students.find(s => s.id === studentId);
        const job = getJobs().find(j => j.id === jobId);

        if (student && job) {
             const newApplication: Application = {
                id: `app-${Date.now()}`,
                student,
                job,
                status: 'Offered',
                appliedDate: new Date().toISOString().split('T')[0],
            };
            allApps.unshift(newApplication);
        }
    }
    
    saveApplicationsToStore(allApps);
}
