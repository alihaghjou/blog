"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toolpit from "./Toolpit";

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
    <Toolpit text="delete">
    <button onClick={deletePost} disabled={isDeleting}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16px"
        height="16px"
      >
        <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z" />
      </svg>
    </button></Toolpit>
  );
}
