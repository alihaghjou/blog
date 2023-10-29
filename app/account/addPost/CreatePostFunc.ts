"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Database } from "@/supabase";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const content = formData.get("content");
  const title = formData.get("title");
  if (content === null || title === null) return;
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(content.replaceAll("\n", "<brrr/>"));
  const send = await supabase
    .from("posts")
    .insert({ name: title, content: content, user_id: user?.id, comments: [] })
    .select();
  if (send.status === 201) {
    revalidatePath("/");
    redirect("/");
  }
}
