# TaskMate - Task Management Application

> A lightweight, responsive web application designed for real-time daily task tracking, status filtering, and dynamic state management.

---

# Problem Statement & Solution Architecture

--> The Problem
- Managing daily tasks efficiently requires a clear distinction between pending and completed activities without page reloads.
- Standard inline list apps often lack state persistent visibility, visual accessibility across dark/light environments, and quick operational status controls (e.g., active vs. completed filters).

-->How TaskMate Solves It
-In-Memory State Management: Maintains a centralized array state (`tasks`) that updates dynamically across DOM manipulation events without page refresh.
-Dynamic View Filtering: Provides single-click status views (`All`, `Active`, `Completed`) without mutating the underlying task database array.
- Theme Persistence: Integrates `localStorage` to retain dark/light mode preferences across user sessions.
- Responsive Architecture: Flexbox-based layout adapts seamlessly across mobile screens (`≤480px`) and desktop viewports