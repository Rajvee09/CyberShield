import { Users, Target, ShieldCheck, HandHeart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <HandHeart className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl">
            About CyberShield
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Our mission is to create a safer digital world by empowering people with the tools and knowledge to fight back against online fraud.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl space-y-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                <ShieldCheck className="h-7 w-7 text-primary" />
                What is CyberShield?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                CyberShield is a community-powered platform dedicated to scam awareness and prevention. We believe that the best defense against digital fraud is a well-informed and vigilant community. Our website serves as a central hub where users can learn about the latest scams, check suspicious messages for risks, and report fraudulent activity to warn others.
              </p>
              <p>
                In a world where online threats are constantly evolving, CyberShield provides a proactive way for everyone—from the tech-savvy to the less experienced—to protect themselves and their loved ones.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                <Target className="h-7 w-7 text-primary" />
                What It Does
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong>AI Scam Checker:</strong> Our advanced AI tool analyzes suspicious emails, texts, and messages, providing an instant risk assessment and highlighting potential red flags. This gives users immediate clarity when faced with a potential scam.
                </li>
                <li>
                  <strong>Community Reports:</strong> We host a real-time database of scams reported by users from around the globe. By sharing experiences, our community builds a powerful, collective defense network, keeping everyone informed about emerging threats.
                </li>
                <li>
                  <strong>Prevention Guides:</strong> Knowledge is power. Our comprehensive guides break down common scam tactics, from phishing to fake job offers, teaching users the tell-tale signs to look out for.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                <Users className="h-7 w-7 text-primary" />
                How It Is Impactful
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                CyberShield's impact is measured by every scam it helps someone avoid. By providing accessible tools and fostering a culture of shared responsibility, we:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong>Empower Individuals:</strong> We turn potential victims into vigilant defenders by giving them the confidence to identify and dismiss threats.
                </li>
                <li>
                  <strong>Prevent Financial Loss:</strong> Every scam report and every analyzed message has the potential to save someone from significant financial and emotional distress.
                </li>
                <li>
                  <strong>Create a Global Watchdog:</strong> Our platform unites users, creating a powerful deterrent to scammers. When they know people are watching and sharing information, their tactics become less effective.
                </li>
              </ul>
               <p className="pt-4 font-semibold">
                Together, we are not just victims; we are a shield. Join us in making the digital world a safer place for everyone.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
