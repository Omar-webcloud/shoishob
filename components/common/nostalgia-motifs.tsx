import React from 'react';

export function CricketBatIcon({ className = 'w-6 h-6', color = '#2E6F40' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 18.5L16.5 7.5L18.5 9.5L7.5 20.5L5.5 18.5Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 7.5L19.5 4.5C20 4 20.5 4 21 4.5C21.5 5 21.5 5.5 21 6L18 9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="5" r="3" fill="#68BA7F" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function KiteIcon({ className = 'w-6 h-6', color = '#2E6F40' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L20 10L12 18L4 10L12 2Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2V18" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M4 10H20" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M12 18C12 20 10 21 11 22C12 23 14 23 13 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CassetteIcon({ className = 'w-6 h-6', color = '#2E6F40' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="15" rx="3" stroke={color} strokeWidth="1.8" />
      <path d="M5 15L7 19H17L19 15" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="10" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="16" cy="10" r="2" stroke={color} strokeWidth="1.5" />
      <path d="M10 10H14" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function VintageTvIcon({ className = 'w-6 h-6', color = '#2E6F40' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3L11 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 3L13 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <rect x="3" y="7" width="18" height="14" rx="3" stroke={color} strokeWidth="1.8" />
      <rect x="5.5" y="9.5" width="10" height="9" rx="1.5" stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="11.5" r="1" fill={color} />
      <circle cx="18" cy="15.5" r="1" fill={color} />
    </svg>
  );
}

export function SchoolBellIcon({ className = 'w-6 h-6', color = '#2E6F40' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8C18 4.7 15.3 2 12 2C8.7 2 6 4.7 6 8C6 14 3 16 3 16H21C21 16 18 14 18 8Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.7 20C13.4 20.6 12.8 21 12 21C11.2 21 10.6 20.6 10.3 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PaperBoatIcon({ className = 'w-6 h-6', color = '#2E6F40' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 15L12 20L21 15L17 8L12 14L7 8L3 15Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4V14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MarblesIcon({ className = 'w-6 h-6', color = '#2E6F40' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="15" r="4.5" stroke={color} strokeWidth="1.8" />
      <circle cx="16" cy="14" r="5" stroke="#68BA7F" strokeWidth="1.8" />
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.8" />
      <path d="M6 13C7 14 7.5 15.5 7 17" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function FacebookIcon({ className = 'w-6 h-6', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export function InstagramIcon({ className = 'w-6 h-6', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

