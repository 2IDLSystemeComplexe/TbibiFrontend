import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import HeaderDashboard from '../components/HeaderDashboard';

const DoctorProfilePage = () => {
  const [form, setForm] = useState({
    name: 'Dr. Azza',
    email: 'azza@tbibi.tn',
    phone: '20 123 456',
    speciality: 'Généraliste'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Infos enregistrées :', form);
    // Plus tard : axios.put('/api/doctor/profile', form)
  };

  return (
    <div className="flex">
      <Sidebar role="doctor" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <HeaderDashboard title="Mon profil" />
        <div className="p-6 max-w-xl mx-auto">
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">👤 Infos personnelles</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-gray-600">Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-gray-600">Spécialité</label>
                <input
                  type="text"
                  name="speciality"
                  value={form.speciality}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
              >
                💾 Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;