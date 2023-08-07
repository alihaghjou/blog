import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="m-auto lg::w-3/4 md:w-4/5 w-full px-2 min-h-screen anime-in flex flex-col gap-5 pt-3 text-xl">
      <h1 className="text-center">
        Hey, <span className="font-semibold">{user.email}</span> 
      </h1>
      <Link href="/account/Posts" className="flex gap-2 hover:gap-6">
        <Image src={"/rightArrow.svg"} width={25} height={25} alt="arrow" />
        <button>Your Posts</button>
      </Link>
      <hr />
      <Link href="/account/addPost" className="flex gap-2 hover:gap-6">
        <Image src={"/rightArrow.svg"} width={25} height={25} alt="arrow" />
        <button>Add a Post</button>
      </Link>
    </main>
  )
}
