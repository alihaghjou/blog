"use client";

import LoadingSpin from "@/public/LoadingSpin";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PostComment({
  id,
  comments,
  userId,
}: {
  id: string;
  comments: { comment: string; user_id: string }[] | null;
  userId: string;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isPosting, setIsPosting] = useState(false);
  const { register, handleSubmit, reset } = useForm<{
    message: string;
  }>();

  async function sendComment(data: { message: string }) {
    setIsPosting(true);
    let commentsToUpdate;
    if (comments !== null) {
      commentsToUpdate = [
        ...comments,
        { comment: data.message, user_id: userId },
      ];
    } else {
      commentsToUpdate = [{ comment: data.message, user_id: userId }];
    }
    const { status, error } = await supabase
      .from("posts")
      .update({
        comments: commentsToUpdate,
        updated_at: new Date().toDateString(),
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    if (status === 204) {
      reset();
      setIsPosting(false);
      router.refresh();
    }
  }
  return (
    <main className="flex-1 flex flex-col w-full px-8 justify-center gap-2 py-3">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        onSubmit={handleSubmit(sendComment)}
      >
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your Comment
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border focus-within:outline-none border-gray-300 focus-within:ring-green-500 focus-within:border-green-500"
          placeholder="Write your thoughts here..."
          required
        />
        <button
          disabled={isPosting}
          className="disabled:bg-blue-500 disabled:text-blue-200 disabled:ring-0 hover:bg-green-500 hover:text-green-100 ring-1 ring-green-500 rounded px-4 py-2 my-4 mb-6 self-center"
          type="submit"
        >
          {isPosting ? (
            <span className="flex items-center justify-center">
              <LoadingSpin />
              Posting...
            </span>
          ) : (
            <span>Send Comment</span>
          )}
        </button>
      </form>
    </main>
  );
}
