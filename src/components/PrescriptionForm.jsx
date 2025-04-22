/*import React, { useState } from 'react';
import { QRCode } from 'qrcode.react';

const PrescriptionForm = () => {
  const [form, setForm] = useState({
    patientName: '',
    date: new Date().toISOString().split('T')[0],
    medications: '',
    signed: false
  });

  const [showQR, setShowQR] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signPrescription = () => {
    // Simulation de la signature avec TunTrust
    setForm({ ...form, signed: true });
    setShowQR(true);
  };

  const qrData = JSON.stringify({
    patient: form.patientName,
    date: form.date,
    meds: form.medications,
    signature: 'Simulated-TunTrust-Signature-1234'
  });

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📝 Créer une ordonnance</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-600">Nom du patient</label>
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-600">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-600">Médicaments</label>
          <textarea
            name="medications"
            value={form.medications}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
            placeholder="Paracétamol 500mg - 3x/jour pendant 5 jours"
          />
        </div>

        {!form.signed && (
          <button
            onClick={signPrescription}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            🔐 Signer l’ordonnance électroniquement
          </button>
        )}

        {form.signed && (
          <div className="mt-6">
            <p className="text-green-700 font-semibold">✔️ Ordonnance signée électroniquement</p>

            {showQR && (
              <div className="mt-4 text-center">
                <p className="mb-2 text-gray-600">QR Code pour vérification :</p>
                <QRCode value={qrData} size={180} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionForm;
*/