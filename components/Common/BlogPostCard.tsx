import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

interface IappProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function BlogPostCard({ data }: IappProps) {
  // Strip HTML tags and get plain text for description
  const getPlainTextDescription = (htmlContent: string): string => {
    // First sanitize the HTML
    const sanitizedContent = DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    });

    // Remove any remaining HTML entities and extra whitespace
    const plainText = sanitizedContent
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();

    // Truncate to approximately 2 lines (around 120-140 characters)
    const maxLength = 130;
    if (plainText.length <= maxLength) {
      return plainText;
    }

    // Find the last space before the max length to avoid cutting words
    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  const description = getPlainTextDescription(data.content);

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-md transition-all hover:shadow-lg hover:shadow-primary/10">
      <Link href={`/post/${data.id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5">
          <h3 className="mb-3 text-lg font-semibold text-foreground leading-tight line-clamp-2">
            {data.title}
          </h3>

          <p className="mb-4 text-sm text-muted-foreground leading-relaxed h-10 overflow-hidden">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative size-8 overflow-hidden rounded-full ring-2 ring-primary/20">
                <Image
                  src={data.authorImage}
                  alt={data.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium text-foreground">
                {data.authorName}
              </p>
            </div>

            <time className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(data.createdAt)}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
}
