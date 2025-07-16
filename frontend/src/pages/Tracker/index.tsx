import { useGetJobsQuery } from "@/services/jobApi";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { VisaSponsorshipBadge } from "@/pages/Tracker/components/VisaSponsorshipBadge";
import InfoModal from "@/pages/Tracker/components/InfoModal";
import React, { useState, useCallback } from "react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ICellRendererParams, ValueGetterParams } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from "ag-grid-react";
import { theme } from "./components/agGridTheme";

const TrackerPage: React.FC = () => {
  const [modalRowIndex, setModalRowIndex] = useState<number | null>(null);

  const handleOpenModal = useCallback((rowIndex: number) => {
    setModalRowIndex(rowIndex);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalRowIndex(null);
  }, []);

  const { data: jobs, isLoading } = useGetJobsQuery();

  const agGridColumns = [
    {
      headerName: "ID",
      field: "id",
      valueGetter: (params: ValueGetterParams) => params.node.rowIndex + 1,
    },
    { headerName: "Role", field: "job_title" },
    { headerName: "Name", field: "company_name" },
    { headerName: "Location", field: "location" },
    {
      headerName: "Sponsorship",
      field: "visa_sponsorship",
      cellRenderer: (params: ICellRendererParams) => <VisaSponsorshipBadge status={params.value} />,
    },
    { headerName: "YOE", field: "years_experience" },
    {
      headerName: "More Info",
      field: "more_info",
      cellRenderer: (params: ICellRendererParams) => {
        const rowIndex = params.node?.rowIndex;
        return (
          <span
            className="text-[var(--color-secondary)] font-semibold transition-colors duration-200 hover:text-[var(--color-primary)] cursor-pointer underline underline-offset-4 m-4"
            tabIndex={0}
            role="button"
            onClick={() => handleOpenModal(rowIndex)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleOpenModal(rowIndex);
            }}
          >
            View
          </span>
        );
      },
      autoHeight: true,
      suppressSizeToFit: true,
      minWidth: 120,
      maxWidth: 180,
    },
    {
      headerName: "Created At",
      field: "created_at",
      cellRenderer: (params) => {
        if (!params.value) return null;
        const date = new Date(params.value);
        return isNaN(date.getTime())
          ? params.value
          : date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
      },
    },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img
          src="/assets/blob-scene-haikei_tracker.svg"
          alt="Background"
          className="w-full h-full object-cover opacity-70"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-[var(--color-bg)]/30 via-white/30 to-[var(--color-surface)]/30 backdrop-blur-sm pointer-events-none z-10" />
      <div className="relative z-20">
        <AppNavbar />
        <div
          className="ag-theme-quartz"
          style={{
            minHeight: "80vh",
            maxWidth: 1200,
            margin: "128px auto 32px auto",
            padding: "32px 24px 24px 24px",
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 4px 24px 0 rgba(80, 80, 120, 0.08)",
            border: "1px solid #ececec",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] text-center mb-8 tracking-tight drop-shadow-sm">
            Job Tracker
          </h1>
          <AgGridReact
            rowData={jobs?.jobs ?? []}
            columnDefs={agGridColumns}
            gridOptions={{
              autoSizeStrategy: {
                type: "fitCellContents",
              },
            }}
            theme={theme}
            domLayout="autoHeight"
            defaultColDef={{ resizable: true, sortable: true, filter: true, unSortIcon: true }}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit();
            }}
            loadingOverlayComponentParams={{ loadingMessage: "Loading..." }}
            overlayLoadingTemplate={
              isLoading ? '<span class="ag-overlay-loading-center">Loading...</span>' : undefined
            }
          />
          {modalRowIndex !== null && jobs?.jobs && jobs.jobs[modalRowIndex] && (
            <InfoModal
              open={modalRowIndex !== null}
              onClose={handleCloseModal}
              techStack={jobs.jobs[modalRowIndex].tech_stack}
              softSkills={jobs.jobs[modalRowIndex].soft_skills}
              createdAt={jobs.jobs[modalRowIndex].created_at}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;
