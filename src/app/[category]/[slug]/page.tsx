import prisma from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: {
    category: string;
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const { slug, category } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });
  const postCategory = await prisma.category.findUnique ({
    where: {
      slug: category,
    }
  })
  if (!post || !postCategory) {
    notFound();
  }
  return (
    <>
      <main>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </main>
    </>
  );
}
