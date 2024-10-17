import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";
import { userAgent } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // console.log(req.nextUrl.pathname); // config.matcher에 지정된 경로가 일치하면 이 미들웨어가 실행된다.
  const { nextUrl } = req;
  const agent = userAgent(req);
  console.log(agent);
  // 사용자가 로그인되어 있는지 확인
  const isLoggedIn = !!req.auth;

  // API 경로인지 확인
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // 사용자가 접근할 수 있는 경로인지 확인 (인증이 필요하지 않음)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // 사용자가 인증이 필요한 경로에 접근하려고 하는지 확인
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

// export const config = {
//   matcher: [
//     "/auth/login",
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     // "/((?!api|_next/static|_next/image|favicon.ico).*)", // 모든 경로에 대해 일치
//   ],
// };

// clerk 라이브러리에서 제공하는 미들웨어 config
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
