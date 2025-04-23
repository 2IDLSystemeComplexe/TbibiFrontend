import React from 'react';

const Sidebar = ({ role = "doctor" }) => {
  return (
    
      <nav className="p-4 space-y-4">
       

        {role === 'doctor' && (
           <aside className="w-64 bg-white h-screen shadow-lg hidden md:block">
      <div className="p-4 text-xl font-bold border-b">Tbibi</div>
      <nav className="p-4 space-y-4">
        <a href="/dashboard-medecin" className="block text-gray-700 hover:text-blue-600">🏠 Tableau de bord</a>
     
        <a href="/dashboard-medecin/prescriptions" className="block text-gray-700 hover:text-blue-600">📝 Ordonnances</a>

        <a href="/dashboard-medecin/appointments" className="block text-gray-700 hover:text-blue-600">📅 Rendez-vous</a>
          <a href="/dashboard-medecin/availability" className="block text-gray-700 hover:text-blue-600">
                🗓️ Mes disponibilités
          </a>

          <a href="/dashboard-medecin/profile" className="block text-gray-700 hover:text-blue-600">👤 Mon profil</a>
      </nav>
    </aside>
        )}

        {role === 'admin' && (
          <>
            <a href="/dashboard-admin" className="block text-gray-700 hover:text-blue-600">🏠 Tableau de bord</a>
            <a href="/admin/manage-users" className="block text-gray-700 hover:text-blue-600">👥 Gérer utilisateurs</a>
            <a href="/dashboard-admin/add-doctor" className="block text-gray-700 hover:text-blue-600">🩺 Ajouter médecin</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">📊 Statistiques</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">⚙️ Paramètres</a>
          </>
        )}
      </nav>

  );
};

export default Sidebar;