import axios from 'axios'

export const registerUser = async (backendUrl, username, email, password) => {
  try {
    console.log(`registerUser ${username} ${email} ${password}`)
    const { data } = await axios.post(`${backendUrl}/api/users/register`, {
      username,
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
    const { data } = await axios.post(`${backendUrl}/api/users/login`, {
      email,
      password,
    })
    // localStorage.setItem("token",data.token)
    // localStorage.setItem('user', JSON.stringify(data.user));
    return data
  } catch (error) {
    return { success: false, message: error.message }
  }
}
