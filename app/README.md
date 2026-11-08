# GMAT Focus Edition Prep Course

A self-paced, local-first study course for the GMAT Focus Edition — 6 modules (diagnostic, Quant, Verbal, Data Insights, mocks, taper), checkpoint quizzes with a strict pass bar, and strategy insights pulled from real GMAT Club / test-prep research, with sources cited inline.

No account, no backend, no tracking. Your progress lives in an Excel file on your own machine.

## Run it locally

```bash
git clone <this-repo-url>
cd gmat-prep/app
npm install
npm run dev
```

Open the printed `localhost` URL. That's it — no API keys, no accounts.

## How progress is saved

This app has no backend and no login. Instead, it uses the browser's **File System Access API** to read and write directly to a local `.xlsx` file you choose:

- On first visit, create a new file or pick an existing one.
- Every lesson checkbox, quiz result, and error-log entry writes straight into that file (three sheets: Lesson Progress, Quiz Results, Error Log).
- Reload the page, reconnect to the same file, and you're back where you left off — the file *is* the state.

**This requires a Chromium-based browser** (Chrome, Edge, Brave, Arc). It will not work in Safari or Firefox, which don't implement this API — the app detects this and tells you plainly rather than failing silently.

## Adding your own study material links

The course ships with no personal file paths — none of the lesson links point at anyone's local folders, and no copyrighted material (official guides, prep-company PDFs, etc.) is included or distributed here. You bring your own legally-owned copies.

To link a lesson to your own files, copy `src/data/local.example.ts` to `src/data/local.ts` (already gitignored — it will never be committed) and fill in your own `file://` paths. See the comments in that file for the shape.

## Tech

React + TypeScript + Vite + Tailwind CSS v4. Excel read/write via SheetJS. Icons via lucide-react. No external services, no network calls except the public study-resource links in the course content.
