import Link from "next/link";
import prisma from "@/lib/db";
import Header from "@/components/Header";

export default async function PostsPage() {
  const [latestPosts, postCount] = await Promise.all([
    prisma.post.findMany({
      where: {
        // published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        Category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      take: 10,
    }),
    prisma.post.count(),
  ]);

  return (
    <>
      <Header />
      <main className="w-full">
        <div className="wrapper">
          <h2 className="">All Posts ({postCount})</h2>
          <ul>
            {latestPosts.map((post) => (
              <li key={post.slug}>
                  <Link href={`/${post.Category.slug}/${post.slug}`}>
                    {post.title}
                  </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
