/*import React from 'react';
import Sidebar from '../components/Sidebar';

import PrescriptionForm from '../components/PrescriptionForm';
import HeaderDashboard from '../components/HeaderDashboard';

const PrescriptionPage = () => {
  return (
    <div className="flex">
      <Sidebar role="doctor" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <HeaderDashboard title="Générer une ordonnance" />
        <div className="p-6">
          <PrescriptionForm />
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;
*/
import React from 'react'
import HeaderDashboard from '../components/HeaderDashboard'
import Sidebar from '../components/Sidebar'
const PrescriptionPage = () => {
  return (
    <div className="flex">
  <Sidebar role="admin" />
  <div className="flex-1 bg-gray-100 min-h-screen flex flex-col">
    <HeaderDashboard title="Gestion utilisateurs" />
    <div className="p-6 space-y-4">
      {/* Development Message */}
      <div className="bg-yellow-100 text-yellow-800 text-sm p-4 rounded-lg shadow-sm">
        🚧 Cette page est en cours de développement.
      </div>

    </div>
  </div>
</div>

  )
}

export default PrescriptionPage