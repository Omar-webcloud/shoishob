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
    const isLandscape = orientation === 'landscape';
    const width = isLandscape ? 1200 : 1080;
    const height = isLandscape ? 750 : 1350;

    return (
      <div
        ref={ref}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          minWidth: `${width}px`,
          minHeight: `${height}px`,
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {cardType === 'memories_log' && (
          <CardMemoriesLog result={result} orientation={orientation} />
        )}
        {cardType === 'certificate' && (
          <CardCertificate result={result} orientation={orientation} />
        )}
        {cardType === 'badges_showcase' && (
          <CardBadges result={result} orientation={orientation} />
        )}
        {cardType === 'identity' && (
          <CardIdentity result={result} orientation={orientation} />
        )}
      </div>
    );
  }
);

ExportableCard.displayName = 'ExportableCard';
