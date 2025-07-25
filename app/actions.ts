"use server";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation"
export async function handlesubmission(formData: FormData) {
 const {getUser}= getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register")
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const ImageUrl = formData.get("imageUrl");
   await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imageUrl: ImageUrl as string,
      authorId: user.id as string,
      authorName: user.given_name as string,
      authorImage: user.picture as string,

    },
  });
   return redirect('/dashboard');
}
