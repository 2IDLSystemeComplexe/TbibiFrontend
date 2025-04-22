import React from 'react';
import Sidebar from '../components/Sidebar';

import HeaderDashboard from '../components/HeaderDashboard';

const staticAppointments = [
  {
    id: 1,
    patientName: 'Amel B.',
    date: '2025-04-25',
    time: '10:00',
    status: 'pending'
  },
  {
    id: 2,
    patientName: 'Mehdi K.',
    date: '2025-04-26',
    time: '14:30',
    status: 'confirmed'
  },
  {
    id: 3,
    patientName: 'Nour H.',
    date: '2025-04-27',
    time: '09:15',
    status: 'rejected'
  }
];

const AppointmentsPage = () => {
  const handleAction = (id, status) => {
    console.log(`RDV ${id} mis à jour : ${status}`);
    // TODO: appeler l'API plus tard
  };

  return (
    <div className="flex">
      <Sidebar role="doctor" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <HeaderDashboard title="Mes Rendez-vous" />
        <div className="p-6">
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">📅 Liste des rendez-vous</h2>

            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
                  <th className="px-4 py-2 border">Patient</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Heure</th>
                  <th className="px-4 py-2 border">Statut</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staticAppointments.map((rdv) => (
                  <tr key={rdv.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{rdv.patientName}</td>
                    <td className="px-4 py-2 border">{rdv.date}</td>
                    <td className="px-4 py-2 border">{rdv.time}</td>
                    <td className="px-4 py-2 border capitalize">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          rdv.status === 'pending'
                            ? 'bg-yellow-500'
                            : rdv.status === 'confirmed'
                            ? 'bg-green-600'
                            : 'bg-red-600'
                        }`}
                      >
                        {rdv.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      {rdv.status === 'pending' ? (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleAction(rdv.id, 'confirmed')}
                            className="bg-green-600 text-white text-sm px-3 py-1 rounded"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => handleAction(rdv.id, 'rejected')}
                            className="bg-red-600 text-white text-sm px-3 py-1 rounded"
                          >
                            Refuser
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-sm">Aucune action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-sm text-gray-500 mt-4">* Les rendez-vous confirmés ou refusés ne peuvent pas être modifiés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
