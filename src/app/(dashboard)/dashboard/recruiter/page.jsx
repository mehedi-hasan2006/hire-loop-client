"use client";
import { useSession } from "@/lib/auth-client";
import { FileText, Persons, Thunderbolt, CircleCheck } from "@gravity-ui/icons";
import { StatCard } from "../_components/StatCard";
import RecentApplicationsTable from "../_components/RecentApplicationsTable";

const RecruiterDashboardPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div> Loading...</div>;
  }

  const user = session?.user;

  // demo data for stats cards TODO: replace with real data from API
  const adminStats = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: Thunderbolt,
    },
    {
      title: "Jobs Closed",
      value: "32",
      icon: CircleCheck,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-3">
        Welcome to the Recruiter Dashboard, {user?.name}!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {adminStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* <RecentApplicationsTable /> */}
    </div>
  );
};

export default RecruiterDashboardPage;
