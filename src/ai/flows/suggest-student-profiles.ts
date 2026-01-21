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

// NEW: Define a schema for student profiles for the AI
const StudentProfileSchemaForAI = z.object({
  id: z.string(),
  name: z.string(),
  resumeText: z.string(),
});

const SuggestStudentProfilesInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The description of the job vacancy.'),
  studentProfiles: z
    .array(StudentProfileSchemaForAI) // Changed from string to array of objects
    .describe('A list of student profiles to match against the job vacancy.'),
});
export type SuggestStudentProfilesInput = z.infer<typeof SuggestStudentProfilesInputSchema>;

// NEW: Define a schema for a single suggestion
const StudentSuggestionSchema = z.object({
    studentId: z.string().describe('The ID of the matched student from the provided list.'),
    matchScore: z.number().describe('A score from 0 to 1 indicating how well the student profile matches the job description, where 1 is a perfect match.'),
    reasoning: z.string().describe('A brief explanation of why the student is a good match for the job.'),
});

const SuggestStudentProfilesOutputSchema = z.array(StudentSuggestionSchema).describe( // Changed from object to array
  'A list of student profiles that best match the job vacancy, sorted from highest match score to lowest.'
);
export type SuggestStudentProfilesOutput = z.infer<typeof SuggestStudentProfilesOutputSchema>;

export async function suggestStudentProfiles(input: SuggestStudentProfilesInput): Promise<SuggestStudentProfilesOutput> {
  return suggestStudentProfilesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStudentProfilesPrompt',
  input: {schema: SuggestStudentProfilesInputSchema},
  output: {schema: SuggestStudentProfilesOutputSchema},
  prompt: `You are an expert recruiter specializing in matching student profiles to job vacancies.
You will be given a job description and a list of student profiles in JSON format.
Your task is to identify the best candidates for the job.

For each student, you must provide:
1.  'studentId': The ID of the student.
2.  'matchScore': A score from 0 to 1 indicating how well their resume matches the job description.
3.  'reasoning': A concise, one-sentence explanation for your match score, highlighting key skills or experiences.

Return a JSON array of these suggestion objects, sorted in descending order of 'matchScore'.

Job Description:
{{{jobDescription}}}

Student Profiles (JSON):
{{{json studentProfiles}}}
`,
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
