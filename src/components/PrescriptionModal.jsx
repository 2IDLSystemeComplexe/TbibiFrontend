import { useState, useCallback, useEffect } from 'react';

const PrescriptionModal = ({ isOpen, onClose, doctorName, patientName, onSubmit }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [medications, setMedications] = useState([
    { name: '', dosage: '', duration: '', frequency: '' }
  ]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const closeModal = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      setMedications([{ name: '', dosage: '', duration: '', frequency: '' }]);
    }, 200);
  }, [onClose]);

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', duration: '', frequency: '' }]);
  };

  const removeMedication = (index) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
        onSubmit({ medications }); 
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-600/50 flex items-center justify-center p-4 z-50 transition-opacity duration-200 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-200 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">Créer une Prescription</h2>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Docteur</label>
              <input
                value={doctorName}
                disabled
                className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Patient</label>
              <input
                value={patientName}
                disabled
                className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100"
              />
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2">Médicaments</h3>
            {medications.map((med, index) => (
              <div key={index} className="grid grid-cols-4 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Nom"
                  value={med.name}
                  onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Durée"
                  value={med.duration}
                  onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Fréquence"
                  value={med.frequency}
                  onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                  className="border px-2 py-1 rounded"
                />
              </div>
            ))}
            <div className="flex space-x-2 mt-2">
              <button
                onClick={addMedication}
                className="text-blue-600 hover:underline text-sm"
              >
                + Ajouter un médicament
              </button>
              {medications.length > 1 && (
                <button
                  onClick={() => removeMedication(medications.length - 1)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Supprimer le dernier
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="border-t p-4 flex justify-end space-x-2">
          <button onClick={closeModal} className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              medications.length === 0 ||
              medications.some((m) => !m.name || !m.dosage || !m.duration || !m.frequency)
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
