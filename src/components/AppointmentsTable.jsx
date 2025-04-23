import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    axios.get('/api/appointments/doctor/123') // Remplacer 123 par l’ID du médecin
      .then(res => setAppointments(res.data))
      .catch(console.error);
  };

  const updateStatus = (id, status) => {
    axios.put(`/api/appointments/${id}/status`, { status })
      .then(() => fetchAppointments())
      .catch(console.error);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📋 Tous les rendez-vous</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Patient</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Heure</th>
            <th className="p-2 border">Statut</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
      
            <tr key={rdv._id} className="hover:bg-gray-50">
              <td className="p-2 border">rdv.patientName</td>
              <td className="p-2 border">rdv.date</td>
              <td className="p-2 border">rdv.time</td>
              <td className="p-2 border capitalize">rdv.status</td>
                <td className="p-2 border">
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
                </td> 
            </tr>
   
        </tbody>
      </table>
    </div>
    );
};

export default AppointmentsTable;