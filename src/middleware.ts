import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import slugRedirects from "@/data/slug-redirects.json";

// Loaded once at edge-runtime init; O(1) lookup per request.
const redirects = slugRedirects as Record<string, string>;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only check /shops/<slug> URLs; everything else passes through unchanged.
  if (!pathname.startsWith("/shops/")) return NextResponse.next();

  const slug = pathname.slice("/shops/".length);
  const newSlug = redirects[slug];
  if (!newSlug) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/shops/${newSlug}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: "/shops/:slug*",
};
