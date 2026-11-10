import React from 'react';

export const Circle: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 16, color = 'var(--color-red)', className = '' }) => (
  <span aria-hidden className={`inline-block rounded-full shrink-0 ${className}`} style={{ width: size, height: size, background: color }} />
);
export const Square: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 16, color = 'var(--color-blue)', className = '' }) => (
  <span aria-hidden className={`inline-block shrink-0 ${className}`} style={{ width: size, height: size, background: color }} />
);
export const Triangle: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 16, color = 'var(--color-yellow)', className = '' }) => (
  <svg aria-hidden width={size} height={size} viewBox="0 0 10 10" className={`shrink-0 ${className}`}><polygon points="5,0.5 10,9.5 0,9.5" fill={color} /></svg>
);

/** Section heading: shape + big geometric title, no eyebrow. */
export const Title: React.FC<{ shape: React.ReactNode; children: React.ReactNode; note?: string; right?: React.ReactNode }> = ({ shape, children, note, right }) => (
  <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
    <div className="flex items-start gap-4">
      <span className="mt-2">{shape}</span>
      <div>
        <h1 className="display text-[44px] md:text-[64px]">{children}</h1>
        {note && <p className="text-mute text-[17px] mt-2 max-w-[60ch]">{note}</p>}
      </div>
    </div>
    {right}
  </header>
);
