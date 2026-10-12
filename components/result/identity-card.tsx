import React from 'react';
import { ChildhoodResult, ResultCardType } from '@/types/result';
import { CardIdentity } from './cards/card-identity';
import { CardMemoriesLog } from './cards/card-memories-log';
import { CardCertificate } from './cards/card-certificate';
import { CardBadges } from './cards/card-badges';

export interface IdentityCardProps {
  result: ChildhoodResult;
  cardType?: ResultCardType;
  orientation?: 'portrait' | 'landscape';
}

export function IdentityCard({
  result,
  cardType = 'identity',
  orientation = 'portrait',
}: IdentityCardProps) {
  switch (cardType) {
    case 'memories_log':
      return <CardMemoriesLog result={result} orientation={orientation} />;
    case 'certificate':
      return <CardCertificate result={result} orientation={orientation} />;
    case 'badges_showcase':
      return <CardBadges result={result} orientation={orientation} />;
    case 'identity':
    default:
      return <CardIdentity result={result} orientation={orientation} />;
  }
}
