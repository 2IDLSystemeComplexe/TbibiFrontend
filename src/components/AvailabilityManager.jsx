import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityManager = () => {
  const { backendUrl } = useContext(AppContext);
  const [availability, setAvailability] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: '', start: '', end: '' });

  const doctor = JSON.parse(localStorage.getItem('user'));
  const doctorId = doctor?._id;

  useEffect(() => {
    if (doctorId) {
      axios.get(`${backendUrl}/api/doctor/doctors/${doctorId}`)
        .then(res => {
          setAvailability(res.data.availability || []);
        })
        .catch(err => console.error('Error fetching availability:', err));
    }
  }, [doctorId]);

  const addSlot = () => {
    if (!newSlot.day || !newSlot.start || !newSlot.end) return;
    setAvailability([...availability, newSlot]);
    setNewSlot({ day: '', start: '', end: '' });
  };

  const updateSlot = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const deleteSlot = (index) => {
    const updated = availability.filter((_, i) => i !== index);
    setAvailability(updated);
  };

  const submitAvailability = () => {
    axios.put(`${backendUrl}/api/doctor/${doctorId}`, { availability })
      .then(() => alert('Disponibilités mises à jour avec succès !'))
      .catch(console.error);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">🗓️ Gérer mes disponibilités</h2>

      {/* Add new availability slot */}
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
        />
        <input
          type="time"
          value={newSlot.end}
          onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
          className="border p-2 rounded"
        />

        <button onClick={addSlot} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
          ➕ Ajouter
        </button>
      </div>

      {/* Display and edit existing slots */}
      {availability.length > 0 && (
        <>
          <h3 className="font-semibold mb-2">📅 Disponibilités actuelles :</h3>
          <ul className="space-y-2">
            {availability.map((slot, idx) => (
              <li key={slot._id || idx} className="flex items-center gap-2">
                <select
                  value={slot.day}
                  onChange={(e) => updateSlot(idx, 'day', e.target.value)}
                  className="border p-1 rounded"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <input
                  type="time"
                  value={slot.start}
                  onChange={(e) => updateSlot(idx, 'start', e.target.value)}
                  className="border p-1 rounded"
                />
                <input
                  type="time"
                  value={slot.end}
                  onChange={(e) => updateSlot(idx, 'end', e.target.value)}
                  className="border p-1 rounded"
                />
                <button onClick={() => deleteSlot(idx)} className="text-red-600 font-semibold ml-2">🗑️</button>
              </li>
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
