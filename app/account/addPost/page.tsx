import Post from "./Post";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/SupabaseGet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Post",
  description: "Upload A New Post"
}

export default async function Login() {
  const user = await getUser()

  if (!user) redirect("/login");

  return <Post />;
}
