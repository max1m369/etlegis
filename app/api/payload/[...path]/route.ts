import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = path.join('/');
  const search = request.nextUrl.search;
  const payloadUrl = process.env.PAYLOAD_URL || 'http://localhost:3001';
  const targetUrl = `${payloadUrl}/api/payload/${endpoint}${search}`;

  try {
    const res = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      return NextResponse.json({ docs: [] }, { status: 200 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    // If Payload CMS backend is offline, return empty docs with 200
    // so frontend uses fallback mock data cleanly without dev console errors
    return NextResponse.json({ docs: [] }, { status: 200 });
  }
}
