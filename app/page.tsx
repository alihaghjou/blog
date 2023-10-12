import { sortPostsByDate } from "@/lib/usefulFunc";
import { Database } from "@/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Welcome from "./Welcome";

export type postType = {
  id: number;
  inserted_at: string;
  updated_at: string;
  name: string;
  content: string;
};
//TODO: add break line when user adds text
// add the ability to delete comment for the owner of the comment and the article
// if the comment is from the owner of the article make the comment background a little darker
// add date to comment
// fix the toolpit
// i think i need to do some refactoring too
export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  const { data: posts } = await supabase.from("posts").select().limit(10);
  if (!posts) return <div>No Post</div>;
  const sortedPosts = sortPostsByDate(posts);

  return (
    <>
      <main className="m-auto md:w-4/5 lg:w-3/4 w-full min-h-screen animate-in relative">
        <Welcome />
        {sortedPosts.map((post) => (
          <article key={post.id} className="border-b p-6 flex flex-col gap-3">
            <h1 className="text-2xl font-bold py-2 capitalize">{post.name}</h1>
            <h2 className="text-sm text-gray-600 py-2">
              <span className="font-semibold">Updated At:</span>{" "}
              {new Date(post.updated_at).toDateString()}
            </h2>
            <p className="line-clamp-2 indent-2 leading-6">{post.content}</p>
            <Link className="self-end" href={`/${post.id}`}>
              <button className="text-cyan-800 ring-1 ring-cyan-300 rounded py-2 px-4  hover:bg-cyan-400 hover:text-white">
                Continue Reading
              </button>
            </Link>
          </article>
        ))}
      </main>
    </>
  );
}
