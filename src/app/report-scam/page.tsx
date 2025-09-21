
'use client';

import { ShieldAlert } from 'lucide-react';
import ReportScamForm from './report-scam-form';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportScamPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <ShieldAlert className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Report a Scam
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Help protect the community by sharing your experience. By reporting
            a scam, you provide valuable information that can prevent others
            from becoming victims. Please fill out the form below with as much
            detail as possible.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          {user ? (
            <ReportScamForm />
          ) : (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Login Required
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
                <p className="text-muted-foreground">
                  You must be logged in to report a scam.
                </p>
                <Button onClick={() => router.push('/auth')}>
                  Login or Sign Up
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
