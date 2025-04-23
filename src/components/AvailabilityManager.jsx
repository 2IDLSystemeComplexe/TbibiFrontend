import React, { useState } from 'react';
import axios from 'axios';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityManager = () => {
  const [availability, setAvailability] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: '', start: '', end: '' });

  const addSlot = () => {
    if (!newSlot.day || !newSlot.start || !newSlot.end) return;

    setAvailability([...availability, newSlot]);
    setNewSlot({ day: '', start: '', end: '' });
  };

  const submitAvailability = () => {
    axios.post('/api/availability', {
      doctorId: '123', // remplacer avec l’ID du médecin connecté
      availability,
    })
      .then(() => alert('Disponibilités enregistrées !'))
      .catch(console.error);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">🗓️ Mes Disponibilités</h2>

      <div className="flex flex-col gap-2 mb-4">
        <select
          value={newSlot.day}
          onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Choisir un jour</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <input
          type="time"
          value={newSlot.start}
          onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
          className="border p-2 rounded"
          placeholder="Heure de début"
        />
        <input
          type="time"
          value={newSlot.end}
          onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
          className="border p-2 rounded"
          placeholder="Heure de fin"
        />

        <button onClick={addSlot} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
          ➕ Ajouter
        </button>
      </div>

      {availability.length > 0 && (
        <>
          <h3 className="font-semibold mb-2">Créneaux saisis :</h3>
          <ul className="list-disc list-inside">
            {availability.map((slot, idx) => (
              <li key={idx}>{slot.day} : {slot.start} → {slot.end}</li>
            ))}
          </ul>
          <button onClick={submitAvailability} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            💾 Enregistrer
          </button>
        </>
      )}
    </div>
  );
};

export default AvailabilityManager;