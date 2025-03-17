"use server";

import { signOut } from "@/lib/auth";
export const handleLogoutAction = async () => {
  await signOut();
};
