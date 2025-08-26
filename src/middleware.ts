import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse, type MiddlewareConfig } from "next/server";

const publicPaths = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/setup", whenAuthenticated: "redirect" },
  { path: "/file", whenAuthenticated: "allow" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    const publicPath = publicPaths.find((p) => p.path === pathname);

    const isAuthenticated =
      !!request.nextauth.token && Date.now() < (request.nextauth.token?.exp as number) * 1000;

    if (!isAuthenticated) {
      if (publicPath) return NextResponse.next();

      const url = request.nextUrl.clone();
      url.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
      url.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(url);
    }

    if (publicPath?.whenAuthenticated === "redirect") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config: MiddlewareConfig = {
  matcher: [
    /**
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
