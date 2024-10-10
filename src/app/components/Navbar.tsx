"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, LogOut, LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const { user, logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto w-full md:w-2/3 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" icon={<HomeIcon className="w-4 h-4" />}>
            Hi, {user?.username}
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <LoginButton user={user} logout={logout} />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function LoginButton({
  user,
  logout,
}: {
  user: any;
  logout: () => void;
}) {
  return user ? (
    <Button
      variant="outline"
      onClick={logout}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  ) : (
    <Button
      variant="outline"
      className="flex items-center gap-2"
    >
      <LogIn className="h-4 w-4" />
      <Link href="/login">Login</Link>
    </Button>
  );
}
