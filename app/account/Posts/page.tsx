import Delete from "@/components/delete";
import { sortPostsByDate } from "@/lib/usefulFunc";
import { Database } from "@/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: userPosts } = await supabase
    .from("posts")
    .select()
    .eq("user_id", user.id);

  if (!userPosts) return <div>You have no Post</div>;
  const sortedUserPosts = sortPostsByDate(userPosts);

  return (
    <main className="m-auto md:w-4/5 lg:w-3/4 w-full pt-4 min-h-screen flex flex-col gap-4 text-2xl font-semibold">
      {sortedUserPosts.map((post) => (
        <div
          className="border-b py-4 px-2 flex justify-between items-center"
          key={post.id}
        >
          <Link href={`/${post.id}`} className="capitalize">
            {post.name}
          </Link>
          <div className="flex items-center justify-center gap-4 text-lg">
            <Delete id={post.id} />
            <Link href={`/account/Posts/${post.id}`}>Edit</Link>
          </div>
        </div>
      ))}
    </main>
  );
}
