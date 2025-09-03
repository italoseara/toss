import cron from "node-cron";
import fs from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma"; // adjust to your project’s prisma client path

const UPLOAD_DIR = process.env.FILE_UPLOAD_PATH;

// Schedule: every minute
cron.schedule("* * * * *", async () => {
  if (!UPLOAD_DIR) {
    console.error("UPLOAD_DIR is not defined.");
    return;
  }

  const now = new Date();
  const expiredFiles = await prisma.file.findMany({
    where: { expiresAt: { not: null, lt: now } },
  });

  for (const file of expiredFiles) {
    const filePath = path.join(UPLOAD_DIR, file.id + ".zip");

    try {
      await fs.unlink(filePath);
      console.log(`Expired file: ${filePath}`);
    } catch (err) {
      console.error(`Failed to delete file at ${filePath}`, err);
    }

    await prisma.file.delete({ where: { id: file.id } });
    console.log(`Deleted DB record for file ID: ${file.id}`);
  }
});
