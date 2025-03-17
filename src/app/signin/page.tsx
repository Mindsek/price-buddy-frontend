"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="w-full"
              >
                Se connecter avec GitHub <FaGithub />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
