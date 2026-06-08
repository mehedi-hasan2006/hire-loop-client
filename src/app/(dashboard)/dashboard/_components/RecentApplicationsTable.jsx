"use client";

const applications = [
  {
    id: 1,
    name: "Julianne Moore",
    initials: "JM",
    role: "Senior Product Designer",
    applied: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    id: 2,
    name: "Robert Downey",
    initials: "RD",
    role: "Backend Engineer",
    applied: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    id: 3,
    name: "Emma Stone",
    initials: "ES",
    role: "Marketing Lead",
    applied: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    id: 4,
    name: "Chris Pratt",
    initials: "CP",
    role: "Product Manager",
    applied: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
];

const statusStyles = {
  Interviewing: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-900/50",
    dot: "bg-emerald-500",
  },
  New: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-900/50",
    dot: "bg-blue-500",
  },
  Reviewing: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-900/50",
    dot: "bg-amber-500",
  },
  Rejected: {
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-900/50",
    dot: "bg-red-500",
  },
};

export default function RecentApplications() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Recent Applications
        </h2>
        <button className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider pb-3 pr-4">
                Candidate Name
              </th>
              <th className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider pb-3 pr-4">
                Role
              </th>
              <th className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider pb-3 pr-4">
                Date Applied
              </th>
              <th className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider pb-3 pr-4">
                Experience
              </th>
              <th className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider pb-3">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {applications.map((item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-b-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
              >
                {/* Candidate Name with Avatar */}
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-300 shrink-0">
                      {item.initials}
                    </div>
                    <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                      {item.name}
                    </span>
                  </div>
                </td>

                {/* Role */}
                <td className="py-4 pr-4">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.role}
                  </span>
                </td>

                {/* Date Applied */}
                <td className="py-4 pr-4">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.applied}
                  </span>
                </td>

                {/* Experience */}
                <td className="py-4 pr-4">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.experience}
                  </span>
                </td>

                {/* Status Badge */}
                <td className="py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[item.status].bg} ${statusStyles[item.status].text} ${statusStyles[item.status].border}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[item.status].dot}`}></span>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}