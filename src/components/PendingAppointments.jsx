import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    axios.get('/api/appointments/doctor/123') // Remplace 123 par l’ID du médecin (ou récup via auth)
      .then(res => {
        const pending = res.data.filter(rdv => rdv.status === 'pending');
        setAppointments(pending);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = (id, status) => {
    axios.put(`/api/appointments/${id}/status`, { status })
      .then(() => fetchAppointments())
      .catch(console.error);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📅 Rendez-vous à confirmer</h2>
      {appointments.length === 0 ? (
        <p>Aucun rendez-vous en attente</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map(rdv => (
            <li key={rdv._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <strong>{rdv.patientName}</strong><br />
                {rdv.date} à {rdv.time}
              </div>
              <div className="space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(rdv._id, 'confirmed')}
                >
                  Confirmer
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(rdv._id, 'rejected')}
                >
                  Refuser
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingAppointments;