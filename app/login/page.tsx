"use client";

import { account } from "@/lib/appwriteClient";
import { OAuthProvider } from "appwrite";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    account
      .get()
      .then(() => router.push("/dashboard"))
      .catch(() => {});
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        https://revisifybd.netlify.app/dashboard,
        `https://revisifybd.netlify.app/login,
      );
      
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Revisify</h1>
          <p className="text-gray-500 mb-8">Smart revision tracker for efficient studying</p>

          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl shadow-md transition"
          > 
          <LogIn/> Login
          </Button>

          <p className="text-gray-400 text-sm mt-6">Powered by MD.JuwelRana</p>
        </div>
      </motion.div>
    </div>
  );
}
