import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, trend, trendUp, className = '' }) => (
  <div className={`bg-card rounded-lg p-5 shadow-card hover:shadow-card-hover transition-shadow ${className}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-heading font-bold mt-1">{value}</p>
        {trend && (
          <p className={`text-xs mt-1 font-medium ${trendUp ? 'text-accent' : 'text-destructive'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <div className="p-2.5 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </div>
  </div>
);

export default StatCard;
