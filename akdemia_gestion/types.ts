import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface MetricCardProps {
  id?: string;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: 'blue' | 'red' | 'yellow' | 'green';
  icon: LucideIcon;
  onClick?: () => void;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  DESIGN_SYSTEM = 'DESIGN_SYSTEM',
  STUDENTS = 'STUDENTS',
  TEACHERS = 'TEACHERS',
  FINANCE = 'FINANCE'
}