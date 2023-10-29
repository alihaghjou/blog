"use client";

import Alert from "@/components/Alert";
import { sendComment } from "./PostCommentFunc";
import { SubmitButton } from "@/components/SubmitButton";

type PostCommentPropType = {
  id: string;
  comments: { comment: string; user_id: string }[] | null;
  userId: string;
  AlertHook: {
    state: string;
    open: boolean;
    message: string;
  };
  setAlert: React.Dispatch<
    React.SetStateAction<{
      state: string;
      open: boolean;
      message: string;
    }>
  >;
};

export default function PostComment({
  id,
  comments,
  userId,
  AlertHook,
  setAlert,
}: PostCommentPropType) {

  const sendCommentWith = sendComment.bind(null, comments, id, userId);
  return (
    <main className="flex-1 flex flex-col w-full px-8 justify-center gap-2 py-3">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={sendCommentWith}
      >
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your Comment
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border focus-within:outline-none border-gray-300 focus-within:ring-green-500 focus-within:border-green-500"
          placeholder="Write your thoughts here..."
        />
        <SubmitButton text="Send Comment" />
      </form>
      {AlertHook.open && (
        <Alert state={AlertHook.state} message={AlertHook.message} />
      )}
    </main>
  );
}

