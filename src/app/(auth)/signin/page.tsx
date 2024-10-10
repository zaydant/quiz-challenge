"use client";

import { SigninForm } from "@/app/components/forms/SigninForm";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function SignInPage() {
    const { user, token } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (user && token) {
      router.push('/')
    }
  }, [user, token, router])
    return (
        <div className="w-full min-h-screen flex items-center justify-center poppins">
            <SigninForm />
    </div>
    )
  }