import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import service1 from "../image/amarPic.png";


const cards = [
  {
    title: "Education",
    description:
      "We provide resources and opportunities to help students learn and grow, focusing on academic excellence and overall development.",
    // img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    img:service1,
  },
  {
    title: "College",
    description:
      "Our college programs are designed to empower students with modern skills, industry exposure, and hands-on learning.",
    // img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      img:service1,
  },
  {
    title: "School",
    description:
      "We aim to provide strong foundational learning at schools, with emphasis on creativity, discipline, and critical thinking.",
    // img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
      img:service1,
  },
  {
    title: "Teachers",
    description:
      "Dedicated teachers who guide, mentor, and inspire students to achieve their best, both academically and personally.",
    // img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      img:service1,
  },
  {
    title: "Software",
    description:
      "We build and integrate educational software solutions to simplify learning and enhance teaching experiences.",
    // img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      img:service1,
  },
   {
    title: "Software",
    description:
      "We build and integrate educational software solutions to simplify learning and enhance teaching experiences.",
    // img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      img:service1,
  },
   {
    title: "Software",
    description:
      "We build and integrate educational software solutions to simplify learning and enhance teaching experiences.",
    // img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      img:service1,
  },
   {
    title: "Software",
    description:
      "We build and integrate educational software solutions to simplify learning and enhance teaching experiences.",
    // img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      img:service1,
  },
   {
    title: "Software",
    description:
      "We build and integrate educational software solutions to simplify learning and enhance teaching experiences.",
    // img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      img:service1,
  },
];

const Home = () => {
  return (
    <div className="pt-8">
      {/* Page Title */}
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Hero Section */}
      <div className="py-12 text-center text-white bg-gradient-to-r from-blue-800 to-indigo-100">
        <h1 className="text-4xl font-bold md:text-5xl">
          Welcome to Our Education Platform
        </h1>
        <p className="mt-4 text-lg opacity-90">
          Connecting Schools, Colleges, Teachers, and Technology
        </p>
      </div>

      {/* Cards Section */}
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden transition bg-white shadow-lg rounded-2xl hover:shadow-2xl"
            >
              <img
                src={card.img}
                alt={card.title}
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-700">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
