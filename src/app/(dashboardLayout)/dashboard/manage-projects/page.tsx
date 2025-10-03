import DashboardProjectCard from "@/components/modules/project/DashboardProjectCard";
import { IProject } from "@/types/project.interface";

export default async function ManageProjects() {
  const res = await fetch(`${process.env.SERVER_URL}/project/all-projects`, {
    next: { tags: ["projects"] },
  });
  const allProjects = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Latest Articles
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Insights, tutorials, and updates from our team
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allProjects?.data?.map((project: IProject) => (
            <DashboardProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
