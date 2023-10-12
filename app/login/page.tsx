"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingSpin from "@/public/LoadingSpin";
import Alert from "@/components/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    checkLogged();
  }, []);

  const openAlert = (status: string) => {
    if (status === "success") {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } else if (status === "error") {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    }
  };

  const checkLogged = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) router.push("/account");
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    checkLogged()
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsLoading(false)
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    checkLogged()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false)
    if (error) {
      openAlert("error");
    }
    if (data.user !== null) {
      openAlert("success");
      router.push("/account");
      router.refresh();
    }
  };

  return (
    <main className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {view === "check-email" ? (
        <p className="text-center text-foreground">
          Check <span className="font-bold">{email}</span> to continue signing
          up
        </p>
      ) : (
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
          {view === "sign-in" && (
            <>
              <button
                className="bg-green-700 rounded px-4 py-2 text-white mb-6 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpin />
                    Signing In...
                  </span>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
              <p className="text-sm text-center">
                Don't have an account?
                <button
                  className="ml-1 underline"
                  onClick={() => setView("sign-up")}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          )}
          {view === "sign-up" && (
            <>
              <button
                className="bg-green-700 rounded px-4 py-2 text-white mb-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpin />
                    Signing Up...
                  </span>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
              <p className="text-sm text-center">
                Already have an account?
                <button
                  className="ml-1 underline"
                  onClick={() => setView("sign-in")}
                >
                  Sign In Now
                </button>
              </p>
            </>
          )}
        </form>
      )}
      {isError && <Alert state="error" message="Change Few Things And Try" />}
      {isSuccess && <Alert state="success" message="Welcome To Your Account!" />}
    </main>
  );
}
