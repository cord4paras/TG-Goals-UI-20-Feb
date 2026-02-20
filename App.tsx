
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { NavItemId } from './types';
import { 
  Bell, 
  ChevronDown, 
  Calendar, 
  Clock, 
  Star, 
  Zap, 
  Plus, 
  Info, 
  Target as TargetIcon, 
  TrendingUp,
  TrendingDown, 
  Trophy, 
  Lock, 
  CheckCircle2,
  ChevronLeft,
  X,
  Check,
  ChevronRight,
  ShieldCheck,
  ChevronsRight,
  Flame,
  Users,
  LayoutGrid,
  ExternalLink,
  Square,
  Search,
  UserCheck,
  MessageSquare,
  Timer,
  AlertCircle,
  Award,
  Edit3,
  Medal,
  Sparkles,
  Lightbulb,
  User,
  Shield,
  Users2,
  CreditCard,
  Save,
  Layers,
  Settings2,
  CalendarRange,
  Target,
  Workflow,
  History,
  CalendarDays,
  ImagePlus,
  Repeat,
  Type,
  GanttChartSquare,
  Crown,
  BarChart3,
  Filter,
  Download,
  FolderOpen,
  Activity
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatarColor: string;
  status: string;
  goals: string;
  streak: string;
  score: string;
  reviewPending?: boolean;
  hasBadge?: boolean;
}

interface Achievement {
  id: number;
  memberId: number;
  title: string;
  date: string;
  description: string;
}

const TasksView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white text-[#0f172a] animate-in fade-in duration-700 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full px-8 py-20 flex flex-col items-center text-center">
        {/* Header Section */}
        <h1 className="text-[3.5rem] font-black tracking-tight mb-6 leading-tight">
          Integrate Your Workflow
        </h1>
        <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-20">
          Connect with your Jira / Asana account to automatically import and sync your tasks into TeamGrid.
        </p>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Jira Card */}
          <div className="bg-white rounded-[3.5rem] p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col items-center group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500">
            <div className="w-24 h-24 bg-[#eef4ff] rounded-[2.25rem] flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-600 rounded-sm transform rotate-[35deg] translate-x-1 -translate-y-1"></div>
                <div className="absolute inset-0 bg-blue-700 rounded-sm transform -rotate-[35deg] -translate-x-1 translate-y-1"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full z-10 border-4 border-blue-600"></div>
              </div>
            </div>
            <h3 className="text-3xl font-black mb-4">Jira Software</h3>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-[180px] mb-12">
              Project management for agile teams.
            </p>
            <button className="w-full py-5 bg-[#0f172a] text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.15em] hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-900/10">
              CONNECT JIRA
            </button>
          </div>

          {/* Asana Card */}
          <div className="bg-white rounded-[3.5rem] p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col items-center group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500">
            <div className="w-24 h-24 bg-[#fff1f1] rounded-[2.25rem] flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110">
              <div className="flex flex-col items-center gap-1">
                 <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                 <div className="flex gap-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                 </div>
              </div>
            </div>
            <h3 className="text-3xl font-black mb-4">Asana</h3>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-[200px] mb-12">
              Work anytime, anywhere with Asana.
            </p>
            <button className="w-full py-5 bg-[#0f172a] text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.15em] hover:bg-red-50 transition-all duration-300 shadow-lg shadow-slate-900/10">
              CONNECT ASANA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type ScoreRange = { minPercent: number; maxPercent: number; score: number };
type SettingsViewProps = {
  scoreFromAchievedRanges: ScoreRange[];
  setScoreFromAchievedRanges: React.Dispatch<React.SetStateAction<ScoreRange[]>>;
};

const SettingsView: React.FC<SettingsViewProps> = ({ scoreFromAchievedRanges, setScoreFromAchievedRanges }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'team' | 'billing' | 'goals_settings'>('goals_settings');
  const [softSkillsList, setSoftSkillsList] = useState([
    { id: 'ownership', label: 'Ownership', desc: 'Taking full accountability for deliverables' },
    { id: 'growth', label: 'Growth Attitude', desc: 'Willingness to learn and adapt to challenges' },
    { id: 'courage', label: 'Be Courageous', desc: 'Speaking up and taking bold initiatives' }
  ]);

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security & Login', icon: <Shield size={18} /> },
    { id: 'team', label: 'Team Structure', icon: <Users2 size={18} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
    { id: 'goals_settings', label: 'Goals Settings', icon: <Settings2 size={18} /> },
  ];

  // Setting Row Helper
  const SettingItem = ({ icon: Icon, title, description, enabled, onToggle }: any) => (
    <div className="group flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-300 hover:border-slate-300 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${enabled ? 'bg-blue-600/20 text-blue-600 ring-1 ring-blue-500/20' : 'bg-slate-100 text-slate-500'}`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col text-left">
          <p className="text-[14px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{title}</p>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{description}</p>
        </div>
      </div>
      <div 
        onClick={onToggle}
        className={`w-10 h-5 rounded-full flex items-center p-0.5 cursor-pointer transition-all duration-500 shadow-inner ${enabled ? 'bg-blue-600 ring-1 ring-blue-500/20' : 'bg-slate-300'}`}
      >
        <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 animate-in fade-in duration-500 overflow-y-auto">
      {/* Settings Header */}
      <div className="px-8 py-8 flex items-start justify-between border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/10 rounded-2xl border border-blue-500/20">
              <Target className="text-blue-500" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight leading-none">Settings</h1>
              <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest mt-1.5">Goal System Management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-black text-slate-700 uppercase tracking-widest leading-none">Feb 16</p>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">MONDAY</p>
          </div>
          <div className="h-10 w-px bg-slate-200 mx-2" />
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
            <Shield size={14} />
            ADMIN ACCESS
          </div>
        </div>
      </div>

      {/* Settings Layout */}
      <div className="px-8 flex gap-8 items-start py-8">
        {/* Settings Sidebar */}
        <div className="w-64 bg-white border border-slate-200 rounded-[2rem] p-3 space-y-1 shadow-xl sticky top-8">
          <p className="px-4 pt-3 pb-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Management</p>
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] scale-[1.02]' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-white' : 'text-slate-600'}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-10 pb-20">
          {activeTab === 'goals_settings' ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-left">
              
              {/* SECTION 1: CORE POLICY & MODULES */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 px-1">
                  <GanttChartSquare size={16} className="text-blue-500" />
                  <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em]">1. Core Policy & Modules</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Modules Management */}
                   <div className="p-6 rounded-[2rem] bg-white border border-slate-200 space-y-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                          <Layers size={18} />
                        </div>
                        <p className="text-[13px] font-black text-slate-900 uppercase tracking-wider">Module Visibility</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900">My Goals</span>
                          <span className="text-[9px] font-black text-slate-600 uppercase">Enable target tracking</span>
                        </div>
                        <div className="w-8 h-4.5 bg-blue-600 rounded-full flex items-center px-0.5 cursor-pointer"><div className="w-3.5 h-3.5 bg-white rounded-full translate-x-3.5" /></div>
                      </div>
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900">My Tasks</span>
                          <span className="text-[9px] font-black text-slate-600 uppercase">Task sync integrations</span>
                        </div>
                        <div className="w-8 h-4.5 bg-blue-600 rounded-full flex items-center px-0.5 cursor-pointer"><div className="w-3.5 h-3.5 bg-white rounded-full translate-x-3.5" /></div>
                      </div>
                    </div>
                  </div>

                  {/* Frequency & Constraints */}
                  <div className="p-6 rounded-[2rem] bg-white border border-slate-200 space-y-5 shadow-xl">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                          <TargetIcon size={18} />
                        </div>
                        <p className="text-[13px] font-black text-slate-900 uppercase tracking-wider">Cycle Constraints</p>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-400/20 shadow-sm">
                        <CalendarRange size={14} className="text-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Monthly</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center block">Min Goals</label>
                          <input type="number" defaultValue="3" className="w-full bg-white border border-slate-200 rounded-xl px-2 py-3 text-[13px] font-black text-slate-900 text-center focus:ring-1 focus:ring-emerald-500/30" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center block">Max Goals</label>
                          <input type="number" defaultValue="7" className="w-full bg-white border border-slate-200 rounded-xl px-2 py-3 text-[13px] font-black text-slate-900 text-center focus:ring-1 focus:ring-emerald-500/30" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center block">Critical Req</label>
                          <input type="number" defaultValue="1" className="w-full bg-white border border-slate-200 rounded-xl px-2 py-3 text-[13px] font-black text-slate-900 text-center focus:ring-1 focus:ring-emerald-500/30" />
                        </div>
                      </div>
                    </div>
                    <div className="pt-1 space-y-1.5 border-t border-slate-100">
                      <p className="text-[9px] font-medium text-slate-500 leading-snug"><strong className="font-bold text-slate-600">Goal Requirements:</strong> You must add at least the minimum number of goals and no more than the maximum per cycle.</p>
                      <p className="text-[9px] font-medium text-slate-500 leading-snug">Critical goals count toward the maximum. For example, if the maximum is 7 and 1 critical goal is required, you must include at least 1 critical goal, and your total goals must be between the minimum and 7.</p>
                    </div>
                  </div>
                </div>

                {/* Score from Achieved % – 5×5 style grid, user-friendly */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                      <BarChart3 size={18} />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-slate-900 uppercase tracking-wider">Score from Achieved %</p>
                      <p className="text-[9px] font-medium text-slate-500 mt-0.5">Edit ranges below. Manager review uses these to auto-fill score (1–10).</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {scoreFromAchievedRanges.map((range, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3 shadow-sm hover:shadow-md hover:border-blue-200/50 transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Range {idx + 1}</span>
                          <span className="w-6 h-6 rounded-lg bg-blue-500/15 text-blue-600 flex items-center justify-center text-[10px] font-black">{range.score}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            aria-label={`Range ${idx + 1} min %`}
                            value={range.minPercent}
                            onChange={(e) => {
                              const v = parseInt(e.target.value, 10);
                              if (!isNaN(v)) setScoreFromAchievedRanges(prev => prev.map((r, i) => i === idx ? { ...r, minPercent: Math.max(0, Math.min(100, v)) } : r));
                            }}
                            className="w-10 px-1.5 py-2 text-[11px] font-bold border border-slate-200 rounded-lg bg-white text-center focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-[10px] font-bold text-slate-400">–</span>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            aria-label={`Range ${idx + 1} max %`}
                            value={range.maxPercent}
                            onChange={(e) => {
                              const v = parseInt(e.target.value, 10);
                              if (!isNaN(v)) setScoreFromAchievedRanges(prev => prev.map((r, i) => i === idx ? { ...r, maxPercent: Math.max(0, Math.min(100, v)) } : r));
                            }}
                            className="w-10 px-1.5 py-2 text-[11px] font-bold border border-slate-200 rounded-lg bg-white text-center focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-[10px] font-bold text-slate-500">%</span>
                        </div>
                        <p className="text-[8px] font-medium text-slate-400 mt-1.5">→ Score {range.score}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] font-medium text-slate-500 mt-4 text-center">Score is auto-filled in manager review from the range that contains the entered Achieved %.</p>
                </div>
              </div>

              {/* SECTION 2: TIMING & SCHEDULE */}
              <div className="space-y-6 mt-12">
                <div className="flex items-center gap-2 px-1">
                  <CalendarDays size={16} className="text-blue-500" />
                  <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em]">2. Timing & Schedule</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dynamic Cycle Periods */}
                  <div className="p-7 rounded-[2.5rem] bg-white border border-slate-200 space-y-6 shadow-xl relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                        <UserCheck size={20} />
                      </div>
                      <p className="text-[14px] font-black text-slate-900 uppercase tracking-wider">Goal Submission Window</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Open on (day of month)</label>
                        <p className="text-[8px] font-medium text-slate-400 ml-1 -mt-0.5">e.g. 26 or 27 – submission opens this day every month</p>
                        <div className="relative">
                          <input type="number" defaultValue="26" min={1} max={31} placeholder="26" className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-base font-black text-slate-900 text-center focus:ring-2 focus:ring-indigo-500/30" />
                          <span className="absolute inset-y-0 right-4 flex items-center text-[9px] font-black text-slate-600 uppercase pointer-events-none">Day</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Duration (days)</label>
                        <p className="text-[8px] font-medium text-slate-400 ml-1 -mt-0.5">How many days the submission window stays open</p>
                        <div className="relative">
                          <input type="number" defaultValue="5" min={1} max={31} className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-base font-black text-slate-900 text-center focus:ring-2 focus:ring-indigo-500/30" />
                          <span className="absolute inset-y-0 right-4 flex items-center text-[9px] font-black text-slate-800 uppercase pointer-events-none">Days</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] font-medium text-slate-500">Applies every month. Set once; no need to change monthly.</p>
                  </div>

                  <div className="p-7 rounded-[2.5rem] bg-white border border-slate-200 space-y-6 shadow-xl relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#c5a452]/10 flex items-center justify-center text-[#c5a452] border border-[#c5a452]/20">
                        <ShieldCheck size={20} />
                      </div>
                      <p className="text-[14px] font-black text-slate-900 uppercase tracking-wider">Goal Review Window</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Open on (day of month)</label>
                        <p className="text-[8px] font-medium text-slate-400 ml-1 -mt-0.5">e.g. 26 or 27 – review window opens this day every month</p>
                        <div className="relative">
                          <input type="number" defaultValue="26" min={1} max={31} placeholder="26" className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-base font-black text-slate-900 text-center focus:ring-2 focus:ring-[#c5a452]/30" />
                          <span className="absolute inset-y-0 right-4 flex items-center text-[9px] font-black text-slate-600 uppercase pointer-events-none">Day</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Duration (days)</label>
                        <p className="text-[8px] font-medium text-slate-400 ml-1 -mt-0.5">How many days the review window stays open</p>
                        <div className="relative">
                          <input type="number" defaultValue="5" min={1} max={31} className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-base font-black text-slate-900 text-center focus:ring-2 focus:ring-[#c5a452]/30" />
                          <span className="absolute inset-y-0 right-4 flex items-center text-[9px] font-black text-slate-800 uppercase pointer-events-none">Days</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] font-medium text-slate-500">Applies every month. Set once; no need to change monthly.</p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: PERFORMANCE WORKFLOW */}
              <div className="space-y-6 mt-12">
                <div className="flex items-center gap-2 px-1">
                  <Sparkles size={16} className="text-blue-500" />
                  <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em]">3. Performance Workflow</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="p-1 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl overflow-hidden">
                    <SettingItem 
                      icon={Workflow} 
                      title="Soft Skills Evaluation & Competencies" 
                      description="Include behavioral metrics in performance scorecards" 
                      enabled={true} 
                    />
                    
                    <div className="p-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {softSkillsList.map(skill => (
                         <div key={skill.id} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-4 min-h-[160px]">
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Metric Title</label>
                              <input type="text" defaultValue={skill.label} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors" placeholder="e.g. Ownership" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Definition Subtext</label>
                              <textarea defaultValue={skill.desc} rows={2} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[10px] font-medium text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors resize-none" placeholder="Short description" />
                            </div>
                         </div>
                       ))}
                       <button type="button" onClick={() => setSoftSkillsList(s => [...s, { id: `new-${Date.now()}`, label: '', desc: '' }])} className="flex flex-col items-center justify-center gap-3 min-h-[160px] p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/30 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/40 transition-all duration-200 active:scale-[0.99]">
                         <Plus size={22} strokeWidth={2.5} className="opacity-80" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Add new metric</span>
                       </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: RECOGNITION & ENGAGEMENT */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-12">
                
                {/* Gamification Column */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 px-1">
                    <Trophy size={16} className="text-blue-500" />
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em]">4. Recognition Rules</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Badge Definition */}
                    <div className="p-6 rounded-[2.25rem] bg-white border border-slate-200 space-y-5 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                            <Medal size={16} />
                          </div>
                          <p className="text-[13px] font-black text-slate-900 uppercase tracking-wider">Badge Ranges</p>
                        </div>
                        <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors">Manage Icons</button>
                      </div>
                      
                      <div className="space-y-3">
                        {[{l:'Best Employee',v1:8.5,v2:10}, {l:'Growing Employee',v1:6,v2:8}, {l:'Need to Improve',v1:0,v2:6, lt:true}].map(range => (
                          <div key={range.l} className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                                <ImagePlus size={12} />
                              </div>
                              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{range.l}</label>
                            </div>
                            <div className="flex items-center gap-2">
                              {range.lt ? <span className="text-[9px] font-black text-slate-700">LT</span> : null}
                              {!range.lt && <><input type="number" defaultValue={range.v1} step="0.1" className="w-12 bg-white border border-slate-200 rounded-lg px-1.5 py-1.5 text-[10px] font-black text-slate-900 text-center" /><span className="text-[8px] font-black text-slate-600">TO</span></>}
                              <input type="number" defaultValue={range.v2} step="0.1" className="w-12 bg-white border border-slate-200 rounded-lg px-1.5 py-1.5 text-[10px] font-black text-slate-900 text-center" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Streak Rule */}
                    <div className="p-6 rounded-[2.25rem] bg-white border border-slate-200 space-y-4 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                          <Flame size={16} />
                        </div>
                        <p className="text-[13px] font-black text-slate-900 uppercase tracking-wider">Streak Points</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"><ImagePlus size={18} /></div>
                        <div className="flex-1 flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                          <input type="number" defaultValue="1" className="w-10 bg-transparent text-[14px] font-black text-slate-900 text-center focus:outline-none" />
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Mo =</span>
                          <input type="number" defaultValue="1" className="w-10 bg-transparent text-[14px] font-black text-slate-900 text-center focus:outline-none" />
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Pt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notifications Column */}
                <div className="space-y-6">
                   <div className="flex items-center gap-2 px-1">
                    <Bell size={16} className="text-blue-500" />
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em]">5. Engagement Alerts</h3>
                  </div>
                  
                  <div className="p-1 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl overflow-hidden">
                    <div className="space-y-1">
                      <SettingItem 
                        icon={TargetIcon} 
                        title="Goal Deadlines" 
                        description="Alert employees before submission ends" 
                        enabled={true} 
                      />
                      <SettingItem 
                        icon={ShieldCheck} 
                        title="Review Reminders" 
                        description="Alert managers for pending reviews" 
                        enabled={true} 
                      />
                      <SettingItem 
                        icon={Award} 
                        title="Badge Milestones" 
                        description="Congratulate users on rank upgrades" 
                        enabled={false} 
                      />
                    </div>
                    
                    <div className="p-8 pt-6 bg-slate-50 border-t border-slate-200 space-y-4">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                            <Clock size={16} />
                          </div>
                          <p className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Lead Time Configuration</p>
                       </div>
                       <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500/30 transition-colors">
                          <input type="number" defaultValue="3" className="w-14 bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 text-sm font-black text-slate-900 text-center focus:ring-1 focus:ring-indigo-500/40" />
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">REMINDER LEAD TIME</span>
                            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">DAYS BEFORE DEADLINE EXPIRY</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* FOOTER ACTION */}
              <div className="mt-12 p-8 bg-blue-600/5 border border-blue-500/10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-sm border border-blue-500/20">
                    <Info size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Global Policy Update</p>
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-relaxed max-w-md">Applying changes will instantly update cycle schedules and module access for all organization users.</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.15em] flex items-center gap-3 transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)]">
                  <Save size={18} strokeWidth={2.5} />
                  Save Goal Policy
                </button>
              </div>

            </div>
          ) : activeTab === 'profile' ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-left">
               <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                  <User className="text-blue-500" size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Profile Management</h2>
              </div>
              
              <div className="max-w-2xl bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">First Name</label>
                    <input type="text" defaultValue="jaimin" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Last Name</label>
                    <input type="text" defaultValue="Dholakia" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Official Email Address</label>
                  <input type="email" defaultValue="j5@gmail.com" disabled className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-600 cursor-not-allowed" />
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <button className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 transition-all duration-300">
                    <Save size={16} />
                    Confirm Updates
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 animate-in fade-in zoom-in duration-700">
              <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-6 shadow-xl border border-slate-200">
                <Settings2 size={40} className="text-slate-600 animate-spin-slow" />
              </div>
              <p className="text-lg font-black italic uppercase tracking-[0.3em] text-slate-700">Configuration Module Under Construction</p>
              <p className="text-[10px] font-bold text-slate-800 uppercase mt-4 max-w-sm text-center leading-relaxed">This settings segment is currently being optimized for enhanced organization control.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeItemId, setActiveItemId] = useState<NavItemId>('my_goals');
  const [viewMode, setViewMode] = useState<'employee' | 'manager'>('employee');
  const [managerTab, setManagerTab] = useState<'goals' | 'member'>('goals');
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [isBadgeInfoModalOpen, setIsBadgeInfoModalOpen] = useState(false);
  const [isStreakInfoModalOpen, setIsStreakInfoModalOpen] = useState(false);
  const [isReviewSummaryExpanded, setIsReviewSummaryExpanded] = useState(true);
  const [isSoftSkillsExpanded, setIsSoftSkillsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [roadmapStartIndex, setRoadmapStartIndex] = useState(0);
  const [memberReportMonth, setMemberReportMonth] = useState('February');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [goalType, setGoalType] = useState<'weekly' | 'monthly'>('monthly');
  const [managerGoalNotes, setManagerGoalNotes] = useState<Record<string, string>>({});
  const [managerGoalScores, setManagerGoalScores] = useState<Record<string, string>>({});
  const [managerGoalAchieved, setManagerGoalAchieved] = useState<Record<string, string>>({});

  // Score-from-Achieved % ranges (editable from Goals Settings): 0–10%→1, 11–20%→2, …, 91–100%→10
  const [scoreFromAchievedRanges, setScoreFromAchievedRanges] = useState<{ minPercent: number; maxPercent: number; score: number }[]>([
    { minPercent: 0, maxPercent: 10, score: 1 },
    { minPercent: 11, maxPercent: 20, score: 2 },
    { minPercent: 21, maxPercent: 30, score: 3 },
    { minPercent: 31, maxPercent: 40, score: 4 },
    { minPercent: 41, maxPercent: 50, score: 5 },
    { minPercent: 51, maxPercent: 60, score: 6 },
    { minPercent: 61, maxPercent: 70, score: 7 },
    { minPercent: 71, maxPercent: 80, score: 8 },
    { minPercent: 81, maxPercent: 90, score: 9 },
    { minPercent: 91, maxPercent: 100, score: 10 },
  ]);
  const getScoreFromAchieved = (achievedPercent: number): number => {
    if (achievedPercent == null || isNaN(achievedPercent)) return 0;
    const p = Math.max(0, Math.min(100, achievedPercent));
    const band = scoreFromAchievedRanges.find(r => p >= r.minPercent && p <= r.maxPercent);
    return band ? band.score : 0;
  };

  // Operational Goals (Goals detail view) - inline add/edit
  type OperationalGoal = { id: number; name: string; critical?: boolean; metric: string; achieved: number; weight: number; status: string; addedByManager?: boolean; managerNotes?: string; italic?: boolean };
  const [operationalGoals, setOperationalGoals] = useState<OperationalGoal[]>([
    { id: 1, name: "This is a demo goal added", critical: true, metric: "= 100%", achieved: 0, weight: 20, status: "PENDING", managerNotes: "Focus on quality over speed this sprint." },
    { id: 2, name: "Q1 Revenue Targets", critical: false, metric: "= 100%", achieved: 100, weight: 40, status: "COMPLETED", italic: true },
    { id: 3, name: "Strategic Lead Outreach", critical: false, metric: "5 priority leads", achieved: 5, weight: 40, status: "PENDING", addedByManager: true, managerNotes: "Prioritise enterprise leads." }
  ]);
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
  const [inlineNewGoal, setInlineNewGoal] = useState<Partial<OperationalGoal> | null>(null);

  // Achievement Form State
  const [achievementForm, setAchievementForm] = useState({
    title: '',
    date: '',
    description: ''
  });

  // Additional Achievements State
  const [additionalAchievements, setAdditionalAchievements] = useState<Achievement[]>([
    { id: 1, memberId: 1, title: "Excellence in Collaboration", date: "Jan 2026", description: "Led the cross-functional design review with stakeholders." },
    { id: 2, memberId: 1, title: "Speed Demon", date: "Dec 2025", description: "Delivered the UI kit 2 weeks ahead of schedule." }
  ]);

  // Expanded soft skills state matching the requested image
  const [softSkillsData, setSoftSkillsData] = useState([
    { id: 1, name: 'Ownership', employeeRating: 3, managerRating: 10 },
    { id: 2, name: 'Growth attitude', employeeRating: 0, managerRating: 0 },
    { id: 3, name: 'Be Courageous', employeeRating: 0, managerRating: 0 },
    { id: 4, name: 'Be Frugal', employeeRating: 0, managerRating: 0 },
    { id: 5, name: 'Fight for the greater good', employeeRating: 0, managerRating: 0 },
  ]);

  // Review Summary Data
  const [reviewSummary, setReviewSummary] = useState([
    { id: 1, question: "Did you completed your all goals?", employee: 'no', manager: null },
    { id: 2, question: "Did your manager give more than 5 rating in all soft skills?", employee: null, manager: null },
    { id: 3, question: "Did you completed your critical goal?", employee: 'no', manager: null },
  ]);

  // Mock Team Data for Manager View (includes extra members for leaderboard rank demo)
  const teamMembers: TeamMember[] = [
    { id: 1, name: "Sarah Jenkins", role: "Product Designer", avatarColor: "bg-purple-600", status: "Growing Employee", goals: "3/3", streak: "5 Months", score: "9.2", reviewPending: true, hasBadge: true },
    { id: 2, name: "David Miller", role: "Frontend Dev", avatarColor: "bg-emerald-600", status: "Shooting Star", goals: "2/3", streak: "3 Months", score: "8.5", reviewPending: true },
    { id: 3, name: "Emma Wilson", role: "UX Researcher", avatarColor: "bg-amber-600", status: "Growing Employee", goals: "3/3", streak: "12 Months", score: "9.8", reviewPending: false, hasBadge: true },
    { id: 4, name: "James Bond", role: "Security Engineer", avatarColor: "bg-indigo-600", status: "Intermediate", goals: "1/3", streak: "1 Month", score: "7.0", reviewPending: true },
    { id: 5, name: "Alex Chen", role: "Backend Dev", avatarColor: "bg-cyan-600", status: "Intermediate", goals: "2/3", streak: "2 Months", score: "6.8", reviewPending: false },
    { id: 6, name: "Jordan Lee", role: "Data Analyst", avatarColor: "bg-rose-600", status: "Intermediate", goals: "1/3", streak: "1 Month", score: "6.5", reviewPending: true },
    { id: 7, name: "Sam Taylor", role: "QA Engineer", avatarColor: "bg-violet-600", status: "Intermediate", goals: "2/3", streak: "2 Months", score: "6.2", reviewPending: false },
    { id: 8, name: "Riley Moore", role: "DevOps", avatarColor: "bg-teal-600", status: "Intermediate", goals: "1/3", streak: "1 Month", score: "6.0", reviewPending: true },
    { id: 9, name: "Casey Brown", role: "Designer", avatarColor: "bg-orange-500", status: "Intermediate", goals: "2/3", streak: "1 Month", score: "5.8", reviewPending: false },
    { id: 10, name: "Morgan Davis", role: "Support Lead", avatarColor: "bg-pink-600", status: "Intermediate", goals: "1/3", streak: "1 Month", score: "5.5", reviewPending: true },
    { id: 11, name: "Quinn White", role: "Content Writer", avatarColor: "bg-lime-600", status: "Intermediate", goals: "1/3", streak: "1 Month", score: "5.2", reviewPending: false },
    { id: 12, name: "Pat Kim", role: "Marketing", avatarColor: "bg-slate-600", status: "Intermediate", goals: "1/3", streak: "1 Month", score: "5.0", reviewPending: true },
  ];

  // Active login user (in real app from auth); used for leaderboard "Your score" and "Your rank"
  const activeLoginUserId = 12;
  const sortedByScore = [...teamMembers].sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
  const activeLoginUser = teamMembers.find(m => m.id === activeLoginUserId);
  const activeLoginUserRank = sortedByScore.findIndex(m => m.id === activeLoginUserId) + 1;

  const handleReviewChange = (id: number, type: 'employee' | 'manager', value: 'yes' | 'no') => {
    setReviewSummary(prev => prev.map(item => 
      item.id === id ? { ...item, [type]: value } : item
    ));
  };

  const handleSoftSkillRating = (skillId: number, type: 'employee' | 'manager', value: number) => {
    setSoftSkillsData(prev => prev.map(s =>
      s.id === skillId ? { ...s, [type === 'employee' ? 'employeeRating' : 'managerRating']: value } : s
    ));
  };

  const handleSaveAchievement = () => {
    if (!selectedMember || !achievementForm.title) return;
    const newAchievement: Achievement = {
      id: Date.now(),
      memberId: selectedMember.id,
      title: achievementForm.title,
      date: achievementForm.date || (memberReportMonth + " " + selectedYear),
      description: achievementForm.description || "Recognition for outstanding performance."
    };
    setAdditionalAchievements([...additionalAchievements, newAchievement]);
    setIsAchievementModalOpen(false);
    setAchievementForm({ title: '', date: '', description: '' });
  };

  const isEmployee = viewMode === 'employee';
  
  const bannerConfig = {
    title: "Add Your Goals For",
    subtitle: "February",
    badge: isEmployee ? "Active Cycle • February 2026" : "Active Cycle - February 2026",
    rankLabel: "Growing Employee",
    progressLabel: "Growing Employee Goal",
    progressStart: "Intermediate",
    progressValue: "2 / 3",
    progressWidth: "66%",
    currentStreak: "2 Months"
  };

  const months = [
    { name: 'January', status: 'completed', score: '8.5', label: 'Report Ready', streak: true },
    { name: 'February', status: 'active', label: 'Setting Goals', streak: true },
    { name: 'March', status: 'upcoming' },
    { name: 'April', status: 'upcoming' },
    { name: 'May', status: 'upcoming' },
    { name: 'June', status: 'upcoming' },
    { name: 'July', status: 'upcoming' },
    { name: 'August', status: 'upcoming' },
    { name: 'September', status: 'upcoming' },
    { name: 'October', status: 'upcoming' },
    { name: 'November', status: 'upcoming' },
    { name: 'December', status: 'upcoming' },
  ];
  const activeCycleMonth = months.find(m => m.status === 'active')?.name ?? null;
  const isGoalsCycleEditable = selectedMonth === activeCycleMonth;

  const completedMonthsWithScore = months.filter((m: { status?: string; score?: string }) => m.status === 'completed' && m.score);
  const employeeAvgScore = completedMonthsWithScore.length
    ? (completedMonthsWithScore.reduce((s: number, m: { score?: string }) => s + parseFloat(m.score || '0'), 0) / completedMonthsWithScore.length).toFixed(1)
    : null;

  useEffect(() => {
    if (!isGoalsCycleEditable) {
      setEditingGoalId(null);
      setInlineNewGoal(null);
    }
  }, [isGoalsCycleEditable]);

  const handleMonthClick = (name: string) => {
    if (name === 'February' || name === 'January') {
      setSelectedMonth(name);
      setIsDetailView(true);
    }
  };

  const handleNextRoadmap = () => {
    if (roadmapStartIndex + 4 < months.length) {
      setRoadmapStartIndex(prev => prev + 1);
    }
  };

  const handlePrevRoadmap = () => {
    if (roadmapStartIndex > 0) {
      setRoadmapStartIndex(prev => prev - 1);
    }
  };

  const filteredMembers = teamMembers.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Calculate overall team average score
  const teamAvgScore = (teamMembers.reduce((acc, m) => acc + parseFloat(m.score), 0) / teamMembers.length).toFixed(1);

  // Mock Goal Data for January (Approved) – past month with data already added
  const januaryGoals = [
    { id: 1, name: "Design System 2.0 Foundation", critical: true, metric: "100% core components updated", weight: "40%", progress: "90%", score: "9/10", status: "Approved", managerNotes: "Strong delivery on core components. Minor docs pending." },
    { id: 2, name: "Quarterly User Research Synthesis", critical: false, metric: "3 high-impact findings", weight: "40%", progress: "80%", score: "8/10", status: "Approved", managerNotes: "Good synthesis. Recommend deeper follow-up in Q2." },
    { id: 3, name: "Market Benchmarking Study", critical: false, metric: "Audit 5 competitors", weight: "20%", progress: "100%", score: "10/10", status: "Approved", addedByManager: true, managerNotes: "Exceeded scope. Well presented to leadership." },
  ];

  // Mock Goal Data for February (Active)
  const februaryGoals = [
    { id: 1, name: "Enhance Design System Efficiency", critical: true, metric: "100% components updated", progress: "45%", weight: "30%", status: "In Progress" },
    { id: 2, name: "Q1 Product Vision Alignment", critical: false, metric: "10 sessions completed", progress: "80%", weight: "20%", status: "In Progress" },
    { id: 3, name: "Strategic Lead Outreach", critical: false, metric: "5 priority leads", progress: "15%", weight: "15%", status: "In Progress", addedByManager: true },
  ];

  type ManagerReportGoal = { id: number; name: string; critical?: boolean; metric: string; weight: string; score?: string; status: string; addedByManager?: boolean; progress?: string };
  const [managerJanuaryGoals, setManagerJanuaryGoals] = useState<ManagerReportGoal[]>(() => [...januaryGoals]);
  const [managerFebruaryGoals, setManagerFebruaryGoals] = useState<ManagerReportGoal[]>(() => [...februaryGoals]);
  const [memberReportInlineNewGoal, setMemberReportInlineNewGoal] = useState<Partial<ManagerReportGoal> | null>(null);
  const [memberReportEditingGoalId, setMemberReportEditingGoalId] = useState<number | null>(null);
  const [memberReportEditDraft, setMemberReportEditDraft] = useState<Partial<ManagerReportGoal>>({});

  const currentMonthGoals = memberReportMonth === 'January' ? managerJanuaryGoals : managerFebruaryGoals;
  const setCurrentMonthGoals = memberReportMonth === 'January' ? setManagerJanuaryGoals : setManagerFebruaryGoals;

  const getDates = () => {
    const now = new Date();
    if (goalType === 'monthly') {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        start: start.toLocaleDateString('en-GB').replace(/\//g, ' - '),
        end: end.toLocaleDateString('en-GB').replace(/\//g, ' - ')
      };
    } else {
      const nextMonday = new Date(now);
      nextMonday.setDate(now.getDate() + ((7 - now.getDay() + 1) % 7 || 7));
      const nextSunday = new Date(nextMonday);
      nextSunday.setDate(nextMonday.getDate() + 6);
      return {
        start: nextMonday.toLocaleDateString('en-GB').replace(/\//g, ' - '),
        end: nextSunday.toLocaleDateString('en-GB').replace(/\//g, ' - ')
      };
    }
  };

  const { start: startDate, end: endDate } = getDates();

  return (
    <div className="flex h-screen bg-white text-slate-900 overflow-hidden font-sans">
      <Sidebar activeItemId={activeItemId} onSelect={(id) => { setActiveItemId(id); setIsDetailView(false); setSelectedMember(null); }} />

      <main className="flex-1 flex flex-col overflow-y-auto bg-[#f8fafc]">
        {/* Render Views based on Active Item */}
        {activeItemId === 'settings' ? (
          <SettingsView scoreFromAchievedRanges={scoreFromAchievedRanges} setScoreFromAchievedRanges={setScoreFromAchievedRanges} />
        ) : activeItemId === 'my_tasks' ? (
          <TasksView />
        ) : (
          <>
            {/* Top Navigation Bar */}
            <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm/5">
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200/50">
                <button
                  onClick={() => { setViewMode('employee'); setManagerTab('goals'); setSelectedMember(null); }}
                  className={`px-4 py-1 rounded-md text-[10px] font-black tracking-widest transition-all duration-300 ${
                    isEmployee ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  EMPLOYEE
                </button>
                <button
                  onClick={() => { setViewMode('manager'); setSelectedMember(null); }}
                  className={`px-4 py-1 rounded-md text-[10px] font-black tracking-widest transition-all duration-300 ${
                    !isEmployee ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  MANAGER
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm transition-colors duration-500 ${isEmployee ? 'bg-emerald-700' : 'bg-indigo-700'}`}>
                    {isEmployee ? 'P' : 'M'}
                  </div>
                  <div className="flex flex-col leading-none text-left">
                    <span className="text-xs font-bold text-slate-800">Paras Bhujwala</span>
                    <span className={`text-[8px] font-black uppercase tracking-tight ${isEmployee ? 'text-slate-400' : 'text-indigo-500'}`}>
                      {isEmployee ? 'EMPLOYEE VIEW' : 'MANAGER DASHBOARD'}
                    </span>
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </div>
              </div>
            </header>

            {/* Manager Sub-Tabs (ONLY for MANAGER viewMode) */}
            {!isEmployee && !isDetailView && (
              <div className="px-6 py-2 bg-white border-b border-slate-100 flex items-center gap-6">
                <button 
                  onClick={() => { setManagerTab('goals'); setSelectedMember(null); }}
                  className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-2 py-2 border-b-2 transition-all ${managerTab === 'goals' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  <LayoutGrid size={14} />
                  Goal Dashboard
                </button>
                <button 
                  onClick={() => { setManagerTab('member'); setSelectedMember(null); }}
                  className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-2 py-2 border-b-2 transition-all ${managerTab === 'member' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  <UserCheck size={14} />
                  View Team Member
                </button>
              </div>
            )}

            <section className="p-6 flex-1">
              <div className="max-w-7xl mx-auto">
                {!isEmployee && !isDetailView && managerTab === 'member' ? (
                  /* VIEW TEAM MEMBER DIRECTORY OR INDIVIDUAL REPORT */
                  selectedMember ? (
                    /* INDIVIDUAL MEMBER REPORT PAGE */
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setSelectedMember(null)}
                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                          >
                            <ChevronLeft size={20} strokeWidth={3} />
                          </button>
                          <div className="flex flex-col text-left">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedMember.name}'s Report</h2>
                            <div className="flex items-center gap-2">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance Snapshot • {selectedMember.role}</p>
                               <span className="text-slate-200 text-[10px]">•</span>
                               <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 self-start">
                                 <Timer size={10} className="animate-pulse" />
                                 <span className="text-[9px] font-black uppercase tracking-widest">Approve / Reject Goals by 04 Feb 2026</span>
                               </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="text-right flex flex-col">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">OVERALL SCORE</span>
                             <span className="text-xl font-black text-blue-600 leading-none">{selectedMember.score}</span>
                           </div>
                           <div className={`w-12 h-12 rounded-2xl ${selectedMember.avatarColor} flex items-center justify-center text-white text-lg font-black shadow-md`}>
                            {selectedMember.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
                           <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                              <Trophy size={24} />
                           </div>
                           <div className="flex flex-col text-left">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GOALS COMPLETED</span>
                              <span className="text-lg font-black text-slate-900">{selectedMember.goals}</span>
                           </div>
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
                           <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                              <Flame size={24} fill="currentColor" />
                           </div>
                           <div className="flex flex-col text-left">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ACTIVE STREAK</span>
                              <span className="text-lg font-black text-slate-900">{selectedMember.streak}</span>
                           </div>
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
                           <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                              <Zap size={24} fill="currentColor" />
                           </div>
                           <div className="flex flex-col text-left">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CURRENT RANK</span>
                              <span className="text-lg font-black text-slate-900 uppercase">{selectedMember.status}</span>
                           </div>
                        </div>
                      </div>

                      {/* Monthly Goals Roadmap for Member */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between ml-1 pr-1">
                          <div className="flex items-center gap-4">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Goal History & Active Cycle</h3>
                            <div className="relative flex items-center group">
                              <select 
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-[10px] font-black text-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all appearance-none pr-8 cursor-pointer shadow-sm hover:border-slate-300"
                              >
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                              </select>
                              <ChevronDown size={12} className="absolute right-2 text-slate-400 pointer-events-none" />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={handlePrevRoadmap}
                              disabled={roadmapStartIndex === 0}
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${roadmapStartIndex === 0 ? 'border-slate-100 text-slate-200 cursor-not-allowed' : 'border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-blue-600'}`}
                            >
                              <ChevronLeft size={16} strokeWidth={3} />
                            </button>
                            <button 
                              onClick={handleNextRoadmap}
                              disabled={roadmapStartIndex + 4 >= months.length}
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${roadmapStartIndex + 4 >= months.length ? 'border-slate-100 text-slate-200 cursor-not-allowed' : 'border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-blue-600'}`}
                            >
                              <ChevronRight size={16} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {months.slice(roadmapStartIndex, roadmapStartIndex + 4).map((m, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => (m.status === 'active' || m.status === 'completed') && setMemberReportMonth(m.name)}
                              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                memberReportMonth === m.name
                                  ? 'bg-blue-50/20 border-blue-400 shadow-[0_15px_30px_rgba(37,99,235,0.08)] scale-[1.02] ring-2 ring-blue-500/10' 
                                  : m.status === 'completed' 
                                    ? 'bg-white border-slate-100 shadow-sm hover:border-emerald-200' 
                                    : m.status === 'active'
                                    ? 'bg-white border-slate-100 hover:border-blue-200'
                                    : 'bg-white/50 border-slate-50 opacity-60 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-5">
                                 <span className={`text-[10px] font-black uppercase tracking-widest ${m.name === memberReportMonth ? 'text-blue-600' : 'text-slate-400'}`}>
                                    {m.name}
                                 </span>
                                 {m.status === 'completed' && (
                                   <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                     <Check size={12} strokeWidth={4} />
                                   </div>
                                 )}
                              </div>
                              <div className="flex items-center gap-4">
                                 <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${
                                   m.status === 'completed' ? 'bg-amber-50 border-amber-100 text-amber-500' : 
                                   m.status === 'active' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 
                                   'bg-slate-50 border-slate-100 text-slate-300'
                                 }`}>
                                    {m.status === 'completed' ? <Trophy size={20} /> : m.status === 'active' ? <TargetIcon size={20} /> : <Lock size={16} />}
                                 </div>
                                 <div className="flex flex-col gap-0.5 text-left">
                                    <span className="text-[13px] font-black text-slate-900 leading-none">
                                       {m.status === 'completed' ? `${m.score}/10` : m.status === 'active' ? 'Current Month' : 'Locked'}
                                    </span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                       {m.label || 'Upcoming'}
                                    </span>
                                 </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Operational Goals Header */}
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-wider">
                              {memberReportMonth.toUpperCase()} {selectedYear} GOALS
                            </h2>
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                              memberReportMonth === 'January' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {memberReportMonth === 'January' ? 'APPROVED' : 'IN PROGRESS'}
                            </span>
                        </div>
                        {memberReportMonth === 'February' && (
                          <button
                            onClick={() => { setMemberReportEditingGoalId(null); setMemberReportEditDraft({}); setMemberReportInlineNewGoal({ name: '', critical: false, metric: '', weight: '20%', status: 'In Progress', addedByManager: true }); }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
                          >
                            <Plus size={14} strokeWidth={3} />
                            Add New
                          </button>
                        )}
                      </div>

                      {/* Operational Goals – Listing (Table) */}
                      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        <div className="px-6 pb-4 overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                <th className="py-4 px-2">SR NO</th>
                                <th className="py-4 px-2">GOAL</th>
                                <th className="py-4 px-2">METRIC</th>
                                <th className="py-4 px-2">WEIGHTAGE</th>
                                <th className="py-4 px-2">ACHIEVED</th>
                                <th className="py-4 px-2">SCORE</th>
                                <th className="py-4 px-2">STATUS</th>
                                <th className="py-4 px-2">MANAGER NOTES</th>
                                {memberReportMonth !== 'January' && <th className="py-4 px-2 text-center">ACTION</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {memberReportMonth === 'February' && memberReportInlineNewGoal !== null && (
                                <tr className="border-b border-slate-50 bg-blue-50/30">
                                  <td className="py-3 px-2 text-slate-400 text-xs">—</td>
                                  <td className="py-3 px-2">
                                    <div className="flex flex-col gap-1">
                                      <input
                                        type="text"
                                        placeholder="Goal name"
                                        value={memberReportInlineNewGoal.name ?? ''}
                                        onChange={(e) => setMemberReportInlineNewGoal(g => ({ ...g, name: e.target.value }))}
                                        className="w-full max-w-[200px] px-2 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30"
                                      />
                                      <label className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                                        <input type="checkbox" checked={memberReportInlineNewGoal.critical ?? false} onChange={(e) => setMemberReportInlineNewGoal(g => ({ ...g, critical: e.target.checked }))} />
                                        Critical
                                      </label>
                                    </div>
                                  </td>
                                  <td className="py-3 px-2">
                                    <input
                                      type="text"
                                      placeholder="Metric"
                                      value={memberReportInlineNewGoal.metric ?? ''}
                                      onChange={(e) => setMemberReportInlineNewGoal(g => ({ ...g, metric: e.target.value }))}
                                      className="w-full max-w-[140px] px-2 py-1.5 text-[11px] border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30"
                                    />
                                  </td>
                                  <td className="py-3 px-2">
                                    <input
                                      type="text"
                                      placeholder="e.g. 20%"
                                      value={memberReportInlineNewGoal.weight ?? '20%'}
                                      onChange={(e) => setMemberReportInlineNewGoal(g => ({ ...g, weight: e.target.value }))}
                                      className="w-14 px-2 py-1.5 text-[10px] border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30"
                                    />
                                  </td>
                                  <td className="py-3 px-2 text-[11px] text-slate-400">—</td>
                                  <td className="py-3 px-2 text-[11px] text-slate-400">—</td>
                                  <td className="py-3 px-2">
                                    <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded-full bg-slate-200 text-slate-600">New</span>
                                  </td>
                                  <td className="py-3 px-2">—</td>
                                  <td className="py-3 px-2">
                                    <div className="flex items-center justify-center gap-1.5">
                                      <button
                                        onClick={() => {
                                          if (memberReportInlineNewGoal.name?.trim()) {
                                            const id = Math.max(0, ...currentMonthGoals.map((g: ManagerReportGoal) => g.id)) + 1;
                                            setCurrentMonthGoals(prev => [...prev, {
                                              id,
                                              name: memberReportInlineNewGoal.name!.trim(),
                                              critical: memberReportInlineNewGoal.critical ?? false,
                                              metric: memberReportInlineNewGoal.metric || '—',
                                              weight: memberReportInlineNewGoal.weight ?? '20%',
                                              status: 'In Progress',
                                              addedByManager: true
                                            }]);
                                            setMemberReportInlineNewGoal(null);
                                          }
                                        }}
                                        className="px-2 py-1 rounded-lg bg-emerald-500 text-white text-[9px] font-bold hover:bg-emerald-600"
                                      >
                                        Save
                                      </button>
                                      <button onClick={() => setMemberReportInlineNewGoal(null)} className="px-2 py-1 rounded-lg bg-slate-200 text-slate-600 text-[9px] font-bold hover:bg-slate-300">Cancel</button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                              {currentMonthGoals.map((goal: any, idx: number) => (
                                memberReportMonth === 'February' && memberReportEditingGoalId === goal.id ? (
                                <tr key={goal.id} className="border-b border-slate-50 bg-blue-50/30">
                                  <td className="py-3 px-2 text-slate-900 font-black text-xs">{idx + 1}</td>
                                  <td className="py-3 px-2">
                                    <div className="flex flex-col gap-1">
                                      <input
                                        type="text"
                                        placeholder="Goal name"
                                        value={memberReportEditDraft.name ?? goal.name}
                                        onChange={(e) => setMemberReportEditDraft(d => ({ ...d, name: e.target.value }))}
                                        className="w-full max-w-[200px] px-2 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30"
                                      />
                                      <label className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                                        <input type="checkbox" checked={memberReportEditDraft.critical ?? goal.critical ?? false} onChange={(e) => setMemberReportEditDraft(d => ({ ...d, critical: e.target.checked }))} />
                                        Critical
                                      </label>
                                    </div>
                                  </td>
                                  <td className="py-3 px-2">
                                    <input
                                      type="text"
                                      placeholder="Metric"
                                      value={memberReportEditDraft.metric ?? goal.metric}
                                      onChange={(e) => setMemberReportEditDraft(d => ({ ...d, metric: e.target.value }))}
                                      className="w-full max-w-[140px] px-2 py-1.5 text-[11px] border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30"
                                    />
                                  </td>
                                  <td className="py-3 px-2">
                                    <input
                                      type="text"
                                      placeholder="e.g. 20%"
                                      value={memberReportEditDraft.weight ?? goal.weight}
                                      onChange={(e) => setMemberReportEditDraft(d => ({ ...d, weight: e.target.value }))}
                                      className="w-14 px-2 py-1.5 text-[10px] border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30"
                                    />
                                  </td>
                                  <td className="py-3 px-2 text-[11px] text-slate-400">{goal.progress ?? '—'}</td>
                                  <td className="py-3 px-2 text-[11px] text-slate-400">{goal.score ?? '—'}</td>
                                  <td className="py-3 px-2">
                                    <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded-full bg-slate-200 text-slate-600">Edit</span>
                                  </td>
                                  <td className="py-3 px-2">—</td>
                                  <td className="py-3 px-2">
                                    <div className="flex items-center justify-center gap-1.5">
                                      <button
                                        onClick={() => {
                                          setCurrentMonthGoals(prev => prev.map(g => g.id === goal.id ? {
                                            ...g,
                                            name: (memberReportEditDraft.name ?? goal.name).trim() || goal.name,
                                            critical: memberReportEditDraft.critical ?? goal.critical ?? false,
                                            metric: memberReportEditDraft.metric ?? goal.metric,
                                            weight: memberReportEditDraft.weight ?? goal.weight
                                          } : g));
                                          setMemberReportEditingGoalId(null);
                                          setMemberReportEditDraft({});
                                        }}
                                        className="px-2 py-1 rounded-lg bg-emerald-500 text-white text-[9px] font-bold hover:bg-emerald-600"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => { setMemberReportEditingGoalId(null); setMemberReportEditDraft({}); }}
                                        className="px-2 py-1 rounded-lg bg-slate-200 text-slate-600 text-[9px] font-bold hover:bg-slate-300"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                ) : (
                                <tr key={goal.id} className="group border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                                  <td className="py-4 px-2 text-slate-900 font-black text-xs">{idx + 1}</td>
                                  <td className="py-4 px-2">
                                    <div className="flex flex-col gap-0.5 max-w-[200px] min-w-0">
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span title={goal.name} className="text-xs font-black text-slate-800 truncate block min-w-0">{goal.name}</span>
                                        {goal.critical && <span className="flex-shrink-0 px-2 py-0.5 bg-[#f54343] text-white text-[7px] font-black uppercase rounded-lg tracking-widest">CRITICAL</span>}
                                        {goal.addedByManager && <span className="flex-shrink-0 px-2 py-0.5 bg-blue-50 text-blue-500 border border-blue-100 text-[7px] font-black uppercase rounded-lg tracking-widest">MANAGER</span>}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-4 px-2 text-[11px] font-bold text-slate-500 tracking-tight">{goal.metric}</td>
                                  <td className="py-4 px-2 text-[11px] font-black text-slate-800">{goal.weight}</td>
                                  <td className="py-4 px-2">
                                    {memberReportMonth === 'January' ? (() => {
                                      const key = `${selectedMember?.id}-${memberReportMonth}-${goal.id}`;
                                      const progressSrc = managerGoalAchieved[key] ?? goal.progress ?? januaryGoals.find((g: any) => g.id === goal.id)?.progress;
                                      let achievedVal = progressSrc ? String(progressSrc).replace(/%$/, '').trim() : '';
                                      if (!achievedVal && goal.score && String(goal.score).includes('/')) {
                                        const num = parseFloat(String(goal.score).split('/')[0]);
                                        if (!isNaN(num)) achievedVal = String(Math.round(num * 10));
                                      }
                                      return (
                                        <span className="text-[11px] font-black text-slate-800">{achievedVal ? `${achievedVal}%` : '—'}</span>
                                      );
                                    })() : selectedMember ? (
                                      <span className="inline-flex items-center gap-0.5">
                                        <input
                                          type="number"
                                          min={0}
                                          max={100}
                                          placeholder="%"
                                          value={managerGoalAchieved[`${selectedMember.id}-${memberReportMonth}-${goal.id}`] ?? (goal.progress ? String(goal.progress).replace(/%$/, '') : '')}
                                          onChange={(e) => {
                                            const v = e.target.value;
                                            if (v === '' || (parseFloat(v) >= 0 && parseFloat(v) <= 100)) {
                                              setManagerGoalAchieved(prev => ({ ...prev, [`${selectedMember.id}-${memberReportMonth}-${goal.id}`]: v }));
                                            }
                                          }}
                                          className="w-12 px-2 py-1.5 text-[11px] font-black text-slate-800 border border-slate-200 rounded-lg bg-white text-center focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="text-[9px] font-bold text-slate-400">%</span>
                                      </span>
                                    ) : (
                                      <span className="text-[11px] font-black text-slate-800">{goal.progress ?? '—'}</span>
                                    )}
                                  </td>
                                  <td className="py-4 px-2">
                                    {memberReportMonth === 'January' ? (
                                      <span className="text-[11px] font-black text-blue-600">{goal.score || (goal.progress ? `${getScoreFromAchieved(parseFloat(String(goal.progress).replace(/%$/, '')))}/10` : '—')}</span>
                                    ) : selectedMember ? (() => {
                                      const key = `${selectedMember.id}-${memberReportMonth}-${goal.id}`;
                                      const achievedStr = managerGoalAchieved[key] ?? (goal.progress ? String(goal.progress).replace(/%$/, '').trim() : '');
                                      const achievedNum = achievedStr === '' ? NaN : parseFloat(achievedStr);
                                      const autoScore = getScoreFromAchieved(achievedNum);
                                      return (
                                        <span className="inline-flex items-center gap-0.5">
                                          {achievedStr === '' || isNaN(achievedNum) ? (
                                            <span className="text-[11px] font-black text-slate-400">—</span>
                                          ) : (
                                            <>
                                              <span className="text-[11px] font-black text-blue-600">{autoScore}</span>
                                              <span className="text-[9px] font-bold text-slate-400">/10</span>
                                            </>
                                          )}
                                        </span>
                                      );
                                    })() : (
                                      <span className="text-[11px] font-black text-blue-600">{goal.score || '---'}</span>
                                    )}
                                  </td>
                                  <td className="py-4 px-2">
                                    <span className={`px-3 py-1 text-[8px] font-black uppercase rounded-2xl border ${
                                      goal.status === 'Approved' || goal.status === 'COMPLETED' ? 'bg-[#f0fdf4] text-[#10b981] border-[#d1fae5]' : goal.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-[#fff1f1] text-[#f54343] border-[#fee2e2]'
                                    }`}>
                                      {goal.status}
                                    </span>
                                  </td>
                                  <td className="py-4 px-2">
                                    {memberReportMonth === 'January' ? (
                                      <span className="text-[11px] font-medium text-slate-700 block max-w-[200px]">
                                        {managerGoalNotes[`${selectedMember?.id}-${memberReportMonth}-${goal.id}`] || (goal as any).managerNotes || januaryGoals.find((g: any) => g.id === goal.id)?.managerNotes || '—'}
                                      </span>
                                    ) : selectedMember && (
                                      <textarea
                                        placeholder="Add notes..."
                                        value={managerGoalNotes[`${selectedMember.id}-${memberReportMonth}-${goal.id}`] ?? ''}
                                        onChange={(e) => setManagerGoalNotes(prev => ({ ...prev, [`${selectedMember.id}-${memberReportMonth}-${goal.id}`]: e.target.value }))}
                                        rows={2}
                                        className="w-full min-w-[140px] max-w-[200px] bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 resize-none"
                                      />
                                    )}
                                  </td>
                                  {memberReportMonth !== 'January' && (
                                    <td className="py-4 px-2">
                                      <div className="flex items-center justify-center gap-1.5">
                                        <button
                                          title="Edit goal"
                                          onClick={() => { setMemberReportInlineNewGoal(null); setMemberReportEditingGoalId(goal.id); setMemberReportEditDraft({ name: goal.name, critical: goal.critical, metric: goal.metric, weight: goal.weight }); }}
                                          className="w-8 h-8 rounded-lg border border-slate-50 flex items-center justify-center text-slate-300 hover:text-blue-500 transition-all hover:bg-blue-50"
                                        >
                                          <Edit3 size={14} />
                                        </button>
                                        <button title="Approve" className="w-8 h-8 rounded-lg border border-slate-50 flex items-center justify-center text-slate-300 hover:text-emerald-500 transition-all hover:bg-emerald-50"><Check size={14} /></button>
                                        <button title="Reject" className="w-8 h-8 rounded-lg border border-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all hover:bg-red-50"><X size={14} /></button>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                )
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Achievement Modal Popup */}
                      {isAchievementModalOpen && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300">
                          <div className="bg-white w-full max-w-[500px] rounded-[2rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 flex flex-col">
                            <div className="px-8 pt-8 pb-4 flex items-start justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                                  <Medal size={24} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col text-left">
                                  <h2 className="text-xl font-black text-[#0f172a] tracking-tight leading-none mb-1">Add Achievement</h2>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">RECOGNIZE EXTRAORDINARY PERFORMANCE</p>
                                </div>
                              </div>
                              <button 
                                onClick={() => setIsAchievementModalOpen(false)} 
                                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all border border-slate-100"
                              >
                                <X size={20} strokeWidth={3}/>
                              </button>
                            </div>

                            <div className="px-8 pb-8 space-y-6 text-left">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ACHIEVEMENT TITLE *</label>
                                <input 
                                  type="text" 
                                  value={achievementForm.title}
                                  onChange={(e) => setAchievementForm({...achievementForm, title: e.target.value})}
                                  placeholder="e.g. Innovation Award 2026" 
                                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DATE / PERIOD</label>
                                <div className="relative">
                                  <input 
                                    type="text" 
                                    value={achievementForm.date}
                                    onChange={(e) => setAchievementForm({...achievementForm, date: e.target.value})}
                                    placeholder="e.g. February 2026" 
                                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none transition-all" 
                                  />
                                  <Calendar size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DESCRIPTION</label>
                                <textarea 
                                  value={achievementForm.description}
                                  onChange={(e) => setAchievementForm({...achievementForm, description: e.target.value})}
                                  placeholder="Briefly describe the impact or accomplishment..." 
                                  rows={4}
                                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all resize-none" 
                                />
                              </div>
                            </div>

                            <div className="px-8 py-6 bg-[#f8fafc]/30 border-t border-slate-100 flex items-center gap-4">
                              <button onClick={() => setIsAchievementModalOpen(false)} className="flex-1 py-3.5 text-slate-400 text-[11px] font-black uppercase tracking-widest border border-slate-200 rounded-2xl hover:bg-white transition-all">CANCEL</button>
                              <button 
                                onClick={handleSaveAchievement}
                                className="flex-[1.5] py-3.5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                              >
                                SAVE ACHIEVEMENT
                                <Check size={16} strokeWidth={4}/>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Soft Skills Section (Accordion + compact) */}
                      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm mt-8">
                        <div
                          onClick={() => setIsSoftSkillsExpanded(!isSoftSkillsExpanded)}
                          className="bg-[#fafbff] px-5 py-4 flex items-center justify-between cursor-pointer group hover:bg-[#f4f6ff] transition-colors border-b border-slate-100"
                        >
                          <div className="flex items-center gap-2">
                            <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-wider leading-none">SOFT SKILLS & COMPETENCIES ({memberReportMonth.toUpperCase()})</h2>
                            <Info size={14} className="text-slate-300" />
                          </div>
                          <ChevronDown size={18} className={`text-slate-400 group-hover:text-slate-600 transition-transform ${isSoftSkillsExpanded ? '' : '-rotate-90'}`} />
                        </div>

                        {isSoftSkillsExpanded && (
                          <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {softSkillsData.map((skill, idx) => (
                                <div key={skill.id} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group text-left">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                        0{idx + 1}
                                      </div>
                                      <h3 className="text-[11px] font-black text-slate-800">{skill.name}</h3>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <div className="opacity-60 pointer-events-none">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Employee Rating</span>
                                        <span className={`text-[9px] font-black ${skill.employeeRating > 0 ? 'text-slate-900' : 'text-slate-300'}`}>{skill.employeeRating}/10</span>
                                      </div>
                                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden relative">
                                        <div className={`h-full transition-all duration-700 ${skill.employeeRating === 0 ? 'bg-slate-200' : skill.employeeRating <= 3 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${skill.employeeRating * 10}%` }} />
                                        {skill.employeeRating > 0 && <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-2 border-slate-200 rounded-full shadow-sm" style={{ left: `calc(${skill.employeeRating * 10}% - 4px)` }} />}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Manager Rating</span>
                                        <span className={`text-[9px] font-black ${skill.managerRating > 0 ? 'text-slate-900' : 'text-slate-300'}`}>{skill.managerRating}/10</span>
                                      </div>
                                      <input
                                        type="range"
                                        min={0}
                                        max={10}
                                        value={skill.managerRating}
                                        onChange={(e) => handleSoftSkillRating(skill.id, 'manager', parseInt(e.target.value, 10))}
                                        className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-200 [&::-webkit-slider-thumb]:shadow-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Review Summary Section */}
                      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 delay-200 mt-8">
                        <div 
                          onClick={() => setIsReviewSummaryExpanded(!isReviewSummaryExpanded)}
                          className="bg-[#eef8ff] p-6 py-4 flex items-center justify-between border-b border-slate-100 cursor-pointer group"
                        >
                          <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-wider leading-none">Review Summary ({memberReportMonth.toUpperCase()})</h2>
                          <ChevronDown size={18} className={`text-slate-400 group-hover:text-slate-600 transition-transform ${isReviewSummaryExpanded ? '' : '-rotate-90'}`} />
                        </div>

                        {isReviewSummaryExpanded && (
                          <div className="px-6 py-4 animate-in fade-in slide-in-from-top-1 duration-300">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                  <th className="py-4 px-2 w-16">Sr. No.</th>
                                  <th className="py-4 px-2">Manager's Question</th>
                                  <th className="py-4 px-2 text-center">Employee Response</th>
                                  <th className="py-4 px-2 text-center">Manager Response</th>
                                </tr>
                              </thead>
                              <tbody>
                                {reviewSummary.map((item, idx) => (
                                  <tr key={item.id} className="border-b border-slate-50 last:border-none group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-5 px-2 text-xs font-black text-slate-900">{idx + 1}</td>
                                    <td className="py-5 px-2">
                                      <span className="text-xs font-black text-slate-300">{item.question}</span>
                                    </td>
                                    <td className="py-5 px-2">
                                      <div className="flex items-center justify-center gap-4">
                                         {memberReportMonth === 'January' ? (
                                           <span className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-600 border border-slate-100">
                                             YES
                                           </span>
                                         ) : (
                                          <div className="flex items-center gap-3">
                                            <label className="flex items-center gap-1.5 cursor-pointer group">
                                              <input 
                                                type="radio" 
                                                name={`emp-goal-resp-${item.id}`}
                                                checked={item.employee === 'yes'}
                                                onChange={() => handleReviewChange(item.id, 'employee', 'yes')}
                                                className="w-3.5 h-3.5 border-slate-200 text-blue-600 focus:ring-blue-500/20"
                                              />
                                              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${item.employee === 'yes' ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}>Yes</span>
                                            </label>
                                            <label className="flex items-center gap-1.5 cursor-pointer group">
                                              <input 
                                                type="radio" 
                                                name={`emp-goal-resp-${item.id}`}
                                                checked={item.employee === 'no'}
                                                onChange={() => handleReviewChange(item.id, 'employee', 'no')}
                                                className="w-3.5 h-3.5 border-slate-200 text-blue-600 focus:ring-blue-500/20"
                                              />
                                              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${item.employee === 'no' ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}>No</span>
                                            </label>
                                          </div>
                                         )}
                                      </div>
                                    </td>
                                    <td className="py-5 px-2">
                                      <div className="flex items-center justify-center gap-4">
                                         {memberReportMonth === 'January' ? (
                                           <span className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                                             APPROVED
                                           </span>
                                         ) : (
                                          <div className="flex items-center gap-3">
                                            <label className="flex items-center gap-1.5 cursor-pointer group">
                                              <input 
                                                type="radio" 
                                                name={`mng-goal-resp-${item.id}`}
                                                checked={item.manager === 'yes'}
                                                onChange={() => handleReviewChange(item.id, 'manager', 'yes')}
                                                className="w-3.5 h-3.5 border-slate-200 text-blue-600 focus:ring-blue-500/20"
                                              />
                                              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${item.manager === 'yes' ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}>Yes</span>
                                            </label>
                                            <label className="flex items-center gap-1.5 cursor-pointer group">
                                              <input 
                                                type="radio" 
                                                name={`mng-goal-resp-${item.id}`}
                                                checked={item.manager === 'no'}
                                                onChange={() => handleReviewChange(item.id, 'manager', 'no')}
                                                className="w-3.5 h-3.5 border-slate-200 text-blue-600 focus:ring-blue-500/20"
                                              />
                                              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${item.manager === 'no' ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}>No</span>
                                            </label>
                                          </div>
                                         )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            
                            {memberReportMonth === 'January' && (
                              <div className="mt-8 p-6 bg-emerald-50/30 border border-emerald-100 rounded-2xl text-left">
                                 <div className="flex items-center gap-2 mb-3">
                                    <MessageSquare size={16} className="text-emerald-500" />
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Manager's Final Feedback</span>
                                 </div>
                                 <p className="text-xs font-bold text-slate-600 leading-relaxed italic">
                                    "Outstanding performance in January. The design system foundation is solid and the research synthesis provided clear direction for Q1. Keep maintaining this level of ownership."
                                 </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* VIEW TEAM MEMBER DIRECTORY (GRID) */
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1 text-left">
                          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Team Member Report</h2>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select a member to view their dedicated performance dashboard</p>
                        </div>
                        <div className="relative group w-full md:w-72">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                          <input 
                            type="text" 
                            placeholder="Search member..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm flex items-center gap-6 min-w-[320px] relative overflow-hidden">
                          <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-blue-600 rounded-r-full shadow-[2px_0_10px_rgba(37,99,235,0.3)]" />
                          
                          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 ml-2">
                            <TrendingUp size={28} />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Overall Team Avg Score</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl font-black text-slate-900 leading-none">{teamAvgScore}</span>
                              <span className="text-[14px] font-black text-slate-300 uppercase tracking-widest">/ 10</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMembers.map((member) => (
                          <div 
                            key={member.id} 
                            className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col items-center text-center relative"
                          >
                            {member.hasBadge && (
                              <div className="absolute top-6 left-6 flex items-center justify-center w-8 h-8 bg-amber-50 border border-amber-100 rounded-xl shadow-sm">
                                <Award size={18} className="text-amber-500" fill="currentColor" />
                              </div>
                            )}

                            {member.reviewPending && (
                              <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full shadow-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest">Review Pending</span>
                              </div>
                            )}

                            <div className="absolute top-[4.5rem] right-[4.5rem] flex items-center justify-center w-8 h-8 bg-white border border-orange-100 rounded-full shadow-md z-10 scale-90 group-hover:scale-110 transition-transform">
                              <div className="flex flex-col items-center">
                                <Flame size={14} className="text-orange-500 fill-orange-500" />
                                <span className="text-[7px] font-black text-orange-600 leading-none">{member.streak.split(' ')[0]}</span>
                              </div>
                            </div>

                            <div className={`w-20 h-20 rounded-3xl ${member.avatarColor} flex items-center justify-center text-white text-2xl font-black shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 className="text-lg font-black text-slate-900 leading-none mb-1">{member.name}</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{member.role}</p>
                            
                            <div className="grid grid-cols-2 w-full gap-2 mb-6 text-left">
                              <div className="bg-slate-50 rounded-2xl p-3 flex flex-col items-center">
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">SCORE</span>
                                <span className="text-sm font-black text-slate-900">{member.score}</span>
                              </div>
                              <div className="bg-slate-50 rounded-2xl p-3 flex flex-col items-center">
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">GOALS</span>
                                <span className="text-sm font-black text-slate-900">{member.goals}</span>
                              </div>
                            </div>

                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedMember(member); }}
                              className="w-full py-4 bg-[#0f172a] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/10 flex items-center justify-center"
                            >
                              {'→ VIEW GOALS'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : !isDetailView ? (
                  activeItemId === 'dashboard' ? (
                  /* REFERENCE DASHBOARD (TeamGrid-style, light theme) */
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm">
                          <BarChart3 size={20} />
                        </div>
                        <div>
                          <h1 className="text-xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                          <p className="text-xs font-medium text-slate-500">Team Performance • Real-time Analytics</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">FEB 17 TUE</span>
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                          <Filter size={14} />
                          Filter
                        </button>
                        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">jD</div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Key Metrics</h2>
                        <button type="button" className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Info"><Info size={12} /></button>
                      </div>
                      <p className="text-[10px] font-medium text-slate-500 mb-4">Real-time performance indicators.</p>
                      {(() => {
                        const avgScore = teamMembers.length ? (teamMembers.reduce((acc, m) => acc + parseFloat(m.score), 0) / teamMembers.length).toFixed(1) : '0';
                        const prevMonthAvg = 8.2;
                        const currentAvg = parseFloat(avgScore) || 0;
                        const scoreChangePct = prevMonthAvg ? (((currentAvg - prevMonthAvg) / prevMonthAvg) * 100).toFixed(1) : '0';
                        const scoreChangeUp = parseFloat(scoreChangePct) > 0;
                        const scoreChangeDown = parseFloat(scoreChangePct) < 0;
                        const goalsDone = teamMembers.reduce((acc, m) => acc + parseInt(m.goals.split('/')[0], 10) || 0, 0);
                        const goalsTotal = teamMembers.reduce((acc, m) => acc + parseInt(m.goals.split('/')[1], 10) || 0, 0);
                        return (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300/80 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Hours</span>
                            <Clock size={16} className="text-slate-400" />
                          </div>
                          <p className="text-xl font-black text-blue-600 mb-2">2h 30m</p>
                          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-100 border-t-blue-500 border-r-emerald-400 mb-1.5" style={{ transform: 'rotate(-45deg)' }} />
                          <div className="space-y-0.5 text-[10px] text-slate-600">
                            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> Total 2h 36m</div>
                            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> Idle 6m</div>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300/80 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Team Members</span>
                            <Users size={16} className="text-slate-400" />
                          </div>
                          <p className="text-xl font-black text-slate-900 mb-2">35</p>
                          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-100 border-t-emerald-500 text-[10px] font-black text-slate-600 mb-1.5">37%</div>
                          <div className="space-y-0.5 text-[10px] text-slate-600">
                            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> Active 13</div>
                            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" /> Total 35</div>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300/80 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Projects</span>
                            <Layers size={16} className="text-slate-400" />
                          </div>
                          <p className="text-xl font-black text-slate-900 mb-2">26</p>
                          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-emerald-500 mb-1.5" />
                          <div className="space-y-0.5 text-[10px] text-slate-600">
                            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> Active 26</div>
                            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" /> Inactive 0</div>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300/80 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Goal Avg Score</span>
                            <TrendingUp size={16} className="text-slate-400" />
                          </div>
                          <p className="text-xl font-black text-emerald-600 mb-2">{avgScore}</p>
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 mb-1.5">
                            <span className="text-[10px] font-black text-emerald-600">/10</span>
                          </div>
                          <div className="space-y-0.5 text-[10px] text-slate-600">
                            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> Team average</div>
                            <div className={`flex items-center gap-1 font-semibold ${scoreChangeUp ? 'text-emerald-600' : scoreChangeDown ? 'text-red-600' : 'text-slate-500'}`}>
                              {scoreChangeUp && <TrendingUp size={10} className="shrink-0" />}
                              {scoreChangeDown && <TrendingDown size={10} className="shrink-0" />}
                              {scoreChangePct !== '0' ? `${scoreChangeUp ? '+' : ''}${scoreChangePct}%` : '0%'} vs previous month
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300/80 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Goals Done</span>
                            <CheckCircle2 size={16} className="text-slate-400" />
                          </div>
                          <p className="text-xl font-black text-slate-900 mb-2">{goalsDone}</p>
                          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-100 border-t-emerald-500 mb-1.5 text-[10px] font-black text-slate-600">
                            {goalsTotal ? `${Math.round((goalsDone / goalsTotal) * 100)}%` : '0%'}
                          </div>
                          <div className="space-y-0.5 text-[10px] text-slate-600">
                            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> of {goalsTotal} total</div>
                          </div>
                        </div>
                      </div>
                        );
                      })()}
                    </div>

                    {/* Mini Leaderboard – Top 5 by score */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Crown size={18} className="text-amber-500" />
                          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Goals Leaderboard</h3>
                        </div>
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-widest">Top 5 by score</span>
                      </div>
                      <div className="space-y-3">
                        {sortedByScore.slice(0, 5).map((m, idx) => {
                            const rank = idx + 1;
                            const badge = rank === 1 ? <Crown size={12} className="text-amber-500" /> : rank === 2 ? <Star size={12} className="text-slate-400" /> : rank === 3 ? <Medal size={12} className="text-amber-600" /> : null;
                            return (
                              <div key={m.id} className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <div className={`w-9 h-9 rounded-xl ${m.avatarColor} flex items-center justify-center text-white text-[11px] font-black shadow-sm`}>
                                      {m.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[10px] font-black text-slate-600 shadow-sm">
                                      {rank}
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-sm font-semibold text-slate-800">{m.name}</span>
                                      {badge}
                                    </div>
                                    <span className="text-[10px] text-slate-500">{m.role}</span>
                                  </div>
                                </div>
                                <span className="text-sm font-black text-blue-600">{m.score}</span>
                              </div>
                            );
                          })}
                        {activeLoginUser && activeLoginUserRank > 5 && (
                          <>
                            <div className="flex justify-center py-1">
                              <span className="text-slate-300 text-lg leading-none">⋯</span>
                            </div>
                            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-violet-50 border border-violet-100 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <div className={`w-9 h-9 rounded-xl ${activeLoginUser.avatarColor} flex items-center justify-center text-white text-[11px] font-black shadow-sm`}>
                                    Y
                                  </div>
                                  <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-white border border-violet-200 rounded-full flex items-center justify-center text-[10px] font-black text-violet-600 shadow-sm">
                                    {activeLoginUserRank}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-semibold text-slate-800">You</span>
                                    <span className="text-[9px] font-medium text-slate-500">you</span>
                                  </div>
                                  <span className="text-[10px] text-slate-500">{activeLoginUser.role}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-black text-blue-600">{activeLoginUser.score}</span>
                                <span className="text-[9px] font-semibold text-violet-600">Your rank is {activeLoginUserRank}</span>
                              </div>
                            </div>
                          </>
                        )}
                        {activeLoginUser && activeLoginUserRank <= 5 && (
                          <div className="mt-2 pt-2 border-t border-slate-100">
                            <span className="text-[10px] font-semibold text-slate-500">Your current rank is <span className="text-blue-600 font-black">{activeLoginUserRank}</span></span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Two columns: All Projects + Activity Tracking */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <FolderOpen size={18} className="text-slate-600" />
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">All Projects</h3>
                          </div>
                          <button className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded">High→Low ↓</button>
                        </div>
                        <ul className="space-y-2">
                          {['General Project', 'Seller7', 'TeamGrid 2.0', 'Cheddy', 'Andeza'].map((name, i) => (
                            <li key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50 border border-slate-100">
                              <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-sm font-semibold text-slate-800">{name}</span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Clock size={12} /> {i === 0 ? '1h 12m' : i === 1 ? '0h 42m' : '0h 12m'}</span>
                                <span className="flex items-center gap-1"><Users size={12} /> {i === 0 ? 37 : i === 1 ? 19 : 4}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[10px] text-slate-500 mt-3">Showing 1-5 of 26 items</p>
                        <div className="flex items-center gap-1 mt-2">
                          <button className="px-2 py-1 text-[10px] font-semibold text-slate-500 hover:bg-slate-100 rounded">Previous</button>
                          {[1,2,3,4,5,6].map(n => <button key={n} className={`w-7 h-7 rounded text-[10px] font-bold ${n === 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{n}</button>)}
                          <button className="px-2 py-1 text-[10px] font-semibold text-slate-500 hover:bg-slate-100 rounded">Next</button>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Activity size={18} className="text-slate-600" />
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Activity Tracking</h3>
                            <button type="button" className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600" aria-label="Info"><Info size={12} /></button>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: 'Cursor App', time: '59m', sessions: 27 },
                            { name: 'Google Chrome App', time: '53m', sessions: 35 },
                            { name: 'Microsoft Teams App', time: '11m', sessions: 8 },
                            { name: '192.168.1.39:2507 Website', time: '9m', sessions: 5 },
                            { name: 'seller7.ai Website', time: '8m', sessions: 4 }
                          ].map((row, i) => (
                            <li key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50 border border-slate-100">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500"><Square size={14} /></div>
                                <div>
                                  <span className="text-sm font-semibold text-slate-800">{row.name}</span>
                                  <span className="text-[10px] text-slate-400 ml-2">App / Website</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>{row.time}</span>
                                <span>{row.sessions} sessions</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[10px] text-slate-500 mt-3">Showing 1 to 5 of 34 items</p>
                        <div className="flex items-center gap-1 mt-2">
                          <button className="px-2 py-1 text-[10px] font-semibold text-slate-500 hover:bg-slate-100 rounded">Previous</button>
                          {[1,2,3,4,5].map(n => <button key={n} className={`w-7 h-7 rounded text-[10px] font-bold ${n === 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{n}</button>)}
                          <button className="px-2 py-1 text-[10px] font-semibold text-slate-500 hover:bg-slate-100 rounded">Next</button>
                        </div>
                      </div>
                    </div>

                    {/* Team Performance */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="flex items-center justify-between p-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Users size={18} className="text-slate-600" />
                          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Team Performance</h3>
                          <button type="button" className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600" aria-label="Info"><Info size={12} /></button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded">High→Low ↓</button>
                          <button className="flex items-center gap-1.5 px-2 py-1.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600 hover:bg-slate-50">
                            <Download size={14} />
                            Export
                          </button>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              <th className="py-3 px-4">MEMBER</th>
                              <th className="py-3 px-4">ACTIVE</th>
                              <th className="py-3 px-4">IDLE</th>
                              <th className="py-3 px-4">TOTAL</th>
                              <th className="py-3 px-4">SESSIONS</th>
                              <th className="py-3 px-4">ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamMembers.slice(0, 5).map((m, i) => (
                              <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-full ${m.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>{m.name.split(' ').map(n => n[0]).join('')}</div>
                                    <div>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-slate-800">{m.name}</span>
                                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Team Member</span>
                                        {m.hasBadge && <Award size={14} className="text-amber-500 shrink-0" aria-hidden />}
                                        <span className="text-[10px] font-medium text-slate-600 flex items-center gap-1">
                                          <Flame size={12} className="text-orange-500 shrink-0" />
                                          {m.streak}
                                        </span>
                                      </div>
                                      <span className="text-[10px] text-slate-500">{m.role}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-emerald-600 font-semibold">0h 12m</td>
                                <td className="py-3 px-4 text-amber-600 font-semibold">0h 0m</td>
                                <td className="py-3 px-4 text-slate-700">0h 12m</td>
                                <td className="py-3 px-4 text-slate-600">{i + 1}</td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-1">
                                    <button className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Chart"><TrendingUp size={14} /></button>
                                    <button className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="View"><User size={14} /></button>
                                    <button className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Star"><Star size={14} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[10px] text-slate-500 p-3 border-t border-slate-100">Showing 1-5 of {teamMembers.length} items</p>
                      <div className="flex items-center gap-1 p-3 pt-0">
                        <button className="px-2 py-1 text-[10px] font-semibold text-slate-500 hover:bg-slate-100 rounded">Previous</button>
                        {[1,2].map(n => <button key={n} className={`w-7 h-7 rounded text-[10px] font-bold ${n === 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{n}</button>)}
                        <button className="px-2 py-1 text-[10px] font-semibold text-slate-500 hover:bg-slate-100 rounded">Next</button>
                      </div>
                    </div>
                  </div>
                  ) : (
                  /* REGULAR GOAL DASHBOARD (month grid + leaderboard) */
                  <div className="space-y-6">
                    {activeItemId === 'my_goals' && (
                      <div className="bg-white rounded-[1.25rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden transition-all duration-500">
                        <div className="flex flex-col lg:flex-row relative z-10 divide-x-0 lg:divide-x divide-slate-100">
                          
                          <div className="flex-1 pr-0 lg:pr-10 pb-8 lg:pb-0 text-left">
                            <div className="space-y-2 mb-8">
                              <div className="flex items-center gap-2">
                                 <div className="bg-blue-50/50 border border-blue-100/50 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                   <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                                   <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{bannerConfig.badge}</span>
                                 </div>
                              </div>
                              <h1 className="text-[2.5rem] font-black text-[#0f172a] leading-tight tracking-tight">
                                {bannerConfig.title} <span className="text-blue-600">{bannerConfig.subtitle}</span>
                              </h1>
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                              <div className="bg-white rounded-[1rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 pr-6 min-w-[220px]">
                                 <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                                        <Zap size={20} fill="currentColor" />
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">STATUS</span>
                                        <span className="text-sm font-black text-blue-600 leading-none">{bannerConfig.rankLabel.toUpperCase()}</span>
                                      </div>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                                      <span className="text-xs font-black text-slate-800">{bannerConfig.progressValue}</span>
                                    </div>
                                 </div>
                                 <div className="space-y-1.5">
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-blue-600 rounded-full" style={{ width: bannerConfig.progressWidth }} />
                                    </div>
                                    <div className="flex justify-between">
                                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{bannerConfig.progressStart.toUpperCase()}</span>
                                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{bannerConfig.progressLabel.toUpperCase()}</span>
                                    </div>
                                 </div>
                              </div>

                              <div className="bg-white rounded-[1rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 pr-10 flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-[#fca311] flex items-center justify-center text-white shadow-lg shadow-orange-500/10">
                                    <Star size={20} fill="white" />
                                 </div>
                                 <div className="flex flex-col">
                                    <h3 className="text-xs font-black text-slate-900 leading-none mb-1">Badge Unlocked!</h3>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">GROWING EMPLOYEE LEVEL</p>
                                 </div>
                                 <button type="button" onClick={() => setIsBadgeInfoModalOpen(true)} className="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" aria-label="Badge info">
                                   <Info size={14} />
                                 </button>
                              </div>

                              <div className="bg-white rounded-[1rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 pr-10 flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-[#ff6b35] flex items-center justify-center text-white shadow-lg shadow-orange-600/10">
                                    <Flame size={20} fill="white" />
                                 </div>
                                 <div className="flex flex-col">
                                    <h3 className="text-xs font-black text-slate-900 leading-none mb-1">Monthly Streak</h3>
                                    <span className="text-sm font-black text-[#ff6b35]">{bannerConfig.currentStreak}</span>
                                 </div>
                                 <button type="button" onClick={() => setIsStreakInfoModalOpen(true)} className="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" aria-label="Streak info">
                                   <Info size={14} />
                                 </button>
                              </div>
                            </div>
                          </div>

                          <div className="w-full lg:w-72 flex flex-col gap-3 items-center justify-center pl-0 lg:pl-10 mt-6 lg:mt-0">
                            <div className="w-full bg-white rounded-[1rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/10 shrink-0">
                                <BarChart3 size={20} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <h3 className="text-xs font-black text-slate-900 leading-none mb-1">Avg Score</h3>
                                <span className="text-sm font-black text-emerald-600" title="Average of completed months (Jan–Dec)">
                                  {employeeAvgScore != null ? `${employeeAvgScore}/10` : '—'}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => { const activeMonth = months.find(m => m.status === 'active'); if (activeMonth) { setSelectedMonth(activeMonth.name); setIsDetailView(true); } }}
                              className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-5 px-6 rounded-2xl font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(15,23,42,0.15)] active:scale-95 transition-all group"
                            >
                              ADD NEW GOALS
                              <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                            <div className="flex items-center gap-2 text-[#f54343] animate-pulse">
                              <Clock size={14} strokeWidth={3} />
                              <span className="text-[10px] font-black uppercase tracking-wider">8 Days left to submit goals</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {months.map((m, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => handleMonthClick(m.name)}
                              className={`relative p-5 rounded-2xl border transition-all duration-300 group ${
                                m.status === 'active' 
                                  ? 'bg-blue-50/20 border-blue-400 shadow-xl shadow-blue-500/5 scale-[1.02] z-10 cursor-pointer' 
                                  : m.status === 'completed' 
                                    ? 'bg-white border-slate-100 hover:border-emerald-200 cursor-pointer shadow-sm' 
                                    : 'bg-white/50 border-slate-50 opacity-60 cursor-not-allowed'
                              }`}
                            >
                              {m.streak && (
                                <div className="absolute top-4 right-4 bg-orange-50 px-1.5 py-1 rounded-lg">
                                  <Flame size={12} className="text-orange-500 fill-orange-500" />
                                </div>
                              )}
                              
                              <div className="flex flex-col items-center text-center space-y-4">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${m.status === 'active' ? 'text-blue-600' : 'text-slate-400'}`}>
                                  {m.name}
                                </span>
                                <div className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all border ${
                                  m.status === 'completed' ? 'bg-amber-50 border-amber-100' : 
                                  m.status === 'active' ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-200' : 
                                  'bg-slate-50 border-slate-100'
                                }`}>
                                  {m.status === 'completed' ? <Trophy size={24} className="text-amber-500" /> : 
                                  m.status === 'active' ? <TargetIcon size={24} className="text-white" /> : 
                                  <Lock size={18} className="text-slate-300" />}
                                </div>
                                <div className="flex flex-col leading-tight">
                                  {m.status === 'completed' ? (
                                    <span className="text-[11px] font-black text-slate-800">{m.score}/10 Score</span>
                                  ) : m.status === 'active' ? (
                                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">Add Goals</span>
                                  ) : (
                                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Locked</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mini Leaderboard + Growth Hint sidebar – hidden */}
                      {false && (
                      <div className="w-full lg:w-80 flex flex-col gap-6">
                        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col text-left">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                              <Crown size={18} className="text-amber-500" />
                              <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Mini Leaderboard</h3>
                            </div>
                            <span className="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-widest">FEB Cycle</span>
                          </div>
                          
                          <div className="space-y-4">
                            {[
                              { rank: 1, name: 'Sarah Jenkins', score: '9.8', color: 'bg-purple-600', badge: <Crown size={12} className="text-amber-500" /> },
                              { rank: 2, name: 'Emma Wilson', score: '9.2', color: 'bg-amber-600', badge: <Star size={12} className="text-blue-400" /> },
                              { rank: 3, name: 'David Miller', score: '8.5', color: 'bg-emerald-600', badge: <Zap size={12} className="text-emerald-500" /> },
                              { rank: 4, name: 'Paras Bhujwala', score: '7.8', color: 'bg-slate-700', badge: <Medal size={12} className="text-slate-400" /> }
                            ].map((user) => (
                              <div key={user.rank} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-2xl transition-all">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <div className={`w-9 h-9 rounded-xl ${user.color} flex items-center justify-center text-white text-[11px] font-black shadow-sm`}>
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-white border border-slate-100 rounded-full flex items-center justify-center text-[8px] font-black text-slate-400 shadow-sm">
                                      {user.rank}
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[11px] font-black text-slate-800">{user.name}</span>
                                      <div className="flex items-center justify-center w-4 h-4 rounded-full bg-slate-50 border border-slate-100">
                                        {user.badge}
                                      </div>
                                    </div>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">Active Contributor</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-black text-blue-600">{user.score}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <button className="mt-6 w-full py-3 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 hover:text-slate-600 transition-all">
                            View Full Standings
                          </button>
                        </div>

                        <div className="bg-[#0f172a] rounded-[2rem] p-6 text-white relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                           <div className="flex flex-col gap-1 relative z-10 text-left">
                              <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Growth Hint</p>
                              <h4 className="text-sm font-black leading-tight mb-4">Complete 1 more goal to reach "Shooting Star"</h4>
                              <button className="self-start px-4 py-2 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                                Go to Goal <ChevronRight size={10} strokeWidth={3} />
                              </button>
                           </div>
                        </div>
                      </div>
                      )}
                    </div>
                  </div>
                ) ) : (
                  /* DETAIL VIEW (DEFAULT): GOALS - FEBRUARY 2026 */
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Goals - {selectedMonth} {selectedYear}</h1>
                        {isGoalsCycleEditable ? (
                          <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 self-start">
                            <Timer size={10} className="animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Add Your Goals By 30 Mar 2026</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 self-start px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-600 border border-blue-200/50">
                              <Star size={18} fill="currentColor" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Your score for {selectedMonth} {selectedYear}</span>
                              <span className="text-xl font-black text-blue-600 leading-none">
                                {operationalGoals.length
                                  ? (operationalGoals.reduce((sum, g) => sum + getScoreFromAchieved(g.achieved), 0) / operationalGoals.length).toFixed(1)
                                  : '—'}
                                <span className="text-xs font-bold text-slate-400 ml-1">/ 10</span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => { setIsDetailView(false); setSelectedMonth(null); }}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-500 px-4 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-colors"
                      >
                        <ChevronLeft size={12} strokeWidth={3} />
                        Back
                      </button>
                    </div>
                    
                    <div className="bg-white border border-slate-100 rounded-[1.5rem] p-6 px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                      <div className="flex items-center gap-10">
                        <div className="flex items-center gap-4 border-r border-slate-100 pr-10">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                                <Zap size={24} fill="currentColor" />
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">RANK</span>
                                    <span className="text-base font-black text-blue-600 uppercase tracking-tight">{bannerConfig.rankLabel.toUpperCase()}</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ACHIEVED: 2</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Flame size={20} className="text-orange-500 fill-orange-500" />
                            <div className="flex flex-col text-left">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">STREAK</span>
                                <span className="text-base font-black text-slate-800">{bannerConfig.currentStreak}</span>
                            </div>
                            <button type="button" onClick={() => setIsStreakInfoModalOpen(true)} className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" aria-label="Streak info">
                              <Info size={14} />
                            </button>
                        </div>
                      </div>
                      <div className="bg-slate-50/50 border border-slate-100 p-2.5 px-5 rounded-2xl flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col items-end">
                            <h3 className="text-xs font-black text-slate-900 leading-none mb-1">Badge Unlocked!</h3>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">GROWING EMPLOYEE LEVEL</p>
                          </div>
                          <div className="w-10 h-10 bg-[#fca311] rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Star size={20} fill="white" />
                          </div>
                        </div>
                        <button type="button" onClick={() => setIsBadgeInfoModalOpen(true)} className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" aria-label="Badge info">
                          <Info size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                      <div className="p-6 pb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-wider">OPERATIONAL GOALS</h2>
                          <div className="w-3.5 h-3.5 rounded-full bg-slate-50 flex items-center justify-center cursor-help border border-slate-100">
                            <Info size={9} className="text-slate-300" />
                          </div>
                        </div>
                        <button 
                          onClick={() => isGoalsCycleEditable && setInlineNewGoal({ name: '', metric: '= 100%', achieved: 0, weight: 20, status: 'PENDING', critical: false })} 
                          disabled={!isGoalsCycleEditable}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all ${isGoalsCycleEditable ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                        >
                          <Plus size={14} strokeWidth={3} />
                          Add Goal
                        </button>
                      </div>

                      <div className="px-6 pb-6 overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                              <th className="py-4 px-2">SR NO</th>
                              <th className="py-4 px-2">GOAL</th>
                              <th className="py-4 px-2">METRIC</th>
                              <th className="py-4 px-2">ACHIEVED</th>
                              <th className="py-4 px-2">WEIGHTAGE</th>
                              <th className="py-4 px-2">SCORE</th>
                              <th className="py-4 px-2">STATUS</th>
                              {isGoalsCycleEditable && <th className="py-4 px-2 text-center">ACTION</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {/* Inline add row - only for active cycle */}
                            {isGoalsCycleEditable && inlineNewGoal !== null && (
                              <tr className="border-b border-slate-50 bg-blue-50/30">
                                <td className="py-2 px-2 text-slate-400 text-xs">—</td>
                                <td className="py-2 px-2">
                                  <div className="flex flex-col gap-1">
                                    <input type="text" placeholder="Goal name" value={inlineNewGoal.name ?? ''} onChange={(e) => setInlineNewGoal(g => ({ ...g, name: e.target.value }))} className="w-full max-w-[220px] px-2 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><input type="checkbox" checked={inlineNewGoal.critical ?? false} onChange={(e) => setInlineNewGoal(g => ({ ...g, critical: e.target.checked }))} /> Critical</label>
                                  </div>
                                </td>
                                <td className="py-2 px-2"><input type="text" placeholder="Metric" value={inlineNewGoal.metric ?? ''} onChange={(e) => setInlineNewGoal(g => ({ ...g, metric: e.target.value }))} className="w-full max-w-[120px] px-2 py-1.5 text-[11px] border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30" /></td>
                                <td className="py-2 px-2"><div className="w-14 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-300 cursor-not-allowed select-none">—</div></td>
                                <td className="py-2 px-2"><input type="number" min={0} max={100} value={inlineNewGoal.weight ?? 20} onChange={(e) => setInlineNewGoal(g => ({ ...g, weight: parseInt(e.target.value, 10) || 0 }))} className="w-14 px-2 py-1.5 text-[10px] border border-slate-200 rounded-lg bg-white text-center focus:ring-2 focus:ring-blue-500/30" /></td>
                                <td className="py-2 px-2"><span className="px-2 py-0.5 text-[8px] font-black uppercase rounded-full bg-slate-200 text-slate-600">—</span></td>
                                <td className="py-2 px-2"><span className="px-2 py-0.5 text-[8px] font-black uppercase rounded-full bg-slate-200 text-slate-600">New</span></td>
                                <td className="py-2 px-2">
                                  <div className="flex items-center gap-1">
                                    <button onClick={() => { if (inlineNewGoal.name?.trim()) { const id = Math.max(0, ...operationalGoals.map(g => g.id)) + 1; setOperationalGoals(prev => [...prev, { id, name: inlineNewGoal.name!.trim(), critical: inlineNewGoal.critical ?? false, metric: inlineNewGoal.metric ?? '= 100%', achieved: inlineNewGoal.achieved ?? 0, weight: inlineNewGoal.weight ?? 20, status: 'PENDING' }]); setInlineNewGoal(null); } }} className="px-2 py-1 rounded-lg bg-emerald-500 text-white text-[9px] font-bold hover:bg-emerald-600">Save</button>
                                    <button onClick={() => setInlineNewGoal(null)} className="px-2 py-1 rounded-lg bg-slate-200 text-slate-600 text-[9px] font-bold hover:bg-slate-300">Cancel</button>
                                  </div>
                                </td>
                              </tr>
                            )}
                            {operationalGoals.map((goal, idx) => (
                              isGoalsCycleEditable && editingGoalId === goal.id ? (
                                <tr key={goal.id} className="border-b border-slate-50 bg-blue-50/20">
                                  <td className="py-2 px-2 text-slate-900 font-black text-xs">{idx + 1}</td>
                                  <td className="py-2 px-2">
                                    <input type="text" value={goal.name} onChange={(e) => setOperationalGoals(prev => prev.map(g => g.id === goal.id ? { ...g, name: e.target.value } : g))} className="w-full max-w-[220px] px-2 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30" />
                                  </td>
                                  <td className="py-2 px-2"><input type="text" value={goal.metric} onChange={(e) => setOperationalGoals(prev => prev.map(g => g.id === goal.id ? { ...g, metric: e.target.value } : g))} className="w-full max-w-[120px] px-2 py-1.5 text-[11px] border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/30" /></td>
                                  <td className="py-2 px-2"><div className="w-14 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-300 cursor-not-allowed select-none">—</div></td>
                                  <td className="py-2 px-2"><input type="number" min={0} max={100} value={goal.weight} onChange={(e) => setOperationalGoals(prev => prev.map(g => g.id === goal.id ? { ...g, weight: parseInt(e.target.value, 10) || 0 } : g))} className="w-14 px-2 py-1.5 text-[10px] border border-slate-200 rounded-lg bg-white text-center focus:ring-2 focus:ring-blue-500/30" /></td>
                                  <td className="py-2 px-2"><span className="inline-flex items-center justify-center w-12 h-8 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-300 cursor-not-allowed select-none">—</span></td>
                                  <td className="py-2 px-2"><span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-full ${goal.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : goal.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{goal.status}</span></td>
                                  <td className="py-2 px-2">
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => setEditingGoalId(null)} className="px-2 py-1 rounded-lg bg-emerald-500 text-white text-[9px] font-bold hover:bg-emerald-600">Save</button>
                                      <button onClick={() => setEditingGoalId(null)} className="px-2 py-1 rounded-lg bg-slate-200 text-slate-600 text-[9px] font-bold hover:bg-slate-300">Cancel</button>
                                    </div>
                                  </td>
                                </tr>
                              ) : (
                              <tr key={goal.id} className="group border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-2 text-slate-900 font-black text-xs">{idx + 1}</td>
                                <td className="py-4 px-2">
                                  <div className="flex flex-col gap-0.5 max-w-[220px] min-w-0">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span title={goal.name} className={`text-xs font-black text-slate-800 truncate block min-w-0 ${goal.italic ? 'italic font-medium text-slate-400' : ''}`}>{goal.name}</span>
                                      {goal.critical && (
                                        <span className="flex-shrink-0 px-2 py-0.5 bg-[#f54343] text-white text-[7px] font-black uppercase rounded-lg tracking-widest">CRITICAL</span>
                                      )}
                                    </div>
                                    {goal.addedByManager && (
                                      <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest italic leading-none">Added by Manager</span>
                                    )}
                                    {goal.managerNotes && (
                                      <span className="text-[9px] font-medium text-slate-500 leading-snug mt-0.5 truncate block min-w-0" title={goal.managerNotes}>Manager notes: {goal.managerNotes}</span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-2 text-[11px] font-bold text-slate-300 tracking-tight">{goal.metric}</td>
                                <td className="py-4 px-2">
                                  {isGoalsCycleEditable ? (
                                    <div className="w-16 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-300 cursor-not-allowed select-none">
                                      —
                                    </div>
                                  ) : (
                                    <div className="w-16 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center gap-0.5 text-[10px] font-black text-slate-300">
                                      {goal.achieved} <span className="text-[8px] font-medium">%</span>
                                    </div>
                                  )}
                                </td>
                                <td className="py-4 px-2 text-[11px] font-black text-slate-800">{goal.weight}</td>
                                <td className="py-4 px-2">
                                  {isGoalsCycleEditable ? (
                                    <span className="inline-flex items-center justify-center w-14 h-8 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-300 cursor-not-allowed select-none">—</span>
                                  ) : (
                                    <span className="text-[11px] font-black text-blue-600">{getScoreFromAchieved(goal.achieved)}<span className="text-[9px] font-bold text-slate-400 ml-0.5">/10</span></span>
                                  )}
                                </td>
                                <td className="py-4 px-2">
                                  <span className={`px-3 py-1 text-[8px] font-black uppercase rounded-2xl border ${
                                    isGoalsCycleEditable
                                      ? (goal.status === 'COMPLETED' ? 'bg-[#f0fdf4] text-[#10b981] border-[#d1fae5]' : goal.status === 'REJECTED' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-[#fff1f1] text-[#f54343] border-[#fee2e2]')
                                      : (goal.status === 'COMPLETED' ? 'bg-[#f0fdf4] text-[#10b981] border-[#d1fae5]' : 'bg-slate-100 text-slate-600 border-slate-200')
                                  }`}>
                                    {isGoalsCycleEditable ? goal.status : (goal.status === 'COMPLETED' ? 'Completed' : 'Not Completed')}
                                  </span>
                                </td>
                                {isGoalsCycleEditable && (
                                  <td className="py-4 px-2">
                                    <div className="flex items-center justify-center gap-1.5">
                                      <button title="Approve" onClick={() => setOperationalGoals(prev => prev.map(g => g.id === goal.id ? { ...g, status: 'COMPLETED' } : g))} className="w-8 h-8 rounded-lg border border-slate-50 flex items-center justify-center text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 transition-all"><Check size={14} /></button>
                                      <button title="Reject" onClick={() => setOperationalGoals(prev => prev.map(g => g.id === goal.id ? { ...g, status: 'REJECTED' } : g))} className="w-8 h-8 rounded-lg border border-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"><X size={14} /></button>
                                      <button title="Edit" onClick={() => setEditingGoalId(goal.id)} className="w-8 h-8 rounded-lg border border-slate-50 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all"><Edit3 size={14} /></button>
                                    </div>
                                  </td>
                                )}
                              </tr>
                            )
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm mt-8">
                      <div
                        onClick={() => setIsSoftSkillsExpanded(!isSoftSkillsExpanded)}
                        className="bg-[#fafbff] px-5 py-4 flex items-center justify-between cursor-pointer group hover:bg-[#f4f6ff] transition-colors border-b border-slate-100"
                      >
                        <div className="flex items-center gap-2">
                          <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-wider leading-none">SOFT SKILLS & COMPETENCIES</h2>
                          <Info size={14} className="text-slate-300" />
                        </div>
                        <ChevronDown size={18} className={`text-slate-400 group-hover:text-slate-600 transition-transform ${isSoftSkillsExpanded ? '' : '-rotate-90'}`} />
                      </div>

                      {isSoftSkillsExpanded && (
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {softSkillsData.map((skill, idx) => (
                              <div key={skill.id} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group text-left">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                      0{idx + 1}
                                    </div>
                                    <h3 className="text-[11px] font-black text-slate-800">{skill.name}</h3>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Employee Rating</span>
                                      <span className={`text-[9px] font-black ${skill.employeeRating > 0 ? 'text-slate-900' : 'text-slate-300'}`}>{skill.employeeRating}/10</span>
                                    </div>
                                    <input
                                      type="range"
                                      min={0}
                                      max={10}
                                      value={skill.employeeRating}
                                      onChange={(e) => handleSoftSkillRating(skill.id, 'employee', parseInt(e.target.value, 10))}
                                      className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-200 [&::-webkit-slider-thumb]:shadow-sm"
                                    />
                                  </div>
                                  <div className="opacity-60 pointer-events-none">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Manager Rating</span>
                                      <span className={`text-[9px] font-black ${skill.managerRating > 0 ? 'text-slate-900' : 'text-slate-300'}`}>{skill.managerRating}/10</span>
                                    </div>
                                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden relative">
                                      <div className={`h-full transition-all duration-700 ${skill.managerRating === 0 ? 'bg-slate-200' : 'bg-emerald-500'}`} style={{ width: `${skill.managerRating * 10}%` }} />
                                      {skill.managerRating > 0 && <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-2 border-slate-200 rounded-full shadow-sm" style={{ left: `calc(${skill.managerRating * 10}% - 4px)` }} />}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 delay-200 mt-6">
                      <div 
                        onClick={() => setIsReviewSummaryExpanded(!isReviewSummaryExpanded)}
                        className="bg-[#eef8ff] p-6 py-4 flex items-center justify-between border-b border-slate-100 cursor-pointer group"
                      >
                        <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-wider leading-none">Review Summary ({selectedMonth?.toUpperCase()})</h2>
                        <ChevronDown size={18} className={`text-slate-400 group-hover:text-slate-600 transition-transform ${isReviewSummaryExpanded ? '' : '-rotate-90'}`} />
                      </div>

                      {isReviewSummaryExpanded && (
                        <div className="px-6 py-4 animate-in fade-in slide-in-from-top-1 duration-300">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                <th className="py-4 px-2 w-16">Sr. No.</th>
                                <th className="py-4 px-2">Manager's Question</th>
                                <th className="py-4 px-2 text-center">Employee Response</th>
                                <th className="py-4 px-2 text-center">Manager Response</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reviewSummary.map((item, idx) => (
                                <tr key={item.id} className="border-b border-slate-50 last:border-none group hover:bg-slate-50/50 transition-colors">
                                  <td className="py-5 px-2 text-xs font-black text-slate-900">{idx + 1}</td>
                                  <td className="py-5 px-2">
                                    <span className="text-xs font-black text-slate-300">{item.question}</span>
                                  </td>
                                  <td className="py-5 px-2 text-center">
                                    <div className="flex items-center justify-center gap-4">
                                       {selectedMonth === 'January' ? (
                                         <span className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-600 border border-slate-100">
                                           YES
                                         </span>
                                       ) : (
                                        <div className="flex items-center gap-3">
                                          <label className="flex items-center gap-1.5 cursor-pointer group">
                                            <input 
                                              type="radio" 
                                              name={`emp-goal-resp-${item.id}`}
                                              checked={item.employee === 'yes'}
                                              onChange={() => handleReviewChange(item.id, 'employee', 'yes')}
                                              className="w-3.5 h-3.5 border-slate-200 text-blue-600 focus:ring-blue-500/20"
                                            />
                                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${item.employee === 'yes' ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}>Yes</span>
                                          </label>
                                          <label className="flex items-center gap-1.5 cursor-pointer group">
                                            <input 
                                              type="radio" 
                                              name={`emp-goal-resp-${item.id}`}
                                              checked={item.employee === 'no'}
                                              onChange={() => handleReviewChange(item.id, 'employee', 'no')}
                                              className="w-3.5 h-3.5 border-slate-200 text-blue-600 focus:ring-blue-500/20"
                                            />
                                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${item.employee === 'no' ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}>No</span>
                                          </label>
                                        </div>
                                       )}
                                    </div>
                                  </td>
                                  <td className="py-5 px-2 text-center">
                                    <div className="flex items-center justify-center gap-4">
                                       {selectedMonth === 'January' ? (
                                         <span className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                                           APPROVED
                                           </span>
                                       ) : (
                                        <div className="flex items-center gap-3">
                                          <label className="flex items-center gap-1.5 cursor-pointer group">
                                            <input 
                                              type="radio" 
                                              name={`mng-goal-resp-${item.id}`}
                                              checked={item.manager === 'yes'}
                                              onChange={() => handleReviewChange(item.id, 'manager', 'yes')}
                                              className="w-3.5 h-3.5 border-slate-200 text-blue-600 focus:ring-blue-500/20"
                                            />
                                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${item.manager === 'yes' ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}>Yes</span>
                                          </label>
                                          <label className="flex items-center gap-1.5 cursor-pointer group">
                                            <input 
                                              type="radio" 
                                              name={`mng-goal-resp-${item.id}`}
                                              checked={item.manager === 'no'}
                                              onChange={() => handleReviewChange(item.id, 'manager', 'no')}
                                              className="w-3.5 h-3.5 border-slate-200 text-blue-600 focus:ring-blue-500/20"
                                            />
                                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${item.manager === 'no' ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}>No</span>
                                          </label>
                                        </div>
                                       )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Add New Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[600px] rounded-[2rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 flex flex-col text-left">
            <div className="px-10 pt-10 pb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                  <Zap size={24} strokeWidth={3} fill="currentColor" />
                </div>
                <div className="flex flex-col text-left">
                  <h2 className="text-2xl font-black text-[#0f172a] tracking-tight leading-none mb-1">Add New Goal</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">DEFINE YOUR PERFORMANCE METRICS</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all border border-slate-100">
                <X size={20} strokeWidth={3}/>
              </button>
            </div>

            <div className="px-10 pb-10 space-y-6 overflow-y-auto max-h-[70vh] text-left">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.05em]">GOAL TITLE *</label>
                <input type="text" placeholder="e.g. Q1 Revenue Targets" className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.05em]">DESCRIPTION *</label>
                <textarea placeholder="What exactly are you looking to achieve?" rows={4} className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all resize-none" />
              </div>
              
              <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="relative inline-flex items-center cursor-pointer group">
                  <input type="checkbox" className="sr-only peer" id="modal-is-critical" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                </div>
                <div className="flex flex-col text-left gap-1">
                  <label htmlFor="modal-is-critical" className="text-[10px] font-black text-slate-600 uppercase tracking-widest cursor-pointer">Mark as Critical Goal</label>
                  <span className="text-[8px] font-bold text-slate-300 uppercase tracking-tight">Critical goals are prioritized in reports</span>
                  <span className="text-[9px] font-medium text-slate-500 leading-snug">Critical goal will have a weight of 100%, and the combined weight of the remaining goals must be a total of 100%.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.05em]">CATEGORY *</label>
                  <div className="relative">
                    <select className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none appearance-none cursor-pointer">
                      <option>Performance Goal</option>
                      <option>Learning Goal</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.05em]">TARGET *</label>
                  <input type="text" defaultValue="100" className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.05em]">UNIT *</label>
                  <div className="relative">
                    <select className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none appearance-none cursor-pointer">
                      <option>%</option>
                      <option>Points</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.05em]">GOAL TYPE *</label>
                <div className="flex gap-4">
                  {['Monthly'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setGoalType(type.toLowerCase() as 'weekly' | 'monthly')}
                      className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        goalType === type.toLowerCase()
                          ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                          : 'bg-[#f8fafc] text-slate-400 border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">TIME PERIOD *</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <input type="text" value={startDate} readOnly className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none" />
                    <Calendar size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase">TO</span>
                  <div className="flex-1 relative">
                    <input type="text" value={endDate} readOnly className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none" />
                    <Calendar size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-10 py-8 bg-[#f8fafc]/30 border-t border-slate-100 flex items-center gap-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-slate-400 text-[12px] font-black uppercase tracking-[0.1em] border border-slate-200 rounded-2xl hover:bg-white transition-all">CANCEL</button>
              <button className="flex-[1.5] py-4 bg-blue-600 text-white text-[12px] font-black uppercase tracking-[0.1em] rounded-2xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                CREATE GOAL
                <ChevronsRight size={18} strokeWidth={3}/>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Badge Info Modal */}
      {isBadgeInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={() => setIsBadgeInfoModalOpen(false)}>
          <div className="bg-white w-full max-w-[420px] rounded-[2rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 flex flex-col text-left" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 pt-8 pb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fca311]/10 rounded-2xl flex items-center justify-center border border-[#fca311]/20">
                  <Star size={24} className="text-[#fca311]" fill="currentColor" />
                </div>
                <div className="flex flex-col text-left">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Growing Employee Badge</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">CURRENT LEVEL</p>
                </div>
              </div>
              <button onClick={() => setIsBadgeInfoModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all border border-slate-100">
                <X size={20} strokeWidth={3}/>
              </button>
            </div>
            <div className="px-8 pb-8 space-y-6 text-left">
              <p className="text-sm font-medium text-slate-600 leading-relaxed">Awarded for consistent goal completion and strong performance in your early cycles. You've shown reliability and growth.</p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Next badge</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
                    <Trophy size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Best Employee</p>
                    <p className="text-[10px] font-bold text-slate-500">If your avg score is between 8.5 to 10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Streak Info Modal */}
      {isStreakInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={() => setIsStreakInfoModalOpen(false)}>
          <div className="bg-white w-full max-w-[420px] rounded-[2rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 flex flex-col text-left" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 pt-8 pb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-2xl flex items-center justify-center border border-[#ff6b35]/20">
                  <Flame size={24} className="text-[#ff6b35]" fill="currentColor" />
                </div>
                <div className="flex flex-col text-left">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Monthly Streak</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">CONSECUTIVE MONTHS</p>
                </div>
              </div>
              <button onClick={() => setIsStreakInfoModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all border border-slate-100">
                <X size={20} strokeWidth={3}/>
              </button>
            </div>
            <div className="px-8 pb-8 space-y-6 text-left">
              <p className="text-sm font-medium text-slate-600 leading-relaxed">Your streak counts how many months in a row you've submitted goals on time. Keep it going to earn recognition and stay on track.</p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-sm font-medium text-slate-600 leading-relaxed">Submit goals on time and maintain streak. Every month you get 1 point.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
