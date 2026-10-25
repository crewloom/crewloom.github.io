import { NextResponse } from 'next/server';
import { fetchLatestReleaseFromGitHub } from '@/lib/github-releases';

export const revalidate = 300; // revalidate at most every 5 minutes

export async function GET() {
  try {
    const data = await fetchLatestReleaseFromGitHub();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch latest release from GitHub', details: String(error) },
      { status: 500 }
    );
  }
}
