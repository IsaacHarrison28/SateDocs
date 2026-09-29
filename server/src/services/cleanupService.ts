import fs from "node:fs/promises";
import { logger } from "../utils/logger.js";

class CleanupService {
  /**
   * Deletes the given files from disk.
   * Never throws — a failure to delete one file should not break the request.
   */
  async deleteFiles(paths: string[]): Promise<void> {
    if (paths.length === 0) return;

    await Promise.all(
      paths.map(async (filePath) => {
        try {
          await fs.unlink(filePath);
        } catch (err) {
          // ENOENT = file already gone; not an error worth logging loudly
          const code = (err as NodeJS.ErrnoException).code;
          if (code === "ENOENT") return;

          logger.warn(
            {
              error: err instanceof Error ? err.message : String(err),
              filePath,
            },
            `Failed to delete temp file`,
          );
        }
      }),
    );

    logger.debug(`Cleaned up ${paths.length} file(s)`);
  }
}

export const cleanupService = new CleanupService();
