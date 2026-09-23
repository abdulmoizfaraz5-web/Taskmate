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
- Responsive Architecture: Flexbox-based layout adapts seamlessly across mobile screens (`≤480px`) and desktop viewports.
### Core Features & Included Modules
- **Task Entry & Validation:** Validates empty user submissions and appends structured task objects (`{ id, text, completed }`).
- **State Toggle & Action Buttons:** Dynamic button binding provides instant toggling between "Complete" and "Undo" states, along with individual item deletion.
- **Live Counter & Filtering:** Synchronizes active counters (`total` vs. `completed`) and updates filtered views on demand.
- **Theme Switching Engine:** Toggles CSS custom variables (`[data-theme="dark"]`) on the root document level.

---

## 🚀 Quick Start Guide

### Prerequisites
- Any modern web browser (Google Chrome, Mozilla Firefox, Edge, Safari).
- A local HTTP server or live server extension (optional, but recommended for development).

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/taskmate.git](https://github.com/your-username/taskmate.git)

# 2. Navigate into the project directory
cd taskmate

# 3. Open index.html in your default browser
# On macOS:
open index.html

# On Windows:
start index.html

# On Linux:
xdg-open index.html

⚙ Verification & Testing
To verify key functional workflows manually:
Task Addition: Enter text in the input box and press Enter or click Add. Confirm the task appears and the live counter increments.

Empty Validation: Click Add with an empty input. Verify that the error message Please enter a task (cannot be empty). is displayed.

Toggle Completion: Click Complete. Verify strikethrough styling appears, button text changes to Undo, and counter updates.

Filtering: Click Active and Completed filter tabs to verify correct array slice rendering.

Theme Switching: Click the theme toggle icon (🌙 / ☀️). Refresh the page to confirm persistent theme state via localStorage.