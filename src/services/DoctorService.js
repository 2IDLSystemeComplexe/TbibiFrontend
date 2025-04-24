import axios from 'axios'

export const getDoctorsList = async (backendUrl) => {
    try {
      const data  = await axios.get(`${backendUrl}/api/doctor/doctors`);
      return  data.data ;
    } catch (error) {
      return {error};
    }
  };

  export const getDoctorById = async (backendUrl, doctorId) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/doctors/${doctorId}`);
      return { success: true, doctor: data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  export const getDoctorsBySpeciality = async (backendUrl, specialization) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/doctors/speciality/${specialization}`);
      return { success: true, doctors: data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };


  export const addDoctor = async (backendUrl, formData, token) => {
    try {
      // Extract values from FormData
      const username = formData.get('name');
      const email = formData.get('email');
      const password = formData.get('password');
      const image = formData.get('image'); // actual file
      const experience = Number(formData.get('experience'));
      const fees = Number(formData.get('fees'));
      const about = formData.get('about');
      const specialization = formData.get('speciality');
      const degree = formData.get('degree');
  
      // Parse address JSON to get localisation
      const address = JSON.parse(formData.get('address'));
  
      // Create new FormData for sending (include both image and doctor fields)

      const sendForm = {
        username,
        email,
        password,
        specialization: specialization,
        degree,
        experience: 9,// Optional: just a reference or base64 string
        localisation: {
          street: address.line1,
          city: address.line2
        }, 
      };
      

      console.log(sendForm)
  
      const response = await axios.post(`${backendUrl}/api/doctor/doctors/`, sendForm);
  
      return response.data;
    } catch (error) {
      console.error('Add Doctor Error:', error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };
  
