import React from "react";
import { useGetJobsQuery } from "@/services/jobApi";
import { MaterialReactTable } from "material-react-table";
import { AppNavbar } from "../../components/layout/AppNavbar";
import { VisaSponsorshipBadge } from "./components/VisaSponsorshipBadge";
import type { Job } from "@/services/jobApi";
import type { MRT_Cell } from "material-react-table";
const TrackerPage: React.FC = () => {
  const { data: jobs, isLoading } = useGetJobsQuery();

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      Cell: ({ row }: { row: { index: number } }) => row.index + 1,
    },
    { accessorKey: "job_title", header: "Job Title" },
    { accessorKey: "company_name", header: "Company Name" },
    { accessorKey: "location", header: "Location" },
    {
      accessorKey: "visa_sponsorship",
      header: "Visa Sponsorship",
      Cell: ({ cell }: { cell: MRT_Cell<Job> }) => (
        <VisaSponsorshipBadge status={cell.getValue() as string} />
      ),
    },
    {
      accessorKey: "tech_stack",
      header: "Tech Stack",
      Cell: ({ cell }: { cell: MRT_Cell<Job> }) => {
        const value = cell.getValue() as string;
        if (!value) return null;
        return (
          <ul className="list-disc pl-4 m-0">
            {value.split(",").map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ul>
        );
      },
    },
    {
      accessorKey: "soft_skills",
      header: "Soft Skills",
      Cell: ({ cell }: { cell: MRT_Cell<Job> }) => {
        const value = cell.getValue() as string;
        if (!value) return null;
        return (
          <ul className="list-disc pl-4 m-0">
            {value.split(",").map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ul>
        );
      },
    },
    { accessorKey: "years_experience", header: "Years Experience" },
    {
      accessorKey: "created_at",
      header: "Created At",
      Cell: ({ cell }: { cell: MRT_Cell<Job> }) => {
        const value = cell.getValue() as string;
        if (!value) return null;
        const date = new Date(value);
        return isNaN(date.getTime())
          ? value
          : date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
      },
    },
  ];

  return (
    <>
      <AppNavbar />
      <div style={{ padding: 24, paddingTop: 88 }}>
        <h2>Job Tracker</h2>
        <MaterialReactTable columns={columns} data={jobs?.jobs ?? []} state={{ isLoading }} />
      </div>
    </>
  );
};

export default TrackerPage;
