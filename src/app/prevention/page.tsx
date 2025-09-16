import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpenCheck } from 'lucide-react';

const preventionTips = [
  {
    id: 'phishing',
    title: 'Phishing Scams',
    content: `Phishing scams use fraudulent emails, texts, or websites to trick you into revealing personal information like passwords or credit card numbers.
    \n\n**How to Prevent:**
    \n- **Verify the Source:** Always check the sender's email address. Scammers often use addresses that are slightly different from legitimate ones.
    \n- **Don't Click Suspicious Links:** Hover over links to see the actual URL before clicking. If it looks strange, don't click it.
    \n- **Look for Urgency:** Scammers often create a sense of urgency to pressure you into acting without thinking.
    \n- **Enable Two-Factor Authentication (2FA):** This adds an extra layer of security to your accounts.`,
  },
  {
    id: 'tech-support',
    title: 'Tech Support Scams',
    content: `These scams involve a pop-up or phone call claiming your computer is infected with a virus. The "technician" will then ask for payment or remote access to your device.
    \n\n**How to Prevent:**
    \n- **Legitimate Companies Don't Call You:** Microsoft, Apple, and other tech companies will not contact you unsolicited about a virus on your computer.
    \n- **Don't Grant Remote Access:** Never give an unknown person remote access to your computer.
    \n- **Close the Pop-Up:** If you see a scary pop-up, close your browser. If you can't, restart your computer.
    \n- **Never Pay with Gift Cards:** Scammers often demand payment via gift cards because they are untraceable.`,
  },
  {
    id: 'fake-job',
    title: 'Fake Job Offer Scams',
    content: `Scammers post fake job listings or contact you directly with offers that are too good to be true. They aim to steal your personal information or money.
    \n\n**How to Prevent:**
    \n- **Research the Company:** Do a thorough search for the company online. Look for a professional website, reviews, and a physical address.
    \n- **Be Wary of Vague Job Descriptions:** Legitimate job offers have clear requirements and responsibilities.
    \n- **Never Pay for a Job:** You should never have to pay for training, background checks, or equipment.
    \n- **Protect Your Personal Information:** Don't provide your bank account details or social security number before verifying the job is real.`,
  },
  {
    id: 'investment',
    title: 'Investment Scams',
    content: `These scams promise high, guaranteed returns with little to no risk, often involving cryptocurrency or "exclusive" opportunities.
    \n\n**How to Prevent:**
    \n- **If It Sounds Too Good to Be True, It Is:** Guaranteed high returns are a major red flag. All investments carry risk.
    \n- **Beware of Pressure:** Scammers will rush you to invest before you have time to research.
    \n- **Check for Registration:** Verify that the investment professional and the investment itself are registered with the appropriate regulatory bodies.
    \n- **Understand the Investment:** Never invest in something you don't fully understand.`,
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

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {preventionTips.map(tip => (
              <AccordionItem key={tip.id} value={tip.id}>
                <AccordionTrigger className="font-headline text-lg">
                  {tip.title}
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-wrap text-base text-muted-foreground">
                  {tip.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
