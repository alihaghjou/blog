import LogoutButton from "@/components/LogoutButton";
import Delete from "@/components/delete";
import { sortPostsByDate } from "@/lib/usefulFunc";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
//Show how many posts they have
export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

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
    <main className="m-auto lg::w-3/4 md:w-4/5 w-full px-2 min-h-screen anime-in flex flex-col gap-5 pt-3 text-xl">
      <h1 className="text-center flex gap-4 justify-center items-center w-full flex-wrap">
        Hey, <span className="font-semibold">{user.email}</span>
        <LogoutButton />
      </h1>
      <div className="bg-green-500 text-green-100 rounded md:w-1/3 w-1/2 p-4">
        <p>You Have Uploaded:</p>{" "}
        <p className="text-4xl text-end mr-4 mt-3">
          {userPosts.length} <span className="text-sm">Posts</span>
        </p>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUserPosts.map((post) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={post.id}>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <Link href={`/${post.id}`} className="capitalize">
                    {post.name}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  {new Date(post.updated_at).toDateString()}
                </td>
                <td className="flex items-center gap-4 text-lg px-6 py-4">
                  <Delete id={post.id} />
                  <Link href={`/account/editPost/${post.id}`}>
                    <PencilSquareIcon height={35} />
                  </Link>
                </td>
              </tr>
            ))}
            <tr className="text-center">
              <td colSpan={3} className="px-6 py-4">
                <center>
                  <Link href="/account/addPost">
                    <PlusIcon height={40} />
                  </Link>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
