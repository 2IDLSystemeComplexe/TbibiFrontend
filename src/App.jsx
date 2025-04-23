import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import DoctorDetails from './pages/DoctorDetails'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DoctorDashboard from './pages/DoctorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import PatientPages from './pages/PatientPages'
import PrescriptionsPage from './pages/PrescriptionPage'
import AppointmentsPage from './pages/AppointmentsPage'
import AvailabilityPage from './pages/AvailabilityPage'
import DoctorProfilePage from './pages/DoctorProfilePage'
import AddDoctor from './pages/AddDoctor'   
import ManageUsersPage from './pages/ManageUsersPage'
 
 const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:docId' element={<DoctorDetails/>} />
        <Route path='/doctors?speciality=:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/my-appointments" element={<MyAppointments/>} />
        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/dashboard-medecin" element={<DoctorDashboard />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        <Route path="/dashboard-medecin/patients" element={<PatientPages />} />
        <Route path="/dashboard-medecin/prescriptions" element={<PrescriptionsPage />} />
        <Route path="/dashboard-medecin/appointments" element={<AppointmentsPage />} />
        <Route path="/dashboard-medecin/availability" element={<AvailabilityPage />} />
        <Route path="/dashboard-medecin/profile" element={<DoctorProfilePage />} />
        <Route path="/dashboard-admin/add-doctor" element={<AddDoctor />} />
        <Route path="/admin/manage-users" element={<ManageUsersPage />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App