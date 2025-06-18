import prisma from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });
  if (!post) {
    notFound();
  }
  return (
    <>
      <main>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </main>
    </>
  );
}
