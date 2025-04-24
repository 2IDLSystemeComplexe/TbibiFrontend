import React from 'react';
import Sidebar from '../components/Sidebar';
import PendingAppointments from '../components/PendingAppointments';
import AvailabilityManager from '../components/AvailabilityManager';
import Card from '../components/Card';
import HeaderDashboard from '../components/HeaderDashboard';

const DoctorDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="doctor" />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <HeaderDashboard title="Dashboard Médecin" profileRoute='/dashboard-medecin/profile'/>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Patients" value="48" icon="👥" />
          <Card title="Ordonnances signées" value="127" icon="📝" />
          <Card title="Rendez-vous aujourd'hui" value="6" icon="📅" />
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">📄 Assistant CNAM</h2>
            <p className="text-gray-700 mb-4">Remplissage automatique des documents CNAM en attente.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Accéder à l’assistant</button>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">📅 Mes rendez-vous</h2>
            <ul>
              <li>📍 Cabinet – Nour H. – 14h30</li>
              <li>💻 En ligne – Mehdi Z. – 16h00</li>
              <li>📍 Cabinet – Lina M. – 17h15</li>
            </ul>
          </section>

          <section className="bg-white p-4 rounded shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">🖊️ Signature électronique</h2>
            <p className="text-gray-700 mb-4">Signer électroniquement vos ordonnances avec TunTrust.</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded">Signer une ordonnance</button>
          </section>
          <section>  <PendingAppointments />
          <AvailabilityManager /></section>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;