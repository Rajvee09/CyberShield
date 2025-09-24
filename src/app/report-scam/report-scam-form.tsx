
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Send, PlusCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { FileDragDrop } from '@/components/ui/file-drag-drop';
import { useAuth } from '@/context/auth-context';
import { addScam } from '@/lib/data';

const scamTypes = [
  'Phishing',
  'Fake Job',
  'Investment',
  'Tech Support',
  'Delivery',
] as const;

const platforms = [
  'Email',
  'Website',
  'Social Media',
  'Phone Call',
  'Text Message',
  'Instagram',
  'Facebook',
  'Flipkart',
  'Blinkit',
  'Zepto',
  'LinkedIn',
  'Freelancing Website',
  'Amazon',
  'Meesho',
] as const;

const severityLevels = [
  'Low - Annoyance',
  'Medium - Moderate risk',
  'High - Immediate danger',
  'Critical - Financial loss occurred',
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/quicktime',
];

const FormSchema = z.object({
  title: z
    .string()
    .min(10, { message: 'Title must be at least 10 characters.' })
    .max(100, { message: 'Title cannot be longer than 100 characters.' }),
  type: z.enum(scamTypes, {
    errorMap: () => ({ message: 'Please select a valid scam type.' }),
  }),
  platform: z.enum(platforms, {
    errorMap: () => ({ message: 'Please select a platform.' }),
  }),
  severity: z.enum(severityLevels, {
    errorMap: () => ({ message: 'Please select a severity level.' }),
  }),
  description: z
    .string()
    .min(50, { message: 'Description must be at least 50 characters.' })
    .max(2000, {
      message: 'Description cannot be longer than 2000 characters.',
    }),
  attachments: z
    .array(
      z.instanceof(File).refine(file => file.size <= MAX_FILE_SIZE, {
        message: 'File size must be less than 10MB.',
      })
    )
    .optional(),
  financialLoss: z.string().optional(),
  warningSigns: z
    .array(
      z.object({
        value: z.string().min(1, { message: 'Warning sign cannot be empty.' }),
      })
    )
    .optional(),
  country: z.string().min(2, { message: 'Please enter a country.' }),
});

function FormSkeleton() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Scam Report Form
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-10 w-32" />
      </CardContent>
    </Card>
  );
}

export default function ReportScamForm() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      type: undefined,
      platform: undefined,
      severity: 'Medium - Moderate risk',
      financialLoss: '',
      warningSigns: [{ value: '' }],
      attachments: [],
      country: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'warningSigns',
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not Logged In',
        description: 'You must be logged in to report a scam.',
      });
      return;
    }
    setIsLoading(true);

    try {
      await addScam({
        title: data.title,
        description: data.description,
        country: data.country,
        type: data.type,
        platform: data.platform,
        severity: data.severity,
        warningSigns: data.warningSigns?.map(ws => ws.value).filter(ws => ws) || [],
        financialLoss: data.financialLoss ? parseFloat(data.financialLoss) : 0,
        authorId: user.id,
      });

      toast({
        title: 'Report Submitted!',
        description:
          'Thank you for helping keep the community safe. Your report has been received.',
      });
      form.reset();
      // Redirect to community page after successful submission
      router.push('/community');
    } catch (error) {
      console.error('Failed to submit report:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'There was an error submitting your report. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  if (!isClient) {
    return <FormSkeleton />;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Scam Report Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scam Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief title describing the scam"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Where did this scam occur?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {platforms.map(p => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scam Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="What type of scam is this?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {scamTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a severity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {severityLevels.map(level => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., USA, Canada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the scam, including how it works, what the scammers said/did, and any other relevant details..."
                      className="min-h-[150px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attach Images/Videos (Optional)</FormLabel>
                  <FormControl>
                    <FileDragDrop
                      onFilesChange={field.onChange}
                      accept={ACCEPTED_FILE_TYPES.join(',')}
                      maxSize={MAX_FILE_SIZE}
                    />
                  </FormControl>
                  <FormDescription>
                    Attach screenshots, screen recordings, or any other relevant files. Max file size: 10MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialLoss"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financial Loss (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Amount lost (in dollars)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormLabel>Warning Signs</FormLabel>
              <FormDescription>
                What should people look out for to identify this scam?
              </FormDescription>
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`warningSigns.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            placeholder={`Warning sign ${index + 1}`}
                            {...field}
                          />
                        </FormControl>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <XCircle className="h-5 w-5 text-muted-foreground" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: '' })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Warning Sign
              </Button>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full transform transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
//testing complete
