'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Bot, Loader2, Sparkles, TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { analyzeScamRisk, AnalyzeScamRiskOutput } from '@/ai/flows/analyze-scam-risk';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  text: z
    .string()
    .min(50, {
      message: 'Please enter at least 50 characters to analyze.',
    })
    .max(5000, {
      message: 'Text cannot be longer than 5000 characters.',
    }),
});

export default function ScamCheckerForm() {
  const [result, setResult] = useState<AnalyzeScamRiskOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeScamRisk({ text: data.text });
      setResult(analysisResult);
    } catch (error) {
      console.error('Error analyzing scam risk:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description:
          'There was an error processing your request. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getRiskColor = (score: number) => {
    if (score > 75) return 'bg-red-500';
    if (score > 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Analyze Message</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the suspicious text here..."
                      className="min-h-[150px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full transform transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Risk
                </>
              )}
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-8 animate-in fade-in">
            <Alert
              variant={result.riskScore > 75 ? 'destructive' : 'default'}
              className="mb-6"
            >
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle className="font-headline">
                Risk Score: {result.riskScore} / 100
              </AlertTitle>
              <AlertDescription>
                <Progress
                  value={result.riskScore}
                  className={`mt-2 h-2 [&>div]:${getRiskColor(result.riskScore)}`}
                />
              </AlertDescription>
            </Alert>
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl">
                  <Bot className="h-5 w-5" /> AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap font-body">{result.summary}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
//testing complete
