"use client";

import { account } from "@/lib/appwriteClient";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
 // You can create an icons file or use lucide-react directly
import LogOutBtn from "./LogOut";
import { LogInIcon, MenuIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export default function NavBar() {
  const router = useRouter();
  const [isUser, setIsUser] = useState<boolean>();
   const pathname = usePathname()
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setIsUser(!!user.$id);
      } catch {
        setIsUser(false);
      }
    };
    getUser();
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="bg-black/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => router.push("/")}
          >
            Revisify
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Button
                key={link.title}
                variant="ghost"
                className={` font-medium  ${pathname === link.path?"bg-blue-50 text-black ":"text-white"}`}
                onClick={() => router.push(link.path)}
              >
                {link.title}
              </Button>
            ))}

            {isUser ? <LogOutBtn /> : <Link href="/login"><Button> <LogInIcon/> Login</Button></Link>}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="p-2 rounded-md">
                  <MenuIcon/>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <h1 className="text-3xl font-semibold text-gray-700 mx-auto mt-2">Revisify</h1>
                <Separator/>
                <nav className="flex flex-col gap-4  mt-2">
                  {navLinks.map((link) => (
                    <Button asChild
                      key={link.title}
                      variant="ghost"
                       className={` font-medium  ${pathname === link.path?"text-blue-500 bg-blue-100 ":"text-black"}`}
                    >
                      <Link href={link.path}>{link.title} </Link>
                    </Button>
                  ))}
                  {isUser ? <LogOutBtn /> : <Link href="/login"><Button className="w-full">Login</Button></Link>}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
