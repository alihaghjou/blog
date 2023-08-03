'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button
    className="ring-1 ring-green-500 rounded px-4 py-2 hover:bg-green-500 hover:text-green-100"
      onClick={signOut}
    >
      Logout
    </button>
  )
}
