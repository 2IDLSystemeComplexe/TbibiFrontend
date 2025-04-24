import axios from 'axios';

export const getUsersByRole = async (backendUrl, role) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/users/byrole`,
      { role }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching users by role:', error);
    throw new Error(error.response?.data?.error || 'Something went wrong');
  }
};
