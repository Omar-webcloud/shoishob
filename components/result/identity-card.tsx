import React from 'react';
import { ChildhoodResult, ResultCardType } from '@/types/result';
import { CardIdentity } from './cards/card-identity';
import { CardMemoriesLog } from './cards/card-memories-log';
import { CardCertificate } from './cards/card-certificate';
import { CardBadges } from './cards/card-badges';

export interface IdentityCardProps {
  result: ChildhoodResult;
  cardType?: ResultCardType;
}

export function IdentityCard({
  result,
  cardType = 'identity',
}: IdentityCardProps) {
  switch (cardType) {
    case 'memories_log':
      return <CardMemoriesLog result={result} />;
    case 'certificate':
      return <CardCertificate result={result} />;
    case 'badges_showcase':
      return <CardBadges result={result} />;
    case 'identity':
    default:
      return <CardIdentity result={result} />;
  }
}
