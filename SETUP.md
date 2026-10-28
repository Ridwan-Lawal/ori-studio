# ORÍ Studio — Developer Setup (Ubuntu / Codex)

## Step 1 — Scaffold app (run locally)
```bash
pnpm create next-app@latest ori-studio \
  --ts --tailwind --eslint --app --src-dir \
  --import-alias '@/*' --use-pnpm
cd ori-studio
```
This creates a framework scaffold, **not** the completed project.

## Step 2 — Copy planning package
Copy `AGENTS.md` into the repository root and the supplied Markdown files into `docs/`. These documents govern the project. Do not overwrite the scaffold's generated app files with the earlier static HTML prototype.

## Step 3 — Install Codex-compatible design skill
```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```
Select Codex and project-level installation if prompted. If prompted to trust a repository, review its `SKILL.md` and scripts first; third-party skills may run local commands. Verify the skill is discoverable from Codex.

## Step 4 — Start Codex and assign a bounded task
```bash
codex
```
Tell Codex to read `AGENTS.md`, the docs and implement **Milestone 0 only** in `docs/BUILD_PLAN.md`. Do not install extra UI libraries or create the whole website.

## Step 5 — Review outcome
```bash
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```
Check visually at 390px and 1440px. Do not treat automated checks alone as proof of visual quality.

## Later, when needed
- `21st.dev` component discovery is optional and must be scoped to a specific design need.
- GSAP is optional until motion milestone.
- Remotion project and skills are installed separately in the later video-production phase.

## Source documentation
- Codex `AGENTS.md` guidance: https://learn.chatgpt.com/docs/agent-configuration/agents-md
- Taste Skill: https://www.tasteskill.dev/docs
- Next.js create-next-app: https://nextjs.org/docs/app/api-reference/cli/create-next-app
- 21st.dev: https://21st.dev/mcp
- Remotion agent skills: https://www.remotion.dev/docs/ai/skills
