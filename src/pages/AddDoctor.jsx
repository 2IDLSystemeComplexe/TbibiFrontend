import React, { useState , useContext } from 'react'
import { assets, specialities } from '../assets/assets'
import { toast } from 'react-toastify'
import Sidebar from '../components/Sidebar'
import HeaderDashboard from '../components/HeaderDashboard'
import { AppContext } from '../context/AppContext'
import { addDoctor } from '../services/DoctorService'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const { backendUrl } = useContext(AppContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
      
        try {
          const formData = new FormData();
          formData.append('image', docImg);
          formData.append('name', name);
          formData.append('email', email);
          formData.append('phone', phone);
          formData.append('password', password);
          formData.append('experience', experience);
          formData.append('fees', Number(fees));
          formData.append('about', about);
          formData.append('speciality', speciality);
          formData.append('degree', degree);
          formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
      
          const token = localStorage.getItem('token');
          const result = await addDoctor(backendUrl, formData, token);
          toast.success('Doctor added successfully');
          
          console.log(result);
          // Reset all form fields
            setDocImg(false);
            setName('');
            setEmail('');
            setPassword('');
            setExperience('1 Year');
            setFees('');
            setAbout('');
            setSpeciality('General physician');
            setDegree('');
            setAddress1('');
            setAddress2('');
            setPhone('');
            
        } catch (error) {
          toast.error(error.message);
          console.error(error);
        }
      };

    return (
        <div className="flex">
            <Sidebar role="admin" />
            <div className="flex-1 bg-gray-100 min-h-screen">
                <HeaderDashboard title="Add Doctor" />
                <div className="p-6">

                    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
                        <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl'>
                            {/* <div className='flex items-center gap-4 mb-8 text-gray-500'>
                                <label htmlFor="doc-img">
                                    <img className='w-16 bg-gray-700 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                                </label>
                                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden/>
                                <p>Upload doctor <br /> picture</p>
                            </div> */}

                            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                                <div className='w-full lg:flex-1 flex flex-col gap-4'>

                                    <div className='flex-1 flex flex-col gap-1'>
                                        <p>Your name</p>
                                        <input onChange={e => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                                    </div>

                                    <div className='flex-1 flex flex-col gap-1'>
                                        <p>Doctor Email</p>
                                        <input onChange={e => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                                    </div>

                                    <div className='flex-1 flex flex-col gap-1'>
                                        <p>Phone Number</p>
                                        <input onChange={e => setPhone(e.target.value)} value={phone} className='border rounded px-3 py-2' type="tel" placeholder='Phone number' required />
                                    </div>

                                    <div className='flex-1 flex flex-col gap-1'>
                                        <p>Set Password</p>
                                        <input onChange={e => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                                    </div>

                                    <div className='flex-1 flex flex-col gap-1'>
                                        <p>Experience</p>
                                        <select onChange={e => setExperience(e.target.value)} value={experience} className='border rounded px-2 py-2' >
                                            {["1 Year","2 Years","3 Years","4 Years","5 Years","6 Years","7 Years","8 Years","9 Years","10 Years"].map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='flex-1 flex flex-col gap-1'>
                                        <p>Fees</p>
                                        <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Doctor fees' required />
                                    </div>

                                </div>

                                <div className='w-full lg:flex-1 flex flex-col gap-4'>

                                    <div className='flex-1 flex flex-col gap-1'>
                                        <p>Speciality</p>
                                        <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border rounded px-2 py-2'>
                                            {specialities.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='flex-1 flex flex-col gap-1'>
                                        <p>Degree</p>
                                        <input onChange={e => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Degree' required />
                                    </div>

                                    <div className='flex-1 flex flex-col gap-1'>
                                        <p>Address</p>
                                        <input onChange={e => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Street' required />
                                        <input onChange={e => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='City' required />
                                    </div>

                                </div>

                            </div>

                            <div>
                                <p className='mt-4 mb-2'>About Doctor</p>
                                <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' rows={5} placeholder='write about doctor'></textarea>
                            </div>

                            <button type='submit' className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 mt-4 mb-2 rounded-lg shadow-md transition-all duration-200">Add doctor</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDoctor