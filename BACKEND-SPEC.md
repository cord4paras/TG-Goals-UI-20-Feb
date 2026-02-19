# Backend Specification — TeamGrid Goals Module

**Document purpose:** This file is the single source of truth for implementing the backend for the TeamGrid Goals Module. When given to a developer or an AI, it must provide enough context to implement APIs, database schema, business rules, and flows without needing the frontend code. Read this document top to bottom for full context.

---

## 0. How to Use This Document (AI / Developer)

- **Read the entire document first** to get context (product, glossary, schema, APIs, rules, flows).
- **Implement in this order:** (1) DB schema and migrations, (2) Auth and org/member APIs, (3) Cycles and goals settings, (4) Goals CRUD and manager notes/approve/reject, (5) Soft skills and review summary, (6) Achievements, (7) Dashboard aggregates.
- **Stick to the business rules** in Section 6 (cycle constraints, weights, submission/review windows, roles).
- **Match the request/response shapes** implied in Section 5 and the “What the Frontend Expects” in Section 10 so the existing React app can plug in without change.
- If you add a new table or API, update this spec so it stays the single source of truth.

---

## 1. Context for AI / Developer

- **Product:** TeamGrid — a team performance and goals management product. This spec covers the **Goals Module** only.
- **Frontend:** A React SPA (TG-Goals-UI) already exists. It currently uses mock data. The backend you build will replace that mock data via REST APIs.
- **Users:** Two roles matter for the Goals module — **Employee** (sets and views own goals) and **Manager** (views team, approves/rejects goals, adds notes and achievements). Organization-level **admin** (org_admin) can change Goals Settings.
- **Scope:** Implement only what the frontend needs: organizations, users/members, goals (per cycle/month), cycles, settings (cycle constraints, submission/review windows, soft skills), achievements, review summary, and dashboard aggregates. Auth can be simplified (e.g. JWT with userId + role + orgId) but must support employee vs manager vs admin.
- **Conventions:** Use REST. JSON request/response. Use consistent error shape and HTTP status codes. All dates in ISO 8601. Pagination where lists can be large (page, limit, total).

---

## 2. Glossary

| Term | Meaning |
|------|--------|
| **Cycle** | A time period for goals: either **monthly** (e.g. January 2026) or **weekly**. Each cycle has a status: upcoming, active, completed. |
| **Goal** | A single objective for one member in one cycle. Has title, description, metric, target, unit, weight, critical flag, status (e.g. PENDING, COMPLETED, In Progress, Approved, Rejected). |
| **Critical goal** | A goal marked critical. Business rule: critical goal has weight 100%; all other goals in that cycle for that member must sum to 100% total. At least one critical goal may be required per cycle (configurable). |
| **Submission window** | Configurable: open day of month + duration (days). During this window, employees can add/edit goals for the active cycle. |
| **Review window** | Configurable: open day of month + duration (days). During this window, managers can review/approve/reject goals and add notes. |
| **Member** | A user in an organization who has goals; has role (e.g. Product Designer), status (e.g. Rising Star), streak, score, goals completed count. |
| **Achievement** | An additional achievement record for a member (title, date, description), added by manager. |
| **Soft skill** | A configurable competency (e.g. Ownership) with optional definition; each can have employee and manager rating (e.g. 0–10) per member per cycle. |
| **Review summary** | A set of yes/no questions (e.g. “Did you complete all goals?”) with employee and manager response per cycle. |

---

## 3. Product Overview (What the Frontend Does)

- **Dashboard (nav: Dashboard):** Shows key metrics (active hours, team count, total projects, goal avg score with % change vs previous month, goals done), a “Goals Leaderboard” (top 5 by score), “All Projects” list, “Activity Tracking” list, and a “Team Performance” table (members with active/idle/total time, sessions, actions). Data can be mixed (some from goals, some from other modules); for Goals module backend, focus on goal-derived metrics and member list.
- **My Goals (nav: My Goals):** Employee sees a banner (“Add Your Goals For February”), a 12-month grid (Jan–Dec), and can open a **Goals - [Month] [Year]** detail view. In detail view: rank/streak/badge summary, **Operational Goals** table (add/edit/delete goals in submission window), Soft Skills ratings, Review Summary (yes/no), Additional Achievements list.
- **Manager view:** Same nav, but header has “Manager” mode. Manager can open **Goal Dashboard** (same as Dashboard) or **View Team Member**: list of members → click one → **Member Report** for a month. Member report shows: member info, goal history roadmap, operational goals grid with Approve/Reject and **manager notes** per goal, Additional Achievements (add/list), Review Summary.
- **Settings (nav: Settings):** Goals Settings tab: (1) Cycle constraints — monthly/weekly, min goals, max goals, critical required; (2) Goal Submission Window — open day, duration; (3) Goal Review Window — open day, duration; (4) Soft Skills — list of metrics with title and definition, add new; (5) Recognition (e.g. badge ranges). All at **organization** level.

---

## 4. Database Schema

Assume one database per tenant (or tenant_id on every table). Below tables are minimal and necessary; add audit columns (created_at, updated_at, created_by) as needed.

### 4.1 Organizations and Users

- **organizations**  
  - id (PK), name, slug, settings (JSONB or separate table).  
  - Optional: timezone, locale.

- **users**  
  - id (PK), email, name, role (e.g. employee, manager, org_admin), organization_id (FK), avatar_url, etc.  
  - Used for login and to resolve “current user.”

- **members**  
  - id (PK), user_id (FK, 1:1), organization_id (FK), display_name, role (job title, e.g. “Product Designer”), avatar_color (hex or theme key), status (e.g. “Rising Star”, “Beginner”), goals_completed_count, goals_total_count (e.g. “3/3”), streak_display (e.g. “5 Months”), score (decimal, e.g. 9.2), review_pending (boolean), has_badge (boolean).  
  - Derive goals_completed_count, goals_total_count, score from goals/cycles where possible, or cache and recompute.

### 4.2 Cycles and Goals Settings

- **goal_cycles**  
  - id (PK), organization_id (FK), type (monthly | weekly), year, month (for monthly; null for weekly), week_start_date (for weekly; null for monthly), status (upcoming | active | completed), score (nullable, cycle-level score if needed).  
  - Unique: (organization_id, type, year, month) for monthly; similar for weekly.

- **organization_goals_settings**  
  - id (PK), organization_id (FK, unique), cycle_type (monthly | weekly), min_goals (int), max_goals (int), critical_required (int), submission_open_day (int 1–31), submission_duration_days (int), review_open_day (int 1–31), review_duration_days (int).  
  - One row per org (or per org + cycle_type if you support both monthly and weekly).

### 4.3 Goals

- **goals**  
  - id (PK), organization_id (FK), member_id (FK), cycle_id (FK), title, description (optional), metric (e.g. “100% components updated”), target (e.g. 100), unit (e.g. “%”, “Points”), weight (int or decimal; e.g. 20 for 20%), is_critical (boolean), status (e.g. PENDING, COMPLETED, IN_PROGRESS, APPROVED, REJECTED), achieved (int/decimal, e.g. 0 or 100), added_by_manager (boolean), created_by_user_id (FK), created_at, updated_at.  
  - Optional: category (e.g. Performance Goal, Learning Goal), sort_order.  
  - Constraint: For a given (member_id, cycle_id), if one goal has is_critical = true, that goal’s weight must be 100 and the sum of other goals’ weight must be 100. Enforce in API.

- **goal_manager_notes**  
  - id (PK), goal_id (FK), member_id (FK), cycle_id (FK), note (text), created_by_user_id (FK), created_at, updated_at.  
  - One active note per goal (or overwrite on update). Frontend keys by (member_id, cycle, goal_id).

### 4.4 Soft Skills and Review Summary

- **soft_skills**  
  - id (PK), organization_id (FK), name (e.g. “Ownership”), definition (text), sort_order.

- **soft_skill_ratings**  
  - id (PK), organization_id (FK), member_id (FK), cycle_id (FK), soft_skill_id (FK), employee_rating (int 0–10), manager_rating (int 0–10), updated_at.  
  - Unique: (member_id, cycle_id, soft_skill_id).

- **review_questions**  
  - id (PK), organization_id (FK), question_text, sort_order.  
  - E.g. “Did you complete all goals?”, “Did your manager give more than 5 rating in all soft skills?”, “Did you complete your critical goal?”

- **review_summary_answers**  
  - id (PK), member_id (FK), cycle_id (FK), review_question_id (FK), employee_response (yes | no | null), manager_response (yes | no | null), updated_at.  
  - Unique: (member_id, cycle_id, review_question_id).

### 4.5 Achievements

- **achievements**  
  - id (PK), organization_id (FK), member_id (FK), title, date (string or date, e.g. “Jan 2026”), description, created_by_user_id (FK), created_at.

### 4.6 Dashboard and Projects (Optional)

- If “All Projects” and “Activity Tracking” and “Active Hours” come from other modules, skip. Otherwise:
- **projects** — id, organization_id, name, status, etc.
- **activity_logs** — id, member_id, project_id or app_name, duration_minutes, sessions, date.  
Aggregations for dashboard (team count, total projects, goal avg score, goals done) can be computed from members and goals; no need for separate tables unless you want materialized views.

---

## 5. API Specification

Base URL: `/api/v1` (or as you prefer). All responses JSON. Use `Authorization: Bearer <token>` where auth is required. Assume `X-Organization-Id` or org from token.

### 5.1 Auth (Minimal)

- `POST /auth/login` — body: `{ "email", "password" }`. Response: `{ "token", "user": { id, email, name, role }, "organizationId" }`.
- `GET /auth/me` — current user and member (if any). Response: `{ "user", "member" }`.

### 5.2 Organizations and Members

- `GET /organizations/:orgId/settings` — get organization settings (e.g. goals settings). Response: include `goalsSettings` (cycle constraints, submission/review windows).
- `PUT /organizations/:orgId/settings` — update settings (admin). Body: same shape as goals settings.
- `GET /organizations/:orgId/members` — list members (for manager view and dashboard). Query: `search`, `page`, `limit`. Response: `{ "items": [ { id, displayName, role, avatarColor, status, goalsCompletedCount, goalsTotalCount, streakDisplay, score, reviewPending, hasBadge } ], "total" }`.
- `GET /organizations/:orgId/members/:memberId` — single member (for member report header and summary).

### 5.3 Cycles

- `GET /organizations/:orgId/cycles` — list cycles (e.g. 12 months). Query: `year`, `type` (monthly | weekly). Response: `[ { id, type, year, month, status, score, label } ]`.
- `GET /organizations/:orgId/cycles/:cycleId` — one cycle.

### 5.4 Goals

- `GET /organizations/:orgId/members/:memberId/cycles/:cycleId/goals` — list goals for a member in a cycle. Response: `[ { id, title, description, metric, target, unit, weight, isCritical, status, achieved, addedByManager, managerNotes } ]`. Include manager notes from `goal_manager_notes`.
- `POST /organizations/:orgId/members/:memberId/cycles/:cycleId/goals` — create goal. Body: `{ title, description, metric, target, unit, weight, isCritical, category? }`. Validate: within submission window; min/max/critical rules; if isCritical then weight 100 and sum of others 100. Response: created goal.
- `PUT /organizations/:orgId/goals/:goalId` — update goal (same validations).
- `DELETE /organizations/:orgId/goals/:goalId` — delete goal (within submission window).
- `PUT /organizations/:orgId/goals/:goalId/manager-notes` — set manager note. Body: `{ note }`. Allowed for manager. Store in `goal_manager_notes`.
- `POST /organizations/:orgId/goals/:goalId/approve` — set status APPROVED (manager, within review window).
- `POST /organizations/:orgId/goals/:goalId/reject` — set status REJECTED (manager).

### 5.5 Goals Settings (Organization)

- `GET /organizations/:orgId/goals-settings` — cycle constraints, submission window, review window. Response: `{ cycleType, minGoals, maxGoals, criticalRequired, submissionOpenDay, submissionDurationDays, reviewOpenDay, reviewDurationDays }`.
- `PUT /organizations/:orgId/goals-settings` — update (admin). Body: same shape.

### 5.6 Soft Skills

- `GET /organizations/:orgId/soft-skills` — list. Response: `[ { id, name, definition, sortOrder } ]`.
- `POST /organizations/:orgId/soft-skills` — add. Body: `{ name, definition }`.
- `PUT /organizations/:orgId/soft-skills/:id` — update.
- `DELETE /organizations/:orgId/soft-skills/:id` — delete.
- `GET /organizations/:orgId/members/:memberId/cycles/:cycleId/soft-skill-ratings` — ratings for that member/cycle. Response: `[ { softSkillId, name, employeeRating, managerRating } ]`.
- `PUT /organizations/:orgId/members/:memberId/cycles/:cycleId/soft-skill-ratings` — upsert. Body: `[ { softSkillId, employeeRating?, managerRating? } ]`.

### 5.7 Review Summary

- `GET /organizations/:orgId/review-questions` — list questions.
- `GET /organizations/:orgId/members/:memberId/cycles/:cycleId/review-summary` — answers. Response: `[ { questionId, questionText, employeeResponse, managerResponse } ]`.
- `PUT /organizations/:orgId/members/:memberId/cycles/:cycleId/review-summary` — set answers. Body: `[ { questionId, employeeResponse?, managerResponse? } ]`. Employee sets employee; manager sets manager.

### 5.8 Achievements

- `GET /organizations/:orgId/members/:memberId/achievements` — list. Query: optional cycle/year. Response: `[ { id, title, date, description, createdAt } ]`.
- `POST /organizations/:orgId/members/:memberId/achievements` — add (manager). Body: `{ title, date, description }`.

### 5.9 Dashboard Aggregates

- `GET /organizations/:orgId/dashboard/metrics` — key metrics. Response: `{ activeHours?, teamMembersCount, totalProjects?, goalAvgScore, goalAvgScoreChangePercentVsPreviousMonth?, goalsDone, goalsTotal }`. Compute from members and goals; activeHours/totalProjects can be placeholders or from other modules.
- `GET /organizations/:orgId/dashboard/leaderboard` — top N by score. Query: `limit=5`. Response: `[ { memberId, displayName, role, score, rank } ]`.
- `GET /organizations/:orgId/dashboard/team-performance` — table data. Query: `page`, `limit`, `search`. Response: `{ items: [ { member, active, idle, total, sessions } ], total }`. active/idle/sessions can be from other modules or placeholders.

---

## 6. Business Rules (Must Enforce in Backend)

1. **Cycle constraints (from settings):**  
   - Per member per cycle: total number of goals must be >= min_goals and <= max_goals.  
   - Number of critical goals must be >= critical_required.  
   - Critical goals count toward the max (e.g. if max is 7 and critical_required is 1, at least 1 goal is critical and total goals between min and 7).

2. **Goal weights:**  
   - If a goal is critical, its weight must be 100 (%).  
   - For that same (member, cycle), all other (non-critical) goals’ weights must sum to 100.  
   - So: exactly one critical => that one 100%, others sum 100%; or no critical => all sum 100%.

3. **Submission window:**  
   - Create/update/delete goals for a cycle only when current date is within the submission window (open_day to open_day + duration_days, applied to the cycle’s month).

4. **Review window:**  
   - Approve/reject goals and set manager notes only when current date is within the review window.

5. **Roles:**  
   - Employee: can CRUD own goals (in window), set own soft skill ratings and review summary (employee response).  
   - Manager: can view all members in org, view/edit manager notes, approve/reject goals, set manager ratings and manager review answers, add achievements.  
   - Admin: can update organization goals settings and soft skills list.

6. **Member score/streak:**  
   - Can be computed from completed cycles and goal scores, or stored and updated when goals are approved/completed. Frontend expects: score (decimal), streak (display string), goals (e.g. "3/3").

---

## 7. Flows (Step-by-Step)

### 7.1 Employee: View and Add Goals for a Month

1. Get cycles: `GET /organizations/:orgId/cycles?year=2026&type=monthly`.
2. Get goals for self and cycle: `GET /organizations/:orgId/members/:memberId/cycles/:cycleId/goals` (memberId = current user’s member id).
3. If in submission window: “Add Goal” visible. On submit: `POST .../goals` with body (title, description, metric, target, unit, weight, isCritical, etc.). Validate min/max/critical and weight rules.
4. Load soft skills and ratings: `GET .../soft-skills`, `GET .../members/:memberId/cycles/:cycleId/soft-skill-ratings`.
5. Load review summary: `GET .../review-summary`. Employee can update: `PUT .../review-summary` with employeeResponse.
6. Load achievements: `GET .../members/:memberId/achievements`.

### 7.2 Manager: View Member Report and Approve Goals

1. List members: `GET /organizations/:orgId/members`.
2. Select member; get cycle: `GET .../cycles` for that year.
3. Get goals: `GET .../members/:memberId/cycles/:cycleId/goals`. Show manager notes in UI.
4. Update manager note: `PUT .../goals/:goalId/manager-notes` with `{ note }`.
5. Approve: `POST .../goals/:goalId/approve`. Reject: `POST .../goals/:goalId/reject`.
6. Add achievement: `POST .../members/:memberId/achievements` with `{ title, date, description }`.
7. Update manager part of review summary: `PUT .../review-summary` with managerResponse. Update soft skill manager ratings: `PUT .../soft-skill-ratings`.

### 7.3 Admin: Update Goals Settings

1. Get settings: `GET /organizations/:orgId/goals-settings`.
2. Update: `PUT /organizations/:orgId/goals-settings` with cycleType, minGoals, maxGoals, criticalRequired, submissionOpenDay, submissionDurationDays, reviewOpenDay, reviewDurationDays.
3. Get soft skills: `GET .../soft-skills`. Add: `POST .../soft-skills`. Edit: `PUT .../soft-skills/:id`. Delete: `DELETE .../soft-skills/:id`.

### 7.4 Dashboard Load

1. Metrics: `GET /organizations/:orgId/dashboard/metrics`.
2. Leaderboard: `GET /organizations/:orgId/dashboard/leaderboard?limit=5`.
3. Team performance: `GET /organizations/:orgId/dashboard/team-performance?page=1&limit=10`.

---

## 8. Error and Response Conventions

- Success: 200 (GET/PUT), 201 (POST), 204 (DELETE). Body: resource or `{ data }`.
- Validation error: 400. Body: `{ "error": "Validation failed", "details": [ { "field", "message" } ] }`.
- Unauthorized: 401. Body: `{ "error": "Unauthorized" }`.
- Forbidden: 403. Body: `{ "error": "Forbidden" }`.
- Not found: 404. Body: `{ "error": "Not found", "resource": "goal" }`.
- Conflict (e.g. submission window closed): 409. Body: `{ "error": "Submission window closed" }`.
- Pagination: `?page=1&limit=20`. Response: `{ "items": [...], "total": 100, "page": 1, "limit": 20 }`.

---

## 9. Environment and Config

- Database: connection string (e.g. PostgreSQL).
- JWT: secret, expiry (e.g. 7d).
- Optional: CORS allowed origins (frontend URL).
- Optional: per-tenant DB or single DB with organization_id on all tables.

---

## 10. What the Frontend Expects (Summary)

- **Member:** id, name (displayName), role, avatarColor, status, goals (e.g. "3/3"), streak, score, reviewPending, hasBadge.
- **Goal:** id, name (title), description?, metric, target?, unit?, weight (number or string "20%"), isCritical (critical), status, achieved?, addedByManager?, managerNotes?.
- **Cycle:** id, name (e.g. "January"), year?, status (completed | active | upcoming), score?, label?, streak?.
- **Achievement:** id, memberId, title, date, description.
- **Soft skill:** id, name, definition?; rating: employeeRating, managerRating (0–10).
- **Review summary:** questionId, questionText, employeeResponse (yes | no | null), managerResponse (yes | no | null).
- **Settings:** minGoals, maxGoals, criticalRequired, submissionOpenDay, submissionDurationDays, reviewOpenDay, reviewDurationDays, cycleType (monthly | weekly).

Implement the above APIs and schema so the frontend can replace mock data with these endpoints. Keep this document updated if you add new fields or endpoints.
