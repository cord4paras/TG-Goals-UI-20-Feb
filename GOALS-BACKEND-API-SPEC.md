# Goals Module — Backend API & DB Spec (AI-Friendly)

**Purpose:** Single source of truth for building the backend for the TeamGrid Goals UI. Give this document to an AI or developer so they can implement APIs, database schema, business rules, and flows with minimal back-and-forth. Read top to bottom for full context.

**Frontend:** React SPA (TG-Goals-UI) exists with mock data. Backend must replace mocks via REST APIs. Match request/response shapes and rules below so the UI works without change.

---

## 1. How to Use This Document (AI / Developer)

1. **Read the entire document first** — product, roles, schema, APIs, rules, flows, edge cases.
2. **Implement in order:** (1) DB schema + migrations, (2) Auth + org/member APIs, (3) Cycles + goals settings (including score-from-achieved ranges), (4) Goals CRUD + manager notes + achieved % + approve/reject, (5) Soft skills + review summary, (6) Achievements, (7) Dashboard + leaderboard + avg score + rank.
3. **Enforce all business rules** in Section 6 (cycles, submission/review windows, who can edit what, current vs past month).
4. **Match Section 8 (APIs)** and Section 11 (What the Frontend Expects) so the existing React app can plug in.
5. **Update this spec** if you add new tables or endpoints.

---

## 2. Product & Roles

- **Product:** TeamGrid — team performance and goals. This spec covers the **Goals Module** only.
- **Roles:**
  - **Employee:** Own goals (add/edit in submission window), own achieved %, own soft-skill employee rating, own review-summary employee answers. Sees own avg score, rank, leaderboard.
  - **Manager:** View team, view member reports, add/edit goals for **current (active) month** only, set achieved % and manager notes per goal, approve/reject goals for current month, set soft-skill manager rating and review-summary manager answers, add achievements. For **past months** manager only views (no edit, no approve/reject).
  - **Org Admin:** Update goals settings (cycle constraints, submission/review windows, **score-from-achieved ranges**, soft skills list). May have same dashboard as manager or separate.
- **Conventions:** REST, JSON, consistent error shape, HTTP status codes. Dates in ISO 8601. Pagination: `page`, `limit`, `total` where lists can be large.

---

## 3. Glossary

| Term | Meaning |
|------|--------|
| **Cycle** | Time period for goals: **monthly** (e.g. January 2026) or weekly. Status: `upcoming` \| `active` \| `completed`. |
| **Active cycle** | The single cycle whose status is `active` (e.g. February 2026). Only for this cycle can employees add/edit goals (in submission window) and managers add/edit goals and approve/reject. |
| **Goal** | One objective for one member in one cycle. Fields: name/title, metric, weight (e.g. "20%"), critical (boolean), status (e.g. PENDING, In Progress, Approved), achieved (%), addedByManager, managerNotes. |
| **Critical goal** | Goal with `critical: true`. Weight is 100%; other goals in same (member, cycle) must sum to 100%. |
| **Submission window** | Configurable: open day of month + duration (days). Only in this window can employees add/edit/delete goals for the active cycle. |
| **Review window** | Configurable: open day + duration. Only in this window can managers approve/reject and set manager notes (and set achieved % for current month). |
| **Score from achieved** | Score (1–10) is derived from achieved % using configurable ranges (e.g. 0–10% → 1, 11–20% → 2, …, 91–100% → 10). Stored in org goals settings. |
| **Member** | User in org with goals: displayName, role (job title), avatarColor, status (e.g. "Growing Employee", "Intermediate"), goals "3/3", streak (e.g. "5 Months"), score (decimal), reviewPending, hasBadge. |
| **Soft skill** | Org-level competency (e.g. Ownership). Per member per cycle: employee_rating (0–10), manager_rating (0–10). In **employee view** only employee rating is editable; in **manager view** only manager rating is editable. |
| **Review summary** | Fixed or configurable yes/no questions. Per member per cycle: employee_response, manager_response (yes \| no \| null). |
| **Achievement** | Extra recognition for a member: title, date, description. Added by manager. |
| **Avg score (employee)** | For one member, average of cycle scores over the year (only cycles that have a score). Shown on employee overview. |
| **Leaderboard** | Members sorted by score desc. Frontend shows top 5, then "…", then current user row with "Your rank is X" and "Your score: Y". |
| **Streak** | Consecutive months with goals submitted on time. Message: "Submit goals on time and maintain streak. Every month you get 1 point." (No "next milestone" like "3 Months — Unlock badge".) |
| **Badges** | Current: "Growing Employee". Next: "Best Employee" — criteria: avg score between 8.5 and 10. |

---

## 4. Database Schema

Assume one DB per tenant or `organization_id` on every table. Add `created_at`, `updated_at`, `created_by` where useful.

### 4.1 Organizations & Users

- **organizations**  
  `id` (PK), `name`, `slug`, `timezone?`, `locale?`.

- **users**  
  `id` (PK), `email`, `name`, `role` (employee \| manager \| org_admin), `organization_id` (FK), `avatar_url?`.

- **members**  
  `id` (PK), `user_id` (FK, 1:1), `organization_id` (FK), `display_name`, `role` (job title), `avatar_color`, `status` (e.g. Growing Employee, Intermediate), `goals_completed_count`, `goals_total_count`, `streak_display`, `score` (decimal), `review_pending` (boolean), `has_badge` (boolean).  
  Score/streak/goals counts can be computed from goals/cycles or cached and updated on approve/cycle close.

### 4.2 Cycles

- **goal_cycles**  
  `id` (PK), `organization_id` (FK), `type` (monthly \| weekly), `year`, `month` (for monthly; null for weekly), `week_start_date` (for weekly; null for monthly), `status` (upcoming \| active \| completed), `score` (nullable, cycle-level score for member).  
  Unique per org: e.g. `(organization_id, type, year, month)` for monthly.

### 4.3 Goals Settings (Organization)

- **organization_goals_settings**  
  `id` (PK), `organization_id` (FK, unique), `cycle_type`, `min_goals`, `max_goals`, `critical_required`, `submission_open_day`, `submission_duration_days`, `review_open_day`, `review_duration_days`.  
  One row per org (or per org + cycle_type).

- **score_from_achieved_ranges** (or JSONB inside settings)  
  Store ranges that map achieved % to score 1–10. Example: `[{ "minPercent": 0, "maxPercent": 10, "score": 1 }, …, { "minPercent": 91, "maxPercent": 100, "score": 10 }]`.  
  Default: 0–10→1, 11–20→2, …, 91–100→10. Editable by admin in Goals Settings.

### 4.4 Goals

- **goals**  
  `id` (PK), `organization_id` (FK), `member_id` (FK), `cycle_id` (FK), `name` (title), `metric`, `weight` (e.g. "20%" or 20), `is_critical` (boolean), `status` (e.g. PENDING, In Progress, Approved, Rejected), `achieved` (numeric, 0–100 for %), `added_by_manager` (boolean), `created_by_user_id` (FK), `created_at`, `updated_at`.  
  Optional: `description`, `sort_order`.  
  **Constraint:** For (member_id, cycle_id): if one goal is critical, its weight = 100 and sum of other goals’ weights = 100; else sum of all weights = 100.

- **goal_manager_notes**  
  `id` (PK), `goal_id` (FK), `member_id` (FK), `cycle_id` (FK), `note` (text), `created_by_user_id` (FK), `updated_at`.  
  One active note per goal (upsert on update). Frontend keys by (member_id, cycle_id, goal_id).

### 4.5 Soft Skills

- **soft_skills**  
  `id` (PK), `organization_id` (FK), `name`, `definition` (optional), `sort_order`.

- **soft_skill_ratings**  
  `id` (PK), `organization_id` (FK), `member_id` (FK), `cycle_id` (FK), `soft_skill_id` (FK), `employee_rating` (int 0–10), `manager_rating` (int 0–10), `updated_at`.  
  Unique: `(member_id, cycle_id, soft_skill_id)`.

### 4.6 Review Summary

- **review_questions**  
  `id` (PK), `organization_id` (FK), `question_text`, `sort_order`.

- **review_summary_answers**  
  `id` (PK), `member_id` (FK), `cycle_id` (FK), `review_question_id` (FK), `employee_response` (yes \| no \| null), `manager_response` (yes \| no \| null), `updated_at`.  
  Unique: `(member_id, cycle_id, review_question_id)`.

### 4.7 Achievements

- **achievements**  
  `id` (PK), `organization_id` (FK), `member_id` (FK), `title`, `date` (string e.g. "Jan 2026"), `description`, `created_by_user_id` (FK), `created_at`.

---

## 5. Business Rules (Enforce in Backend)

1. **Cycle status**  
   Exactly one cycle per (org, type, year) can be `active`. Others are `upcoming` or `completed` based on date and config.

2. **Goals per cycle (member)**  
   - Count of goals >= min_goals, <= max_goals.  
   - Count of critical goals >= critical_required.  
   - If any goal is critical, that goal weight = 100 and sum of other goals’ weights = 100; else sum of all weights = 100.

3. **Submission window**  
   - **Employee:** Create/update/delete own goals for the **active** cycle only when current date is inside submission window.  
   - **Manager:** Add new goals and **edit existing goals** for the **active** cycle only (no add/edit for past cycles).

4. **Review window**  
   - Manager can set achieved %, manager notes, approve/reject only for the **active** cycle (current month).  
   - For **past (completed)** cycles: manager can only **read** (no Action column: no edit goal, no approve/reject).

5. **Score from achieved**  
   - Score (1–10) = lookup in score_from_achieved_ranges by achieved % (0–100). Clamp % to 0–100. If no band, return 0.

6. **Roles**  
   - **Employee:** CRUD own goals (in window), set own achieved % for active cycle, set own soft-skill employee_rating and review employee_response. Cannot edit manager_rating or manager_response.  
   - **Manager:** View all members; for **active** cycle: add/edit goals, set achieved %, manager notes, approve/reject, set manager_rating and manager_response; add achievements. For **completed** cycles: read-only (no approve/reject, no goal edit).  
   - **Admin:** Update org goals settings (including score_from_achieved_ranges) and soft_skills list.

7. **Soft skills**  
   - **Employee view:** Only `employee_rating` is writable; `manager_rating` is read-only.  
   - **Manager view:** Only `manager_rating` is writable; `employee_rating` is read-only.

8. **Member score / streak / badge**  
   - Score: from approved/completed goals in cycle(s); or cycle-level score stored when cycle is completed.  
   - Avg score (employee): average of cycle scores for that member for the year (only cycles with a score).  
   - Streak: consecutive months with on-time submission; display e.g. "5 Months".  
   - Badge: e.g. Growing Employee (current), Best Employee (avg 8.5–10). Compute or store per member.

9. **Leaderboard**  
   - Sort members by score descending. Return list + total so frontend can compute rank for current user. Frontend shows top 5, then "…", then current user row with rank and score.

---

## 6. Edge Cases

- **Current month vs past month:** All "write" operations (goal add/edit, approve/reject, achieved %, manager notes for goals, manager rating, manager review answer) are only for the **active** cycle. For past cycles, APIs return data read-only and must not allow updates (return 409 or 403 with clear message).
- **No active cycle:** If no cycle is active, submission and review actions return 409 (e.g. "No active cycle").
- **Submission window closed:** Goal create/update/delete by employee returns 409 ("Submission window closed").
- **Review window closed:** Approve/reject and manager notes/achieved updates return 409 ("Review window closed") if you enforce window strictly; or allow manager anytime for active cycle — specify in product.
- **Weight sum:** On goal create/update, validate weight sum and critical rules; return 400 with details if invalid.
- **Achieved %:** Store 0–100. Score is always derived from ranges (no separate "score" field for goal if you use achieved % only). Frontend may send achieved as number; backend stores and returns score as computed.
- **Soft skill ratings:** If frontend sends only one of employee_rating or manager_rating, backend updates only that field (per role).
- **Leaderboard rank:** Compute rank as 1-based index in sorted-by-score list. Return current user’s rank and score in dashboard/leaderboard response so frontend can show "Your rank is X" and "Your score: Y".

---

## 7. API Specification

Base: `/api/v1`. JSON. `Authorization: Bearer <token>`. Org from token or `X-Organization-Id`.

### 7.1 Auth

- **POST /auth/login**  
  Body: `{ "email", "password" }`.  
  Response: `{ "token", "user": { id, email, name, role }, "organizationId" }`.

- **GET /auth/me**  
  Response: `{ "user", "member" }` (member optional; include if user is linked to a member).

### 7.2 Organizations & Members

- **GET /organizations/:orgId/members**  
  Query: `search`, `page`, `limit`.  
  Response: `{ "items": [ { id, displayName, role, avatarColor, status, goals (e.g. "3/3"), streak, score, reviewPending, hasBadge } ], "total" }`.

- **GET /organizations/:orgId/members/:memberId**  
  Response: single member object (for report header).

### 7.3 Cycles

- **GET /organizations/:orgId/cycles**  
  Query: `year`, `type` (monthly \| weekly).  
  Response: `[ { id, type, year, month, status, score?, name?, label?, streak? } ]`. Include which cycle is active.

- **GET /organizations/:orgId/cycles/:cycleId**  
  Response: single cycle.

### 7.4 Goals Settings

- **GET /organizations/:orgId/goals-settings**  
  Response: `{ cycleType, minGoals, maxGoals, criticalRequired, submissionOpenDay, submissionDurationDays, reviewOpenDay, reviewDurationDays, scoreFromAchievedRanges: [ { minPercent, maxPercent, score } ] }`.

- **PUT /organizations/:orgId/goals-settings**  
  Body: same shape (admin). Validate ranges cover 0–100 without gaps; scores 1–10.

### 7.5 Goals

- **GET /organizations/:orgId/members/:memberId/cycles/:cycleId/goals**  
  Response: `[ { id, name, metric, weight, critical, status, achieved, addedByManager, managerNotes } ]`.  
  Compute and return `score` (1–10) from achieved % using score_from_achieved_ranges.

- **POST /organizations/:orgId/members/:memberId/cycles/:cycleId/goals**  
  Body: `{ name, metric, weight, critical }`.  
  Allowed: employee (in submission window, own member) or manager (active cycle only). Validate min/max/critical/weight sum. Response: created goal.

- **PUT /organizations/:orgId/goals/:goalId**  
  Body: `{ name?, metric?, weight?, critical? }`.  
  Allowed: employee (in window, own goal) or manager (active cycle only). Validate weight sum. Response: updated goal.

- **DELETE /organizations/:orgId/goals/:goalId**  
  Allowed: employee (in window, own) or manager (active cycle only). Response: 204.

- **PUT /organizations/:orgId/goals/:goalId/manager-notes**  
  Body: `{ note }`. Manager only. Active cycle only (or allow for past — clarify product).

- **PUT /organizations/:orgId/goals/:goalId/achieved** (or PATCH)  
  Body: `{ achieved }` (0–100). Manager only for active cycle. Backend computes score from ranges. Response: goal with updated achieved and score.

- **POST /organizations/:orgId/goals/:goalId/approve**  
  Manager, active cycle. Set status Approved. Response: goal.

- **POST /organizations/:orgId/goals/:goalId/reject**  
  Manager, active cycle. Set status Rejected. Response: goal.

### 7.6 Soft Skills

- **GET /organizations/:orgId/soft-skills**  
  Response: `[ { id, name, definition, sortOrder } ]`.

- **POST /organizations/:orgId/soft-skills**  
  Body: `{ name, definition? }`. Admin.

- **PUT /organizations/:orgId/soft-skills/:id**  
  Body: `{ name?, definition? }`. Admin.

- **DELETE /organizations/:orgId/soft-skills/:id**  
  Admin.

- **GET /organizations/:orgId/members/:memberId/cycles/:cycleId/soft-skill-ratings**  
  Response: `[ { softSkillId, name, employeeRating, managerRating } ]`.

- **PUT /organizations/:orgId/members/:memberId/cycles/:cycleId/soft-skill-ratings**  
  Body: `[ { softSkillId, employeeRating?, managerRating? } ]`.  
  Employee sends only employeeRating; manager only managerRating. Backend merges by role.

### 7.7 Review Summary

- **GET /organizations/:orgId/review-questions**  
  Response: `[ { id, questionText, sortOrder } ]`.

- **GET /organizations/:orgId/members/:memberId/cycles/:cycleId/review-summary**  
  Response: `[ { questionId, questionText, employeeResponse, managerResponse } ]`.

- **PUT /organizations/:orgId/members/:memberId/cycles/:cycleId/review-summary**  
  Body: `[ { questionId, employeeResponse?, managerResponse? } ]`.  
  Employee sets employeeResponse; manager sets managerResponse. Backend accepts only the role-allowed field.

### 7.8 Achievements

- **GET /organizations/:orgId/members/:memberId/achievements**  
  Query: optional `cycle`, `year`.  
  Response: `[ { id, title, date, description, createdAt } ]`.

- **POST /organizations/:orgId/members/:memberId/achievements**  
  Body: `{ title, date?, description? }`. Manager only. Response: created achievement.

### 7.9 Dashboard & Leaderboard

- **GET /organizations/:orgId/dashboard/metrics**  
  Response: `{ teamMembersCount, goalAvgScore?, goalAvgScoreChangePercent?, goalsDone, goalsTotal }`.  
  Optional: activeHours, totalProjects if from other modules.

- **GET /organizations/:orgId/dashboard/leaderboard**  
  Query: `limit=5`.  
  Response: `{ items: [ { memberId, displayName, role, avatarColor, score, rank } ], total }`.  
  Also return **current user’s** rank and score if authenticated: `currentUserRank`, `currentUserScore` so frontend can show "Your rank is X" and "Your score: Y" even when user is not in top 5.

- **GET /organizations/:orgId/members/me/avg-score** (or include in member or dashboard)  
  Query: `year`.  
  Response: `{ avgScore }` — average of cycle scores for that member for the year (only cycles with a score). One decimal.

- **GET /organizations/:orgId/dashboard/team-performance**  
  Query: `page`, `limit`, `search`.  
  Response: `{ items: [ { member, active?, idle?, total?, sessions? } ], total }`. active/idle/sessions can be placeholders.

---

## 8. Error & Response Conventions

- **200** GET/PUT, **201** POST, **204** DELETE. Body: resource or `{ data }`.
- **400** Validation: `{ "error": "Validation failed", "details": [ { "field", "message" } ] }`.
- **401** Unauthorized: `{ "error": "Unauthorized" }`.
- **403** Forbidden: `{ "error": "Forbidden" }`.
- **404** Not found: `{ "error": "Not found", "resource": "goal" }`.
- **409** Conflict: e.g. `{ "error": "Submission window closed" }`, `{ "error": "No active cycle" }`, `{ "error": "Cannot edit past cycle" }`.
- Pagination: `?page=1&limit=20`. Response: `{ "items": [...], "total": 100, "page": 1, "limit": 20 }`.

---

## 9. Flows (Step-by-Step)

### 9.1 Employee: View & Add/Edit Goals (Active Month)

1. `GET /organizations/:orgId/cycles?year=2026&type=monthly` → get 12 months, identify active.
2. `GET /organizations/:orgId/members/me` (or from auth/me) → memberId.
3. For chosen cycle: `GET .../members/:memberId/cycles/:cycleId/goals`. If cycle is active and in submission window, show Add/Edit.
4. Add goal: `POST .../goals` with `{ name, metric, weight, critical }`. Edit: `PUT .../goals/:goalId`. Delete: `DELETE .../goals/:goalId`.
5. Soft skills: `GET .../soft-skills`, `GET .../members/:memberId/cycles/:cycleId/soft-skill-ratings`. Update: `PUT .../soft-skill-ratings` with **employeeRating** only.
6. Review summary: `GET .../review-summary`, `PUT .../review-summary` with **employeeResponse** only.
7. Avg score: `GET .../members/me/avg-score?year=2026` for banner/widget.

### 9.2 Manager: View Member Report & Manage Goals (Active Month)

1. `GET /organizations/:orgId/members` → list. Select member.
2. `GET .../cycles?year=2026` → get cycles. Select month (e.g. February).
3. `GET .../members/:memberId/cycles/:cycleId/goals`.  
   - If cycle is **active**: show Add New, Edit (per goal), Achieved %, Manager notes, Approve/Reject.  
   - If cycle is **completed**: read-only (no Action column, no edit).
4. Add goal: `POST .../goals`. Edit goal: `PUT .../goals/:goalId`. Set achieved: `PUT .../goals/:goalId/achieved` with `{ achieved }`. Set manager notes: `PUT .../goals/:goalId/manager-notes`. Approve: `POST .../goals/:goalId/approve`. Reject: `POST .../goals/:goalId/reject`.
5. Soft skills: `PUT .../soft-skill-ratings` with **managerRating** only.
6. Review summary: `PUT .../review-summary` with **managerResponse** only.
7. Add achievement: `POST .../members/:memberId/achievements` with `{ title, date, description }`.

### 9.3 Manager: View Past Month (Read-Only)

1. Same as 9.2 but cycle status = completed.  
2. Only GET goals, soft-skill-ratings, review-summary. No POST/PUT for goals, notes, approve/reject, achieved. Return 409/403 if client tries.

### 9.4 Admin: Goals Settings

1. `GET /organizations/:orgId/goals-settings` → current settings and score_from_achieved_ranges.
2. `PUT /organizations/:orgId/goals-settings` with cycleType, minGoals, maxGoals, criticalRequired, submission/review windows, **scoreFromAchievedRanges**.
3. Soft skills CRUD: GET/POST/PUT/DELETE `/organizations/:orgId/soft-skills`.

### 9.5 Dashboard & Leaderboard

1. Metrics: `GET .../dashboard/metrics`.
2. Leaderboard: `GET .../dashboard/leaderboard?limit=5`. Use `currentUserRank`, `currentUserScore` for "Your rank is X" and "Your score: Y".
3. Team performance: `GET .../dashboard/team-performance?page=1&limit=10`.

---

## 10. Environment & Config

- Database: connection string (e.g. PostgreSQL).
- JWT: secret, expiry (e.g. 7d).
- CORS: allow frontend origin.
- Optional: per-tenant DB or single DB with organization_id everywhere.

---

## 11. What the Frontend Expects (Summary)

Use these shapes so the React app can drop in responses without change.

- **Member:** id, name (displayName), role, avatarColor, status, goals (e.g. "3/3"), streak, score, reviewPending, hasBadge.
- **Cycle:** id, name (e.g. "January"), year, month?, status (completed \| active \| upcoming), score?, label?, streak?.
- **Goal:** id, name, metric, weight (string "20%" or number), critical, status, achieved (number 0–100), addedByManager?, managerNotes?, score (1–10, computed from achieved).
- **Soft skill:** id, name, definition?; ratings: employeeRating, managerRating (0–10).
- **Review summary:** questionId, questionText, employeeResponse (yes \| no \| null), managerResponse (yes \| no \| null).
- **Achievement:** id, memberId, title, date, description.
- **Settings:** minGoals, maxGoals, criticalRequired, submissionOpenDay, submissionDurationDays, reviewOpenDay, reviewDurationDays, cycleType, **scoreFromAchievedRanges**: [ { minPercent, maxPercent, score } ].
- **Leaderboard:** items with memberId, displayName, role, avatarColor, score, rank; plus **currentUserRank**, **currentUserScore**.
- **Avg score (employee):** single number, one decimal (e.g. 8.5), for current year.

---

**End of spec.** Implement the above so the TG-Goals-UI frontend can replace mock data with these APIs. Keep this document updated when adding or changing tables or endpoints.
