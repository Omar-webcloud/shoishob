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
  orientation?: 'portrait' | 'landscape';
  className?: string;
}

export const ScaledCard = forwardRef<HTMLDivElement, ScaledCardProps>(function ScaledCard(
  { result, cardType = 'identity', orientation = 'portrait', className },
  ref
) {
  const box = useRef<HTMLDivElement>(null);
  const isLandscape = orientation === 'landscape';
  const CARD_W = isLandscape ? 1200 : 1080;
  const CARD_H = isLandscape ? 750 : 1350;
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
        return <CardCertificate result={result} orientation={orientation} />;
      case 'badges_showcase':
        return <CardBadges result={result} orientation={orientation} />;
      case 'memories_log':
        return <CardMemoriesLog result={result} orientation={orientation} />;
      case 'identity':
      default:
        return <CardIdentity result={result} orientation={orientation} />;
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
        borderRadius: '1.5rem',
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
