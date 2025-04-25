import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
const PatientProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);

  const { backendUrl } = useContext(AppContext);
  const userPatient = JSON.parse(localStorage.getItem('user'));
  const patientId = userPatient?._id;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    localisation: {
      street: '',
      city: '',
    },
    gender: '',
    age: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'street' || name === 'city') {
      setFormData((prev) => ({
        ...prev,
        localisation: {
          ...prev.localisation,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = await axios.put(`${backendUrl}/api/patients/${patientId}`, formData);
      toast.success('Profil mis à jour avec succès');
      setIsEdit(false);
      fetchPatient(); // refresh profile
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
      console.error(err);
    }
  };

  const fetchPatient = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/patients/${patientId}`);
      const data = res.data;

      setPatient(data);
      setFormData({
        username: data.username || '',
        email: data.email || '',
        phone: data.phone || '',
        localisation: data.localisation || { street: '', city: '' },
        gender: data.gender || '',
        age: data.age || 0,
      });
      setLoading(false);
    } catch (err) {
      toast.error('Erreur lors du chargement du profil');
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (backendUrl && patientId) fetchPatient();
  }, [backendUrl, patientId]);

  if (loading) return <p>Loading...</p>;
  if (!patient) return null;

  const displayData = isEdit ? formData : patient;

  return (
    <div className="flex flex-col gap-2 text-sm pt-5">
      {/* Profile Picture */}
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={assets.upload_area} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? '' : assets.upload_area} alt="" />
          </div>
        </label>
      ) : (
        <img className="w-36 rounded" src={assets.upload_area} alt="" />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60"
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
      ) : (
        <p className="font-medium text-3xl text-[#262626] mt-4">{displayData.username}</p>
      )}

      <hr className="bg-[#ADADAD] h-[1px] border-none" />

      {/* Contact Info */}
      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{displayData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 max-w-52"
              type="text"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
            />
          ) : (
            <p className="text-blue-500">{displayData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input
                className="bg-gray-50"
                type="text"
                name="street"
                placeholder="Street"
                onChange={handleChange}
                value={formData.localisation.street}
              />
              <input
                className="bg-gray-50"
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                value={formData.localisation.city}
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {displayData.localisation?.street}
              <br />
              {displayData.localisation?.city}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-50"
              name="gender"
              onChange={handleChange}
              value={formData.gender}
            >
              <option value="">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{displayData.gender}</p>
          )}

          <p className="font-medium">Age:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-50"
              type="number"
              name="age"
              onChange={handleChange}
              value={formData.age}
            />
          ) : (
            <p className="text-gray-500">{displayData.age}</p>
          )}
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-[0px_10px_8px_-7px_#60B5FF] transition duration-300"
          >
            Save information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-[0px_10px_8px_-7px_#60B5FF] transition duration-300"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
