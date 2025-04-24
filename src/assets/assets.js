import dropdown_icon from './dropdown_icon.svg';
import logo from './logo.svg';
import menu_icon from './menu_icon.svg';
import header_img from './header_img.png';
import doc1 from './doc1.png';
import verified_icon from './verified_icon.svg';
import info_icon from './info_icon.svg';
import about_img from './about_image.png';
import upload_area from './upload_area.svg';


export const assets = {
    dropdown_icon,
    logo,
    menu_icon,
    header_img,
    verified_icon,
    info_icon,
    about_img,
    upload_area,
    doc1
}

// Sample mock data for UI preview

export const myAppointments = [
    {
      _id: '1',
      doctorData: {
        name: 'Dr. Emily Stone',
        speciality: 'Cardiologist',
        image: doc1,
        localisation: {
            street: '57th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        phone: '+1 555-123-4567',
      },
      date: '20_01_2025',
      time: '10:30 AM',
      payment: null,
      status: 'Pending',
      mode: 'online'
    },
    {
      _id: '2',
      doctorData: {
        name: 'Dr. John Smith',
        speciality: 'Dermatologist',
        image: doc1,
        localisation: {
            street: '57th Cross, Richmond Circle, Ring Road',
            city: 'Tunis'
        },
        phone: '+1 555-123-4567',
      },
      date: '22_02_2025',
      time: '2:00 PM',
      payment: true,
      status: 'Confirmed',
    },
  ];
export const userData = {
    name:"John Doe",
    email:"john@gmail.com",
    phone:"1234567890",
    address:"123 Main St, Anytown, USA",
    
}
export const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
    'Cardiologist'
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        available: true,
        specialization: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        phone: '+1 555-123-4567',
        localisation: {
            street: '17th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc1,
        available: true,
        specialization: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        phone: '+1 555-234-5678',
        localisation: {
            street: '27th Cross, Richmond Circle, Ring Road',
            city: 'Tunis'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc1,
        available: true,
        specialization: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        phone: '+1 555-345-6789',
        localisation: {
            street: '37th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc1,
        available: true,
        specialization: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        phone: '+1 555-456-7890',
        localisation: {
            street: '47th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc1,
        specialization: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        available: true,
        phone: '+1 555-567-8901',
        localisation: {
            street: '57th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc1,
        specialization: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        phone: '+1 555-678-9012',
        localisation: {
            street: '57th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc1,
        available: true,
        specialization: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        phone: '+1 555-789-0123',
        localisation: {
            street: '17th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc1,
        available: true,
        specialization: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        phone: '+1 555-890-1234',
        localisation: {
            street: '27th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc1,
        available: true,
        specialization: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        phone: '+1 555-901-2345',
        localisation: {
            street: '37th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc1,
        specialization: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        phone: '+1 555-012-3456',
        localisation: {
            street: '47th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc1,
        available: true,
        specialization: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        phone: '+1 555-123-4567',
        localisation: {
            street: '57th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc1,
        specialization: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        phone: '+1 555-234-5678',
        localisation: {
            street: '57th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc1,
        available: true,
        specialization: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        phone: '+1 555-345-6789',
        localisation: {
            street: '17th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc1,
        available: true,
        specialization: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        phone: '+1 555-456-7890',
        localisation: {
            street: '27th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc1,
        available: true,
        specialization: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        phone: '+1 555-567-8901',
        localisation: {
            street: '37th Cross, Richmond Circle, Ring Road',
            city: 'London'
        },
        availability: [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    }
]