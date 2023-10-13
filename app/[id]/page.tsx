import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Delete from "../../components/delete";
import { Database } from "@/supabase";
import CommentSection from "./(Comment)/CommentSection";
//Line break doesn't work
export default async function Index({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user: loggedUser },
  } = await supabase.auth.getUser();

  const { data: post, error } = await supabase
    .from("posts")
    .select()
    .eq("id", params.id)
    .limit(1)
    .maybeSingle();
  if (error || !post) throw new Error(error?.message);
  console.log(post.content.replace("\n", "<br/>"));

  return (
    <main className="m-auto md:w-4/5 lg:w-3/4 w-full min-h-screen animate-in">
      <article className="border-b p-6 flex flex-col gap-3 h-full">
        <h1 className="text-2xl font-bold py-2 capitalize flex gap-3 items-center">
          {post.name}
          {loggedUser?.id === post.user_id && <Delete id={post.id} />}
        </h1>
        <h2 className="text-sm text-gray-600 py-2">
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(post.inserted_at).toDateString()}
        </h2>
        <h2 className="text-sm text-gray-600 py-2">
          <span className="font-semibold">Updated At:</span>{" "}
          {new Date(post.updated_at).toDateString()}
        </h2>
        <p
          className="indent-2 leading-6 text-justify"
          style={{ textJustify: "inter-word" }}
        >
          {post.content.replace(/\\n/g, "\n")}
        </p>
      </article>
      <CommentSection
        loggedUser={loggedUser}
        paramsId={params.id}
        post={post}
      />
    </main>
  );
}
