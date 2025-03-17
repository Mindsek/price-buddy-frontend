import { handleLogoutAction } from "@/app/api/auth/logout/logout";
import { LogOut } from "lucide-react";

export const SignOutButton = () => {
  return (
    <button
      className="flex items-center gap-2"
      onClick={() => handleLogoutAction()}
    >
      <LogOut />
      <span>Sign Out</span>
    </button>
  );
};
