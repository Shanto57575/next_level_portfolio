import DashboardProjectCard from "@/components/modules/project/DashboardProjectCard";
import { IProject } from "@/types/project.interface";

export default async function ManageProjects() {
  const res = await fetch(`${process.env.SERVER_URL}/project/all-projects`, {
    next: { tags: ["projects"] },
  });

  const allProjects = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:px-4 lg:px-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            My Projects
          </h1>
        </div>
        <div
          className="w-full mx-auto grid gap-x-4 gap-y-6 lg:gap-8"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {allProjects?.data?.map((project: IProject) => (
            <DashboardProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
