import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { apiService } from './services/api';
import RegisterPage from './pages/RegisterPage';

const queryClient = new QueryClient();

// Dashboard Page with real data fetching
function DashboardPage() {
  const { data: hospitalStats, isLoading: loadingStats } = useQuery({
    queryKey: ['hospitalStats'],
    queryFn: () => apiService.hospital.getStats().then(res => res.data),
    retry: false
  });

  const { data: todaysPatients = [], isLoading: loadingPatients } = useQuery({
    queryKey: ['todaysPatients'],
    queryFn: () => apiService.hospital.getTodaysPatients().then(res => res.data),
    retry: false
  });

  const { data: bedAvailability = {}, isLoading: loadingBeds } = useQuery({
    queryKey: ['bedAvailability'],
    queryFn: () => apiService.hospital.getBedAvailability().then(res => res.data),
    retry: false
  });

  const { data: pendingAdmissions = [], isLoading: loadingAdmissions } = useQuery({
    queryKey: ['pendingAdmissions'],
    queryFn: () => apiService.hospital.getPendingAdmissions().then(res => res.data),
    retry: false
  });

  const { data: recentDischarges = [], isLoading: loadingDischarges } = useQuery({
    queryKey: ['recentDischarges'],
    queryFn: () => apiService.hospital.getRecentDischarges().then(res => res.data),
    retry: false
  });

  const isLoading = loadingStats || loadingPatients || loadingBeds || loadingAdmissions || loadingDischarges;

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <h1>Hospital Dashboard</h1>
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1>Hospital Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Admissions Today</h3>
          <div className="stat-value">{hospitalStats?.admissionsToday || 0}</div>
          <div className="stat-label">Patients</div>
        </div>
        <div className="stat-card">
          <h3>Currently Admitted</h3>
          <div className="stat-value">{hospitalStats?.currentlyAdmitted || 0}</div>
          <div className="stat-label">Patients</div>
        </div>
        <div className="stat-card">
          <h3>Bed Occupancy</h3>
          <div className="stat-value">
            {Math.round(((hospitalStats?.currentlyAdmitted || 0) / (hospitalStats?.totalBeds || 100)) * 100)}%
          </div>
          <div className="stat-label">of {hospitalStats?.totalBeds || 100} beds</div>
        </div>
        <div className="stat-card">
          <h3>Emergency Visits</h3>
          <div className="stat-value">{hospitalStats?.emergencyVisitsToday || 0}</div>
          <div className="stat-label">Today</div>
        </div>
        <div className="stat-card">
          <h3>Surgeries Scheduled</h3>
          <div className="stat-value">{hospitalStats?.surgeriesScheduled || 0}</div>
          <div className="stat-label">Today</div>
        </div>
        <div className="stat-card">
          <h3>Lab Orders Pending</h3>
          <div className="stat-value">{hospitalStats?.labOrdersPending || 0}</div>
          <div className="stat-label">Processing</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn">
            <div className="action-icon">🏥</div>
            <span>Admit Patient</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">🛏️</div>
            <span>Manage Beds</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">📋</div>
            <span>View Patient List</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">🆘</div>
            <span>ER Dashboard</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">📊</div>
            <span>Generate Reports</span>
          </button>
        </div>
      </div>

      <div className="dashboard-modules">
        <div className="module">
          <h3>Today's Patients</h3>
          <div className="patients-list">
            {todaysPatients.length > 0 ? (
              todaysPatients.slice(0, 5).map(patient => (
                <div key={patient.id} className="patient-item">
                  <div className="patient-info">
                    <h4>{patient.name}</h4>
                    <p>{patient.room} • {patient.bed}</p>
                    <p>{patient.admissionReason}</p>
                  </div>
                  <div className="patient-status">
                    <span className={`status ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No patients admitted today</p>
            )}
          </div>
          <button className="btn-outline" onClick={() => {
            // View all patients
            alert('View all patients functionality');
          }}>
            View All Today's Patients
          </button>
        </div>

        <div className="module">
          <h3>Bed Availability</h3>
          <div className="bed-status">
            {Object.keys(bedAvailability).map(unit => (
              <div key={unit} className="bed-unit">
                <h4>{unit}</h4>
                <div className="bed-count">
                  Available: <strong>{bedAvailability[unit].available}</strong> /
                  Total: <strong>{bedAvailability[unit].total}</strong>
                  <div className="occupancy-bar">
                    <div
                      style={{ width: `${(bedAvailability[unit].available / bedAvailability[unit].total) * 100}%` }}
                      className="occupancy-fill"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="module">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {pendingAdmissions.slice(0, 3).map(admission => (
              <div key={admission.id} className="activity-item">
                <div className="activity-icon">📥</div>
                <div className="activity-content">
                  <h4>{admission.patientName}</h4>
                  <p>{admission.reason}</p>
                  <time>{new Date(admission.requestedAt).toLocaleTimeString()}</time>
                </div>
              }
            ))}
            {recentDischarges.slice(0, 3).map(discharge => (
              <div key={discharge.id} className="activity-item">
                <div className="activity-icon">📤</div>
                <div className="activity-content">
                  <h4>{discharge.patientName}</h4>
                  <p>Discharged after {discharge.lengthOfStay} days</p>
                  <time>{new Date(discharge.dischargeDate).toLocaleTimeString()}</time>
                </div>
              }
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Patient Management Page
function PatientManagementPage() {
  const { data: patients = [], isLoading: loading, error } = useQuery({
    queryKey: ['hospitalPatients'],
    queryFn: () => apiService.hospital.getAllPatients().then(res => res.data),
    retry: false
  });

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('name');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.medicalRecordNumber.toString().includes(searchTerm) ||
                         patient.room.toString().includes(searchTerm) ||
                         patient.bed.toString().includes(searchTerm);

    if (filter === 'all') return matchesSearch;
    if (filter === 'admitted') return patient.status === 'admitted' && matchesSearch;
    if (filter === 'discharged') return patient.status === 'discharged' && matchesSearch;
    if (filter === 'emergency') return patient.admissionType === 'emergency' && matchesSearch;
    if (filter === 'icu') return patient.unit === 'ICU' && matchesSearch;
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      return new Date(b.admissionDate) - new Date(a.admissionDate);
    } else if (sortBy === 'room') {
      return a.room.localeCompare(b.room);
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="page-container">
        <h1>Patient Management</h1>
        <div className="page-content">
          <div className="loading">Loading patients...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Patient Management</h1>
        <div className="page-content">
          <p className="error-message">Error loading patients. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Patient Management</h1>
      <div className="page-content">
        <div className="patient-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search patients by name, MRN, room, or bed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="filter">Status:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">All Patients</option>
                <option value="admitted">Currently Admitted</option>
                <option value="discharged">Discharged Today</option>
                <option value="emergency">Emergency Admissions</option>
                <option value="icu">ICU Patients</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="name">Name (A-Z)</option>
                <option value="date">Admission Date (Newest)</option>
                <option value="room">Room Number</option>
              </select
            </div>
            <button className="btn-primary" onClick={() => {
              // Admit new patient
              alert('Admit new patient functionality would go here');
            }}>
              Admit New Patient
            </button>
          </div>
        </div>

        <div className="patients-stats">
          <div className="stat-item">
            <span>Total Patients:</span> <strong>{patients.length}</strong>
          </div>
          <div className="stat-item">
            <span>Currently Admitted:</span> <strong>{patients.filter(p => p.status === 'admitted').length}</strong>
          </div>
          <div className="stat-item">
            <span>In ICU:</span> <strong>{patients.filter(p => p.unit === 'ICU').length}</strong>
          </div>
          <div className="stat-item">
            <span>Emergency Admissions:</span> <strong>{patients.filter(p => p.admissionType === 'emergency').length}</strong>
          </div>
        </div>

        {filteredPatients.length > 0 ? (
          <div className="patients-table">
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>MRN</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Room/Bed</th>
                  <th>Admission Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>{patient.medicalRecordNumber}</td>
                    <td>
                      {patient.dateOfBirth ?
                        `${new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years` :
                        'N/A'}
                    </td>
                    <td>{patient.gender}</td>
                    <td>{patient.room}-{patient.bed}</td>
                    <td>{patient.admissionType}</td>
                    <td>
                      <span className={`status-badge ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="btn-action btn-sm" onClick={() => {
                        // View patient details
                        alert(`Viewing details for patient ${patient.id}`);
                      }}>
                        Details
                      </button>
                      {patient.status === 'admitted' && (
                        <button className="btn-action btn-sm btn-outline" onClick={() => {
                          // Discharge patient
                          if (window.confirm(`Discharge patient ${patient.name}?`)) {
                            alert(`Discharging patient ${patient.id}`);
                          }
                        }}>
                          Discharge
                        </button>
                      )}
                      {patient.status === 'admitted' && (
                        <button className="btn-action btn-sm btn-outline" onClick={() => {
                          // Transfer patient
                          alert(`Transfer patient ${patient.id}`);
                        }}>
                          Transfer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No patients found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

// Enhanced Bed Management Page
function BedManagementPage() {
  const { data: bedStatus = {}, isLoading: loading, error } = useQuery({
    queryKey: ['bedStatus'],
    queryFn: () => apiService.hospital.getDetailedBedStatus().then(res => res.data),
    retry: false
  });

  const [selectedUnit, setSelectedUnit] = React.useState('all');

  const filteredBedStatus = selectedUnit === 'all' ? bedStatus :
    selectedUnit ? { [selectedUnit]: bedStatus[selectedUnit] } : {};

  if (loading) {
    return (
      <div className="page-container">
        <h1>Bed Management</h1>
        <div className="page-content">
          <div className="loading">Loading bed status...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Bed Management</h1>
        <div className="page-content">
          <p className="error-message">Error loading bed status. Please try again later.</p>
        </div>
      </div>
    );
  }

  const units = Object.keys(bedStatus);

  return (
    <div className="page-container">
      <h1>Bed Management</h1>
      <div className="page-content">
        <div className="bed-header">
          <div className="unit-filter">
            <label htmlFor="unitSelect">Filter by Unit:</label>
            <select
              id="unitSelect"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="form-select"
            >
              <option value="all">All Units</option>
              {units.map(unit => (
                <option key={unit} value={unit}>
                  {unit} ({bedStatus[unit]?.available || 0}/{bedStatus[unit]?.total || 0} available)
                </option>
              ))}
            </select>
          </div>
          <div className="bed-stats-summary">
            <div className="stat-item">
              <span>Total Beds:</span> <strong>{units.reduce((sum, unit) => sum + (bedStatus[unit]?.total || 0), 0)}</strong>
            </div>
            <div className="stat-item">
              <span>Available Beds:</span> <strong>{units.reduce((sum, unit) => sum + (bedStatus[unit]?.available || 0), 0)}</strong>
            </div>
            <div className="stat-item">
              <span>Occupancy Rate:</span>
              <strong>
                {Math.round(
                  (units.reduce((sum, unit) => sum + ((bedStatus[unit]?.total || 0) - (bedStatus[unit]?.available || 0)), 0) /
                  Math.max(units.reduce((sum, unit) => sum + (bedStatus[unit]?.total || 0), 0), 1)) * 100
                )}%
              </strong>
            </div>
          </div>
          <button className="btn-primary" onClick={() => {
            // Manage bed maintenance
            alert('Bed maintenance functionality would go here');
          }}>
            Bed Maintenance
          </button>
        </div>

        {units.map(unit => (
          selectedUnit !== 'all' && selectedUnit !== unit ? null : (
            <div key={unit} className="bed-unit-section">
              <h3>{unit}</h3>
              <div className="bed-grid">
                {Array.from({ length: bedStatus[unit]?.total || 0 }, (_, i) => {
                  const bedNumber = i + 1;
                  const isAvailable = bedStatus[unit]?.availableBeds?.includes(bedNumber) ||
                    (bedStatus[unit]?.available || 0) > (bedStatus[unit]?.occupiedBeds?.length || 0) &&
                    bedStatus[unit]?.occupiedBeds?.indexOf(bedNumber) === -1;

                  return (
                    <div key={bedNumber} className={`bed-bed ${isAvailable ? 'available' : 'occupied'}`}>
                      <div className="bed-label">Bed {bedNumber}</div>
                      {!isAvailable && (
                        <div className="bed-patient-info">
                          <div className="bed-patient-name">
                            {bedStatus[unit]?.patientAssignments?.[bedNumber]?.name || 'Unknown'}
                          </div>
                          <div className="bed-patient-condition">
                            {bedStatus[unit]?.patientAssignments?.[bedNumber]?.condition || ''}
                          </div>
                        </div>
                      )}
                      <button
                        className="btn-bed-action"
                        onClick={() => {
                          if (isAvailable) {
                            // Assign patient to bed
                            alert(`Assign patient to ${unit} Bed ${bedNumber}`);
                          } else {
                            // View/manage patient in bed
                            alert(`Manage patient in ${unit} Bed ${bedNumber}`);
                          }
                        }}
                      >
                        {isAvailable ? 'Assign' : 'Manage'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        <div className="bed-legend">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>Available Bed</span>
          </div>
          <div className="legend-item">
            <div className="legend-color occupied"></div>
            <span>Occupied Bed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Emergency Room Dashboard
function ERDashboardPage() {
  const { data: erStats = {}, isLoading: loadingStats } = useQuery({
    queryKey: ['erStats'],
    queryFn: () => apiService.hospital.getERStats().then(res => res.data),
    retry: false
  });

  const { data: erPatients = [], isLoading: loadingPatients } = useQuery({
    queryKey: ['erPatients'],
    queryFn: () => apiService.hospital.getERPatients().then(res => res.data),
    retry: false
  });

  const { data: ambulanceStatus = {}, isLoading: loadingAmbulance } = useQuery({
    queryKey: ['ambulanceStatus'],
    queryFn: () => apiService.hospital.getAmbulanceStatus().then(res => res.data),
    retry: false
  });

  const isLoading = loadingStats || loadingPatients || loadingAmbulance;

  if (isLoading) {
    return (
      <div className="page-container">
        <h1>Emergency Room Dashboard</h1>
        <div className="page-content">
          <div className="loading">Loading ER data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Emergency Room Dashboard</h1>
      <div className="page-content">
        <div className="er-stats">
          <div className="stat-card">
            <h3>Patients Waiting</h3>
            <div className="stat-value">{erPatients.length}</div>
          </div>
          <div className="stat-card">
            <h3>Avg Wait Time</h3>
            <div className="stat-value">{erStats?.avgWaitTime || 0} min</div>
          </div>
          <div className="stat-card">
            <h3>Patients Treated Today</h3>
            <div className="stat-value">{erStats?.treatedToday || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Ambulances En Route</h3>
            <div className="stat-value">{ambulanceStatus?.enRoute || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Critical Patients</h3>
            <div className="stat-value">{erPatients.filter(p => p.acuity === 'critical').length}</div>
          </div>
          <div className="stat-card">
            <h3>Trauma Alerts</h3>
            <div className="stat-value">{erStats?.traumaAlertsToday || 0}</div>
          </div>
        </div>

        <div className="er-modules">
          <div className="er-module">
            <h3>Current ER Patients</h3>
            <div className="er-patients-list">
              {erPatients.length > 0 ? (
                erPatients.map(patient => (
                  <div key={patient.id} className={`er-patient-card acuity-${patient.acuity.toLowerCase()}`}>
                    <div className="er-patient-info">
                      <h4>{patient.name}</h4>
                      <p><strong>Age:</strong> {patient.age}</p>
                      <p><strong>Mode of Arrival:</strong> {patient.arrivalMode}</p>
                      <p><strong>Chief Complaint:</strong> {patient.chiefComplaint}</p>
                      <p><strong>Acuity Level:</strong>
                        <span className={`acuity-badge ${patient.acuity.toLowerCase()}`}>
                          {patient.acuity.charAt(0).toUpperCase() + patient.acuity.slice(1)}
                        </span>
                      </p>
                      <p><strong>Time Waiting:</strong> {patient.waitTime} min</p>
                    </div>
                    <div className="er-patient-actions">
                      <button className="btn-action btn-sm" onClick={() => {
                        // Begin treatment
                        alert(`Begin treatment for ${patient.name}`);
                      }}>
                        Begin Treatment
                      </button>
                      <button className="btn-action btn-sm btn-outline" onClick={() => {
                        // Transfer to bed
                        alert(`Transfer ${patient.name} to inpatient bed`);
                      }}>
                        Admit
                      </button>
                      <button className="btn-action btn-sm btn-outline" onClick={() => {
                        // Discharge
                        alert(`Discharge ${patient.name} from ER`);
                      }}>
                        Discharge
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No patients currently in ER</p>
              )}
            </div>
          </div>

          <div className="er-module">
            <h3>Ambulance Status</h3>
            <div className="ambulance-list">
              {Object.keys(ambulanceStatus).map(ambulanceId => (
                <div key={ambulanceId} className="ambulance-item">
                  <div className="ambulance-info">
                    <h4>Ambulance {ambulanceId}</h4>
                    <p><strong>Status:</strong>
                      <span className={`status-${ambulanceStatus[ambulanceId].status.toLowerCase()}`}>
                        {ambulanceStatus[ambulanceId].status}
                      </span>
                    </p>
                    {ambulanceStatus[ambulanceId].eta && (
                      <p><strong>ETA:</strong> {ambulanceStatus[ambulanceId].eta} min</p>
                    )}
                    {ambulanceStatus[ambulanceId].patientInfo && (
                      <div className="ambulance-patient-info">
                        <p><strong>Patient:</strong> {ambulanceStatus[ambulanceId].patientInfo.name}</p>
                        <p><strong>Condition:</strong> {ambulanceStatus[ambulanceId].patientInfo.condition}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="er-actions">
          <button className="btn-primary" onClick={() => {
            // Mass casualty protocol
            alert('Mass casualty protocol activated');
          }}>
            Mass Casualty Protocol
          </button>
          <button className="btn-outline" onClick={() => {
            // ER transfer coordination
            alert('Coordinate ER transfers');
          }}>
            Coordinate Transfers
          </button>
          <button className="btn-outline" onClick={() => {
            // ER metrics
            alert('View ER performance metrics');
          }}>
            ER Metrics
          </button>
        </div>
      </div>
    </div>
  );
}

// Reports Page
function ReportsPage() {
  const [reportType, setReportType] = React.useState('daily');
  const [dateRange, setDateRange] = React.useState('today');
  const [reportData, setReportData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      // In a real app, this would call an API
      // For now, we'll simulate with mock data
      const mockData = {
        daily: {
          today: {
            admissions: 24,
            discharges: 19,
            surgeries: 12,
            erVisits: 45,
            bedOccupancy: 78
          },
          week: {
            admissions: 156,
            discharges: 142,
            surgeries: 78,
            erVisits: 289,
            bedOccupancy: 76
          },
          month: {
            admissions: 624,
            discharges: 598,
            surgeries: 312,
            erVisits: 1156,
            bedOccupancy: 75
          }
        },
        monthly: {
          currentMonth: {
            admissions: 624,
            discharges: 598,
            avgLengthOfStay: 4.2,
            readmissionRate: 8.5,
            mortalityRate: 2.1,
            erVisits: 1156,
            surgeries: 312
          },
          lastMonth: {
            admissions: 589,
            discharges: 567,
            avgLengthOfStay: 4.0,
            readmissionRate: 8.2,
            mortalityRate: 2.3,
            erVisits: 1098,
            surgeries: 298
          }
        },
        financial: {
          currentMonth: {
            revenue: 2450000,
            expenses: 1980000,
            netIncome: 470000,
            roi: 12.3
          },
          ytd: {
            revenue: 18200000,
            expenses: 15600000,
            netIncome: 2600000,
            roi: 14.2
          }
        }
      }[reportType][dateRange] || {};

      setReportData(mockData);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Hospital Reports</h1>
      <div className="page-content">
        <div className="report-controls">
          <div className="control-group">
            <label htmlFor="reportType">Report Type:</label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="form-select"
            >
              <option value="daily">Daily Reports</option>
              <option value="monthly">Monthly Reports</option>
              <option value="financial">Financial Reports</option>
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="dateRange">Date Range:</label>
            <select
              id="dateRange"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-select"
            >
              {reportType === 'daily' && (
                <>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</>
                </>
              )}
              {reportType === 'monthly' && (
                <>
                  <option value="currentMonth">Current Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="quarter">Current Quarter</option>
                  <option value="year">Year to Date</option>
                </>
              )}
              {reportType === 'financial' && (
                <>
                  <option value="currentMonth">Current Month</option>
                  <option value="quarter">Current Quarter</option>
                  <option value="year">Year to Date</option>
                  <option value="ytd">Year to Date</option>
                </>
              )}
            </select>
          </div>
          <button
            className="btn-primary"
            onClick={generateReport}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>

        {reportData && (
          <div className="report-results">
            <h3>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report - {dateRange}</h3>
            <div className="report-grid">
              {Object.entries(reportData).map(([key, value]) => (
                <div key={key} className="report-metric">
                  <h4>{key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())
                    .trim()}</h4>
                  <div className="report-value">
                    {typeof value === 'number'
                      ? (key.includes('rate') || key.includes('roi')
                          ? `${value}%`
                          : key.includes('revenue') || key.includes('income') || key.includes('expenses')
                            ? `$${value.toLocaleString()}`
                            : value.toLocaleString())
                      : value
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!reportData && !loading && (
          <div className="report-placeholder">
            <p>Select report type and date range, then click "Generate Report" to view results.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Settings Page for Hospital Admin
function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('general');
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="page-container">
      <h1>Hospital Settings</h1>
      <div className="page-content">
        <div className="settings-tabs">
          <button
            className={`${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General Settings
          </button>
          <button
            className={`${activeTab === 'departments' ? 'active' : ''}`}
            onClick={() => setActiveTab('departments')}
          >
            Department Management
          </button>
          <button
            className={`${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            Staff Management
          </button>
          <button
            className={`${activeTab === 'equipment' ? 'active' : ''}`}
            onClick={() => setActiveTab('equipment')}
          >
            Equipment Management
          </button>
          <button
            className={`${activeTab === 'policies' ? 'active' : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            Policies & Procedures
          </button>
        </div>

        {activeTab === 'general' && (
          <div className="settings-section">
            <h2>General Hospital Settings</h2>
            <form className="settings-form" onSubmit={(e) => {
              e.preventDefault();
              // Save settings logic
              alert('General settings saved');
              setLoading(true);
              setTimeout(() => setLoading(false), 1000);
            }}>
              <div className="form-group">
                <label htmlFor="hospitalName">Hospital Name:</label>
                <input
                  type="text"
                  id="hospitalName"
                  defaultValue="General Hospital"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  rows="3"
                  defaultValue="123 Medical Center Drive\nHealthcare City, HC 12345"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  defaultValue="(555) 123-4567"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  defaultValue="info@generalhospital.com"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website:</label>
                <input
                  type="url"
                  id="website"
                  defaultValue="www.generalhospital.com"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="timezone">Timezone:</label>
                <select id="timezone" className="form-input">
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Standard Time</option>
                  <option value="PST">Pacific Standard Time</option>
                  <option value="GMT">Greenwich Mean Time</option>
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </button>
                <button type="button" className="btn-outline">
                  Reset to Defaults
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="settings-section">
            <h2>Department Management</h2>
            <div className="departments-list">
              <div className="department-item">
                <div className="department-header">
                  <h3>Emergency Department</h3>
                  <span className="dept-status active">Active</span>
                </div>
                <div className="department-details">
                  <p><strong>Head of Department:</strong> Dr. Sarah Chen</p>
                  <p><strong>Staff Count:</strong> 45 physicians, 120 nurses</p>
                  <p><strong>Bed Capacity:</strong> 30 beds</p>
                  <p><strong>Annual Visits:</strong> 85,000+</p>
                </div>
                <div className="department-actions">
                  <button className="btn-action" onClick={() => {
                    alert('Manage Emergency Department staff');
                  }}>
                    Manage Staff
                  </button>
                  <button className="btn-action" onClick={() => {
                    alert('View ER statistics');
                  }}>
                    View Statistics
                  </button>
                  <button className="btn-action" onClick={() => {
                    alert('Update ER protocols');
                  }}>
                    Update Protocols
                  </button>
                </div>
              </div>
              <div className="department-item">
                <div className="department-header">
                  <h3>Cardiology Department</h3>
                  <span className="dept-status active">Active</span>
                </div>
                <div className="department-details">
                  <p><strong>Head of Department:</strong> Dr. Michael Roberts</p>
                  <p><strong>Staff Count:</strong> 28 physicians, 65 nurses</p>
                  <p><strong>Bed Capacity:</strong> 45 beds</p>
                  <p><strong>Annual Procedures:</strong> 12,000+</p>
</div>))}
                  <button className="btn-action" onClick={() => {
                    alert('Manage Cardiology Department staff');
                  }}>
                    Manage Staff
                  </button>
                  <button className="btn-action" onClick={() => {
                    alert('View cardiology statistics');
                  }}>
                    View Statistics
                  </button>
                  <button className="btn-action" onClick={() => {
                    alert('Update cardiology protocols');
                  }}>
                    Update Protocols
                  </button>
                </div>
              </div>
              <div className="department-item">
                <div className="department-header">
                  <h3>Oncology Department</h3>
                  <span className="dept-status active">Active</span>
                </div>
                <div className="department-details">
                  <p><strong>Head of Department:</strong> Dr. Jennifer Lee</p>
                  <p><strong>Staff Count:</strong> 22 physicians, 48 nurses</p>
                  <p><strong>Bed Capacity:</strong> 30 beds</p>
                  <p><strong>Annual Treatments:</strong> 8,500+</p>
                </div>
                <div className="department-actions">
                  <button className="btn-action" onClick={() => {
                    alert('Manage Oncology Department staff');
                  }}>
                    Manage Staff
                  </button>
                  <button className="btn-action" onClick={() => {
                    alert('View oncology statistics');
                  }}>
                    View Statistics
                  </button>
                  <button className="btn-action" onClick={() => {
                    alert('Update oncology protocols');
                  }}>
                    Update Protocols
                  </button>
                </div>
              </div>
            </div>
            <button className="btn-primary" onClick={() => {
              alert('Add new department');
            }}>
              Add Department
            </button>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="settings-section">
            <h2>Staff Management</h2>
            <div className="staff-stats">
              <div className="stat-item">
                <span>Total Staff:</span> <strong>842</strong>
              </div>
              <div className="stat-item">
                <span>Physicians:</span> <strong>156</strong>
              </div>
              <div className="stat-item">
                <span>Nurses:</span> <strong>328</strong>
              </div>
              <div className="stat-item">
                <span>Allied Health:</span> <strong>189</strong>
              </div>
              <div className="stat-item">
                <span>Administrative:</span> <strong>169</strong>
              </div>
            </div>
            <div className="staff-actions">
              <button className="btn-primary" onClick={() => {
                alert('Add new staff member');
              }}>
                Add Staff Member
              </button>
              <button className="btn-outline" onClick={() => {
                alert('Schedule staff training');
              }}>
                Schedule Training
              </button>
              <button className="btn-outline" onClick={() => {
                alert('View staff performance reports');
              }}>
                Performance Reports
              </button>
            </div>
          </div>
        )}

        {activeTab === 'equipment' && (
          <div className="settings-section">
            <h2>Equipment Management</h2>
            <div className="equipment-stats">
              <div className="stat-item">
                <span>Total Equipment:</span> <strong>1,240</strong>
              </div>
              <div className="stat-item">
                <span>Active Equipment:</span> <strong>1,105</strong>
              </div>
              <div className="stat-item">
                <span>In Maintenance:</span> <strong>105</strong>
              </div>
              <div className="stat-item">
                <span>Average Age:</span> <strong>4.2 years</strong>
              </div>
            </div>
            <div className="equipment-actions">
              <button className="btn-primary" onClick={() => {
                alert('Schedule equipment maintenance');
              }}>
                Schedule Maintenance
              </button>
              <button className="btn-outline" onClick={() => {
                alert('Request new equipment');
              }}>
                Request New Equipment
              </button>
              <button className="btn-outline" onClick={() => {
                alert('View equipment utilization report');
              }}>
                Utilization Report
              </button>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="settings-section">
            <h2>Policies & Procedures</h2>
            <div className="policies-list">
              <div className="policy-item">
                <h3>Infection Control Protocol</h3>
                <p><strong>Last Updated:</strong> January 15, 2026</p>
                <p><strong>Version:</strong> 3.2</p>
                <p><strong>Category:</strong> Clinical Safety</p>
              </div>
              <div className="policy-item">
                <h3>Patient Privacy Policy (HIPAA)</h3>
                <p><strong>Last Updated:</strong> March 3, 2026</p>
                <p><strong>Version:</strong> 2.1</p>
                <p><strong>Category:</strong> Compliance</p>
              </div>
              <div className="policy-item">
                <h3>Emergency Response Plan</h3>
                <p><strong>Last Updated:</strong> February 28, 2026</p>
                <p><strong>Version:</strong> 4.0</p>
                <p><strong>Category:</strong> Emergency Preparedness</p>
              </div>
              <div className="policy-item">
                <h3>Medication Administration Guidelines</h3>
                <p><strong>Last Updated:</strong> January 22, 2026</p>
                <p><strong>Version:</strong> 1.8</p>
                <p><strong>Category:</strong> Pharmacy</p>
              </div>
            </div>
            <button className="btn-primary" onClick={() => {
              alert('Add new policy');
            }}>
              Add Policy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Login Page
function LoginPage({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Hospital Administrator Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="page-container">
      <h1>Page Not Found</h1>
      <div className="page-content">
        <p>The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}

const queryClientInstance = new QueryClient();

function App() {
  const { user, login, logout } = useAuthStore();

  if (!user) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage onLogin={login} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClientInstance}>
      <BrowserRouter>
        <div className="App">
          <header className="app-header">
            <div className="header-content">
              <div className="header-logo">
                <span className="logo-text">UPCHAR Hospital</span>
              </div>
              <nav className="header-nav">
                <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                <NavLink to="/patients" className="nav-link">Patient Management</NavLink>
                <NavLink to="/beds" className="nav-link">Bed Management</NavLink>
                <NavLink to="/er" className="nav-link">ER Dashboard</NavLink>
                <NavLink to="/reports" className="nav-link">Reports</NavLink>
                <NavLink to="/settings" className="nav-link">Settings</NavLink>
                <button onClick={logout} className="btn-logout">Logout</button>
              </nav>
            </div>
          </header>

          <main className="app-main">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/patients" element={<PatientManagementPage />} />
              <Route path="/beds" element={<BedManagementPage />} />
              <Route path="/er" element={<ERDashboardPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;