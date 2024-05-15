import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log('sss',session);
  
  return (
    <div>Home</div>
  );
}
