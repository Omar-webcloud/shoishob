import React from 'react';
import { ChildhoodResult, ResultCardType } from '@/types/result';
import { CardIdentity } from './cards/card-identity';
import { CardMemoriesLog } from './cards/card-memories-log';
import { CardCertificate } from './cards/card-certificate';
import { CardBadges } from './cards/card-badges';

interface ExportableCardProps {
  result: ChildhoodResult;
  cardType?: ResultCardType;
  orientation?: 'portrait' | 'landscape';
}

export const ExportableCard = React.forwardRef<HTMLDivElement, ExportableCardProps>(
  ({ result, cardType = 'identity', orientation = 'portrait' }, ref) => {
    return (
      <div ref={ref}>
        {cardType === 'memories_log' && (
          <CardMemoriesLog result={result} orientation={orientation} isExport={true} />
        )}
        {cardType === 'certificate' && (
          <CardCertificate result={result} orientation={orientation} isExport={true} />
        )}
        {cardType === 'badges_showcase' && (
          <CardBadges result={result} orientation={orientation} isExport={true} />
        )}
        {cardType === 'identity' && (
          <CardIdentity result={result} orientation={orientation} isExport={true} />
        )}
      </div>
    );
  }
);

ExportableCard.displayName = 'ExportableCard';
