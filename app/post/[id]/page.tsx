import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowLeft, Clock } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

async function getPost(id: string) {
  const post = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  });

  if (!post) {
    return notFound();
  }
  return post;
}

type params = Promise<{ id: string }>;

export default async function PostPage({ params }: { params: params }) {
  const { id } = await params;
  const data = await getPost(id);

  // Sanitize HTML content
  const sanitizedContent = DOMPurify.sanitize(data.content, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "img",
      "code",
      "pre",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
      "span",
      "div",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "id",
      "style",
      "target",
      "rel",
      "width",
      "height",
    ],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
  });

  // Calculate estimated reading time (strip HTML for accurate word count)
  const wordsPerMinute = 200;
  const textContent = data.content.replace(/<[^>]*>/g, ""); // Remove HTML tags
  const wordCount = textContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative">
        {/* Back Button - Floating */}
        <div className="absolute top-8 left-4 z-20">
          <Link
            href="/"
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
              className:
                "backdrop-blur-md bg-card/80 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105",
            })}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Posts
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative h-[70vh] overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <Badge
                variant="secondary"
                className="mb-4 bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm"
              >
                Blog Post
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl bg-white/40 lg:text-6xl font-bold tracking-tight mb-6 text-foreground drop-shadow-lg">
                {data.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full px-4 py-2 border border-border/50">
                  <div className="relative w-8 h-8 overflow-hidden rounded-full ring-2 ring-primary/30">
                    <Image
                      src={data.authorImage}
                      alt={data.authorName}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium text-foreground">
                    {data.authorName}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full px-4 py-2 border border-border/50">
                  <CalendarDays className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(data.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full px-4 py-2 border border-border/50">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    {readingTime} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Content Card */}
          <Card className="backdrop-blur-md bg-card/80 border border-border/50 shadow-2xl shadow-primary/5">
            <CardContent className="p-8 md:p-12">
              {/* Article Content */}
              <div className="prose-content max-w-none">
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-primary/30">
                      <Image
                        src={data.authorImage}
                        alt={data.authorName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Written by {data.authorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Published on{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(data.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Share Button */}
                  <button className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full border border-primary/30 transition-all duration-200 hover:scale-105">
                    Share Article
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "bg-card/50 backdrop-blur-md border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 hover:scale-105",
              })}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
