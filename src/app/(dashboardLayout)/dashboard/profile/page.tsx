"use client";

import Image from "next/image";
import { Mail, Calendar, Shield, User } from "lucide-react";
import meImage from "../../../../../public/assets/professional.jpeg";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/provider/AuthProvider";

export default function ProfilePage() {
  const { user: currentUser } = useAuth();

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-2xl shadow-xl border-0 overflow-hidden">
        {/* Header Background */}
        <div className="h-16 relative">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        </div>

        <CardContent className="relative px-8 pb-8">
          {/* Profile Image */}
          <div className="flex justify-center -mt-16 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full blur-sm opacity-50" />
              <Image
                src={meImage}
                className="relative rounded-full w-32 h-32 object-cover border-4 border-white shadow-xl"
                alt="Profile picture"
                width={128}
                height={128}
              />
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-lg" />
            </div>
          </div>

          {/* User Info */}
          <div className="text-center space-y-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentUser?.name || "Guest User"}
              </h1>
              <Badge
                variant="secondary"
                className="font-medium px-4 py-1.5 bg-gray-900 text-white hover:bg-gray-800"
              >
                <Shield className="size-3.5 mr-1.5" />
                Administrator
              </Badge>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Email Card */}
            <div className="group p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <Mail className="size-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {currentUser?.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Member Since Card */}
            <div className="group p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                  <Calendar className="size-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Member Since
                  </p>
                  <p className="text-sm font-medium text-gray-900">
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
          </div>

          {/* Stats Section */}
          <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <User className="size-4" />
              <p className="text-sm font-medium">
                Account Status:{" "}
                <span className="text-green-600 font-semibold">Active</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
