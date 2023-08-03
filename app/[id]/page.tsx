import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { postType } from "../page";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

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

  return <main className="m-auto w-3/4 min-h-screen">{post.name}</main>;
}
