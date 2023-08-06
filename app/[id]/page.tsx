import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Delete from "./delete";
import { Database } from "@/supabase";

export default async function Index({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post, error } = await supabase
    .from("posts")
    .select()
    .eq("id", params.id)
    .limit(1)
    .maybeSingle();

  if (error || !post) throw new Error(error?.message);

  return (
    <main className="m-auto md:w-4/5 lg:w-3/4 w-full min-h-screen">
      <article className="border-b p-6 flex flex-col gap-3 h-full">
        <h1 className="text-2xl font-bold py-2 capitalize">
          {post.name}
          {user?.id === post.user_id && <Delete id={post.id} />}
        </h1>
        <h2 className="text-sm text-gray-600 py-2">
          {new Date(post.inserted_at).toDateString()}
        </h2>
        <p
          className="indent-2 leading-6 text-justify"
          style={{ textJustify: "inter-word" }}
        >
          {post.content}
        </p>
      </article>
    </main>
  );
}
