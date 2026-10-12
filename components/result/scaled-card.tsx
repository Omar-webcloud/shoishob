'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { ChildhoodResult, ResultCardType } from '@/types/result';
import { CardIdentity } from './cards/card-identity';
import { CardCertificate } from './cards/card-certificate';
import { CardBadges } from './cards/card-badges';
import { CardMemoriesLog } from './cards/card-memories-log';

export interface ScaledCardProps {
  result: ChildhoodResult;
  cardType?: ResultCardType;
  className?: string;
}

export const ScaledCard = forwardRef<HTMLDivElement, ScaledCardProps>(function ScaledCard(
  { result, cardType = 'identity', className },
  ref
) {
  const box = useRef<HTMLDivElement>(null);
  const CARD_W = 1080;
  const CARD_H = 1350;
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      if (el.clientWidth > 0) {
        setScale(el.clientWidth / CARD_W);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [CARD_W]);

  const renderCard = () => {
    switch (cardType) {
      case 'certificate':
        return <CardCertificate result={result} />;
      case 'badges_showcase':
        return <CardBadges result={result} />;
      case 'memories_log':
        return <CardMemoriesLog result={result} />;
      case 'identity':
      default:
        return <CardIdentity result={result} />;
    }
  };

  return (
    <div
      ref={box}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: Math.round(CARD_H * scale),
        overflow: 'hidden',
        borderRadius: `${Math.min(24, 56 * scale)}px`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: CARD_W,
          height: CARD_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div ref={ref} style={{ width: CARD_W, height: CARD_H }}>
          {renderCard()}
        </div>
      </div>
    </div>
  );
});

ScaledCard.displayName = 'ScaledCard';
