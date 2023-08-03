import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { cookies } from 'next/headers'
import Link from 'next/link';

export type postType = {
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

  const {data: posts}: PostgrestSingleResponse<postType[]> = await supabase.from("posts").select().limit(10)

  return (
      <main className='m-auto w-3/4 min-h-screen'>
      {posts?.map((post) => (
        <article key={post.id} className="border-b p-6 flex flex-col gap-3">
          <h1 className='text-2xl font-bold py-2 capitalize'>{post.name}</h1>
          <h2 className='text-sm text-gray-600 py-2'><span className='font-semibold'>Created At:</span> {new Date(post.inserted_at).toDateString()}</h2>
          <p className="line-clamp-2 indent-2 leading-6">{post.content}</p>
          <Link className='self-end' href={`/${post.id}`}><button className='text-cyan-800 ring-1 ring-cyan-300 rounded py-2 px-4  hover:bg-cyan-400 hover:text-white'>Continue Reading</button></Link>
        </article>
      ))}
    </main>
  )
}
