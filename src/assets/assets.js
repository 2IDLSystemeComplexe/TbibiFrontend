import dropdown_icon from './dropdown_icon.svg';
import logo from './logo.svg';
import menu_icon from './menu_icon.svg';
import header_img from './header_img.png';
import doc1 from './doc1.png';
import verified_icon from './verified_icon.svg';
import info_icon from './info_icon.svg';
import { MdEmail } from 'react-icons/md';
import about_img from './about_image.png';

export const assets = {
    dropdown_icon,
    logo,
    menu_icon,
    header_img,
    verified_icon,
    info_icon,
    about_img
}

// Sample mock data for UI preview

export const myAppointments = [
    {
      _id: '1',
      doctorData: {
        name: 'Dr. Emily Stone',
        speciality: 'Cardiologist',
        image: doc1,
        address: {
          street: '123 Main St',
          city: 'Suite 500, New York, NY',
        },
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
        address: {
            street: '456 Skin Ave',
            city: 'Los Angeles, CA',
        },
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
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
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
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }, 
        doctorAvailability : [
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
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
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
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc1,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        available: true,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc1,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
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
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
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
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
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
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc1,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
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
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc1,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
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
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
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
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
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
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        doctorAvailability : [
            { day: 'Monday', start: '09:00', end: '17:00' },
            { day: 'Wednesday', start: '10:00', end: '18:00' },
            { day: 'Friday', start: '08:00', end: '16:00' }
        ]
    },
]