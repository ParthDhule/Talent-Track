// use server'
'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant job openings to students based on their resume details.
 *
 * - suggestRelevantJobs - A function that takes a resume as input and returns a list of suggested job openings.
 * - SuggestRelevantJobsInput - The input type for the suggestRelevantJobs function.
 * - SuggestRelevantJobsOutput - The return type for the suggestRelevantJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantJobsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the student\'s resume.'),
});
export type SuggestRelevantJobsInput = z.infer<typeof SuggestRelevantJobsInputSchema>;

const JobSuggestionSchema = z.object({
  jobTitle: z.string().describe('The title of the job.'),
  companyName: z.string().describe('The name of the company offering the job.'),
  jobDescription: z.string().describe('A brief description of the job.'),
  matchScore: z
    .number()
    .describe(
      'A score (0-1) indicating how well the job matches the resume. 1 is a perfect match.'
    ),
});

const SuggestRelevantJobsOutputSchema = z.array(JobSuggestionSchema).describe(
  'A list of job suggestions, each including the job title, company, description, and match score.'
);

export type SuggestRelevantJobsOutput = z.infer<typeof SuggestRelevantJobsOutputSchema>;

export async function suggestRelevantJobs(
  input: SuggestRelevantJobsInput
): Promise<SuggestRelevantJobsOutput> {
  return suggestRelevantJobsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantJobsPrompt',
  input: {schema: SuggestRelevantJobsInputSchema},
  output: {schema: SuggestRelevantJobsOutputSchema},
  prompt: `You are an AI job recommendation engine.

  Given a student's resume, you will suggest relevant job openings.
  Each job opening should include the job title, company, and a brief description.
  Also, provide a match score (0-1) indicating how well the job matches the resume.
  The closer to 1, the better the job match to the resume.

  Please return a list of job suggestions in JSON format.

  Resume:
  {{resumeText}}`,
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
