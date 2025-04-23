import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios.get('/api/prescriptions/doctor/123') // remplacer par l'ID médecin
      .then(res => {
        const toSign = res.data.filter(p => p.status === 'pending');
        setPrescriptions(toSign);
      })
      .catch(console.error);
  }, []);

  const handleSign = (id) => {
    axios.post(`/api/prescriptions/${id}/sign`)
      .then(() => setPrescriptions(prescriptions.filter(p => p._id !== id)))
      .catch(console.error);
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Ordonnances à signer</h2>
      {prescriptions.length === 0 ? (
        <p>Aucune ordonnance en attente</p>
      ) : (
        <ul className="space-y-4">
          {prescriptions.map((p) => (
            <li key={p._id} className="border-b pb-2 flex justify-between items-center">
              <div>
                <strong>{p.patientName}</strong> – {p.medication}
              </div>
              <button
                onClick={() => handleSign(p._id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Signer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrescriptionList;