import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientsTable = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('/api/patients')
      .then(res => setPatients(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Liste des patients</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">Nom</th>
            <th className="text-left p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  );
};


export default PatientsTable;