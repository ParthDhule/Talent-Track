'use server';

/**
 * @fileOverview An AI agent that suggests student profiles that match job vacancies.
 *
 * - suggestStudentProfiles - A function that handles the suggestion of student profiles.
 * - SuggestStudentProfilesInput - The input type for the suggestStudentProfiles function.
 * - SuggestStudentProfilesOutput - The return type for the suggestStudentProfiles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStudentProfilesInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The description of the job vacancy.'),
  studentProfiles: z
    .string()
    .describe('A list of student profiles to match against the job vacancy.'),
});
export type SuggestStudentProfilesInput = z.infer<typeof SuggestStudentProfilesInputSchema>;

const SuggestStudentProfilesOutputSchema = z.object({
  suggestedProfiles: z
    .string()
    .describe('A list of student profiles that match the job vacancy.'),
});
export type SuggestStudentProfilesOutput = z.infer<typeof SuggestStudentProfilesOutputSchema>;

export async function suggestStudentProfiles(input: SuggestStudentProfilesInput): Promise<SuggestStudentProfilesOutput> {
  return suggestStudentProfilesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStudentProfilesPrompt',
  input: {schema: SuggestStudentProfilesInputSchema},
  output: {schema: SuggestStudentProfilesOutputSchema},
  prompt: `You are an expert recruiter specializing in matching student profiles to job vacancies.

You will use the job description and student profiles to identify the best candidates for the job.

Job Description: {{{jobDescription}}}

Student Profiles: {{{studentProfiles}}}

Based on the job description, suggest the student profiles that best match the job vacancy.`,
});

const suggestStudentProfilesFlow = ai.defineFlow(
  {
    name: 'suggestStudentProfilesFlow',
    inputSchema: SuggestStudentProfilesInputSchema,
    outputSchema: SuggestStudentProfilesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
