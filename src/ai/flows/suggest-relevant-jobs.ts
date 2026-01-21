'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant job openings to students based on their resume details.
 *
 * - suggestRelevantJobs - A function that takes a resume and a list of jobs, and returns a list of suggested job openings.
 * - SuggestRelevantJobsInput - The input type for the suggestRelevantJobs function.
 * - SuggestRelevantJobsOutput - The return type for the suggestRelevantJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobSchemaForAI = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  company: z.string(),
  location: z.string(),
});


const SuggestRelevantJobsInputSchema = z.object({
  resumeText: z
    .string()
    .describe("The text content of the student's resume."),
  jobs: z.array(JobSchemaForAI).describe('List of available jobs to screen against the resume.')
});
export type SuggestRelevantJobsInput = z.infer<typeof SuggestRelevantJobsInputSchema>;

const JobSuggestionSchema = z.object({
  jobId: z.string().describe('The ID of the matched job from the provided list.'),
  matchScore: z
    .number()
    .describe(
      'A score (0-1) indicating how well the job matches the resume. 1 is a perfect match.'
    ),
});

const SuggestRelevantJobsOutputSchema = z.array(JobSuggestionSchema).describe(
  'A list of job suggestions, each including the job ID and match score.'
);

export type SuggestRelevantJobsOutput = z.infer<typeof SuggestRelevantJobsOutputSchema>;

export async function suggestRelevantJobs(
  input: SuggestRelevantJobsInput
): Promise<SuggestRelevantJobsOutput> {
  const output = await suggestRelevantJobsFlow(input);
  return output;
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantJobsPrompt',
  input: {schema: SuggestRelevantJobsInputSchema},
  output: {schema: SuggestRelevantJobsOutputSchema},
  prompt: `You are an AI job recommendation engine.
  Given a student's resume and a list of available jobs, suggest the most relevant job openings from the list.
  For each suggestion, provide the 'jobId' from the input job list and a match score (0-1, where 1 is a perfect match).
  Return a list of these job suggestions, sorted from highest match score to lowest.

  Resume:
  {{resumeText}}

  Available Jobs (JSON):
  {{{json jobs}}}`,
});

const suggestRelevantJobsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantJobsFlow',
    inputSchema: SuggestRelevantJobsInputSchema,
    outputSchema: SuggestRelevantJobsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
