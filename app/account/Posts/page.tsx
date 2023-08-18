import Toolpit from "@/components/Toolpit";
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
            <Toolpit text="edit">
            <Link href={`/account/Posts/${post.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-icon"
                style={{width: "1em", height: "1em",verticalAlign: "middle",fill: "currentColor",overflow: "hidden"}}
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
                <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
              </svg>
            </Link>
            </Toolpit>
          </div>
        </div>
      ))}
    </main>
  );
}
