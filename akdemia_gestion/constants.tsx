import { 
  LayoutDashboard, 
  Palette, 
  Users, 
  GraduationCap, 
  DollarSign, 
  Settings,
  Bell,
  Search,
  Menu
} from 'lucide-react';
import { NavItem, ViewState } from './types';

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: ViewState.DASHBOARD, label: 'Panel Principal', icon: LayoutDashboard, path: '/dashboard' },
  { id: ViewState.DESIGN_SYSTEM, label: 'Sistema de Diseño', icon: Palette, path: '/design-system' },
  { id: ViewState.STUDENTS, label: 'Estudiantes', icon: GraduationCap, path: '/students' },
  { id: ViewState.TEACHERS, label: 'Profesores', icon: Users, path: '/teachers' },
  { id: ViewState.FINANCE, label: 'Finanzas', icon: DollarSign, path: '/finance' },
];

export const MOCK_USER = {
  name: 'Lic. Roberto Martínez',
  role: 'Director Administrativo',
  avatarUrl: 'https://picsum.photos/100/100'
};