"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      Hello {session?.user?.name}
      <div>
        {session?.user?.name ? (
          <Button onClick={() => signOut()}>Se déconnecter</Button>
        ) : (
          <Button onClick={() => signIn("github")}>Se connecter</Button>
        )}
      </div>
    </div>
  );
}
