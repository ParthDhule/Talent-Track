'use server';

/**
 * @fileOverview Analyzes a resume against a job description, providing feedback for improvement.
 *
 * - analyzeResumeForJob - A function that analyzes the resume and provides feedback.
 * - AnalyzeResumeForJobInput - The input type for the analyzeResumeForJob function.
 * - AnalyzeResumeForJobOutput - The return type for the analyzeResumeForJob function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeForJobInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be analyzed.'),
  jobDescription: z
    .string()
    .describe('The job description to compare the resume against.'),
});
export type AnalyzeResumeForJobInput = z.infer<
  typeof AnalyzeResumeForJobInputSchema
>;

const AnalyzeResumeForJobOutputSchema = z.object({
  feedback: z
    .string()
    .describe(
      'AI-driven feedback highlighting areas for improvement in the resume, tailored to the job description.'
    ),
});
export type AnalyzeResumeForJobOutput = z.infer<
  typeof AnalyzeResumeForJobOutputSchema
>;

export async function analyzeResumeForJob(
  input: AnalyzeResumeForJobInput
): Promise<AnalyzeResumeForJobOutput> {
  return analyzeResumeForJobFlow(input);
}

const analyzeResumeForJobPrompt = ai.definePrompt({
  name: 'analyzeResumeForJobPrompt',
  input: {schema: AnalyzeResumeForJobInputSchema},
  output: {schema: AnalyzeResumeForJobOutputSchema},
  prompt: `You are an AI resume expert. A student will provide you with their resume and a job description. Analyze the resume to determine if the candidate is a good fit for the job. Highlight areas where the resume can be improved to better match the job description. Focus on skills, experience, and keywords that are relevant to the job. Provide actionable feedback to the student.

Resume:
{{resumeText}}

Job Description:
{{jobDescription}}`,
});

const analyzeResumeForJobFlow = ai.defineFlow(
  {
    name: 'analyzeResumeForJobFlow',
    inputSchema: AnalyzeResumeForJobInputSchema,
    outputSchema: AnalyzeResumeForJobOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumeForJobPrompt(input);
    return output!;
  }
);
