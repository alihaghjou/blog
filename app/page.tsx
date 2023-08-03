import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

type postType = {
  id: number;
  inserted_at: string;
  updated_at: string;
  name: string;
  content: string;
}

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const {data: posts} = await supabase.from("posts").select()
  console.log(posts)

  return (
      <main className='m-auto w-3/4 min-h-screen'>
      {posts?.map((post: postType) => (
        <article key={post.id} className="border-b p-6 flex flex-col gap-3">
          <h1 className='text-2xl font-bold py-2 capitalize'>{post.name}</h1>
          <h2 className='text-sm text-gray-600 py-2'>{post.inserted_at}</h2>
          <p className="line-clamp-2 indent-2 leading-6">{post.content}</p>
          <button className='text-cyan-800 ring-1 ring-cyan-300 rounded py-2 px-4 self-end hover:bg-cyan-400 hover:text-white'>Continue Reading</button>
        </article>
      ))}
    </main>
  )
}
