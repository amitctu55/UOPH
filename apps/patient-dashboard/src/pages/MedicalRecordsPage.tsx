import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/api";

function MedicalRecordsPage() {
  const {
    data: medicalRecords = [],
    isLoading: loading,
    error: errorMessage,
  } = useQuery({
    queryKey: ["medicalRecords"],
    queryFn: () => apiService.medicalRecords.getAll().then(res => res.data),
    retry: false,
  });

  if (loading) {
    return (
      <div className="page-container">
        <h1>Medical Records</h1>
        <div className="page-content">
          <div className="loading">Loading medical records...</div>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="page-container">
        <h1>Medical Records</h1>
        <div className="page-content">
          <div className="page-content">
            <p className="error-message">Error loading medical records. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Medical Records</h1>
      <div className="page-content">
        <div className="filters">
          <button className="filter-btn active">All Records</button>
          <button className="filter-btn">Lab Results</button>
          <button className="filter-btn">Imaging</button>
          <button className="filter-btn">Vaccinations</button>
          <button className="filter-btn">Prescriptions</button>
          <button className="filter-btn">Visit Summaries</button>
        </div>

        {medicalRecords.length > 0 ? (
          <div className="records-list">
            {medicalRecords.map(record => (
              <div key={record.id} className="record-card">
                <div className="record-info">
                  <h3>{record.title}</h3>
                  <p>
                    <strong>Type:</strong> {record.type}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(record.createdAt).toLocaleDateString()}
                  </p>
                  {record.description && (
                    <p>
                      <strong>Description:</strong> {record.description}
                    </p>
                  )}
                  {record.provider && (
                    <p>
                      <strong>Provider:</strong> {record.provider}
                    </p>
                  )}
                </div>
                <div className="record-actions">
                  <button className="btn-action" onClick={() => viewRecordDetails(record.id)}>
                    View Details
                  </button>
                  <button className="btn-action" onClick={() => shareRecord(record.id)}>
                    Share
                  </button>
                  <button
                    className="btn-action btn-download"
                    onClick={() => downloadRecord(record.id)}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No Medical Records Found</h3>
            <p>
              You don't have any medical records yet. Records will appear here as they are added by
              your healthcare providers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const viewRecordDetails = recordId => {
  alert(`View details for medical record ${recordId} would go here`);
};

const shareRecord = recordId => {
  alert(`Share functionality for medical record ${recordId} would go here`);
};

const downloadRecord = recordId => {
  alert(`Download functionality for medical record ${recordId} would go here`);
};

export default MedicalRecordsPage;
