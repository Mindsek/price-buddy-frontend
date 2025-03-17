import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
export const SignOutButton = () => {
  return (
    <button className="flex items-center gap-2" onClick={() => signOut()}>
      <LogOut />
      <span>Se déconnecter</span>
    </button>
  );
};
