
import {
  Shield,
  BookOpenCheck,
  MailWarning,
  PhoneIncoming,
  Briefcase,
  TrendingUp,
  Truck,
  HeartHandshake,
  Computer,
  CircleAlert,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const preventionTopics = [
  {
    id: 'common-red-flags',
    title: 'Common Red Flags',
    icon: CircleAlert,
    content: `A sense of urgency is a major red flag. Scammers pressure you to act immediately, saying an offer is for a "limited time only" or that your account will be suspended.
Be wary of unsolicited contact. Unexpected emails, texts, or calls are suspicious, especially if they ask for personal information.
If an offer seems too good to be true, like winning a lottery you never entered, it's almost certainly a scam.
Legitimate companies usually have professional communications. Obvious spelling and grammar mistakes are a sign of a scam.
Be cautious of vague or generic greetings. Emails starting with "Dear Customer" instead of your name can be a sign of a mass phishing attempt.
Scammers prefer untraceable payment methods like gift cards, wire transfers, or cryptocurrency. Requests for these should be considered a red flag.`,
  },
  {
    id: 'phishing',
    title: 'Phishing Scams',
    icon: MailWarning,
    content: `Phishing scams use fraudulent emails, texts, or websites to trick you into revealing personal information.

How to Prevent:
Verify the sender's email address. Scammers often use addresses that are slightly different from legitimate ones (e.g., 'service@paypa1.com').
Don't click suspicious links. Hover over links to see the actual URL before clicking. It's safer to manually type the website address into your browser.
Never share sensitive personal information. Banks and legitimate services will never ask for your password, PIN, or full social security number via email.`,
  },
  {
    id: 'tech-support',
    title: 'Tech Support Scams',
    icon: Computer,
    content: `These scams involve a pop-up or phone call claiming your computer is infected. The "technician" will then ask for payment or remote access to your device.

How to Prevent:
Legitimate companies like Microsoft, Apple, and Google will not cold-call you about a virus.
Never grant an unknown person remote access to your computer.
If you see a scary pop-up, close your browser. If you can't, use your computer's task manager to force it to close.
Scammers often demand payment via gift cards because they are untraceable. Legitimate tech support will not do this.`,
  },
  {
    id: 'fake-job',
    title: 'Fake Job Scams',
    icon: Briefcase,
    content: `Scammers post fake job listings or contact you directly with offers that are too good to be true, aiming to steal your information or money.

How to Prevent:
Research the company. Look for a professional website, reviews, and a physical address. Be wary of companies that only exist on messaging apps.
You should never have to pay for a job. A common scam involves sending you a fake check to "buy equipment" and asking you to wire the "extra" money back.
Protect your personal information. Don't provide bank details or your social security number before verifying the job is real and receiving a formal offer.`,
  },
  {
    id: 'investment',
    title: 'Investment Scams',
    icon: TrendingUp,
    content: `These scams promise high, guaranteed returns with little to no risk, often involving cryptocurrency or "exclusive" opportunities.

How to Prevent:
If it sounds too good to be true, it is. All investments carry risk, and guaranteed high returns are a major red flag.
Beware of pressure tactics. Scammers will rush you to invest "before the opportunity is gone."
Use only well-known, regulated cryptocurrency exchanges and investment platforms.
Be cautious of strangers who contact you online, build a relationship, and then start giving you investment advice. This is a common tactic called "pig butchering."`,
  },
  {
    id: 'delivery-scams',
    title: 'Delivery Scams',
    icon: Truck,
    content: `You receive a text or email about a package delivery, often with a small "redelivery fee" or "customs charge."

How to Prevent:
Always track your packages directly on the official courier's website (e.g., FedEx, UPS, USPS).
Check the link carefully. Phishing links will often use misspelled versions of real company names.
Major couriers typically do not charge redelivery fees via text message. Customs fees are usually paid directly to the courier through their official portal, not a random link.`,
  },
  {
    id: 'romance-scams',
    title: 'Romance Scams',
    icon: HeartHandshake,
    content: `Scammers create fake profiles on dating sites and social media to build relationships with you, with the goal of eventually asking for money.

How to Prevent:
Be cautious if they try to move the conversation to a private chat app quickly.
Never send money to someone you've only met online, no matter how sad or urgent the story is.
Do a reverse image search of their profile picture to see if it's a stock photo or has been stolen from someone else's profile.`,
  },
];

export default function PreventionPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <BookOpenCheck className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Scam Prevention Guide
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Knowledge is your best defense. Learn to recognize the signs of
            common scams and take proactive steps to protect yourself, your
            finances, and your personal information.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <aside className="md:col-span-1">
            <div className="sticky top-24">
              <h3 className="font-headline text-xl font-semibold">
                Categories
              </h3>
              <nav className="mt-4">
                <ul className="space-y-2">
                  {preventionTopics.map(topic => (
                    <li key={topic.id}>
                      <Link
                        href={`#${topic.id}`}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <topic.icon className="h-5 w-5" />
                        <span>{topic.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="space-y-12">
              {preventionTopics.map(topic => (
                <Card
                  key={topic.id}
                  id={topic.id}
                  className="scroll-mt-24 shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-2xl text-primary">
                      <topic.icon className="h-7 w-7" />
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-stone max-w-none whitespace-pre-wrap text-base text-muted-foreground dark:prose-invert">
                    {topic.content}
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
