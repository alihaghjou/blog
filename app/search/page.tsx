import { Database } from "@/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
export default async function page({
  searchParams,
}: {
  searchParams: { title: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase
    .from("posts")
    .select()
    .ilike("name", `%${searchParams.title}%`);
  return (
    <main className="m-auto md:w-4/5 lg:w-3/4 w-full min-h-screen animate-in relative">
      <p className="text-center text-xl">
        Found <span className="font-semibold text-2xl">{data?.length}</span>{" "}
        Post for{" "}
        <span className="font-semibold text-2xl">{searchParams.title}</span>
      </p>
      {data?.map((post) => (
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
  );
}
