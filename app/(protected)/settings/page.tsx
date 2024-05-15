// "use client"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await getServerSession(authOptions);
  // const session = useSession();
  console.log("sss", session);

  if (!session) {
    redirect('/login')
  }

  return <div>
    {/* name: {session?.user?.name} */}
    name: {session?.user?.name}
    {/* <form action={async () => {
      "use server"
      await signOut();
    }}>
      <button>Sign Out</button>
    </form> */}
    </div>;
};

export default Settings;
