import axios from 'axios'

interface UserProfileData {
  name: string
  email: string
  image?: File
  resume?: File
}

export const sendUserProfile = async (data: UserProfileData) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  if (!backendUrl) {
    throw new Error('Backend URL not configured')
  }

  const formData = new FormData()
  if (data.name) {
    formData.append('name', data.name)
  }
  if (data.email) {
    formData.append('email', data.email)
  }
  if (data.image) {
    formData.append('image', data.image)
  }
  if (data.resume) {
    formData.append('resume', data.resume)
  }

  try {
    const response = await axios.post(`${backendUrl}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error submitting profile:', error)
    throw error
  }
}
