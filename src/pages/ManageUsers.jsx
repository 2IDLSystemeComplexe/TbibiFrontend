import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { getUsersByRole } from '../services/adminService';
import { AppContext } from '../context/AppContext';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import HeaderDashboard from '../components/HeaderDashboard';

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
  const [users, setUsers] = useState();
 const { backendUrl } = useContext(AppContext)

 const fetchUsers = async (role) => {
  try {
    const data = await getUsersByRole(backendUrl, role);
    setUsers(data);
  } catch (err) {
    console.error(err);
    setUsers([]);
  } 
};


const handleDelete = async (role, id) => {
  try {
    if (role === 'doctor') {
      await axios.delete(`${backendUrl}/api/doctor/${id}`);
      toast.success('Doctor and their appointments deleted successfully');
    } else if (role === 'patient') {
      await axios.delete(`${backendUrl}/api/patients/${id}`);
      toast.success('Patient and their appointments deleted successfully');
    } else {
      toast.error('Invalid role');
      return;
    }

    // Mise à jour du state après suppression réussie
    const filtered = users[role].filter((u) => u._id !== id);
    setUsers({ ...users, [role]: filtered });

  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Failed to delete user');
  }
};

  const handleVerify = (role, id) => {
    const updated = users[role].map((u) =>
      u.id === id ? { ...u, verified: true } : u
    );
    setUsers({ ...users, [role]: updated });
  };

  useEffect(() => {
      fetchUsers(activeTab)
      console.log(users)

    }, [activeTab])

  return (
      <div className="flex">
        <Sidebar role="admin" />
        <div className="flex-1 bg-gray-100 min-h-screen">
          <HeaderDashboard title="Gestion utilisateurs" />
          <div className="p-6">
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setActiveTab('doctor')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'doctor'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border'
                }`}
              >
                Médecins
              </button>
              <button
                onClick={() => setActiveTab('pharmacist')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'pharmacist'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border'
                }`}
              >
                Pharmaciens
              </button>
              <button
                onClick={() => setActiveTab('patient')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'patient'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border'
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
                    <th className="text-left p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="p-3 border">{user.username}</td>
                        <td className="p-3 border">{user.email}</td>
                        <td className="p-3 border space-x-2 flex items-center">
                          <button
                            onClick={() => alert('Modifier (à implémenter)')}
                            className="text-blue-600 hover:text-blue-800"
                            title="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(activeTab, user._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Supprimer"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
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