import { UserIcon, HomeIcon } from "@heroicons/react/24/outline";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className="flex items-center justify-between w-full p-6 mx-2 border-b">
      <Link href={"/"}>
        <HomeIcon height={35} />
      </Link>

      {user ? (
        <div className="flex gap-3 items-center">
          <Link href="/account">
            <UserIcon height={35} />
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <button className="ring-1 ring-green-500 rounded px-4 py-2 hover:bg-green-500 hover:text-green-100">
            Login
          </button>
        </Link>
      )}
    </header>
  );
}
