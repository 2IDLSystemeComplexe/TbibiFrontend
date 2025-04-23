import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { FaLock, FaRegCalendarCheck } from "react-icons/fa6";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlinePriceCheck, MdAccessTimeFilled, MdVerifiedUser } from "react-icons/md";
import { HiMiniComputerDesktop } from "react-icons/hi2";

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const features = [
    {
      icon: <FaRegCalendarCheck />,
      title: "Easy Booking",
      description: "Schedule appointments in just a few clicks with our intuitive interface."
    },
    {
      icon: <AiOutlineClockCircle />,
      title: "Time Saving",
      description: "Reduce waiting times and manage your healthcare efficiently."
    },
    {
      icon: <HiMiniComputerDesktop />,
      title: "Virtual Visits",
      description: "Connect with doctors from the comfort of your home."
    },
    {
      icon: <FaLock/>,
      title: "Secure",
      description: "Your data is protected with industry-standard security measures."
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-4 py-12"
    >
      {/* Hero Section */}
      <motion.section 
        variants={itemVariants}
        className="text-center mb-16"
      >
        <motion.h1 
          whileHover={{ scale: 1.02 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 leading-tight md:leading-tight lg:leading-tight"
        >
          Revolutionizing Healthcare Access
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Connecting patients with top medical professionals through an intuitive, secure platform.
        </motion.p>
      </motion.section>

      {/* App Description */}
      <motion.section 
        variants={itemVariants}
        className="mb-20 grid md:grid-cols-2 gap-6 items-center"
      >
        <motion.div whileHover={{ scale: 1.01 }}>
          <img 
            src={assets.about_img} 
            alt="Doctor consultation" 
            className="rounded-xl shadow-lg w-full md:max-w-[460px] h-auto mx-auto"
          />
        </motion.div>
        <div>
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-gray-800 mb-4 sm:mb-6"
          >
            About Us
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6"
          >
            Welcome to Tbibi, your trusted partner in managing your healthcare needs conveniently and efficiently. <br/><br />
            At Tbibi, we understand the challenges of accessing quality healthcare.
            That's why we have developed a user-friendly platform that empowers patients to take control of their health.
            Our platform bridges the gap between patients and healthcare providers, 
            offering seamless appointment scheduling, secure video consultations, and comprehensive 
            medical record management. <br/><br/>
            
            Tbibi is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
            Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </motion.p>
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-600"
          >
            Designed with both patients and doctors in mind, we prioritize accessibility, 
            convenience, and quality care in every interaction.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Vision */}
      <motion.section 
        variants={itemVariants}
        className="bg-blue-50 rounded-2xl p-8 md:p-12 mb-20"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-semibold text-gray-800 mb-8 text-center"
        >
          Our Vision
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-700 text-center max-w-4xl mx-auto"
        >
          "To create a healthcare ecosystem where quality medical care is accessible, 
          affordable, and convenient for everyone, regardless of location or circumstance."
        </motion.p>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        variants={itemVariants}
        className="mb-20"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-semibold text-gray-800 mb-12 text-center"
        >
          Why Choose Our Platform?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Verified Professionals",
              description: "All doctors are thoroughly vetted and licensed.",
              icon: <MdVerifiedUser/>
            },
            {
              title: "24/7 Availability",
              description: "Book appointments anytime that works for you.",
              icon:  <MdAccessTimeFilled/>
            },
            {
              title: "Transparent Pricing",
              description: "No hidden fees, know the cost upfront.",
              icon: <MdOutlinePriceCheck/>
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Key Features */}
      <motion.section 
        variants={itemVariants}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-semibold text-gray-800 mb-12 text-center"
        >
          Key Features
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="w-14 h-14 bg-[#EAEFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                {/* <img src={feature.icon} alt={feature.title} className="w-6 h-6" /> */}
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;