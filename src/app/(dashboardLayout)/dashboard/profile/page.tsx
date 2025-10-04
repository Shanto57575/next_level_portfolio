"use client";

import Image from "next/image";
import { Mail, Calendar, Shield } from "lucide-react";
import meImage from "../../../../../public/assets/professional.jpeg";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const currentUser = useAuth();

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="pt-8 pb-8">
          {/* Profile Image */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <Image
                src={meImage}
                className="rounded-full w-24 h-24 object-cover border-2 border-border shadow-md mx-auto"
                alt="Profile picture"
                width={96}
                height={96}
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
            </div>
          </div>

          {/* User Info */}
          <div className="text-center space-y-3 mb-6">
            <h1 className="text-2xl font-bold">
              {currentUser?.name || "Guest User"}
            </h1>

            <Badge variant="secondary" className="font-medium">
              <Shield className="size-3 mr-1" />
              Admin
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-3">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <Mail className="size-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm font-medium truncate">
                  {currentUser?.email || "Not provided"}
                </p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <Calendar className="size-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium">
                  {currentUser?.createdAt
                    ? new Date(currentUser.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "Recently joined"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
