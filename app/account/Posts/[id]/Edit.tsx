"use client";

import LoadingSpin from "@/public/LoadingSpin";
import { Database } from "@/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type postToEditType = {
  content: string;
  id: number;
  inserted_at: string;
  name: string;
  updated_at: string;
  user_id: string;
};

export default function Edit({ postToEdit }: { postToEdit: postToEditType }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<postToEditType>();
  const router = useRouter();
  useEffect(() => {
    if (postToEdit) {
      setValue("name", postToEdit.name);
      setValue("content", postToEdit.content);
    }
  }, [postToEdit]);

  async function updatePost(data: postToEditType) {
    const supabase = createClientComponentClient<Database>();
    setIsLoading(true);
    const { data: edit, error } = await supabase
      .from("posts")
      .update({
        name: data.name,
        content: data.content,
        updated_at: new Date().toDateString(),
      })
      .eq("id", postToEdit.id)
      .select();
    setIsLoading(false);
    if (!error) {
      router.push(`/${edit[0].id}`);
    }
  }

  return (
    <main className="flex-1 flex flex-col w-full px-8 justify-center gap-2 py-3">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        onSubmit={handleSubmit(updatePost)}
      >
        <label className="text-md" htmlFor="title">
          Title To Update
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 focus-within:outline-none focus-within:ring-green-500 focus-within:border-green-500"
          {...register("name")}
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
          {...register("content")}
          id="message"
          rows={15}
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border focus-within:outline-none border-gray-300 focus-within:ring-green-500 focus-within:border-green-500"
          placeholder="Write your thoughts here..."
          required
        />
        <button
          className="hover:bg-green-500 hover:text-green-100 ring-1 ring-green-500 rounded px-4 py-2 my-4 mb-6 self-center"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <LoadingSpin />
              Updating...
            </span>
          ) : (
            <span>Update Post</span>
          )}
        </button>
      </form>
    </main>
  );
}
