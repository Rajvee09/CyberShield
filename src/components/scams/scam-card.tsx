
import {
  Calendar,
  TriangleAlert,
  TrendingUp,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import type { Scam } from '@/lib/definitions';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ScamCardProps {
  scam: Scam;
  onCardClick: () => void;
}

const severityStyles: { [key: string]: string } = {
  'Low - Annoyance': 'bg-blue-100 text-blue-800 border-blue-200',
  'Medium - Moderate risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'High - Immediate danger': 'bg-orange-100 text-orange-800 border-orange-200',
  'Critical - Financial loss occurred':
    'bg-red-100 text-red-800 border-red-200',
};

export default function ScamCard({ scam, onCardClick }: ScamCardProps) {
  const severityLabel = scam.severity.split(' - ')[0];

  return (
    <Card
      className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-lg border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-primary/50"
      onClick={onCardClick}
    >
      <div>
        <CardHeader className="flex-row items-start justify-between p-0">
          <CardTitle className="pr-2 font-headline text-lg font-bold leading-tight">
            {scam.title}
          </CardTitle>
          <TriangleAlert className="h-5 w-5 flex-shrink-0 text-red-500" />
        </CardHeader>

        <CardContent className="space-y-4 p-0 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={cn(
                'border text-xs capitalize',
                'bg-pink-100 text-pink-800 border-pink-200'
              )}
            >
              {scam.platform}
            </Badge>
            <Badge
              className={cn(
                'border text-xs capitalize',
                severityStyles[scam.severity]
              )}
            >
              {severityLabel}
            </Badge>
            {scam.isTrending && (
              <Badge
                className={cn(
                  'border text-xs',
                  'bg-orange-100 text-orange-800 border-orange-200'
                )}
              >
                <TrendingUp className="mr-1 h-3 w-3" />
                Trending
              </Badge>
            )}
          </div>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {scam.description}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(scam.createdAt), 'MMM d')}</span>
            </div>
            {scam.financialLoss && scam.financialLoss > 0 ? (
              <div className="font-bold text-red-600">
                $
                {scam.financialLoss.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            ) : null}
          </div>

          {scam.warningSigns && scam.warningSigns.length > 0 && (
            <div className="text-sm">
              <p className="mb-1 flex items-center font-semibold text-yellow-700">
                <TriangleAlert className="mr-2 h-4 w-4" />
                Warning Signs:
              </p>
              <ul className="list-inside list-disc space-y-1 pl-2 text-muted-foreground">
                {scam.warningSigns.slice(0, 2).map((sign, index) => (
                  <li key={index} className="truncate">
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="mt-4 p-0">
        <Button
          variant="outline"
          className="w-full gap-2"
        >
          <Eye className="h-4 w-4" />
          View Details
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </Button>
      </CardFooter>
    </Card>
  );
}
