"use client";
import { useForm } from "react-hook-form";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "@/supabase";

export default function Post({user}: {user: User}) {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>();

  const { register, handleSubmit, reset } = useForm<{
    title: string;
    content: string;
  }>();

  async function createPost(data: { title: string; content: string }) {
    const send = await supabase
      .from("posts")
      .insert({ name: data.title, content: data.content, user_id: user?.id })
      .select();
    if (send.status === 201) {
      reset()
      router.push("/")
    }
  }
  return (
    <main className="flex-1 flex flex-col w-full px-8 justify-center gap-2 py-3">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        onSubmit={handleSubmit(createPost)}
      >
        <label className="text-md" htmlFor="title">
          Title
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 focus-within:outline-none focus-within:ring-green-500 focus-within:border-green-500"
          {...register("title")}
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
        >
          Send Post
        </button>
      </form>
    </main>
  );
}
