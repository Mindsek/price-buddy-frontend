"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      Hello
      <div>
        {session?.user?.name ? (
          <button onClick={() => signOut()}>Se déconnecter</button>
        ) : (
          <button onClick={() => signIn("github")}>Se connecter</button>
        )}
      </div>
    </div>
  );
}
