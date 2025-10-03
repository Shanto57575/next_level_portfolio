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
import { useEffect, useState, useTransition } from "react";
import { axiosInstance } from "@/app/utils/axios";
import { toast } from "sonner";
import { revalidateBlogs } from "@/app/actions/blogActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { IBlog } from "@/types/blog.interface";
import Image from "next/image";

type BlogFormValues = {
  title: string;
  content: string;
  image?: string;
};

interface EditBlogDialogProps {
  blog: IBlog;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditBlogDialog({
  blog,
  open,
  onOpenChange,
}: EditBlogDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<BlogFormValues>({
    defaultValues: {
      title: blog.title,
      content: blog.content,
      image: blog.image || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: blog.title,
        content: blog.content,
        image: blog.image || "",
      });
      setFile(null);
    }
  }, [open, blog.title, blog.content, blog.image, form]);

  const onSubmit = async (data: BlogFormValues) => {
    try {
      const formdata = new FormData();
      if (file) formdata.append("file", file);
      if (data.title) formdata.append("title", data.title);
      if (data.title) formdata.append("content", data.content);

      startTransition(async () => {
        const response = await axiosInstance.put(`/blog/${blog.id}`, formdata);
        if (response.data.success) {
          toast.success(
            <h1 className="text-center">{response.data.message}</h1>
          );
          revalidateBlogs();
          form.reset();
          onOpenChange(false);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(<h1 className="text-center">Failed to update blog</h1>);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>
            Make changes to your blog here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              rules={{ required: "Content is required" }}
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

            <FormItem>
              <FormLabel>Image</FormLabel>
              {blog.image && !file && (
                <div className="mb-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Current image:
                  </p>
                  <Image
                    src={blog.image}
                    alt="Current blog"
                    width={300}
                    height={300}
                    className="w-20 h-20 object-cover rounded border"
                  />
                </div>
              )}
              {file && (
                <div className="mb-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    New image preview:
                  </p>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    width={300}
                    height={300}
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setFile(selectedFile);
                  }}
                />
              </FormControl>
              <p className="text-sm text-muted-foreground">
                Leave empty to keep the current image
              </p>
              <FormMessage />
            </FormItem>

            <DialogFooter className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <div className="flex items-center gap-x-1">
                    saving <Loader />
                  </div>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
