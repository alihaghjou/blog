"use client";

import { useState } from "react";
import { postType } from "./page";

export default function UI({ serverData }: { serverData: postType[] }) {
  const [posts, setPosts] = useState(serverData);

  function handleClick() {
    setPosts([
      ...posts,
      {
        id: 1000,
        name: "test reject",
        content: "nothing",
        inserted_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
      },
    ]);
    const promise = new Promise((_, reject) => {
      setTimeout(() => {
        console.log("first");
        reject("Now");
      }, 5000);
    });
    promise.catch(() => {
      console.log("error part");
      setPosts(serverData);
    });
  }

  return (
    <main className="m-auto md:w-4/5 lg:w-3/4 w-full min-h-screen animate-in relative">
      <button onClick={() => handleClick()}>Add</button>
      {posts?.map((post) => (
        <article key={post.id} className="border-b p-6 flex flex-col gap-3">
          <h1 className="text-2xl font-bold py-2 capitalize">{post.name}</h1>
          <h2 className="text-sm text-gray-600 py-2">
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(post.updated_at).toDateString()}
          </h2>
          <p className="line-clamp-2 indent-2 leading-6">{post.content}</p>
        </article>
      ))}
    </main>
  );
}
