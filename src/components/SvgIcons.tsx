import React from 'react';
import { IsekaiClass } from '../types/game';

export const GoddessAvatarSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="goddessGlow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#fff4c4" />
        <stop offset="100%" stopColor="#d4af37" stopOpacity="0.15" />
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="56" fill="url(#goddessGlow)" stroke="#b88a32" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="48" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="4 4" />
    {/* Halo */}
    <ellipse cx="60" cy="22" rx="22" ry="6" fill="none" stroke="#d4af37" strokeWidth="2.5" />
    {/* Hair back */}
    <path d="M35 55 C32 30, 88 30, 85 55 L90 92 L30 92 Z" fill="#f2d680" stroke="#7a5318" strokeWidth="2" />
    {/* Face */}
    <circle cx="60" cy="56" r="19" fill="#ffe7d1" stroke="#7a5318" strokeWidth="2" />
    {/* Eyes */}
    <circle cx="53" cy="56" r="2.5" fill="#4a2e16" />
    <circle cx="67" cy="56" r="2.5" fill="#4a2e16" />
    {/* Smile */}
    <path d="M55 64 Q60 68 65 64" fill="none" stroke="#a6523e" strokeWidth="2" strokeLinecap="round" />
    {/* Robe */}
    <path d="M38 95 C40 76, 80 76, 82 95 Z" fill="#fffaf0" stroke="#b88a32" strokeWidth="2" />
    {/* Iced coffee cup */}
    <rect x="78" y="66" width="14" height="20" rx="2" fill="#6f4e37" stroke="#3d2514" strokeWidth="1.5" />
    <line x1="85" y1="57" x2="88" y2="66" stroke="#c94a38" strokeWidth="2" />
  </svg>
);

export const ClassEmblemSvg: React.FC<{
  type: IsekaiClass['iconType'];
  color?: string;
  className?: string;
}> = ({ type, color = '#b88a32', className }) => {
  const renderSymbol = () => {
    switch (type) {
      case 'chef':
        return (
          <g stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 44 C18 32, 30 22, 40 24 C50 22, 62 32, 58 44 Z" fill="#fff7e6" />
            <rect x="24" y="44" width="32" height="10" rx="2" fill="#fff7e6" />
            <line x1="20" y1="62" x2="60" y2="62" />
          </g>
        );
      case 'sage':
        return (
          <g stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="40,16 58,58 22,58" fill="#e6f2f5" />
            <ellipse cx="40" cy="58" rx="24" ry="5" fill="#fff7e6" />
            <circle cx="40" cy="40" r="5" fill={color} />
          </g>
        );
      case 'necro':
        return (
          <g stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="40" cy="36" r="16" fill="#f3ecf8" />
            <rect x="33" y="49" width="14" height="10" rx="2" fill="#f3ecf8" />
            <circle cx="34" cy="36" r="3" fill={color} />
            <circle cx="46" cy="36" r="3" fill={color} />
            <line x1="37" y1="54" x2="37" y2="59" />
            <line x1="43" y1="54" x2="43" y2="59" />
          </g>
        );
      case 'priest':
        return (
          <g stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="40" y1="18" x2="40" y2="62" />
            <line x1="24" y1="34" x2="56" y2="34" />
            <circle cx="40" cy="34" r="10" fill="#fdebe8" />
          </g>
        );
      case 'guildmaster':
        return (
          <g stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="20,54 24,26 34,38 40,20 46,38 56,26 60,54" fill="#fff3d1" />
            <rect x="20" y="54" width="40" height="8" rx="2" fill={color} />
          </g>
        );
      case 'hiddengod':
        return (
          <g stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="40,14 47,31 65,31 51,42 56,60 40,49 24,60 29,42 15,31 33,31" fill="#fff6d6" />
            <circle cx="40" cy="39" r="6" fill={color} />
          </g>
        );
      case 'calamity':
        return (
          <g stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 16 L54 34 L64 30 L52 48 L62 60 L40 52 L18 60 L28 48 L16 30 L26 34 Z" fill="#fce8e6" />
          </g>
        );
      case 'courier':
        return (
          <g stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 44 L44 22 L40 38 L62 38 L36 60 L40 44 Z" fill="#e5f5ee" />
          </g>
        );
      case 'charmer':
        return (
          <g stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M40 58 C20 44, 18 24, 31 24 C37 24, 40 30, 40 30 C40 30, 43 24, 49 24 C62 24, 60 44, 40 58 Z"
              fill="#fbe9f0"
            />
          </g>
        );
      case 'debugger':
        return (
          <g stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="20" y="22" width="40" height="36" rx="6" fill="#eaf0fb" />
            <polyline points="29,35 35,40 29,45" />
            <line x1="41" y1="45" x2="51" y2="45" />
          </g>
        );
    }
  };

  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="37" fill="#faf0dc" stroke={color} strokeWidth="2.5" />
      <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
      {renderSymbol()}
    </svg>
  );
};
