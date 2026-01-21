'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { resumeFromPrompt } from '@/ai/flows/resume-from-prompt';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { students } from '@/lib/data';

const formSchema = z.object({
  prompt: z.string().min(50, {
    message: 'Please provide a more detailed description (at least 50 characters).',
  }),
});

export default function ResumeBuilderPage() {
  const [generatedResume, setGeneratedResume] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedResume('');
    try {
      const result = await resumeFromPrompt({ prompt: values.prompt });
      setGeneratedResume(result.resume);
      toast({
        title: "Success!",
        description: "Your new resume has been generated.",
      });
    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: "Failed to generate resume. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Resume Builder</CardTitle>
          <CardDescription>
            Describe your skills, experience, and education. Our AI will craft a
            professional resume for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I am a final year Computer Science student at State University. I am skilled in Python and React. I have interned at Tech Solutions Inc...'"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The more detail you provide, the better the result will be.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Resume'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generated Resume</CardTitle>
          <CardDescription>
            Review your AI-generated resume below. You can copy it or regenerate if needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 font-body text-sm">
              {generatedResume || students[0].resumeText}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
