"use client";
import { useFormStatus } from "react-dom";
import { createPost } from "./CreatePostFunc";
import { SubmitButton } from "@/components/SubmitButton";

export default function Post() {
  return (
    <main className="flex-1 flex flex-col w-full px-8 justify-center gap-2 py-3">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={createPost}
      >
        <label className="text-md" htmlFor="title">
          Title
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 focus-within:outline-none focus-within:ring-green-500 focus-within:border-green-500"
          name="title"
          placeholder="example"
          required
          max={10}
        />

        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your message
        </label>
        <textarea
          name="content"
          id="message"
          rows={15}
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border focus-within:outline-none border-gray-300 focus-within:ring-green-500 focus-within:border-green-500"
          placeholder="Write your thoughts here..."
          required
        />
        <SubmitButton text="Send Post" />
      </form>
    </main>
  );
}
