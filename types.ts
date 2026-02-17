// Import React to resolve 'Cannot find namespace React' error
import React from 'react';

export type NavItemId = 
  | 'dashboard' 
  | 'goals_tasks' 
  | 'my_goals' 
  | 'my_tasks' 
  | 'org_intelligence' 
  | 'work_summary' 
  | 'manage_projects' 
  | 'team_management' 
  | 'ask_teamgrid' 
  | 'settings'
  | 'download';

export interface NavItem {
  id: NavItemId;
  label: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  hasBadge?: boolean;
}