import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import HeaderDashboard from '../components/HeaderDashboard';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [doctor,setDoctor] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    specialization: '',
    degree: '',
    experience: '',
    localisation: {
      street: '',
      city: '',
    },
  });

  const userDoctor = JSON.parse(localStorage.getItem('user'));
const doctorId = userDoctor?._id;


  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/doctor/doctors/${doctorId}`);
        setDoctor(res.data);
        setFormData({
          username: res.data.username || '',
          email: res.data.email || '',
          specialization: res.data.specialization || '',
          degree: res.data.degree || '',
          experience: res.data.experience || '',
          localisation: res.data.localisation || { street: '', city: '' },
        });
        setLoading(false);
      } catch (err) {
        toast.error('Erreur lors du chargement du profil');
        console.error(err);
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [backendUrl, doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'street' || name === 'city') {
      setFormData({
        ...formData,
        localisation: {
          ...formData.localisation,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${backendUrl}/api/doctor/${doctorId}`, formData);
      toast.success('Profil mis à jour avec succès');
      setEditMode(false);
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
      console.error(err);
    }
  };

  if (loading) return <div className="p-10">Chargement...</div>;

  return (
    <div className="flex">
      <Sidebar role="doctor" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <HeaderDashboard title="Mon Profil" />

        <div className="p-6">
          <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">👨‍⚕️ Profil du médecin</h2>

            <div className="flex flex-col gap-4">
              <label>Nom</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!editMode}
                className="border rounded px-3 py-2"
              />

              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
                className="border rounded px-3 py-2"
              />

              <label>Spécialité</label>
              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                disabled={!editMode}
                className="border rounded px-3 py-2"
              />

              <label>Diplôme</label>
              <input
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                disabled={!editMode}
                className="border rounded px-3 py-2"
              />

              <label>Années d'expérience</label>
              <input
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                disabled={!editMode}
                className="border rounded px-3 py-2"
              />

              <label>Adresse</label>
              <input
                name="street"
                placeholder="Rue"
                value={formData.localisation?.street}
                onChange={handleChange}
                disabled={!editMode}
                className="border rounded px-3 py-2"
              />
              <input
                name="city"
                placeholder="Ville"
                value={formData.localisation?.city}
                onChange={handleChange}
                disabled={!editMode}
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="mt-6">
              {editMode ? (
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  💾 Enregistrer
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  ✏️ Modifier
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
