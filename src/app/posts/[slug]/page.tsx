import prisma from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function PostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!post) {
    notFound();
  }
  return (
    <>
      <main>
        <h1>{post?.title}</h1>
        <p>{post?.content}</p>
      </main>
    </>
  );
}
