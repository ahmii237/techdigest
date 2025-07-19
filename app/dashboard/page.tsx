import { BlogPostCard } from "@/components/Common/BlogPostCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

// Force dynamic rendering to avoid prerender build errors
export const dynamic = "force-dynamic";

async function fetchPosts(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const data = await fetchPosts(user.id);

  return (
    <div>
      <div className="flex items-center justify-between pmb-4">
        <h1 className="text-xl font-medium">Your All Articles</h1>
        <Link href="/dashboard/create" className={buttonVariants()}>
          Create Post
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <BlogPostCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
