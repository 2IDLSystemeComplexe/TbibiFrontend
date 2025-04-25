import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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
import PatientPages from './pages/PatientsPage'
import PrescriptionsPage from './pages/PrescriptionPage'
import AppointmentsPage from './pages/AppointmentsPage'
import AvailabilityPage from './pages/AvailabilityPage'
import DoctorProfilePage from './pages/DoctorProfilePage'
import AddDoctor from './pages/AddDoctor'
import ManageUsers from './pages/ManageUsers'
import ProtectedRoute from './Auth/ProtectedRoute';
import ConsultationPayment from './pages/Payment'
const App = () => {
  const location = useLocation()
  const hideNavbarRoutes = [
    '/dashboard-admin',
    '/dashboard-admin/add-doctor',
    '/admin/manage-users',
    '/dashboard-medecin',
    '/dashboard-medecin/patients',
    '/dashboard-medecin/prescriptions',
    '/dashboard-medecin/appointments',
    '/dashboard-medecin/availability',
    '/dashboard-medecin/profile'
  ]

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      {shouldShowNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:docId' element={<DoctorDetails />} />

        {/* Patient Routes */}
        <Route
          path='/my-appointments'
          element={<ProtectedRoute element={<MyAppointments />} allowedRoles={['patient']} />}
        />
        <Route
          path='/my-profile'
          element={<ProtectedRoute element={<MyProfile />} allowedRoles={['patient']} />}
        />

        {/* Doctor Routes */}
        <Route
          path='/dashboard-medecin'
          element={<ProtectedRoute element={<DoctorDashboard />} allowedRoles={['doctor']} />}
        />
        <Route
          path='/dashboard-medecin/patients'
          element={<ProtectedRoute element={<PatientPages />} allowedRoles={['doctor']} />}
        />
        <Route
          path='/dashboard-medecin/prescriptions'
          element={<ProtectedRoute element={<PrescriptionsPage />} allowedRoles={['doctor']} />}
        />
        <Route
          path='/dashboard-medecin/appointments'
          element={<ProtectedRoute element={<AppointmentsPage />} allowedRoles={['doctor']} />}
        />
        <Route
          path='/dashboard-medecin/availability'
          element={<ProtectedRoute element={<AvailabilityPage />} allowedRoles={['doctor']} />}
        />
        <Route
          path='/dashboard-medecin/profile'
          element={<ProtectedRoute element={<DoctorProfilePage />} allowedRoles={['doctor']} />}
        />

        {/* Admin Routes */}
        <Route
          path='/dashboard-admin'
          element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />}
        />
        <Route
          path='/dashboard-admin/add-doctor'
          element={<ProtectedRoute element={<AddDoctor />} allowedRoles={['admin']} />}
        />
        <Route
          path='/admin/manage-users'
          element={<ProtectedRoute element={<ManageUsers />} allowedRoles={['admin']} />}
        />
         <Route
          path='/payment/:appointmentId'
          element={<ProtectedRoute element={<ConsultationPayment />} allowedRoles={['patient']} />}
        />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
