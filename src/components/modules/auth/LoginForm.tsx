"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/utils/axios";
import { useState } from "react";
import Loader from "@/app/utils/Loader";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", data);

      if (response.data.success) {
        localStorage.setItem("currentUser", JSON.stringify(response.data.data));
        toast.success(<h1 className="text-center">Logged in Successfully</h1>);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your portfolio account
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    rules={{ required: "Email is required" }}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="johndoe@gmail.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    rules={{ required: "password is required" }}
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="***************"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="cursor-pointer w-full"
                  >
                    {isLoading ? <Loader /> : "Login"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="https://media.istockphoto.com/id/2163352281/photo/securing-cybersecurity-a-businesswoman-protecting-personal-data-preventing-online-theft.jpg?s=612x612&w=0&k=20&c=l4xijI0LAb4avRfJ1-DUUClQe1gDKpBJW5GnIktCfTo="
              alt="login Image"
              className="absolute inset-0 h-full w-full object-cover brightness-50"
              width={500}
              height={500}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
