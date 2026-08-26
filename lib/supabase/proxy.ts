import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip the session check.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // Create a new Supabase server client for every request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Keep the Supabase session refreshed.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  /*
   * PUBLIC ROUTES
   *
   * Visitors do NOT need an account to access these.
   */
  const publicRoutes = [
    "/",
    "/products",
    "/checkout",
    "/payment-success",
    "/login",
    "/signup",
    "/auth",
  ];

  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );

  /*
   * PROTECTED ROUTES
   *
   * Any route not listed above requires authentication.
   */
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();

    url.pathname = "/auth/login";

    // Remember where the visitor originally wanted to go.
    url.searchParams.set("next", pathname);

    return NextResponse.redirect(url);
  }

  /*
   * IMPORTANT:
   * Always return the Supabase response so authentication
   * cookies remain synchronized.
   */
  return supabaseResponse;
}
