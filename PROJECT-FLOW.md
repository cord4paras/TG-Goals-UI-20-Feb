# TG-Goals-UI — Complete Project Flow & Understanding

## 1. Project Overview

- **Purpose:** TeamGrid Goals Module — goals, tasks, team performance, and settings (light theme).
- **Stack:** React 19, TypeScript, Vite 6, lucide-react.
- **Entry:** `index.tsx` → `App.tsx`. Single SPA; no router. Navigation is via **sidebar** and **state** (`activeItemId`, `viewMode`, `managerTab`, `isDetailView`, etc.).

---

## 2. Top-Level Flow (What Renders When)

```
App
├── Sidebar (always visible)
└── main
    ├── activeItemId === 'settings'  → SettingsView (full page)
    ├── activeItemId === 'my_tasks'  → TasksView (full page)
    └── else
        ├── Header (Employee / Manager toggle)
        ├── [Manager only] Sub-tabs: Goal Dashboard | View Team Member
        └── section.p-6 (main content)
```

---

## 3. Sidebar Navigation (NavItemId)

| Item | activeItemId | Effect |
|------|--------------|--------|
| Dashboard | `dashboard` | Key Metrics, Goals Leaderboard, All Projects, Activity Tracking, Team Performance |
| My Goals | `my_goals` | Month grid + banner + detail view (Goals - Month) |
| My Tasks | `my_tasks` | TasksView (Jira/Asana integration) |
| Settings | `settings` | Full-page SettingsView |
| Others | org_intelligence, work_summary, etc. | Placeholder behaviour |

---

## 4. View Mode: Employee vs Manager

- **Employee:** No sub-tabs. Dashboard or My Goals (month grid + detail).
- **Manager:** Tab "Goal Dashboard" (same as employee) or "View Team Member" (member list → member report with goals, achievements, review).

---

## 5. Main Content Decision Tree

- Manager + View Team Member + member selected → **Individual Member Report**
- Manager + View Team Member + no member → **Team member directory** (grid of cards)
- `activeItemId === 'dashboard'` → **Dashboard** (metrics, leaderboard, projects, activity, team table)
- Else + !isDetailView (e.g. My Goals) → **Month grid** + optional banner
- isDetailView → **Goals - [Month] [Year]** (operational goals table, soft skills, review summary, additional achievements)

---

## 6. Dashboard

- Header, Key Metrics (5 cards), Goals Leaderboard (top 5), All Projects, Activity Tracking, Team Performance table. Data from `teamMembers` where applicable.

---

## 7. My Goals

- **List view:** Banner (when my_goals), month grid (Jan–Dec), Mini Leaderboard/Growth Hint (hidden in code).
- **Detail view:** Goals - Month Year, Operational Goals table, Add Goal modal (Feb), Soft Skills, Review Summary, Additional Achievements. Manager notes shown per goal when present.

---

## 8. Settings

- Tabs: Profile, Security, Team, Billing, **Goals Settings**. Goals Settings: Module Visibility, Cycle Constraints (min/max/critical + notes), Goal Submission/Review windows, Soft Skills list.

---

## 9. Manager – View Team Member

- Member cards → click → Member report: summary cards, goal history, operational goals (Approve/Reject, Manager notes), Additional Achievements, Review Summary.

---

## 10. Key State (App.tsx)

| State | Purpose |
|-------|--------|
| activeItemId | Sidebar section |
| viewMode | employee \| manager |
| managerTab | goals \| member |
| isDetailView | Goals - Month detail visible |
| selectedMonth, selectedMember | Current month / member |
| managerGoalNotes, additionalAchievements | Manager notes; achievements list |

---

## 11. File Roles

| File | Role |
|------|------|
| App.tsx | All views, modals, state |
| components/Sidebar.tsx | Left nav |
| types.ts | NavItemId, NavItem |
