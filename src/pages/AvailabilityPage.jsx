import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import HeaderDashboard from '../components/HeaderDashboard';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AvailabilityPage = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const addSlot = () => {
    if (!start || !end) return;

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const newSlot = { date: formattedDate, start, end };
    setSlots([...slots, newSlot]);

    // reset
    setStart('');
    setEnd('');
  };

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  return (
    <div className="flex">
      <Sidebar role="doctor" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <HeaderDashboard title="Mes disponibilités" />
        <div className="p-6 max-w-4xl mx-auto">
          <div className="bg-white rounded shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">🗓️ Sélectionner un jour dans le calendrier</h2>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="border rounded"
            />
            <p className="mt-4 text-gray-700">
              Date sélectionnée : <strong>{selectedDate.toLocaleDateString()}</strong>
            </p>
          </div>

          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-semibold mb-4">➕ Ajouter une disponibilité</h3>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block mb-1 text-gray-600">Heure de début</label>
                <input
                  type="time"
                  className="w-full border p-2 rounded"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-gray-600">Heure de fin</label>
                <input
                  type="time"
                  className="w-full border p-2 rounded"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={addSlot}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ajouter le créneau
            </button>
          </div>

          {slots.length > 0 && (
            <div className="bg-white rounded shadow p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">📅 Créneaux saisis</h3>
              <ul className="space-y-2">
                {slots.map((slot, i) => (
                  <li key={i} className="flex justify-between bg-gray-50 p-2 rounded">
                    <span>{slot.date} — {slot.start} → {slot.end}</span>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => removeSlot(i)}
                    >
                      🗑 Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;