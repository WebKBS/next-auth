import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold uppercase">Auth</h1>
        <p className="text-lg">인증시스템 구현</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              로그인
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
