import path from "path";
import bycrpt from "bcrypt";
import { z } from "zod";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

const downloadSchema = z.object({
  fileId: z.cuid(),
  password: z.string().optional(),
});

const UPLOAD_DIR = process.env.FILE_UPLOAD_PATH;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  if (!UPLOAD_DIR) {
    return NextResponse.json({ message: "Upload directory not configured" }, { status: 500 });
  }

  const { fileId } = await params;
  const password = request.nextUrl.searchParams.get("password") || "";

  console.log(
    "Received download request for fileId:",
    fileId,
    password ? "with password" : "without password"
  );

  // Validate query parameters
  let parsedData;
  try {
    parsedData = downloadSchema.parse({ fileId, password });
  } catch (error) {
    return NextResponse.json({ message: "Invalid query parameters" }, { status: 400 });
  }

  // Fetch file metadata from database
  let fileRecord;
  try {
    fileRecord = await prisma.file.findUnique({ where: { id: parsedData.fileId } });
    if (!fileRecord) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }
    if (new Date() > fileRecord.expiresAt) {
      return NextResponse.json({ message: "File has expired" }, { status: 410 });
    }
    if (fileRecord.password) {
      if (!parsedData.password) {
        return NextResponse.json({ message: "Password required" }, { status: 401 });
      }
      const isPasswordValid = await bycrpt.compare(parsedData.password, fileRecord.password);
      if (!isPasswordValid) {
        return NextResponse.json({ message: "Invalid password" }, { status: 403 });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch file metadata" }, { status: 500 });
  }

  const filePath = path.join(UPLOAD_DIR, fileRecord.id + ".zip");

  // Stream file to client
  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${fileRecord.id}.zip"`,
        "Content-Type": "application/zip",
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to read file" }, { status: 500 });
  }
}
