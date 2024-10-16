import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // console.log(req.nextUrl.pathname); // config.matcher에 지정된 경로가 일치하면 이 미들웨어가 실행된다.

  const isLoggedIn = !!req.auth;

  console.log(isLoggedIn);
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
