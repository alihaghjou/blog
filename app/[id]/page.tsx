import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { postType } from "../page";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import Delete from "./delete";

export default async function Index({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post, error }: PostgrestSingleResponse<postType | null> =
    await supabase
      .from("posts")
      .select()
      .eq("id", params.id)
      .limit(1)
      .maybeSingle();

  if (error || !post) throw new Error(error?.message);

  return (
    <main className="m-auto w-3/4 min-h-screen">
      <article className="border-b p-6 flex flex-col gap-3">
        <h1 className="text-2xl font-bold py-2 capitalize">
          {post.name}
          {user && (
            <Delete id={post.id} />
          )}
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
