import { auth, signOut } from "@/auth";

const Page = async () => {
  const session = await auth();

  console.log("session", session);

  return (
    <div>
      {JSON.stringify(session, null, 2)}

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default Page;
