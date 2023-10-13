"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Delete({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const deletePost = async () => {
    setIsDeleting(true);
    const data = await supabase.from("posts").delete().eq("id", id).select();
    setIsDeleting(false);
    router.replace("/");
    return data;
  };
  return (
    <button onClick={deletePost} disabled={isDeleting}>
      <TrashIcon height={35} />
    </button>
  );
}
