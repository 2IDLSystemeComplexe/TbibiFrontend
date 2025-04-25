import axios from 'axios';

export const updatePatientProfile = async ({ userData,backendUrl}) => {
  try {
    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }

    formData.append('name', userData.name);
    formData.append('phone', userData.phone);
    formData.append('gender', userData.gender);
    formData.append('dob', userData.dob);
    formData.append('address', JSON.stringify(userData.address));

    const res = await axios.put(`${backendUrl}/api/patients/${id}`, formData, {

    });

    await loadUserProfileData();
    return true;
  } catch (error) {
    console.error('Profile Update Failed:', error);
    return false;
  }
};
