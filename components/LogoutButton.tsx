"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsloggingOut] = useState(false)

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async () => {
    setIsloggingOut(true)
    const log = await supabase.auth.signOut();
    setIsloggingOut(false)
    router.push("/");
    router.refresh();
  };

  return (
    <button
      className="ring-1 ring-green-500 rounded px-4 py-2 hover:bg-green-500 hover:text-green-100"
      onClick={signOut}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? <span>Loading...</span> : <span>Logout</span>}
    </button>
  );
}
