import { Button } from "@/components/ui/button";
import Link from "next/link";
import AppLayout from "./(app)/layout";

const NotFound = () => {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <h1 className="lg:text-4xl text-2xl font-bold text-center">
          Cette page n&apos;existe pas
        </h1>
        <Link href="/dashboard">
          <Button>Retour à la page d&apos;accueil</Button>
        </Link>
      </div>
    </AppLayout>
  );
};

export default NotFound;
