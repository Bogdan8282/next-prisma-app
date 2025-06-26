import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function Header() {
  const categories = await prisma.category.findMany();
  return (
    <header className="w-full">
      <div className="wrapper px-6 py-6">
        <div className="flex justify-between items-center">
        <h1 className="logo">&lt;/&gt; CodeCraft</h1>
        </div>
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
};
