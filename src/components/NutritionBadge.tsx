import React from 'react';

interface NutritionBadgeProps {
  label: string;
  value: number;
  unit?: string;
  variant?: 'kalori' | 'protein' | 'karbo' | 'lemak';
}

const variantStyles: Record<string, string> = {
  kalori: 'bg-primary/10 text-primary',
  protein: 'bg-accent/10 text-accent',
  karbo: 'bg-warning/15 text-warning-foreground',
  lemak: 'bg-secondary/10 text-secondary',
};

const NutritionBadge: React.FC<NutritionBadgeProps> = ({ label, value, unit = 'g', variant = 'kalori' }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${variantStyles[variant]}`}>
    {label}: {value}{unit === 'kcal' ? '' : unit}
    {unit === 'kcal' && ' kcal'}
  </span>
);

export default NutritionBadge;
