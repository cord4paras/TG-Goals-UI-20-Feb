
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Calendar, 
  Square, 
  Users2, 
  MessageSquare, 
  Settings, 
  Download, 
  ChevronDown, 
  Sun, 
  LogOut 
} from 'lucide-react';
import { NavItemId } from '../types';

interface SidebarProps {
  activeItemId: NavItemId;
  onSelect: (id: NavItemId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItemId, onSelect }) => {
  const [isGoalsExpanded, setIsGoalsExpanded] = useState(true);

  return (
    <div className="w-72 bg-black h-full flex flex-col text-[#f8fafc] font-medium selection:bg-white/10">
      {/* Brand Logo */}
      <div className="px-6 py-8 flex items-center gap-3">
        <div className="relative w-8 h-8">
           {/* Approximate colorful logo */}
           <div className="absolute inset-0 bg-blue-500 rounded-lg transform rotate-45 opacity-80"></div>
           <div className="absolute inset-0 bg-purple-500 rounded-lg transform -rotate-12 opacity-80"></div>
           <div className="absolute inset-0 bg-emerald-400 rounded-lg transform rotate-12 opacity-80 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
           </div>
        </div>
        <span className="text-2xl font-bold tracking-tight">TeamGrid</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
        {/* Dashboard */}
        <NavItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={activeItemId === 'dashboard'} 
          onClick={() => onSelect('dashboard')} 
        />

        {/* Goals & Tasks Group */}
        <div className="space-y-1">
          <button 
            onClick={() => setIsGoalsExpanded(!isGoalsExpanded)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-white/70 hover:text-white transition-colors group"
          >
            <div className="flex items-center gap-3">
              <BarChart3 size={20} className="group-hover:text-white" />
              <span className="text-base font-semibold">Goals & Tasks</span>
            </div>
            <ChevronDown 
              size={18} 
              className={`transition-transform duration-200 ${isGoalsExpanded ? 'rotate-0' : '-rotate-90'}`} 
            />
          </button>
          
          {isGoalsExpanded && (
            <div className="ml-10 space-y-1 mt-1">
              <SubNavItem 
                label="My Goals" 
                active={activeItemId === 'my_goals'} 
                onClick={() => onSelect('my_goals')} 
              />
              <SubNavItem 
                label="My Tasks" 
                active={activeItemId === 'my_tasks'} 
                onClick={() => onSelect('my_tasks')} 
              />
              {/* Note: "Team Goals" is omitted as per request */}
            </div>
          )}
        </div>

        <NavItem 
          icon={<BookOpen size={20} />} 
          label="Org Intelligence" 
          active={activeItemId === 'org_intelligence'} 
          onClick={() => onSelect('org_intelligence')} 
        />
        
        <NavItem 
          icon={<Calendar size={20} />} 
          label="Work Summary" 
          active={activeItemId === 'work_summary'} 
          onClick={() => onSelect('work_summary')} 
        />
        
        <NavItem 
          icon={<Square size={20} />} 
          label="Manage Projects" 
          active={activeItemId === 'manage_projects'} 
          onClick={() => onSelect('manage_projects')} 
        />
        
        <NavItem 
          icon={<Users2 size={20} />} 
          label="Team Management" 
          active={activeItemId === 'team_management'} 
          onClick={() => onSelect('team_management')} 
        />
        
        <div className="flex items-center justify-between group">
            <NavItem 
              icon={<MessageSquare size={20} />} 
              label="Ask TeamGrid" 
              active={activeItemId === 'ask_teamgrid'} 
              onClick={() => onSelect('ask_teamgrid')} 
              className="flex-1"
            />
            <span className="mr-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white">
              Beta
            </span>
        </div>

        <NavItem 
          icon={<Settings size={20} />} 
          label="Settings" 
          active={activeItemId === 'settings'} 
          onClick={() => onSelect('settings')} 
        />
      </nav>

      {/* Footer Section */}
      <div className="mt-auto px-4 pb-6 space-y-4">
        <div className="pt-4 border-t border-white/10">
          <NavItem 
            icon={<Download size={20} />} 
            label="Download Desktop App" 
            active={activeItemId === 'download'} 
            onClick={() => onSelect('download')} 
          />
        </div>

        {/* User Profile Area */}
        <div className="mt-6 flex items-center justify-between gap-2 px-2">
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold truncate text-white">hello@teamgrid.ai</span>
            <span className="text-xs text-white/40">org_admin</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white">
              <Sun size={18} />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Helper Components
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
      active ? 'text-white' : 'text-white/70 hover:text-white'
    } ${className}`}
  >
    <span className={`${active ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
      {icon}
    </span>
    <span className={`text-base font-semibold ${active ? 'font-bold' : ''}`}>{label}</span>
  </button>
);

const SubNavItem: React.FC<Omit<NavItemProps, 'icon'>> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex flex-col text-left py-1.5 transition-all group ${
      active ? 'text-white' : 'text-white/50 hover:text-white'
    }`}
  >
    <span className={`text-base font-semibold relative ${active ? 'font-bold' : ''}`}>
      {label}
      {active && <div className="absolute -bottom-1 left-0 w-8 h-[2px] bg-blue-500 rounded-full" />}
    </span>
  </button>
);
