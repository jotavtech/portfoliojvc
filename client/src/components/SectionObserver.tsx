import React from 'react';

interface SectionObserverProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionObserver({ 
  children, 
  className = ''
}: SectionObserverProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
} 