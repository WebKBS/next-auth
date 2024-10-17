"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const Social = () => {
  const handleClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      redirectTo: "/",
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className={"w-full"}
        variant={"outline"}
        onClick={() => handleClick("google")}
      >
        <FcGoogle className={"w-5 h-5"} />
      </Button>
      <Button
        size="lg"
        className={"w-full"}
        variant={"outline"}
        onClick={() => handleClick("github")}
      >
        <FaGithub className={"w-5 h-5"} />
      </Button>
    </div>
  );
};

export default Social;
