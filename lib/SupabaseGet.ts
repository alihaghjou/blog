import { Database } from "@/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const supabase = createServerComponentClient<Database>({ cookies });

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getPosts(limit?: number) {
  if (limit) {
    const { data: posts } = await supabase.from("posts").select().limit(limit);
    return posts;
  }
  const { data: posts } = await supabase.from("posts").select();
  return posts;
}

export async function getOnePost(PostId: string) {
  const { data: post, error } = await supabase
    .from("posts")
    .select()
    .eq("id", PostId)
    .limit(1)
    .maybeSingle();
  return { post, error };
}
