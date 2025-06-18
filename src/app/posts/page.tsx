import Link from "next/link";
import prisma from "@/lib/db";

export default async function PostsPage() {
  const [posts, postCount] = await Promise.all([
    prisma.post.findMany({
      where: {
        // published: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
      take: 10,
    }),
    prisma.post.count(),
  ]);

  return (
    <>
      <main>
        <h1>All Posts ({postCount})</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
