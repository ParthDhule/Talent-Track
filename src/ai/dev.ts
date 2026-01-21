import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-relevant-jobs.ts';
import '@/ai/flows/analyze-resume-for-job.ts';
import '@/ai/flows/resume-from-prompt.ts';
import '@/ai/flows/suggest-student-profiles.ts';