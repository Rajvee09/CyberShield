import { ShieldQuestion } from 'lucide-react';
import ScamCheckerForm from './scam-checker-form';

export default function ScamCheckerPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <ShieldQuestion className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl">
            AI Scam Checker
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Received a suspicious email, text, or social media message? Paste
            it below and let our AI analyze it for potential red flags. Get an
            instant risk assessment and a clear explanation.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <ScamCheckerForm />
        </div>
      </section>
    </div>
  );
}
