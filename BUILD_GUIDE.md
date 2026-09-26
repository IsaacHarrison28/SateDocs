# SateDocs — Build Guide

> Development roadmap. Check off tasks as you complete them.
> Convert to PDF any time with the command in the last section.

## Phase 0 — Project Scaffolding

- [ ] Create root folder `image-to-pdf-converter/`
- [ ] Initialize git repo + `.gitignore`
- [ ] Set up npm workspaces (client, server, shared)
- [ ] Add root `package.json` with `concurrently` dev script
- [ ] Create `README.md` placeholder

## Phase 1 — Server Foundation

- [ ] Scaffold `server/` with TypeScript
- [ ] Add dependencies: express, cors, helmet, dotenv, pino, multer
- [ ] Add dev dependencies: tsx, @types/\*, typescript
- [ ] Configure `tsconfig.json` (strict mode)
- [ ] Create typed config module (`config/index.ts`)
- [ ] Create logger utility (pino)
- [ ] Create `AppError` class
- [ ] Create global error handler middleware
- [ ] Create Express app bootstrap (`app.ts`, `server.ts`)
- [ ] Add `/api/health` route
- [ ] Verify server boots

## Phase 2 — Upload Pipeline

- [ ] Configure Multer with disk storage
- [ ] Add filename generator (unique names)
- [ ] Add file filter (allowed mimetypes)
- [ ] Add size + count limits
- [ ] Create `parseOptions` middleware (JSON body → typed object)
- [ ] Create `/api/convert` route skeleton

## Phase 3 — Image Processing Service

- [ ] Add `sharp` dependency
- [ ] Implement `imageService.processImage()`
  - [ ] Read file from disk
  - [ ] Auto-rotate via EXIF
  - [ ] Strip metadata
  - [ ] Resize if over max dimension
  - [ ] Output JPEG buffer
- [ ] Unit test with sample images

## Phase 4 — PDF Generation Service

- [ ] Add `pdf-lib` dependency
- [ ] Implement `pdfService.createDocument()`
- [ ] Implement `pdfService.addImagePage()`
  - [ ] Resolve page dimensions (A4/Letter/Legal/fit-to-image)
  - [ ] Apply orientation
  - [ ] Center image with margins
- [ ] Test with a single hardcoded image

## Phase 5 — Conversion Orchestrator

- [ ] Implement `conversionService.convert()`
  - [ ] Loop files sequentially (preserve order)
  - [ ] Call image service per file
  - [ ] Call PDF service per file
  - [ ] Return Uint8Array
- [ ] Implement `cleanupService.deleteFiles()`
- [ ] Wire cleanup into `finally` block
- [ ] Connect controller to conversion service
- [ ] Stream PDF back with correct headers

## Phase 6 — Client Foundation

- [ ] Scaffold `client/` with Vite + React + TS
- [ ] Install Tailwind, PostCSS, Autoprefixer
- [ ] Configure `tailwind.config.ts`
- [ ] Add `index.css` with Tailwind directives
- [ ] Add `clsx` + `tailwind-merge` for `cn()` helper
- [ ] Configure Vite proxy to `/api`
- [ ] Create base layout (`App.tsx`, `Home.tsx`)

## Phase 7 — Client Upload UI

- [ ] Build `DropZone` component (drag + click)
- [ ] Build `ImagePreviewGrid`
- [ ] Build `ImageCard` with remove button
- [ ] Build `OptionsPanel` (page size, orientation, margin, quality)
- [ ] Build `ConvertButton` with loading state
- [ ] Build `Toast` for errors/success

## Phase 8 — Client Logic

- [ ] Implement `useImageUpload` hook
- [ ] Implement `useConversion` hook
- [ ] Implement typed API service (`services/api.ts`)
- [ ] Add `downloadBlob` utility
- [ ] Handle error states end-to-end

## Phase 9 — Polish

- [ ] Image reordering (drag-and-drop, e.g. `@dnd-kit`)
- [ ] Per-file validation feedback
- [ ] Total size / count indicator
- [ ] Loading skeletons
- [ ] Responsive layout pass
- [ ] Accessibility pass (keyboard nav, ARIA)

## Phase 10 — Testing

- [ ] Unit tests: image service
- [ ] Unit tests: PDF service
- [ ] Integration test: `/api/convert` happy path
- [ ] Integration test: error cases (no files, bad type, oversize)
- [ ] Client component tests (optional)

## Phase 11 — DevOps & Deployment

- [ ] Write `Dockerfile` for server
- [ ] Write `Dockerfile` for client (multi-stage build)
- [ ] Write `docker-compose.yml`
- [ ] Add `.dockerignore`
- [ ] Verify `docker-compose up` works end-to-end
- [ ] Add `.env.example` files
- [ ] Write root `README.md` with setup instructions

## Phase 12 — Portfolio Polish

- [ ] Add screenshots / GIF to README
- [ ] Document architecture in `ARCHITECTURE.md`
- [ ] Add license
- [ ] Deploy live demo (Fly.io / Railway / Render)
- [ ] Add CI workflow (GitHub Actions: lint + test + build)

---

## Progress Summary

| Phase | Status        |
| ----- | ------------- |
| 0     | ☐ Not started |
| 1     | ☐ Not started |
| 2     | ☐ Not started |
| 3     | ☐ Not started |
| 4     | ☐ Not started |
| 5     | ☐ Not started |
| 6     | ☐ Not started |
| 7     | ☐ Not started |
| 8     | ☐ Not started |
| 9     | ☐ Not started |
| 10    | ☐ Not started |
| 11    | ☐ Not started |
| 12    | ☐ Not started |

---

## Converting This Guide to PDF

### Option A — VS Code (easiest)

Install the **"Markdown PDF"** extension, open this file, run
`Markdown PDF: Export (pdf)` from the command palette.

### Option B — Pandoc (best typography)

```bash
pandoc BUILD_GUIDE.md -o BUILD_GUIDE.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V mainfont="Inter"
```
