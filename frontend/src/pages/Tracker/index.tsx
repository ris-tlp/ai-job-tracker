import { useGetJobsQuery } from "@/services/jobApi";
import { AppNavbar } from "../../components/layout/AppNavbar";
import { VisaSponsorshipBadge } from "./components/VisaSponsorshipBadge";
import InfoModal from "./components/InfoModal";
import React, { useState, useCallback } from "react";

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ICellRendererParams, ValueGetterParams } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from 'ag-grid-react';
import { themeQuartz } from 'ag-grid-community';



const TrackerPage: React.FC = () => {
  const [modalRowIndex, setModalRowIndex] = useState<number | null>(null);

  const handleOpenModal = useCallback((rowIndex: number) => {
    setModalRowIndex(rowIndex);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalRowIndex(null);
  }, []);

  const { data: jobs, isLoading } = useGetJobsQuery();
  const myTheme = themeQuartz
  .withParams({
      accentColor: "#6C63FF",
      backgroundColor: "#FFFFFF",
      borderColor: "#000000",
      borderRadius: 4,
      browserColorScheme: "light",
      cellHorizontalPaddingScale: 1,
      columnBorder: false,
      fontFamily: {
          googleFont: "IBM Plex Sans"
      },
      headerFontSize: 14,
      headerFontWeight: 700,
      headerRowBorder: true,
      headerTextColor: "#6C63FF",
      headerVerticalPaddingScale: 1,
      oddRowBackgroundColor: "#E4E3FF",
      rowBorder: true,
      rowVerticalPaddingScale: 1.5,
      wrapperBorderRadius: 24
  });

  const agGridColumns = [
    { headerName: "ID", field: "id", valueGetter: (params: ValueGetterParams) => params.node.rowIndex + 1 },
    { headerName: "Role", field: "job_title" },
    { headerName: "Name", field: "company_name" },
    { headerName: "Location", field: "location" },
    { 
      headerName: "Sponsorship", 
      field: "visa_sponsorship", 
      cellRenderer: (params: ICellRendererParams) => <VisaSponsorshipBadge status={params.value} /> 
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
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleOpenModal(rowIndex); }}
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
      }
    },
  ];

  return (
    <>
      <AppNavbar />
      <div
        className="ag-theme-quartz"
        style={{
          minHeight: '80vh',
          maxWidth: 1200,
          margin: '48px auto 32px auto',
          padding: '32px 24px 24px 24px',
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 4px 24px 0 rgba(80, 80, 120, 0.08)',
          border: '1px solid #ececec',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <AgGridReact
          rowData={jobs?.jobs ?? []}
          columnDefs={agGridColumns}
          theme={myTheme}
          domLayout="autoHeight"
          loadingOverlayComponentParams={{ loadingMessage: "Loading..." }}
          overlayLoadingTemplate={isLoading ? '<span class="ag-overlay-loading-center">Loading...</span>' : undefined}
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
    </>
  );
};

export default TrackerPage;
