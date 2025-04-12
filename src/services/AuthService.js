import axios from 'axios'

export const registerUser = async (backendUrl, name, email, password) => {
  try {
    console.log(`registerUser ${name} ${email} ${password}`)
    const { data } = await axios.post(`${backendUrl}/user/register`, {
      name,
      email,
      password,
    })
    return data
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const loginUser = async (backendUrl, email, password) => {
  try {
    console.log(`loginUser ${email} ${password}`)
    const { data } = await axios.post(`${backendUrl}/user/login`, {
      email,
      password,
    })
    return data
  } catch (error) {
    return { success: false, message: error.message }
  }
}
