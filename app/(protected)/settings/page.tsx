import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();

  return <div>{JSON.stringify(session, null, 2)}</div>;
};

export default Page;
