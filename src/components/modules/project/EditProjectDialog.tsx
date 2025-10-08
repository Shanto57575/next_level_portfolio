"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/app/utils/Loader";
import { axiosInstance } from "@/app/utils/axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { IProject } from "@/types/project.interface";
import { Plus, X } from "lucide-react";
import { revalidateProject } from "@/app/actions/projectAction";
import { useUser } from "@/hooks/useUser";

type ProjectFormValues = {
  title: string;
  content: string;
  image?: string;
  github_client?: string;
  github_server?: string;
  live?: string;
  tech_stack: { name: string }[];
  features: { text: string }[];
};

interface EditProjectDialogProps {
  project: IProject;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProjectDialog({
  project,
  open,
  onOpenChange,
}: EditProjectDialogProps) {
  const { token } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: project?.title || "",
      image: project?.image || "",
      github_client: project?.github_client || "",
      github_server: project?.github_server || "",
      live: project?.live || "",
      tech_stack: project?.tech_stack?.map((t) => ({ name: t })) || [
        { name: "" },
      ],
      features: project?.Features?.map((f) => ({ text: f })) || [{ text: "" }],
    },
    mode: "onSubmit",
  });

  const { control, register, handleSubmit, reset } = form;

  const {
    fields: techFields,
    append: techAppend,
    remove: techRemove,
  } = useFieldArray({
    control,
    name: "tech_stack",
  });

  const {
    fields: featureFields,
    append: featureAppend,
    remove: featureRemove,
  } = useFieldArray({
    control,
    name: "features",
  });

  useEffect(() => {
    if (open) {
      reset({
        title: project?.title || "",
        image: project?.image || "",
        github_client: project?.github_client || "",
        github_server: project?.github_server || "",
        live: project?.live || "",
        tech_stack: project?.tech_stack?.map((t) => ({ name: t })) || [
          { name: "" },
        ],
        features: project?.Features?.map((f) => ({ text: f })) || [
          { text: "" },
        ],
      });
      setFile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, project?.id]);

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      if (file) formData.append("file", file);

      formData.append("title", data.title);
      formData.append("github_client", data.github_client || "");
      formData.append("github_server", data.github_server || "");
      formData.append("live", data.live || "");

      formData.append(
        "tech_stack",
        data.tech_stack.map((t) => t.name).join(",")
      );
      formData.append("Features", data.features.map((f) => f.text).join(","));

      const response = await axiosInstance.put(
        `/project/${project.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.success) {
        toast.success(
          <h1 className="text-center">{response.data.message || "Saved"}</h1>
        );

        startTransition(() => {
          revalidateProject();
        });

        reset();
        setFile(null);
        onOpenChange(false);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error("err==>", err);
      toast.error("Failed to update project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-full md:max-w-3xl h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update project details. You can add/remove tech-stack and features.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Left column: image preview + upload */}
          <div className="col-span-1 space-y-4">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-2">Project image</p>

              {/* current or new preview */}
              <div className="w-full h-48 rounded overflow-hidden border">
                {file ? (
                  // new preview
                  // URL.createObjectURL is fine for preview; no SSR issue inside use client
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : project?.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="w-full mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Replace image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setFile(selectedFile);
                  }}
                  className="block w-full text-sm text-gray-700"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to keep current image
                </p>
              </div>
            </div>

            {/* quick links */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Links</p>

              <div className="space-y-2">
                <Form {...form}>
                  <FormItem>
                    <FormLabel className="text-xs">Client repo</FormLabel>
                    <FormControl>
                      <Input
                        {...register("github_client")}
                        placeholder="https://github.com/you/client"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs">Server repo</FormLabel>
                    <FormControl>
                      <Input
                        {...register("github_server")}
                        placeholder="https://github.com/you/server"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs">Live URL</FormLabel>
                    <FormControl>
                      <Input {...register("live")} placeholder="https://..." />
                    </FormControl>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>

          {/* Right column: details, tech stack, features */}
          <div className="col-span-2 space-y-4">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* title */}
                <FormField
                  control={control}
                  name="title"
                  render={() => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...register("title", {
                            required: "Title is required",
                          })}
                          placeholder="Project title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* tech stack field array */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      Tech Stack
                    </p>
                    <button
                      type="button"
                      onClick={() => techAppend({ name: "" })}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-indigo-50 text-indigo-700 border border-indigo-100"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {techFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-2 bg-white border rounded px-2 py-1"
                      >
                        <input
                          {...register(`tech_stack.${index}.name` as const, {
                            required: false,
                          })}
                          placeholder="e.g. React"
                          className="w-full border-0 focus:ring-0 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => techRemove(index)}
                          aria-label="Remove tech"
                          className="inline-flex items-center justify-center w-7 h-7 rounded bg-red-50 text-red-600 text-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* features field array */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      Features
                    </p>
                    <button
                      type="button"
                      onClick={() => featureAppend({ text: "" })}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-emerald-50 text-emerald-700 border border-emerald-100"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>

                  <div className="space-y-2">
                    {featureFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-start gap-2 bg-white border rounded p-2"
                      >
                        <span className="text-xs text-gray-500 mt-2">•</span>
                        <input
                          {...register(`features.${index}.text` as const)}
                          placeholder="Feature description"
                          className="w-full border-0 focus:ring-0 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => featureRemove(index)}
                          aria-label="Remove feature"
                          className="inline-flex items-center justify-center w-7 h-7 rounded bg-red-50 text-red-600 text-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* footer */}
                <DialogFooter className="flex items-center justify-between gap-3">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      disabled={isLoading || isPending}
                      className="flex items-center gap-2"
                    >
                      {isLoading || isPending ? (
                        <>
                          <Loader /> Saving
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
