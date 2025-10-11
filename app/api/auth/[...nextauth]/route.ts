import { handlers } from '@/auth';

export const { GET, POST } = handlers;

// Force Next.js to not statically analyze this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';
