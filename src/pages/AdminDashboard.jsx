import React from 'react';
import Sidebar from '../components/Sidebar';

import Card from '../components/Card';
import HeaderDashboard from '../components/HeaderDashboard';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <HeaderDashboard title="Dashboard Administrateur" />

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Utilisateurs" value="203" icon="👥" />
          <Card title="Médecins inscrits" value="57" icon="🩺" />
          <Card title="Rendez-vous aujourd'hui" value="34" icon="📅" />
          <Card title="Comptes signalés" value="2" icon="⚠️" />
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg mb-2">👥 Derniers utilisateurs inscrits</h2>
            <ul className="space-y-2">
              <li>📌 Sarah M. – Patient</li>
              <li>📌 Dr. Mehdi Z. – Médecin</li>
              <li>📌 Ahmed B. – Pharmacien</li>
            </ul>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg mb-2">🛠️ Actions rapides</h2>
            <button className="bg-red-600 text-white px-4 py-2 rounded mb-2">Désactiver un utilisateur</button>
            <br />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter un administrateur</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;