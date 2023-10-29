"use server"

import { Database } from "@/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function sendComment(comments, id: string, userId: string, formData: FormData) {
    const supabase = createServerComponentClient<Database>({cookies})
    const message = formData.get("message")
    let commentsToUpdate;
    if (comments !== null) {
      commentsToUpdate = [
        ...comments,
        { comment: message, user_id: userId },
      ];
    } else {
      commentsToUpdate = [{ comment: message, user_id: userId }];
    }
    const { status, error } = await supabase
      .from("posts")
      .update({
        comments: commentsToUpdate,
        updated_at: new Date().toDateString(),
      })
      .eq("id", id);
    if (status === 204) {
      revalidatePath(`/${id}`)
      redirect(`/${id}`)
    }
  }
