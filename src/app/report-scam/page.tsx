import { ShieldAlert } from 'lucide-react';
import ReportScamForm from './report-scam-form';

export default function ReportScamPage() {
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
          <ReportScamForm />
        </div>
      </section>
    </div>
  );
}
