import path from "path";
import cuid from "cuid";
import bycrpt from "bcrypt";
import { z } from "zod";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import "@/lib/cleanup"; // Ensure cleanup task is initialized

const uploadSchema = z.object({
  file: z.instanceof(File),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8),
  expiresIn: z.number(), // in seconds
});

const UPLOAD_DIR = process.env.FILE_UPLOAD_PATH;

export async function POST(request: NextRequest) {
  if (!UPLOAD_DIR) {
    return NextResponse.json({ message: "Upload directory not configured" }, { status: 500 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await request.formData();
  if (!data) {
    return NextResponse.json({ message: "No data provided" }, { status: 400 });
  }

  // Validate and parse form data
  let parsedData;
  try {
    parsedData = uploadSchema.parse({
      file: data.get("file"),
      password: data.get("password") as string | "",
      expiresIn: Number(data.get("expiresIn")),
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid form data", error }, { status: 400 });
  }

  const { file, password, expiresIn } = parsedData;

  // Check if the mime type is zip
  if (file.type !== "application/zip") {
    return NextResponse.json({ message: "Only zip files are allowed" }, { status: 400 });
  }

  const fileId = cuid();
  const filePath = path.join(UPLOAD_DIR, fileId + ".zip");
  const expiresAt = expiresIn > 0 ? new Date(Date.now() + expiresIn * 1000) : null;

  // Save file to disk
  try {
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
  } catch (error) {
    return NextResponse.json({ message: "Failed to save file", error }, { status: 500 });
  }

  // Save file metadata to database
  try {
    await prisma.file.create({
      data: {
        id: fileId,
        password: password ? await bycrpt.hash(password, 10) : null,
        expiresAt,
        userId: session.user.id,
      },
    });
  } catch (error) {
    // Cleanup file if database operation fails
    await fs.unlink(filePath);
    return NextResponse.json({ message: "Failed to save file metadata", error }, { status: 500 });
  }

  return NextResponse.json({ message: "File uploaded successfully", fileId }, { status: 201 });
}
