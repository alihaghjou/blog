"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
};

export default function DeleteComment({
  commentToDelete,
  comments,
  postId,
}: deleteCommentPropType) {
  const supabase = createClientComponentClient();

  async function handleDeleteComment() {
    const d = [...comments];
    const f = d.filter(
      (i) =>
        i.comment !== commentToDelete.comment &&
        i.user_id !== commentToDelete.user_id
    );
    const { error } = await supabase
      .from("posts")
      .update({ comments: f, updated_at: new Date().toDateString() })
      .eq("id", postId);
    console.log(error);
    console.log(f);
  }
  return <div onClick={() => handleDeleteComment()}><TrashIcon height={20} /></div>;
}
