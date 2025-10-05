"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loader from "@/app/utils/Loader";
import { useState, useTransition } from "react";
import { axiosInstance } from "@/app/utils/axios";
import { toast } from "sonner";
import { revalidateBlogs } from "@/app/actions/blogActions";

export type BlogFormValues = {
  title: string;
  content: string;
  image?: string;
};

export default function CreateBlog() {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  const onSubmit = async (data: BlogFormValues) => {
    if (!file) return;
    try {
      const formdata = new FormData();
      formdata.append("file", file!);
      formdata.append("title", data.title);
      formdata.append("content", data.content);

      startTransition(async () => {
        const response = await axiosInstance.post(
          "/blog/create-blog",
          formdata
        );
        if (response.data.success) {
          toast.success(
            <h1 className="text-center">{response.data.message}</h1>
          );
          revalidateBlogs();
          form.reset();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(<h1 className="text-center">Failed to add new blog</h1>);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-32 p-6 bg-white rounded shadow-md shadow-gray-300">
      <h2 className="text-2xl font-semibold mb-6">Create a Blog</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            rules={{ required: "Title is required" }}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            rules={{ required: "content is required" }}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your blog content..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            rules={{ required: "Blog Image is required" }}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      setFile(e.target.files?.[0] || null);
                      field.onChange(e);
                    }}
                    type="file"
                    accept="image/*"
                    placeholder="https://example.com/image.jpg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            type="submit"
            className="w-full cursor-pointer"
          >
            {isPending ? <Loader /> : "Publish Blog"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
