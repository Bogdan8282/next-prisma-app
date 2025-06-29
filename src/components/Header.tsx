import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default async function Header() {
  const categories = await prisma.category.findMany();
  return (
    <header className="w-full">
      <div className="wrapper px-6 py-6">
        <Link href="/" className="relative mb-4 flex justify-between items-center w-[240px] h-[38px]">
          <Image src="/icons/logo.svg" alt="logo" fill className="object-cover" />
        </Link>
        <div className="flex justify-between items-center">
          <ul>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
