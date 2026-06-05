"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Chip,
} from "@heroui/react";

const applications = [
  {
    id: 1,
    name: "Julianne Moore",
    role: "Senior Product Designer",
    applied: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    id: 2,
    name: "Robert Downey",
    role: "Backend Engineer",
    applied: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    id: 3,
    name: "Emma Stone",
    role: "Marketing Lead",
    applied: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    id: 4,
    name: "Chris Pratt",
    role: "Product Manager",
    applied: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
];

const statusColorMap = {
  Interviewing: "success",
  New: "default",
  Reviewing: "warning",
  Rejected: "danger",
};

export default function RecentApplications() {
  return (
    <div className="rounded-3xl border border-default-200 bg-content1 p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Applications
        </h2>

        <button className="text-sm text-default-500 hover:text-default-900 transition-colors">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          aria-label="Recent Applications Table"
          removeWrapper
          className="min-w-[850px]"
        >
          <TableHeader>
            <TableColumn>CANDIDATE NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>DATE APPLIED</TableColumn>
            <TableColumn>EXPERIENCE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>

          <TableBody items={applications}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={item.name}
                      size="sm"
                    />

                    <span className="font-medium">
                      {item.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  {item.role}
                </TableCell>

                <TableCell>
                  {item.applied}
                </TableCell>

                <TableCell>
                  {item.experience}
                </TableCell>

                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={statusColorMap[item.status]}
                    radius="full"
                  >
                    {item.status}
                  </Chip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}