
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
    content: `
- **Sense of Urgency:** Scammers pressure you to act immediately, saying the offer is for a "limited time only" or your account will be suspended.
- **Unsolicited Contact:** Be wary of unexpected emails, texts, or calls, especially those asking for personal information.
- **Too Good to Be True:** If an offer seems unbelievably good (like winning a lottery you never entered), it's almost certainly a scam.
- **Spelling and Grammar Mistakes:** Legitimate companies usually have professional communications. Obvious errors are a big red flag.
- **Vague or Generic Greetings:** Emails starting with "Dear Customer" instead of your name can be a sign of a mass phishing attempt.
- **Requests for Unusual Payment Methods:** Scammers prefer untraceable payment methods like gift cards, wire transfers, or cryptocurrency.
    `,
  },
  {
    id: 'phishing',
    title: 'Phishing Scams',
    icon: MailWarning,
    content: `Phishing scams use fraudulent emails, texts, or websites to trick you into revealing personal information.
\n\n**How to Prevent:**
\n- **Verify the Sender:** Check the sender's email address. Scammers often use addresses that are slightly different from legitimate ones (e.g., 'service@paypa1.com').
\n- **Don't Click Suspicious Links:** Hover over links to see the actual URL before clicking. Manually type the website address into your browser instead.
\n- **Never Share Personal Information:** Banks and legitimate services will never ask for your password, PIN, or full social security number via email.
    `,
  },
  {
    id: 'tech-support',
    title: 'Tech Support Scams',
    icon: Computer,
    content: `These scams involve a pop-up or phone call claiming your computer is infected. The "technician" will then ask for payment or remote access to your device.
\n\n**How to Prevent:**
\n- **Legitimate Companies Don't Initiate Contact:** Microsoft, Apple, and Google will not cold-call you about a virus.
\n- **Don't Grant Remote Access:** Never give an unknown person control of your computer.
\n- **Close the Pop-Up:** If you see a scary pop-up, close your browser. If you can't, use Task Manager (Ctrl+Shift+Esc) or Force Quit to close it.
\n- **Never Pay with Gift Cards:** Scammers often demand payment via gift cards because they are untraceable.
    `,
  },
  {
    id: 'fake-job',
    title: 'Fake Job Scams',
    icon: Briefcase,
    content: `Scammers post fake job listings or contact you directly with offers that are too good to be true. They aim to steal your information or money.
\n\n**How to Prevent:**
\n- **Research the Company:** Look for a professional website, reviews, and a physical address. Be wary of companies that only exist on messaging apps.
\n- **Never Pay for a Job:** You should not have to pay for training, background checks, or equipment. A common scam involves sending you a fake check to "buy equipment" and asking you to wire the "extra" money back.
\n- **Protect Your Personal Information:** Don't provide bank details or your social security number before verifying the job is real and receiving a formal offer.
    `,
  },
  {
    id: 'investment',
    title: 'Investment Scams',
    icon: TrendingUp,
    content: `These scams promise high, guaranteed returns with little to no risk, often involving cryptocurrency or "exclusive" opportunities.
\n\n**How to Prevent:**
\n- **If It Sounds Too Good to Be True, It Is:** All investments carry risk. Guaranteed high returns are a major red flag.
\n- **Beware of Pressure:** Scammers will rush you to invest "before the opportunity is gone."
\n- **Verify the Platform:** Use only well-known, regulated cryptocurrency exchanges and investment platforms.
\n- **"Pig Butchering":** Be cautious of strangers who contact you online, build a relationship over weeks, and then start giving you investment advice.
    `,
  },
  {
    id: 'delivery-scams',
    title: 'Delivery Scams',
    icon: Truck,
    content: `You receive a text or email about a package delivery, often with a small "redelivery fee" or "customs charge."
\n\n**How to Prevent:**
\n- **Use Official Tracking:** Always track your packages directly on the official courier's website (e.g., FedEx, UPS, USPS).
\n- **Check the Link:** Phishing links will often use misspelled versions of real company names.
\n- **No Unexpected Fees:** Major couriers typically do not charge redelivery fees via text message. Customs fees are usually paid directly to the courier through their official portal, not a random link.
    `,
  },
  {
    id: 'romance-scams',
    title: 'Romance Scams',
    icon: HeartHandshake,
    content: `Scammers create fake profiles on dating sites and social media to build relationships with you, with the goal of eventually asking for money.
\n\n**How to Prevent:**
\n- **Stay on the Platform:** Scammers will try to move the conversation to a private chat app quickly. Be cautious.
\n- **Never Send Money:** No matter how sad or urgent the story (a medical emergency, a plane ticket to visit you, a failed business), never send money to someone you've only met online.
\n- **Do a Reverse Image Search:** Use their profile picture to see if it's a stock photo or has been stolen from someone else's profile.
    `,
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
frequently
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
