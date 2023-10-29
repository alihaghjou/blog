"use server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Database } from "@/supabase";
export async function updatePost(PostId: number, formData: FormData) {
    const supabase = createServerComponentClient<Database>({cookies})
    const name = formData.get("name")
    const content = formData.get("content")
    const { data: edit, error } = await supabase
      .from("posts")
      .update({
        name: name,
        content: content,
        updated_at: new Date().toDateString(),
      })
      .eq("id", PostId)
      .select();
    if (!error) {
      redirect(`/${edit[0].id}`)
    }
  }