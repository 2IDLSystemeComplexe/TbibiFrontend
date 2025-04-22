import axios from 'axios'
import { toast } from 'react-toastify'

export const updateUserProfile = async ({ userData, image, token, backendUrl, loadUserProfileData }) => {
  try {
    const formData = new FormData()
    formData.append('name', userData.name)
    formData.append('phone', userData.phone)
    formData.append('address', JSON.stringify(userData.address))
    formData.append('gender', userData.gender)
    formData.append('dob', userData.dob)
    if (image) formData.append('image', image)

    const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
      headers: { token }
    })

    if (data.success) {
      toast.success(data.message)
      await loadUserProfileData()
      return true
    } else {
      toast.error(data.message)
      return false
    }
  } catch (err) {
    console.error(err)
    toast.error('Error updating profile')
    return false
  }
}
