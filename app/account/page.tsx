import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login")

  return (
    <main className="m-auto w-3/4 min-h-screen">
      Hey, {user.email}
      <Link href="/post"><button>Add a Post</button></Link>
    </main>
  );
}
