import React from "react";
import Image from "next/image";
import Sidebar from "./components/Sidebar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="flex h-16 items-center justify-between bg-[#CBE8F9] px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={44}
            height={44}
            className="h-8 w-auto"
          />
          <div className="text-2xl font-bold text-gray-800">
            Mobile Shopping
          </div>
        </div>
        <Image
          src="/avatar.png"
          alt="Avatar"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border-2 border-white shadow-sm object-cover"
        />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
