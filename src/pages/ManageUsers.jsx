import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';


const mockUsers = {
  doctor: [
    { id: 1, name: 'Dr. Amel B.', email: 'amel@tbibi.tn', verified: false },
    { id: 2, name: 'Dr. Mehdi K.', email: 'mehdi@tbibi.tn', verified: true }
  ],
  pharmacist: [
    { id: 3, name: 'Ph. Lina M.', email: 'lina@tbibi.tn', verified: true }
  ],
  patient: [
    { id: 4, name: 'Nour H.', email: 'nour@tbibi.tn' },
    { id: 5, name: 'Oussama Z.', email: 'oussama@tbibi.tn' }
  ]
};

const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState('doctor');
  const [users, setUsers] = useState(mockUsers);

  const handleDelete = (role, id) => {
    const filtered = users[role].filter((u) => u.id !== id);
    setUsers({ ...users, [role]: filtered });
  };

  const handleVerify = (role, id) => {
    const updated = users[role].map((u) =>
      u.id === id ? { ...u, verified: true } : u
    );
    setUsers({ ...users, [role]: updated });
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        

        <div className="p-6">
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setActiveTab('doctor')}
              className={`px-4 py-2 rounded ${
                activeTab === 'doctor' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'
              }`}
            >
              Médecins
            </button>
            <button
              onClick={() => setActiveTab('pharmacist')}
              className={`px-4 py-2 rounded ${
                activeTab === 'pharmacist' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'
              }`}
            >
              Pharmaciens
            </button>
            <button
              onClick={() => setActiveTab('patient')}
              className={`px-4 py-2 rounded ${
                activeTab === 'patient' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'
              }`}
            >
              Patients
            </button>
          </div>

          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="text-left p-3 border">Nom</th>
                  <th className="text-left p-3 border">Email</th>
                  {activeTab !== 'patient' && <th className="text-left p-3 border">Statut</th>}
                  <th className="text-left p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users[activeTab].map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{user.name}</td>
                    <td className="p-3 border">{user.email}</td>
                    {activeTab !== 'patient' && (
                      <td className="p-3 border">
                        {user.verified ? (
                          <span className="text-green-600">✅ Vérifié</span>
                        ) : (
                          <span className="text-yellow-600">⏳ En attente</span>
                        )}
                      </td>
                    )}
                    <td className="p-3 border space-x-2">
                      {activeTab !== 'patient' && !user.verified && (
                        <button
                          onClick={() => handleVerify(activeTab, user.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Valider
                        </button>
                      )}
                      <button
                        onClick={() => alert('Modifier (à implémenter)')}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(activeTab, user.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {users[activeTab].length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 p-4">
                      Aucun utilisateur dans cette catégorie.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;