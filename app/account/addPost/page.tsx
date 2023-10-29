import Post from "./Post";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/SupabaseGet";

export default async function Login() {
  const user = await getUser()

  if (!user) redirect("/login");

  return <Post />;
}
