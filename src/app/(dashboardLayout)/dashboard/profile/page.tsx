import Image from "next/image";
import { Mail, Calendar, Shield, User } from "lucide-react";
import meImage from "../../../../../public/assets/professional.jpeg";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const currentUser = await getAuthUser();
  console.log("currentUser", currentUser);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl shadow-xl border-0 overflow-hidden">
        {/* Header Background */}

        <div className="h-12 md:h-16 relative">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        </div>

        <CardContent className="relative px-4 sm:px-6 md:px-8 pb-8">
          {/* Profile Image */}
          <div className="flex justify-center -mt-12 md:-mt-16 mb-4 md:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full blur-sm opacity-50" />
              <Image
                src={meImage}
                className="relative rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover border-4 border-white shadow-xl"
                alt="Profile picture"
                width={160}
                height={160}
              />
              <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-500 border-3 sm:border-4 border-white rounded-full shadow-lg" />
            </div>
          </div>

          {/* User Info */}
          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                {currentUser?.name || "Guest User"}
              </h1>
              <Badge
                variant="secondary"
                className="font-medium px-3 py-1.5 sm:px-4 bg-gray-900 text-white hover:bg-gray-800"
              >
                <Shield className="w-4 h-4 mr-1.5" />
                Administrator
              </Badge>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Email Card */}
            <div className="group p-4 md:p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="p-2.5 md:p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600" />
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
            <div className="group p-4 md:p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="p-2.5 md:p-3 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                  <Calendar className="w-5 h-5 text-purple-600" />
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
          <div className="mt-5 md:mt-6 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <User className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <p className="text-sm sm:text-sm md:text-base font-medium">
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
