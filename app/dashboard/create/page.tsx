"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handlesubmission } from "@/app/actions";
import { SubmitButton } from "@/components/Common/SubmitButton";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import type { Editor as TinyMCEEditor } from "tinymce";

export default function Create() {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleFormSubmit = async (formData: FormData) => {
    // Get content from TinyMCE editor
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      formData.set("content", content);
    }

    // Call your existing server action
    await handlesubmission(formData);
  };

  return (
    <div>
      <Card className="max-w-4xl mx-auto mt-10 p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Post</CardTitle>
          <CardDescription>
            Write your thoughts and share with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={handleFormSubmit}>
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                name="title"
                required
                type="text"
                placeholder="Enter post title"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <div className="min-h-[400px]">
                <Editor
                  onInit={(_evt, editor) => {
                    editorRef.current = editor;
                  }}
                  apiKey={process.env.NEXT_PUBLIC_TinyMCE_API_KEY} // Replace with your actual TinyMCE API key
                  init={{
                    height: 400,
                    menubar: false,
                    // removed invalid readonly property
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    placeholder: "Start writing your blog post...",
                    branding: false,
                    setup: (editor) => {
                      editor.on("init", () => {
                        editor.setContent("");
                      });
                    },
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image URL</Label>
              <Input
                name="imageUrl"
                required
                type="text"
                placeholder="Enter image URL"
              />
            </div>

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
