# Image-to-PDF Converter — Architecture Overview

> High-level architecture reference. For implementation details, see `BUILD_GUIDE.md`.

## 1. Purpose

A web application that converts one or more images into a single PDF document.
Backend performs the conversion; frontend provides the UI.

## 2. System Diagram

    ┌────────────────────┐        HTTP        ┌────────────────────┐
    │   CLIENT (React)   │ ─────────────────► │  SERVER (Express)  │
    │  TS + Tailwind     │ ◄───────────────── │  TS + sharp/pdf-lib│
    └────────────────────┘      PDF Blob      └────────────────────┘
                                                       │
                                                       ▼
                                              ┌────────────────────┐
                                              │  Temp File Storage │
                                              │  (auto-cleaned)    │
                                              └────────────────────┘

## 3. Repository Layout

    image-to-pdf-converter/
    ├── client/        # React + Vite + TS + Tailwind
    ├── server/        # Express + TS + sharp + pdf-lib
    ├── shared/        # Optional: shared TypeScript contracts
    ├── docker-compose.yml
    └── README.md

## 4. Client Architecture

- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS
- **Responsibilities:**
  - File selection (drag-and-drop + click-to-browse)
  - Image previews and reordering
  - Conversion options (page size, orientation, margin, quality)
  - API communication and download handling
- **Key Layers:**
  - `components/` — UI primitives and feature components
  - `hooks/` — stateful logic (upload, conversion, reorder)
  - `services/` — typed API client
  - `types/` — request/response contracts

## 5. Server Architecture

- **Runtime:** Node.js + Express + TypeScript
- **Responsibilities:**
  - Accept multipart image uploads
  - Validate files (type, size, count)
  - Process images (sharp)
  - Assemble PDF (pdf-lib)
  - Stream PDF back to client
  - Clean up temporary files

- **Layers (top → bottom):**
  1. Middleware — CORS, Helmet, rate limit, Multer, option parsing
  2. Controllers — Request orchestration only
  3. Services — Business logic (image, PDF, conversion, cleanup)
  4. Utilities — Logging, errors, file helpers

## 6. Request Flow

1. Client posts `multipart/form-data` with images + options
2. Middleware validates and stores files temporarily
3. Controller delegates to conversion service
4. Image service processes each file (rotate, resize, normalize)
5. PDF service creates pages and embeds images
6. Response streams PDF bytes back
7. Cleanup service deletes temp files (always, via `finally`)

## 7. Shared Contracts

Optional `shared/` workspace holds types used by both sides:

- `ConvertOptions`, `PageSize`, `Orientation`
- `ApiError`, response shapes

Prevents client/server drift.

## 8. Cross-Cutting Concerns

| Concern        | Approach                                     |
| -------------- | -------------------------------------------- |
| Type Safety    | TypeScript strict mode, shared contracts     |
| Validation     | Middleware layer (mimetype + magic numbers)  |
| Error Handling | Central error handler, custom AppError class |
| Cleanup        | `finally` blocks + error handler hooks       |
| Rate Limiting  | express-rate-limit per IP                    |
| Security       | Helmet + CORS whitelist                      |
| Logging        | Structured logger (pino/winston)             |
| Config         | dotenv + typed config module                 |

## 9. Storage Model

- **Uploads:** Local disk (`server/uploads/`), unique filenames
- **PDF Output:** In-memory buffer, streamed to client
- **Persistence:** None — stateless per request

## 10. Deployment Shape

- Two containerized services: `client`, `server`
- `docker-compose up` runs both
- Client served as static build (Nginx or Vite preview)
- Server behind same reverse proxy

## 11. Scaling Path (Future)

1. Current: single server, synchronous conversion
2. Add job queue (BullMQ + Redis) for large batches
3. Extract conversion into worker service
4. Move temp storage to S3 with presigned URLs
5. Autoscale workers with Kubernetes

## 12. Non-Goals

- User accounts / authentication
- Persistent file storage
- Image editing beyond rotation and resize
- Server-side rendering

---

\_Last updated: 26/09/2026
