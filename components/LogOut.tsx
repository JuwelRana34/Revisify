"use client";
import { account } from "@/lib/appwriteClient";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";


export default function LogOutBtn() {
  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // deletes the current session
      toast.error("Logged out successfully");
      // optionally redirect user
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <Button variant="destructive" onClick={handleLogout}>
      <LogOut/> Logout
    </Button>
  );
}
