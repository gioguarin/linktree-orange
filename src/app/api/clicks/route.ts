import { NextRequest, NextResponse } from 'next/server';

// You'll need to install @upstash/redis
// npm install @upstash/redis

// For now, using a simple in-memory store for demo
// Replace with Redis when you set it up
const clickCounts: Record<string, number> = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const link = searchParams.get('link');

  if (link) {
    // Return count for specific link
    const count = clickCounts[link] || 0;
    return NextResponse.json({ [link]: count });
  } else {
    // Return all counts
    return NextResponse.json(clickCounts);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { link } = body;

    if (!link) {
      return NextResponse.json({ error: 'Link parameter required' }, { status: 400 });
    }

    // Increment count
    clickCounts[link] = (clickCounts[link] || 0) + 1;

    return NextResponse.json({
      [link]: clickCounts[link],
      message: 'Click recorded'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}