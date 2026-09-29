import dotenv from "dotenv";
dotenv.config();

interface AppConfig {
  port: number;
  env: "development" | "production" | "test";
  clientUrl: string;
  upload: {
    dir: string;
    maxFileSize: number;
    maxFiles: number;
    allowedMimeTypes: string[];
  };
  pdf: {
    defaultPageSize: "A4" | "Letter" | "Legal";
    defaultMargin: number;
    defaultQuality: number;
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
}

function env<T extends string>(key: string, fallback: T): T {
  return (process.env[key] as T) ?? fallback;
}

export const config: AppConfig = {
  port: Number(process.env.PORT) || 3000,
  env: env("NODE_ENV", "development"),
  clientUrl: env("CLIENT_URL", "http://localhost:5173"),
  upload: {
    dir: env("UPLOAD_DIR", "./uploads"),
    maxFileSize: 10 * 1024 * 1024,
    maxFiles: 20,
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ],
  },
  pdf: {
    defaultPageSize: "A4",
    defaultMargin: 20,
    defaultQuality: 90,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 30,
  },
};
