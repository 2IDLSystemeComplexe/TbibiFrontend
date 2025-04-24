import React, { useEffect, useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import HeaderDashboard from '../components/HeaderDashboard';
import { AppContext } from '../context/AppContext';
import { getUserAppointments, updateAppointmentStatus } from '../services/AppointmentService';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getUserAppointments(backendUrl);
        setAppointments(data);
      } catch (error) {
        console.error('Erreur de chargement des rendez-vous:', error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await updateAppointmentStatus(backendUrl, id, status);
      const updatedAppointments = await getUserAppointments(backendUrl);
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error.message);
    }
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
                {appointments.map((rdv) => (
                  <tr key={rdv._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{rdv.patient?.username || 'Inconnu'}</td>
                    <td className="px-4 py-2 border">{rdv.date?.slice(0, 10)}</td>
                    <td className="px-4 py-2 border">{rdv.time}</td>
                    <td className="px-4 py-2 border capitalize">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          rdv.status === 'Pending'
                            ? 'bg-yellow-500'
                            : rdv.status === 'Confirmed'
                            ? 'bg-green-600'
                            : 'bg-red-600'
                        }`}
                      >
                        {rdv.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border space-y-2">
                      {rdv.status === 'Pending' ? (
                        <div className="space-x-2 text-lg">
                          <button
                            onClick={() => handleAction(rdv._id, 'Confirmed')}
                            className="text-green-600 hover:bg-green-100 p-1 rounded-full"
                            title="Confirmer"
                          >
                            ✅
                          </button>
                          <button
                            onClick={() => handleAction(rdv._id, 'Cancelled')}
                            className="text-red-600 hover:bg-red-100 p-1 rounded-full"
                            title="Refuser"
                          >
                            ❌
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-sm block">Aucune action</span>
                      )}

                      {rdv.status === 'Confirmed' && rdv.mode === 'en ligne' && rdv.meetLink && (
                        <a
                          href={rdv.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700 mt-2"
                        >
                          🎥 Rejoindre le meet
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-sm text-gray-500 mt-4">
              * Les rendez-vous confirmés ou refusés ne peuvent pas être modifiés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;