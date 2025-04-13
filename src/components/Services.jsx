import React from "react";
import { motion } from "framer-motion";
import { FaUserDoctor } from "react-icons/fa6";

const ServicesData = [
  {
    id: 1,
    title: "Doctor finder",
    link: "#",
    icon: <FaUserDoctor />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Appointment booking",
    link: "#",
    icon: <FaUserDoctor />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Online consultation",
    link: "#",
    icon: <FaUserDoctor />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "Home medical services",
    link: "#",
    icon: <FaUserDoctor />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "E-pharmacy",
    link: "#",
    icon: <FaUserDoctor />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "24/7 assistance",
    link: "#",
    icon: <FaUserDoctor />,
    delay: 0.7,
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};
const Services = () => {
  return (
    <section className="bg-white">
      <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
        <h1 className='text-3xl font-medium'>Services we Provide</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 pt-5">
          {ServicesData.map((service, index) => (
            <motion.div
              variants={SlideLeft(service.delay)}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
              className="bg-[#EAEFFF] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl"
              key={index}
            >
              <div className="text-4xl mb-4"> {service.icon}</div>
              <h1 className="text-lg font-semibold text-center px-3">
                {service.title}
              </h1>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;