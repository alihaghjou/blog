import { Database } from "@/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Edit from "./Edit";

export default async function page({params}: {params: {id : string}}) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) redirect("/login");
  
    const { data: postToEdit, error } = await supabase
      .from("posts")
      .select("name, content, id")
      .eq("id", params.id).limit(1).maybeSingle();

      if (!postToEdit) throw new Error(error?.message)

  return (
    <Edit postToEdit={postToEdit} />
  )
}
