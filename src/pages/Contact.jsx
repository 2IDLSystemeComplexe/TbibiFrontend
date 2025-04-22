import React,{ useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa"
import { TbWorldWww } from "react-icons/tb"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to the api 
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-4 py-12 max-w-6xl mx-auto"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-3xl font-medium text-center mb-4"
      >
        Contact Us
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="sm:w-1/3 text-center text-sm mx-auto mb-8"
      >
        Have questions or feedback? We'd love to hear from you.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          variants={itemVariants}
          className="border border-blue-400 p-8 rounded-xl shadow-[0px_10px_8px_-7px_#60B5FF] hover:shadow-[0px_10px_8px_-7px_#69a79c] transition duration-300"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-[#EAEFFF] rounded-full flex items-center justify-center flex-shrink-0">
                <FaLocationDot/>
                {/* <img src=<FaLocationDot/> alt="Location" className="w-5 h-5" /> */}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Our Office</h3>
                <p className="text-gray-600">12 Avenue Mohamed V<br />Centre ville Tunis, 1005, Tunisia</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-[#EAEFFF] rounded-full flex items-center justify-center flex-shrink-0">
                <FaPhone/>
                {/* <img src={assets.verified_icon} alt="Phone" className="w-5 h-5" /> */}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Phone</h3>
                <p className="text-gray-600">+(216) 24789789<br />Mon-Fri, 9am-5pm UTC+1</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-[#EAEFFF] rounded-full flex items-center justify-center flex-shrink-0">
                <MdEmail/>
                {/* <img src={assets.verified_icon} alt="Email" className="w-5 h-5" /> */}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-600">2idl01.projet.complexe@gmail.com<br />Response within 24 hours</p>
              </div>
            </motion.div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium text-gray-800 mb-4">Follow Us</h3>
          
            <div className="flex gap-4">
              {[{link: "https://chat.whatsapp.com/", icon: <FaWhatsapp/>}, {link:"https://www.instagram.com/", icon:<FaInstagram/>},{link: "https://www.youtube.com/", icon: <FaYoutube/>}, {link: "https://www.google.com/", icon: <TbWorldWww/>}]
                .map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3 }}
                  href={item.link}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={itemVariants}
          className="border border-blue-400  p-8 rounded-xl shadow-[0px_10px_8px_-7px_#60B5FF] hover:shadow-[0px_10px_8px_-7px_#69a79c] transition duration-300"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                ></textarea>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200"
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;