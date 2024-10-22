import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Header from "@/components/auth/header";
import BackButton from "@/components/auth/back-button";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={"Error"} />
      </CardHeader>
      <CardFooter>
        <BackButton href={"/auth/login"} label="로그인으로 이동" />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
