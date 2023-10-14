"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type deleteCommentPropType = {
  commentToDelete: {
    comment: string;
    user_id: string;
  };
  comments: {
    comment: string;
    user_id: string;
  }[];
  postId: string;
  setAlert: React.Dispatch<
    React.SetStateAction<{
      state: string;
      open: boolean;
      message: string;
    }>
  >;
};

export default function DeleteComment({
  commentToDelete,
  comments,
  postId,
  setAlert,
}: deleteCommentPropType) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function handleDeleteComment() {
    const f = [...comments].filter(
      (i) => i.comment !== commentToDelete.comment
    );
    const { error } = await supabase
      .from("posts")
      .update({ comments: f, updated_at: new Date().toDateString() })
      .eq("id", postId);
    if (error) throw new Error(error.message);
    setAlert({
      message: "Comment Deleted Successfully",
      open: true,
      state: "success",
    });
    router.refresh();
    setTimeout(() => {
      setAlert({
        message: "",
        open: false,
        state: "",
      });
    }, 3000);
  }
  return (
    <div onClick={() => handleDeleteComment()} className="hover:cursor-pointer">
      <TrashIcon height={20} />
    </div>
  );
}
