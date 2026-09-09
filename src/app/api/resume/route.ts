import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { ResumePDFDoc } from '@/lib/resumePdfDoc';
import fs from 'fs';
import path from 'path';
import React from 'react';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Read profile photo as base64
    let photoBase64: string | undefined;
    try {
      const imgPath = path.join(process.cwd(), 'public', 'images', 'profile.png');
      const imgBuffer = fs.readFileSync(imgPath);
      photoBase64 = imgBuffer.toString('base64');
    } catch {
      // Photo not found — continue without it
    }

    const buffer = await renderToBuffer(
      React.createElement(ResumePDFDoc, { photoBase64 })
    );

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Aman-Kumar-Resume.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('PDF generation error:', err);
    return new NextResponse('Failed to generate PDF', { status: 500 });
  }
}
