# HR Process Copilot

A polished interview-demo MVP that converts fictional HR stakeholder transcripts into a prioritized automation backlog. The current analysis engine is deterministic, runs without an API key, and is isolated behind an `AnalysisService` interface for a future Copilot Studio, Azure OpenAI, or OpenAI implementation.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. For a production check:

```bash
npm run lint
npm run build
npm run preview
```

## Architecture

- `src/services/analysisService.ts` — provider-neutral analysis contract and mock implementation
- `src/data/demo.ts` — fictional transcript and deterministic structured output
- `src/components/` — focused dashboard, analysis, matrix, roadmap, and transcript components
- `src/types/analysis.ts` — structured AI output schema
- `src/utils/storage.ts` — local persistence for the current demo analysis

## Privacy and responsible AI

The demo uses fictional people and scenarios. Do not paste confidential employee information into an unapproved environment. Production use requires identity, role-based access, encryption, retention controls, audit logs, and an approved model/data boundary. Every recommendation requires human review. The product must never rank employees or make employment decisions.

## Five-minute interview demo

1. Select **New analysis**, then choose one of the five fictional meetings.
2. Analyze the transcript and explain the deterministic/no-key demo architecture.
3. Review the leave-of-absence quick win and its recommended Power Platform solution.
4. Change priority, edit the owner/problem, and approve the opportunity.
5. Show the impact-versus-effort matrix and 30/60/90-day roadmap.
6. Print the one-page executive brief and close with the production security requirements.

## Publish with GitHub Pages

The repository includes `.github/workflows/deploy.yml`. Push the project to a GitHub repository whose default branch is `main`, then open **Settings → Pages** and choose **GitHub Actions** under **Build and deployment → Source**. Every push to `main` will build and publish the app. The final URL normally follows `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.
