import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { updateUserProfile } from '../services/ProfileService'
import { assets, userData } from '../assets/assets'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const { token, backendUrl, setUserData, loadUserProfileData } = useContext(AppContext)

  const handleUpdate = async () => {
    const success = await updateUserProfile({ userData, image, token, backendUrl, loadUserProfileData, setIsEdit, setImage })
    if (success) {
      setIsEdit(false)
      setImage(false)
    }
  }

  return userData ? (
    <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>

      {isEdit ? (
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
      ) : (
        <img className='w-36 rounded' src={userData.image} alt="" />
      )}

      {isEdit ? (
        <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
      ) : (
        <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
      )}

      <hr className='bg-[#ADADAD] h-[1px] border-none' />

      <div>
        <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit
            ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
            : <p className='text-blue-500'>{userData.phone}</p>}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <p>
              <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
              <br />
              <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
            </p>
          ) : (
            <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
          )}
        </div>
      </div>

      <div>
        <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
          <p className='font-medium'>Gender:</p>
          {isEdit
            ? <select className='max-w-20 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            : <p className='text-gray-500'>{userData.gender}</p>}

          <p className='font-medium'>Birthday:</p>
          {isEdit
            ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
            : <p className='text-gray-500'>{userData.dob}</p>}
        </div>
      </div>

      <div className='mt-10'>
        {isEdit
          ? <button onClick={handleUpdate} className='bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-[0px_10px_8px_-7px_#60B5FF] hover:shadow-[0px_10px_8px_-7px_#69a79c] transition duration-300'>Save information</button>
          : <button onClick={() => setIsEdit(true)} className='bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-[0px_10px_8px_-7px_#60B5FF] hover:shadow-[0px_10px_8px_-7px_#69a79c] transition duration-300'>Edit</button>
        }
      </div>

    </div>
  ) : null
}

export default MyProfile