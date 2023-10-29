import Delete from "../../components/delete";
import CommentSection from "./(Comment)/CommentSection";
import { getOnePost, getUser } from "@/lib/SupabaseGet";
//Line break doesn't work
export default async function Index({ params }: { params: { id: string } }) {
  const loggedUser = await getUser();

  const { post, error } = await getOnePost(params.id);
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
