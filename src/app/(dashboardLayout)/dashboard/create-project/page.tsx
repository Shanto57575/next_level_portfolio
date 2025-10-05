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
import { revalidateProject } from "@/app/actions/projectAction";

export type ProjectFormValues = {
  title: string;
  tech_stack: string;
  image: string;
  github_client?: string;
  github_server?: string;
  live?: string;
  Features: string;
};

export default function AddNewProject() {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      tech_stack: "",
      image: "",
      github_client: "",
      github_server: "",
      live: "",
      Features: "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("title", data.title);
      formdata.append("tech_stack", data.tech_stack);
      formdata.append("github_client", data.github_client || "");
      formdata.append("github_server", data.github_server || "");
      formdata.append("live", data.live || "");
      formdata.append("Features", data.Features);

      startTransition(async () => {
        const response = await axiosInstance.post(
          "/project/create-project",
          formdata
        );

        if (response.data.success) {
          toast.success(
            <h1 className="text-center">{response?.data?.message}</h1>
          );
          revalidateProject();
          form.reset();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(
        <h1 className="text-center">❌ Failed to add new project</h1>
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-md shadow-gray-300">
      <h2 className="text-2xl font-semibold mb-6">Add New Project</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            rules={{ required: "Title is required" }}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tech Stack */}
          <FormField
            control={form.control}
            rules={{ required: "Tech stack is required" }}
            name="tech_stack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech Stack (comma separator)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="React, Next.js, Prisma (comma separated)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Features */}
          <FormField
            control={form.control}
            rules={{ required: "Features are required" }}
            name="Features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features (comma separator)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Authentication, Payment, Dashboard (comma separated)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Github Client */}
          <FormField
            control={form.control}
            name="github_client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Client Repo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/username/client"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Github Server */}
          <FormField
            control={form.control}
            name="github_server"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Server Repo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/username/server"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Live Link */}
          <FormField
            control={form.control}
            name="live"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live Demo Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourproject.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            rules={{ required: "project Image is required" }}
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

          {/* Submit */}
          <Button
            disabled={isPending}
            type="submit"
            className="w-full cursor-pointer"
          >
            {isPending ? <Loader /> : "Publish Project"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
