"use client";

import { useState } from "react";
import { updatePost } from "./editPostFunc";
import { useFormStatus } from "react-dom";

type postToEditType = {
  content: string;
  name: string;
  id: number;
};

export default function Edit({ postToEdit }: { postToEdit: postToEditType }) {
  const updatePostId = updatePost.bind(null, postToEdit.id);
  const [PostToEditName, setPostToEditName] = useState(postToEdit.name);
  const [PostToEditContent, setPostToEditContent] = useState(
    postToEdit.content
  );
  return (
    <main className="flex-1 flex flex-col w-full px-8 justify-center gap-2 py-3">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={updatePostId}
      >
        <label className="text-md" htmlFor="title">
          Title To Update
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 focus-within:outline-none focus-within:ring-green-500 focus-within:border-green-500"
          name="name"
          value={PostToEditName}
          onChange={(e) => setPostToEditName(e.target.value)}
          placeholder="example"
          required
          max={10}
        />
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your message To Update
        </label>
        <textarea
          value={PostToEditContent}
          onChange={(e) => setPostToEditContent(e.target.value)}
          name="content"
          id="message"
          rows={15}
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border focus-within:outline-none border-gray-300 focus-within:ring-green-500 focus-within:border-green-500"
          placeholder="Write your thoughts here..."
          required
        />

        <SubmitButton />
      </form>
    </main>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="disabled:bg-blue-500 disabled:text-blue-200 disabled:ring-0 hover:bg-green-500 hover:text-green-100 ring-1 ring-green-500 rounded px-4 py-2 my-4 mb-6 self-center"
    >
      {pending ? "Sending Post" : "Send Post"}
    </button>
  );
}
