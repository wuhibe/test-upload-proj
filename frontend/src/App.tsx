import {useState} from 'react'
import {sendUserProfile} from './utils/api'

type Profile = {
  name: string
  email: string
  image?: File | undefined
  resume?: File | undefined
}

export const App = () => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    image: undefined,
    resume: undefined,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await sendUserProfile(profile)
    console.log(response)
    if (response) {
      alert('Profile submitted successfully')
      setProfile({
        name: '',
        email: '',
        image: undefined,
        resume: undefined,
      })
      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]')
      fileInputs.forEach((input) => {
        ;(input as HTMLInputElement).value = ''
      })
    } else {
      alert('Failed to submit profile')
    }
  }

  return (
    <div className='flex w-screen h-screen relative justify-center items-center bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'
      >
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Profile Information</h2>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Name:</label>
          <input
            type='text'
            value={profile?.name}
            onChange={(e) => setProfile((prev) => ({...prev, name: e.target.value}))}
            required
            className='w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Email:</label>
          <input
            type='email'
            value={profile?.email}
            onChange={(e) => setProfile((prev) => ({...prev, email: e.target.value}))}
            required
            className='w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Image:</label>
          <input
            type='file'
            onChange={(e) =>
              setProfile((prev) => ({...prev, image: e.target.files?.[0] || undefined}))
            }
            accept='image/*'
            required
            className='w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Resume:</label>
          <input
            type='file'
            onChange={(e) =>
              setProfile((prev) => ({...prev, resume: e.target.files?.[0] || undefined}))
            }
            accept='application/pdf'
            required
            className='w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
          />
        </div>

        <button
          type='submit'
          className='w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
