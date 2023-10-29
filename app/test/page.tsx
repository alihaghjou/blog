import { sortPostsByDate } from "@/lib/usefulFunc";
import { Database } from "@/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import UI from "./UI";
import { getUser } from "./Testing";

export type postType = {
  id: number;
  inserted_at: string;
  updated_at: string;
  name: string;
  content: string;
};
export default async function Index() {

  const d = await getUser()
  console.log(d)
  return (
      <>{d ? <>{d.email}</>: <>You Can't see</>}</>
  );
}

