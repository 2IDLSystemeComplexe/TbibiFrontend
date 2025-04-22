import React from 'react';
import Sidebar from '../components/Sidebar';
import PatientsTable from '../components/PatientsTable';
import HeaderDashboard from '../components/HeaderDashboard';

const PatientPages = () => {
  return (
    <div className="flex">
      <Sidebar role="doctor" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <HeaderDashboard title="Mes Patients" />
        <div className="p-6">
          <PatientsTable />
        </div>
      </div>
    </div>
  );
};

export default PatientPages;
