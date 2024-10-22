// 경로 보호를 위한 라우트를 정의한다.

/**
 * 사용자가 접근할 수 있는 다양한 경로.
 * 이러한 경로에는 인증이 필요하지 않습니다.
 * @type {string[]}
 * */
export const publicRoutes = ["/"];

/**
 * 사용자 인증이 필요한 경로.
 * 이 경로는 로그인한 사용자를 /settings로 리디렉션합니다.
 * @type {string[]}
 * */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * 절대로 변경하지 마십시오.
 * api 인증 경로 접두사.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * 기본 로그인 리디렉션 경로.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
