import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/useAuthStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from './services/api';
import RegisterPage from './pages/RegisterPage';

const queryClient = new QueryClient();

// Dashboard Page with real data fetching
function DashboardPage() {
  const { data: doctorProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ['doctorProfile'],
    queryFn: () => apiService.doctors.getProfile().then(res => res.data),
    retry: false
  });

  const { data: todaysAppointments = [], isLoading: loadingAppointments } = useQuery({
    queryKey: ['todaysAppointments'],
    queryFn: () => apiService.appointments.getToday().then(res => res.data),
    retry: false
  });

  const { data: patientsToday = [], isLoading: loadingPatients } = useQuery({
    queryKey: ['patientsToday'],
    queryFn: () => apiService.patients.getToday().then(res => res.data),
    retry: false
  });

  const { data: pendingCharts = [], isLoading: loadingCharts } = useQuery({
    queryKey: ['pendingCharts'],
    queryFn: () => apiService.medicalRecords.getPending().then(res => res.data),
    retry: false
  });

  const { data: unreadMessages = 0, isLoading: loadingMessages } = useQuery({
    queryKey: ['unreadMessages'],
    queryFn: () => apiService.chat.getUnreadCount().then(res => res.data),
    retry: false
  });

  const { data: todaysConsultations = [], isLoading: loadingConsultations } = useQuery({
    queryKey: ['todaysConsultations'],
    queryFn: () => apiService.consultations.getToday().then(res => res.data),
    retry: false
  });

  const isLoading = loadingProfile || loadingAppointments || loadingPatients || loadingCharts || loadingMessages || loadingConsultations;

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <h1>Doctor Dashboard</h1>
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1>Doctor Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Appointments</h3>
          <div className="stat-value">{todaysAppointments.length}</div>
          <div className="stat-label">Scheduled</div>
        </div>
        <div className="stat-card">
          <h3>Patients Today</h3>
          <div className="stat-value">{patientsToday.length}</div>
          <div className="stat-label">Seen</div>
        </div>
        <div className="stat-card">
          <h3>Pending Charts</h3>
          <div className="stat-value">{pendingCharts.length}</div>
          <div className="stat-label">To Review</div>
        </div>
        <div className="stat-card">
          <h3>Today's Consultations</h3>
          <div className="stat-value">{todaysConsultations.length}</div>
          <div className="stat-label">Scheduled</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn">
            <div className="action-icon">📅</div>
            <span>See Today's Schedule</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">👥</div>
            <span>View Patients</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">📝</div>
            <span>Chart Patient</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">💬</div>
            <span>Message Patient</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">📹</div>
            <span>Start Consultation</span>
          </button>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {todaysAppointments.slice(0, 2).map(appointment => (
            <div key={appointment.id} className="activity-item">
              <div className="activity-icon">📅</div>
              <div className="activity-content">
                <h3>{appointment.patientName}</h3>
                <p>{appointment.reason} • {appointment.specialty}</p>
                <time>{new Date(appointment.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
              </div>
            </div>
          ))}
          {patientsToday.slice(0, 2).map(patient => (
            <div key={patient.id} className="activity-item">
              <div className="activity-icon">👥</div>
              <div className="activity-content">
                <h3>{patient.name}</h3>
                <p>{patient.reasonForVisit}</p>
                <time>{new Date(patient.lastVisit).toLocaleDateString()}</time>
              </div>
            </div>
          ))}
          {pendingCharts.slice(0, 2).map(chart => (
            <div key={chart.id} className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <h3>Chart Update Needed</h3>
                <p>{chart.patientName}</p>
                <time>{new Date(chart.updatedAt).toLocaleDateString()}</time>
              </div>
            </div>
          ))}
          {todaysConsultations.slice(0, 2).map(consultation => (
            <div key={consultation.id} className="activity-item">
              <div className="activity-icon">📹</div>
              <div className="activity-content">
                <h3>{consultation.patientName}</h3>
                <p>{consultation.type} Consultation</p>
                <time>{new Date(consultation.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced Appointments Page
function AppointmentsPage() {
  const [activeTab, setActiveTab] = React.useState('today');
  const queryClient = useQueryClient();

  const { data: todaysAppointments = [], isLoading: loadingToday } = useQuery({
    queryKey: ['todaysAppointments'],
    queryFn: () => apiService.appointments.getToday().then(res => res.data),
    retry: false
  });

  const { data: tomorrowAppointments = [], isLoading: loadingTomorrow } = useQuery({
    queryKey: ['tomorrowAppointments'],
    queryFn: () => apiService.appointments.getTomorrow().then(res => res.data),
    retry: false
  });

  const { data: weekAppointments = [], isLoading: loadingWeek } = useQuery({
    queryKey: ['weekAppointments'],
    queryFn: () => apiService.appointments.getThisWeek().then(res => res.data),
    retry: false
  });

  const { data: upcomingAppointments = [], isLoading: loadingUpcoming } = useQuery({
    queryKey: ['upcomingAppointments'],
    queryFn: () => apiService.appointments.getUpcoming().then(res => res.data),
    retry: false
  });

  const { data: pastAppointments = [], isLoading: loadingPast } = useQuery({
    queryKey: ['pastAppointments'],
    queryFn: () => apiService.appointments.getPast().then(res => res.data),
    retry: false
  });

  const handleReschedule = (appointmentId) => {
    alert(`Reschedule functionality for appointment ${appointmentId} would go here`);
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await apiService.appointments.cancel(appointmentId);
        queryClient.invalidateQueries({ queryKey: ['todaysAppointments'] });
        queryClient.invalidateQueries({ queryKey: ['tomorrowAppointments'] });
        queryClient.invalidateQueries({ queryKey: ['weekAppointments'] });
        queryClient.invalidateQueries({ queryKey: ['upcomingAppointments'] });
        queryClient.invalidateQueries({ queryKey: ['pastAppointments'] });
      } catch (error) {
        alert('Failed to cancel appointment. Please try again.');
      }
    }
  };

  const viewAppointmentDetails = (appointmentId) => {
    alert(`View details for appointment ${appointmentId} would go here`);
  };

  if (loadingToday || loadingTomorrow || loadingWeek || loadingUpcoming || loadingPast) {
    return (
      <div className="page-container">
        <h1>Appointments</h1>
        <div className="page-content">
          <div className="loading">Loading appointments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Appointments</h1>
      <div className="page-content">
        <div className="tabs">
          <button className={`${activeTab === 'today' ? 'active' : ''}`} onClick={() => setActiveTab('today')}>
            Today ({todaysAppointments.length})
          </button>
          <button className={`${activeBarrier === 'tomorrow' ? 'active' : ''}`} onClick={() => setActiveBarmer('tomorrow')}>
            Tomorrow ({tomorrowAppointments.length})
          </button>
          <button className={`${activeTab === 'week' ? 'active' : ''}`} onClick={() => setActiveTab('week')}>
            This Week ({weekAppointments.length})
          </button>
          <button className={`${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>
            Upcoming ({upcomingAppointments.length})
          </button>
          <button className={`${activeTab === 'past' ? 'active' : ''}`} onClick={() => setActiveTab('past')}>
            Past ({pastAppointments.length})
          </button>
        </div>

        {activeTab === 'today' && (
          <div className="appointments-list">
            {todaysAppointments.length > 0 ? (
              todaysAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-info">
                    <h3>{appointment.patientName}</h3>
                    <p>{appointment.reason} • {appointment.specialty}</p>
                    <p>
                      <strong>{new Date(appointment.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                    </p>
                    {appointment.location && <p>{appointment.location}</p>}
                  </div>
                  <div className="appointment-actions">
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                    <button className="btn-action" onClick={() => handleReschedule(appointment.id)}>
                      Reschedule
                    </button>
                    <button className="btn-action btn-cancel" onClick={() => handleCancel(appointment.id)}>
                      Cancel
                    </button>
                    <button className="btn-action btn-view" onClick={() => viewAppointmentDetails(appointment.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-appointments">No appointments scheduled for today.</p>
            )}
          </div>
        )}

        {activeTab === 'tomorrow' && (
          <div className="appointments-list">
            {tomorrowAppointments.length > 0 ? (
              tomorrowAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  \;space
                  <div className="appointment-info">
                    <h3>{appointment.patientName}</h3>
                    <p>{appointment.reason} • {appointment.specialty}</p>
                    <p>
                      <strong>{new Date(appointment.scheduledAt).toLocaleDateString()} at {new Date(appointment.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                    </p>
                    {appointment.location && <p>{appointment.location}</p>}
                  </div>
                  <div className="appointment-actions">
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                    <button className="btn-action" onClick={() => handleReschedule(appointment.id)}>
                      Reschedule
                    </button>
                    <button className="btn-action btn-cancel" onClick={() => handleCancel(appointment.id)}>
                      Cancel
                    </button>
                    <button className="btn-action btn-view" onClick={() => viewAppointmentDetails(appointment.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-appointments">No appointments scheduled for tomorrow.</p>
            )}
          </div>
        )}

        {activeTab === 'week' && (
          <div className="appointments-list">
            {weekAppointments.length > 0 ? (
              weekAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-info">
                    <h3>{appointment.patientName}</h3>
                    <p>{appointment.reason} • {appointment.specialty}</p>
                    <p>
                      <strong>{new Date(appointment.scheduledAt).toLocaleDateString()} at {new Date(appointment.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                    </p>
                    {appointment.location && <p>{appointment.location}</p>}
                  </div>
                  <div className="appointment-actions">
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                    <button className="btn-action" onClick={() => handleReschedule(appointment.id)}>
                      Reschedule
                    </button>
                    <button className="btn-action btn-cancel" onClick={() => handleCancel(appointment.id)}>
                      Cancel
                    </button>
                    <button className="btn-action btn-view" onClick={() => viewAppointmentDetails(appointment.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-appointments">No appointments scheduled for this week.</p>
            )}
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="appointments-list">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-info">
                    <h3>{appointment.patientName}</h3>
                    <p>{appointment.reason} • {appointment.specialty}</p>
                    <p>
                      <strong>{new Date(appointment.scheduledAt).toLocaleDateString()} at {new Date(appointment.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                    </p>
                    {appointment.location && <p>{appointment.location}</p>}
                  </div>
                  <div className="appointment-actions">
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                    <button className="btn-action" onClick={() => handleReschedule(appointment.id)}>
                      Reschedule
                    </button>
                    <button className="btn-action btn-cancel" onClick={() => handleCancel(appointment.id)}>
                      Cancel
                    </button>
                    <button className="btn-action btn-view" onClick={() => viewAppointmentDetails(appointment.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-appointments">No upcoming appointments scheduled.</p>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="appointments-list">
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  %hindi: findName */}
                    <h3>{appointment.patientName}</h3>
                    <p>{appointment.reason} • {appointment.specialty}</p>
                    <p>
                      <strong>{new Date(appointment.scheduledAt).toLocaleDateString()} at {new Date(appointment.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                    </p>
                    {appointment.location && <p>{appointment.location}</p>}
                  .className="appointment-actions">
                    <span className="status status-completed">Completed</span>
                    <button className="btn-action btn-view" onClick={() => viewAppointmentDetails(appointment.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-appointments">No past appointments found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Patients Page
function PatientsPage() {
  const { data: patients = [], isLoading: loading, error } = useQuery({
    queryKey: ['patients'],
    queryFn: () => apiService.patients.getAll().then(res => res.data),
  });

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.medicalRecordNumber.toString().includes(searchTerm) ||
                         (patient.lastVisit && new Date(patient.lastVisit).toLocaleDateString().includes(searchTerm));

    if (filter === 'all') return matchesSearch;
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return patient.lastVisit && new Date(patient.lastVisit).toISOString().split('T')[0] === today && matchesSearch;
    }
    if (filter === 'with-appointments') {
      return patient.hasAppointmentToday && matchesSearch;
    }
    if (filter === 'needs-followup') {
      return patient.needsFollowup && matchesSearch;
    }
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="page-container">
        <h1>Patients</h1>
        <div className="page-content">
          <div className="loading">Loading patients...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Patients</h1>
        <div className="page-content">
          <p className="error-message">Error loading patients. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Patients</h1>
      <div className="page-content">
        <div className="patients-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-tabs">
            <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              All
            </button>
            <button className={`filter-tap ${filter === 'today' ? 'active' : ''}`} onClick={() => setFilter('today')}>
              Today
            </button>
            <button className={`filter-tab ${filter === 'with-appointments' ? 'active' : ''}`} onClick={() => setFilter('with-appointments')}>
              With Appointments Today
            </button>
            <button className={`filter-tab ${filter === 'needs-followup' ? 'active' : ''}`} onClick={() => setFilter('needs-followup')}>
              Needs Followup
            </button>
          </div>
        </div>

        {filteredPatients.length > 0 ? (
          <div className="patients-list">
            {filteredPatients.map(patient => (
              <div key={patient.id} className="patient-card">
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p>MRN: {patient.medicalRecordNumber}</p>
                  <p>Last Visit: {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'N/A'}</p>
                  <p>Phone: {patient.phone || 'N/A'}</p>
                </div>
                <div className="patient-actions">
                  {patient.hasAppointmentToday && (
                    <span className="status status-today">Today</span>
                  )}
                  {!patient.hasAppointmentToday && patient.needsFollowup && (
                    <span className="status status-followup">Followup Needed</span>
                  )}
                  <button className="btn-action" onClick={() => {
                    // View patient details
                    alert(`Viewing details for patient ${patient.id}`);
                  }}>
                    View Chart
                  </button>
                  <button className="btn-action" onClick={() => {
                    // Schedule appointment
                    alert(`Scheduling appointment for patient ${patient.id}`);
                  }}>
                    Schedule
                  </button>
                  <button className="btn-action" onClick={() => {
                    // Message patient
                    alert(`Messaging patient ${patient.id}`);
                  }}>
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-patients">No patients found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

// Enhanced Medical Records Page
function MedicalRecordsPage() {
  const { data: medicalRecords = [], isLoading: loading, error } = useQuery({
    queryKey: ['medicalRecords'],
    queryFn: () => apiService.medicalRecords.getAll().then(res => res.data),
  });

  const [filter, setFilter] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'all') return matchesSearch;
    if (filter === 'lab-results') return record.type === 'Lab Results' && matchesSearch;
    if (filter === 'imaging') return record.type === 'Imaging' && matchesSearch;
    if (filter === 'vaccinations') return record.type === 'Vaccination' && matchesSearch;
    if (filter === 'prescriptions') return record.type === 'Prescription' && matchesSearch;
    if (filter === 'visit-summaries') return record.type === 'Visit Summary' && matchesSearch;
    return matchesSearch;
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

  if (error) {
    return (
      <div className="page-container">
        <h1>Medical Records</h1>
        <div className="page-content">
          <p className="error-message">Error loading medical records. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Medical Records</h1>
      <div className="page-content">
        <div className="records-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="record-filters">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              All Records
            </button>
            <button className={`filter-btn ${filter === 'lab-results' ? 'active' : ''}`} onClick={() => setFilter('lab-results')}>
              Lab Results
            </button>
            <button className={`filter-btn ${filter === 'imaging' ? 'active' : ''}`} onClick={() => setFilter('imaging')}>
              Imaging
            </button>
            <button className={`filter-btn ${filter === 'vaccinations' ? 'active' : ''}`} onClick={() => setFilter('vaccinations')}>
              Vaccinations
            </button>
            <button className={`filter-btn ${filter === 'prescriptions' ? 'active' : ''}`} onClick={() => setFilter('prescriptions')}>
              Prescriptions
            </button>
            <button className={`filter-btn ${filter === 'visit-summaries' ? 'active' : ''}`} onClick={() => setFilter('visit-summaries')}>
              Visit Summaries
            </button>
          </div>
          <button className="btn-primary" onClick={() => {
            // Upload record logic
            alert('Upload medical record functionality would go here');
          }}>
            Upload Record
          </button>
        </div>

        {filteredRecords.length > 0 ? (
          <div className="records-list">
            {filteredRecords.map(record => (
              <div key={record.id} className="record-card">
                <div className="record-info">
                  <h3>{record.title}</h3>
                  <p><strong>Type:</strong> {record.type}</p>
                  <p><strong>Date:</strong> {new Date(record.createdAt).toLocaleDateString()}</p>
                  {record.description && <p><strong>Description:</strong> {record.description}</p>}
                  {record.provider && <p><strong>Provider:</strong> {record.provider}</p>}
                  {record.result && <p><strong>Result:</strong> {record.result}</p>}
                </div>
                <div className="record-actions">
                  <button className="btn-action" onClick={() => {
                    // View record details
                    alert(`Viewing details for record ${record.id}`);
                  }}>
                    View Details
                  </button>
                  <button className="btn-action" onClick={() => {
                    // Share record
                    alert(`Sharing record ${record.id}`);
                  }}>
                    Share
                  </button>
                  <button className="btn-action btn-download" onClick={() => {
                    // Download record
                    alert(`Downloading record ${record.id}`);
                  }}>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No Medical Records Found</h3>
            <p>You don't have any medical records yet. Records will appear here as they are added by your healthcare providers.</p>
            <button className="btn-primary" onClick={() => {
              // Upload record
              alert('Upload medical record functionality would go here');
            }}>
              Add Record
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Prescriptions Page
function PrescriptionsPage() {
  const { data: prescriptions = [], isLoading: loading, error } = useQuery({
    queryKey: ['prescriptions'],
    queryFn: () => apiService.pharmacy.getPrescriptions().then(res => res.data),
  });

  const [filter, setFilter] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.prescribingDoctor.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return prescription.status === 'active' && matchesSearch;
    if (filter === 'completed') return prescription.status === 'completed' && matchesSearch;
    if (filter === 'expired') return prescription.status === 'expired' && matchesSearch;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="page-container">
        <h1>Prescriptions</h1>
        <div className="page-content">
          <div className="loading">Loading prescriptions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Prescriptions</h1>
        <div className="page-content">
          <p className="error-message">Error loading prescriptions. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Prescriptions</h1>
      <div className="page-content">
        <div className="prescriptions-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-tabs">
            <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}>
              All
            </button>
            <button className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}>
              Active
            </button>
            <button className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}>
              Completed
            </button>
            <button className={`filter-tab ${filter === 'expired' ? 'active' : ''}`}
                    onClick={() => setFilter('expired')}>
              Expired
            </button>
          </div>
        </div>

        {filteredPrescriptions.length > 0 ? (
          <div className="prescriptions-list">
            {filteredPrescriptions.map(prescription => (
              <div key={prescription.id} className={`prescription-card ${prescription.status.toLowerCase()}`}>
                <div className="prescription-header">
                  <h3>{prescription.medicationName}</h3>
                  <div className="prescription-status">
                    <span className={`status-tag ${prescription.status.toLowerCase()}`}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                    {prescription.refillsRemaining > 0 && (
                      <span className="refills-remaining">
                        {prescription.refillsRemaining} refill{prescription.refillsRemaining !== 1 ? 's' : ''} left
                      </span>
                    )}
                  </div>
                </div>
                .className="prescription-details">
                  <p><strong>Prescribed by:</strong> Dr. {prescription.prescribingDoctor}</p>
                  <p><strong>Date issued:</strong> {new Date(prescription.dateIssued).toLocaleDateString()}</p>
                  <p><strong>Expires:</strong> {new Date(prescription.expiryDate).toLocaleDateString()}</p>
                  <p><strong>Dosage:</strong> {prescription.dosage}</p>
                  <p><strong>Quantity:</strong> {prescription.quantity} {prescription.unit}</p>
                  {prescription.instructions && (
                    <p><strong>Instructions:</strong> {prescription.instructions}</p>
                  )}
                </div>
                <div className="prescription-actions">
                  {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                    <button className="btn-outline" onClick={() => {
                      // Renew prescription logic
                      alert(`Renewing prescription for ${prescription.medicationName}`);
                    }}>
                      Renew Prescription
                    </button>
                  )}
                  {prescription.status === 'active' && (
                    <button className="btn-secondary" onClick={() => {
                      // View details logic
                      alert(`Viewing details for prescription ${prescription.id}`);
                    }}>
                      View Details
                    </button>
                  )}
                  {prescription.status !== 'expired' && (
                    <button className="btn-outline btn-danger" onClick={() => {
                      if (window.confirm('Are you sure you want to mark this prescription as expired?')) {
                        // Mark as expired logic
                        alert(`Marking prescription ${prescription.id} as expired`);
                      }
                    }}>
                      Mark as Expired
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-prescriptions">No prescriptions found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

// Enhanced Consultations Page
function ConsultationsPage() {
  const [activeTab, setActiveTab] = React.useState('upcoming');
  const queryClient = useQueryClient();

  const { data: upcomingConsultations = [], isLoading: loadingUpcoming } = useQuery({
    queryKey: ['upcomingConsultations'],
    queryFn: () => apiService.consultations.getUpcoming().then(res => res.data),
  });

  const { data: pastConsultations = [], isLoading: loadingPast } = useQuery({
    queryKey: ['pastConsultations'],
    queryFn: () => apiService.consultations.getPast().then(res => res.data),
  });

  const handleStartConsultation = (consultationId) => {
    alert(`Start consultation ${consultationId} would go here`);
  };

  const handleEndConsultation = (consultationId) => {
    if (window.confirm('Are you sure you want to end this consultation?')) {
      // End consultation logic
      alert(`Ending consultation ${consultationId}`);
    }
  };

  const viewConsultationDetails = (consultationId) => {
    alert(`View details for consultation ${consultationId} would go here`);
  };

  if (loadingUpcoming || loadingPast) {
    return (
      <div className="page-container">
        <h1>Consultations</h1>
        <div className="page-content">
          <div className="loading">Loading consultations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Consultations</h1>
      <div className="page-content">
        <div className="tabs">
          <button className={`${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>
            Upcoming ({upcomingConsultations.length})
          </button>
          <button className={`${activeTab === 'past' ? 'active' : ''}`} onClick={() => setActiveTab('past')}>
            Past ({pastConsultations.length})
          </button>
        </div>

        {activeTab === 'upcoming' && (
          <div className="consultations-list">
            {upcomingConsultations.length > 0 ? (
              upcomingConsultations.map(consultation => (
                <div key={consultation.id} className="consultation-card">
                  <div className="consultation-info">
                    <h3>{consultation.patientName}</h3>
                    <p>{consultation.type} Consultation</p>
                    <p>
                      <strong>{new Date(consultation.scheduledAt).toLocaleDateString()} at {new Date(consultation.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                    </p>
                    {consultation.notes && <p><strong>Notes:</strong> {consultation.notes}</p>}
                  </div>
                  <div className="consultation-actions">
                    <span className={`status ${consultation.status.toLowerCase()}`}>
                      {consultation.status}
                    </span>
                    <button className="btn-action" onClick={() => handleStartConsultation(consultation.id)}>
                      Start Consultation
                    </button>
                    <button className="btn-action" onClick={() => viewConsultationDetails(consultation.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-consultations">No upcoming consultations scheduled.</p>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="consultations-list">
            {pastConsultations.length > 0 ? (
              pastConsultations.map(consultation => (
                <div key={consultation.id} className="consultation-card">
                  <div className="consultation-info">
                    <h3>{consultation.patientName}</h3>
                    <p>{consultation.type} Consultation</p>
                    <p>
                      <strong>{new Date(consultation.scheduledAt).toLocaleDateString()} at {new Date(consultation.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                    </p>
                    {consultation.notes && <p><strong>Notes:</strong> {consultation.notes}</p>}
                  </div>
                  <div className="consultation-actions">
                    <span className="status status-completed">Completed</span>
                    <button className="btn-action" onClick={() => handleEndConsultation(consultation.id)}>
                      End Consultation
                    </button>
                    <button className="btn-action" onClick={() => viewConsultationDetails(consultation.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-consultations">No past consultations found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Notifications Page
function NotificationsPage() {
  const { data: notifications = [], isLoading: loading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => apiService.notifications.getAll().then(res => res.data),
  });

  const { data: unreadCount = 0, isLoading: loadingCount } = useQuery({
    queryKey: ['unredCount'],
    queryFn: () => apiService.notifications.getUnreadCount().then(res => res.data),
  });

  const [filter, setFilter] = React.useState('all');
  const [showOnlyUnread, setShowOnlyUnread] = React.useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter ||
                         (filter === 'unread' && !notification.isRead) ||
                         (filter === 'read' && notification.isRead);
    return showOnlyUnread ? !notification.isRead && matchesFilter : matchesFilter;
  });

  if (loading || loadingCount) {
    return (
      <div className="page-container">
        <h1>Notifications</h1>
        <div className="page-content">
          <div className="loading">Loading notifications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Notifications</h1>
        <div className="page-content">
          <p className="error-message">Error loading notifications. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Notifications</h1>
      <div className="page-content">
        <div className="notifications-header">
          <div className="notification-stats">
            <span className="unread-count">
              {unreadCount} unread
            </span>
            <span className="divider">|</span>
            <span className="total-count">
              {notifications.length} total
            </span>
          </div>
          <div className="notification-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}>
              All
            </button>
            <button
              className={`filter-btn ${filter === 'urgent' ? 'active' : ''}`}
              onClick={() => setFilter('urgent')}>
              Urgent
            </button>
            <button
              className={`filter-btn ${filter === 'appointment' ? 'active' : ''}`}
              onClick={() => setFilter('appointment')}>
              Appointments
            </button>
            <button
              className={`filter-btn ${filter === 'prescription' ? 'active' : ''}`}
              onClick={() => setFilter('prescription')}>
              Prescriptions
            </button>
            <button
              className={`filter-btn ${filter === 'lab_result' ? 'active' : ''}`}
              onClick={() => setFilter('lab_result')}>
              Lab Results
            </button>
            <button
              className={`filter-btn ${filter === 'promo' ? 'active' : ''}`}
              onClick={() => setFilter('promo')}>
              Promotions & Offers
            </button>
            <button
              className={`filter-btn ${filter === 'system' ? 'active' : ''}`}
              onClick={() => setFilter('system')}>
              System Updates
            </button>
          </div>
          <div className="notification-actions">
            <button
              className="btn-outline"
              onClick={() => {
                // Mark all as read logic
                if (window.confirm('Mark all notifications as read?')) {
                  // apiService.notifications.markAllAsRead();
                  alert('All notifications marked as read');
                }
              }}>
              Mark All as Read
            </button>
            <button
              className="btn-outline"
              onClick={() => setShowOnlyUnread(!showOnlyUnread)}>
              {showOnlyUnread ? 'Show All' : 'Show Unread Only'}
            </button>
          </div>
        </div>

        {filteredNotifications.length > 0 ? (
          <div className="notifications-list">
            {filteredNotifications.map(notification => (
              <div key={notification.id} className={`notification-item ${notification.isRead ? 'read' : 'unread'} ${notification.priority}`}>
                <div className="notification-header">
                  <div className="notification-icon">
                    {notification.icon || '📢'}
                  </div>
                  <div className="notification-content">
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <small className="notification-time">
                      {new Date(notification.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
                {notification.actionRequired && (
                  <div className="notification-actions">
                    {notification.actionButtons?.map((action, index) => (
                      <button
                        key={index}
                        className={`btn-action ${action.type === 'primary' ? 'primary' : 'secondary'}`}
                        onClick={() => {
                          // ActionUtil.handleAction(action, notification.id);
                        }}>
                        {action.label}
                      </button>
                    )) || []}
                  </div>
                )}
                <div className="notification-toggle">
                  <input
                    type="checkbox"
                    checked={notification.isRead}
                    onChange={(e) => {
                      // Toggle read status logic
                      const newStatus = e.target.checked;
                      // apiService.notifications.markAsRead(notification.id, !newStatus);
                      notification.isRead = newStatus;
                    }}
                  />
                  <label>{notification.isRead ? 'Mark as unread' : 'Mark as read'}</label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-notifications">No notifications found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

// Enhanced Settings Page
function SettingsPage() {
  const { data: profile = {}, isLoading: loadingProfile, error: errorProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => apiService.users.getProfile().then(res => res.data),
  });

  const { data: preferences = {}, isLoading: loadingPreferences, error: errorPreferences } = useQuery({
    queryKey: ['userPreferences'],
    queryFn: () => apiService.users.getPreferences().then(res => res.data),
  });

  const [editingProfile, setEditingProfile] = React.useState(false);
  const [editingPreferences, setEditingPreferences] = React.useState(false);
  const [profileForm, setProfileForm] = React.useState({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    email: profile.email || '',
    phone: profile.phone || '',
    dateOfBirth: profile.dateOfBirth || '',
    gender: profile.gender || '',
    address: profile.address || ''
  });

  const [preferencesForm, setPreferencesForm] = React.useState({
    emailNotifications: preferences.emailNotifications ?? true,
    smsNotifications: preferences.smsNotifications ?? false,
    appointmentReminders: preferences.appointmentReminders ?? true,
    healthTips: preferences.healthTips ?? true,
    promotionalOffers: preferences.promotionalOffers ?? false,
    dataSharing: preferences.dataSharing ?? false,
    profileVisibility: preferences.profileVisibility ?? 'private',
    language: preferences.language || 'en',
    timezone: preferences.timezone || 'UTC'
  });

  const isLoading = loadingProfile || loadingPreferences;

  if (isLoading) {
    return (
      <div className="page-container">
        <h1>Settings</h1>
        <div className="page-content">
          <div className="loading">Loading settings...</div>
        </div>
      </div>
    );
  }

  if (errorProfile || errorPreferences) {
    return (
      <div className="page-container">
        <h1>Settings</h1>
        <div className="page-content">
          <p className="error-message">Error loading settings. Please try again later.</p>
        </div>
      </div>
    );
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.targect;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, type } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
    setPreferencesForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditingProfile(false);
    try {
      // Update profile logic would go here
      await apiService.users.updateProfile(profileForm);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditingPreferences(false);
    try {
      // Update preferences logic would go here
      await apiService.users.updatePreferences(preferencesForm);
      alert('Preferences updated successfully!');
    } catch (error) {
      alert('Failed to update preferences. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <h1>Settings</h1>
      <div className="page-content">
        <div className="settings-tabs">
          <button className={`tab-btn ${!editingProfile && !editingPreferences ? 'active' : ''}`}
                  onClick={() => {
                    setEditingProfile(false);
                    setEditingPreferences(false);
                  }}>
            Overview
          </button>
          <button className={`tab-btn ${editingProfile ? 'active' : ''}`}
                  onClick={() => {
                    setEditingProfile(true);
                    setEditingPreferences(false);
                  }}>
            Profile Information
          </button>
          <button className={`tab-btn ${editingPreferences ? 'active' : ''}`}
                  onClick={() => {
                    setEditingProfile(false);
                    setEditingPreferences(true);
                  }}>
            Preferences & Privacy
          </button>
        </div>

        {!editingProfile && !editingPreferences ? (
          <div className="settings-overview">
            <div className="settings-section">
              <h2>Account Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <h3>Full Name</h3>
                  <p>{profile.firstName} {profile.lastName}</p>
                </div>
                <div className="info-item">
                  <h3>Email</h3>
                  <p>{profile.email}</p>
                </div>
                <div className="info-item">
                  <h3>Phone Number</h3>
                  <p>{profile.phone || 'Not provided'}</p>
                </div>
                <div className="info-item">
                  <h3>Date of Birth</h3>
                  <p>{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
                </div>
                <div className="info-item">
                  <h3>Gender</h3>
                  <p>{profile.gender || 'Not specified'}</p>
                </div>
                <div className="info-item">
                  <h3>Address</h3>
                  <p>{profile.address || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h2>Account Security</h2>
              <div className="security-info">
                <div className="security-item">
                  <h3>Last Password Change</h3>
                  <p>{profile.passwordChangedAt ? new Date(profile.passwordChangedAt).toLocaleDateString() : 'Never'}</p>
                </div>
                <div className="security-item">
                  <h3>Two-Factor Authentication</h3>
                  <p>{profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div className="security-item">
                  <h3>Active Sessions</h3>
                  <p>{profile.activeSessions || 0} session{profile.activeSessions !== 1 ? 's' : ''} active</p>
                </div>
              </div>
              <div className="security-actions">
                <button className="btn-outline" onClick={() => {
                  // Change password logic
                  alert('Change password functionality');
                }}>
                  Change Password
                </button>
                <button className="btn-outline" onClick={() => {
                  // Manage sessions logic
                  alert('Manage active sessions');
                }}>
                  Manage Sessions
                </button>
                <button className="btn-danger" onClick={() => {
                  if (window.confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
                    // Deactivate account logic
                    alert('Account deactivated');
                  }
                }}>
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {editingProfile && (
              <div className="settings-form">
                <h2>Edit Profile Information</h2>
                <form onSubmit={handleSaveProfile} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={profileForm.firstName}
                      onChange={handleProfileChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={profileForm.lastName}
                      onChange=handleProfileChange
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileForm.email}
                      onChange=handleProfileChange
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileForm.phone}
                      onChange=handleProfileChange
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={profileForm.dateOfBirth}
                      onChange=handleProfileChange
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={profileForm.gender}
                      onChange=handleProfileChange
                      className="form-input"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={profileForm.address}
                      onChange=handleProfileChange
                      rows="3"
                      className="form-input"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                    <button type="button" onClick={() => setEditingProfile(false)} className="btn-outline">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {editingPreferences && (
              <div className="settings-form">
                <h2>Notification & Privacy Preferences</h2>
                <form onSubmit={handleSavePreferences} className="preferences-form">
                  <div className="preferences-section">
                    <h3>Notifications</h3>
                    <div className="preference-group">
                      <label htmlFor="emailNotifications">
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          name="emailNotifications"
                          checked={preferencesForm.emailNotifications}
                          onChange=handlePreferenceChange
                        />
                        Email notifications
                      </label>
                    </div>
                    <div className="preference-group">
                      <label htmlFor="smsNotifications">
                        <input
                          type="checkbox"
                          id="smsNotifications"
                          name="smsNotifications"
                          checked={preferencesForm.smsNotifications}
                          onChange=handlePreferenceChange
                        />
                        SMS notifications
                      </label>
                    </div>
                    <div className="preference-group">
                      <label htmlFor="appointmentReminders">
                        <input
                          type="checkbox"
                          id="appointmentReminders"
                          name="appointmentReminders"
                          checked={preferencesForm.appointmentReminders}
                          onChange=handlePreferenceChange
                        />
                        Appointment reminders
                      </label>
                    </div>
                    <div className="preference-group">
                      <label htmlFor="healthTips">
                        <input
                          type="checkbox"
                          id="healthTips"
                          name="healthTips"
                          checked={preferencesForm.healthTips}
                          onChange=handlePreferenceChange
                        />
                        Weekly health tips
                      </label>
                    </div>
                    <div className="preference-group">
                      <label htmlFor="promotionalOffers">
                        <input
                          type="checkbox"
                          id="promotionalOffers"
                          name="promotionalOffers"
                          checked={preferencesForm.promotionalOffers}
                          onChange=handlePreferenceChange
                        />
                        Promotional offers
                      </label>
                    </div>
                    <div className="preference-group">
                      <label htmlFor="dataSharing">
                        <input
                          type="checkbox"
                          id="dataSharing"
                          name="dataSharing"
                          checked={preferencesForm.dataSharing}
                          onChange=handlePreferenceChange
                        />
                        Data sharing
                      </label>
                    </div>
                    <div className="preference-group">
                      <label htmlFor="profileVisibility">
                        <select
                          id="profileVisibility"
                          name="profileVisibility"
                          value={preferencesForm.profileVisibility}
                          onChange=handlePreferenceChange
                          className="form-input"
                        >
                          <option value="private">Private</option>
                          <option value="friends">Friends Only</option>
                          <option value="public">Public</option>
                        </select>
                        Profile visibility
                      </label>
                    </div>
                    .(div className="preference-group">
                      <label htmlFor="language">
                        <select
                          id="language"
                          name="language"
                          value={preferencesForm.language}
                          onChange=handlePreferenceChange
                          className="form-input"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                        Language
                      </label>
                    </div>
                    <div className="preference-group">
                      <label htmlFor="timezone">
                        <select
                          id="timezone"
                          name="timezone"
                          value={preferencesForm.timezone}
                          onChange=handlePreferenceChange
                          className="form-input"
                        >
                          <option value="UTC">UTC</option>
                          <option value="EST">Eastern Standard Time</option>
                          <option value="PST">Pacific Standard Time</option>
                          <option value="GMT">Greenwich Mean Time</option>
                        </select>
                        Timezone
                      </label>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                    <button type="button" onClick={() => setEditingPreferences(false)} className="btn-outline">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Enhanced Chat Page
function ChatPage() {
  const [conversations, setConversations] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedConversationId, setSelectedConversationId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [typingUsers, setTypingUsers] = React.useState<string[]>([]);
  const messagesEndRef = React.useRef(null);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    // Load conversations
    const loadConversations = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.chat.getConversations();
        setConversations(response.data);
        if (response.data.length > 0) {
          setSelectedConversationId(response.data[0].id);
          loadMessages(response.data[0].id);
        }
      } catch (error) {
        console.error('Failed to load conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  React.useEffect(() => {
    if (selectedConversationId) {
      // Load messages for selected conversation
      const loadMessages = async (conversationId: string) => {
        setIsLoading(true);
        try {
          const response = await apiService.chat.getMessages(conversationId);
          setMessages(response.data);
        } catch (error) {
          console.error('Failed to load messages:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadMessages(selectedConversationId);
    }
  }, [selectedConversationId]);

  // Simulate typing indicator (would be replaced with real-time updates)
  React.useEffect(() => {
    if (selectedConversationId) {
      const typingInterval = setInterval(() => {
        // Simulate random typing indicators
        if (Math.random() > 0.7) {
          setTypingUsers(['Someone is typing...']);
        } else {
          setTypingUsers([]);
        }
      }, 3000);
      return () => clearInterval(typingInterval);
    }
  }, [selectedConversationId]);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedConversationId) return;

    try {
      const response = await apiService.chat.sendMessage(selectedConversationId, inputValue);
      setMessages(prev => [...prev, response.data]);
      setInputValue('');
      // Scroll to bottom after sending
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e); // Actually send the message when Enter is pressed
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <h1>Messages</h1>
        <div className="page-content">
          <div className="loading">Loading messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Messages</h1>
      <div className="page-content">
        <div className="chat-container">
          <div className="chat-sidebar">
            <h3>Conversations</h3>
            <button className="btn-primary" onClick={() => {
              // Start new conversation
              alert('Start new conversation functionality would go here');
            }}>
              New Message
            </button>
            <div className="conversations-list">
              {conversations.length > 0 ? (
                conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`conversation-item ${conversation.id === selectedConversationId ? 'active' : ''}`}
                    onClick={() => setSelectedConversationId(conversation.id)}
                  >
                    <div className="conversation-avatar">
                      {conversation.participants[0]?.name.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="conversation-info">
                      <h4>{conversation.participants[0]?.name || 'Unknown User'}</h4>
                      <p className="conversation-preview">{conversation.lastMessage || 'No messages yet'}</p>
                    </div>
                    <div className="conversation-meta">
                      <small>{conversation.lastUpdated ? new Date(conversation.lastUpdated).toLocaleTimeString() : ''}</small>
                      {conversation.unreadCount > 0 && (
                        <span className="unread-badge">{conversation.unreadCount}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">No conversations yet. Start a new conversation!</p>
              )}
            </div>
          </div>
          <div className="chat-main">
            {!selectedConversationId ? (
              <div className="chat-empty">
                <h3>Select a conversation to get started</h3>
                <p>Choose a conversation from the list or start a new one.</p>
              </div>
            ) : (
              <div>
                <div className="chat-header">
                  <div className="chat-user-info">
                    <div className="chat-user-avatar">
                      {conversations.find(c => c.id === selectedConversationId)?.participants[0]?.name.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="chat-user-details">
                      <h4>{conversations.find(c => c.id === selectedConversationId)?.participants[0]?.name || 'Unknown User'}</h4>
                      <p className="chat-user-status">Online</p>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button className="btn-icon" onClick={() => {
                      // Video call
                      alert('Start video call');
                    }}>
                      📹
                    </button>
                    <button className="btn-icon" onClick={() => {
                      // Audio call
                      alert('Start audio call');
                    }}>
                      📞
                    </button>
                    <button className="btn-icon" onClick={() => {
                      // Contact info
                      alert('View contact info');
                    }}>
                      ℹ️
                    </button>
                  </div>
                </div>

                <div className="chat-window">
                  <div className="chat-messages">
                    {/* Group messages by date */}
                    {messages.reduce((groups, message) => {
                      const date = new Date(message.timestamp).toDateString();
                      if (!groups[date]) {
                        groups[date] = [];
                      }
                      groups[date].push(message);
                      return groups;
                    }, {} as Record<string, typeof messages>)}

                    {(Object.keys(groups) as string[]).map((date, dateIndex) => (
                      <>
                        {/* Date header */}
                        <div key={`date-${date}`} className="message-date-header">
                          <span>{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>

                        {/* Messages for this date */}
                        {groups[date].map((message, msgIndex) => (
                          <div key={`${date}-${msgIndex}`} className={`message ${message.senderId === 'user' ? 'message-sent' : 'message-received'}`}>
                            <div className="message-content">
                              <p>{message.content}</p>
                              <small className="message-time">{new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                            </div>
                          </div>
                        ))}
                      </>
                    ))}

                    {/* Typing indicator */}
                    {typingUsers.map((user, index) => (
                      <div key={index} className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <span>{user}</span>
                      </div>
                    ))}

                    {messages.length === 0 && typingUsers.length === 0 && (
                      <div ref={messagesEndRef} className="chat-empty">
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    )}
                  </div>

                  <form onSubmit={sendMessage} className="chat-input-form">
                    <div className="chat-input-wrapper">
                      <div className="chat-input-actions">
                        <button type="button" className="btn-icon" onClick={() => {
                          // Emoji picker
                          alert('Emoji picker would open here');
                        }}>
                          😊
                        </button>
                        <button type="button" className="btn-icon" onClick={() => {
                          // File attachment
                          alert('File picker would open here');
                        }}>
                          📎
                        </button>
                      </div>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="chat-input"
                      />
                      <button type="submit" className="btn-primary">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              )}
            }
          </div>
        </div>
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
        <h-card">
        <h2>Doctor Sign In</h2>
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
                <span className="logo-text">UPCHAR Doctor</span>
              </div>
              <nav className="header-nav">
                <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                <NavLink to="/appointments" className="nav-link">Appointments</NavLink>
                <NavLink to="/patients" className="nav-link">Patients</NavLink>
                <NavLink to="/medical-records" className="nav-link">Medical Records</NavLink>
                <NavLink to="/prescriptions" className="nav-link">Prescriptions</NavLink>
                <NavLink to="/consultations" className="nav-link">Consultations</NavLink>
                <NavLink to="/notifications" className="nav-link">Notifications</NavLink>
                <NavLink to="/settings" className="nav-link">Settings</NavLink>
                <NavLink to="/chat" className="nav-link">Messages</NavLink>
                <button onClick={logout} className="btn-logout">Logout</button>
              </nav>
            </div>
          </header>

          <main className="app-main">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/medical-records" element={<MedicalRecordsPage />} />
              <Route path="/prescriptions" element={<PrescriptionsPage />} />
              <Route path="/consultations" element={<ConsultationsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;