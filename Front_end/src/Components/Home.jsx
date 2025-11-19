// Importing all required libraries & modules
import React, { useState, useEffect } from "react";
import servicesData from "./servicesData"; // All service categories + items
import { motion, useAnimation } from "framer-motion"; // Animation library
import { useInView } from "react-intersection-observer"; // Detect when elements enter viewport
import { Link } from "react-router-dom"; // For navigation (SPA)
import {Helmet} from "react-helmet-async"

// -------------------------------------------------------------
// 3D TILT EFFECT → Creates card tilt animation on mouse movement
// -------------------------------------------------------------
const cardTilt = (e, setStyle) => {
  // Get the position & size of the card
  const rect = e.currentTarget.getBoundingClientRect();

  // Mouse position inside the card
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Calculate tilt angles
  const rotateX = ((y - rect.height / 2) / 15) * -1;
  const rotateY = (x - rect.width / 2) / 15;

  // Apply CSS 3D transform
  setStyle({
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
  });
};

// Resets the card back to normal on mouse leave
const resetTilt = (setStyle) => {
  setStyle({ transform: "rotateX(0deg) rotateY(0deg) scale(1)" });
};

// -------------------------------------------------------------
// MAIN HOME COMPONENT
// -------------------------------------------------------------
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected filter button

  const controls = useAnimation(); // Animation controller for Framer Motion
  const { ref, inView } = useInView({ threshold: 0.2 });
  // inView becomes TRUE when 20% of the section is visible

  // Trigger animation when the section comes into view
  // RESET ANIMATION WHEN CATEGORY CHANGES
  useEffect(() => {
    controls.start("hidden");

    // Re-trigger animation
    setTimeout(() => {
      controls.start("visible");
    }, 50);
  }, [selectedCategory]);

  // -------------------------------------------------------------
  // FILTER LOGIC (WORKING)
  // Filters services by category. If "All", combine all items.
  // -------------------------------------------------------------
  const filteredServices =
    selectedCategory === "All"
      ? servicesData.flatMap((cat) => cat.items) // Flatten all items
      : servicesData.find((c) => c.category === selectedCategory)?.items || [];

  // -------------------------------------------------------------
  // Framer Motion animation variants for service cards
  // -------------------------------------------------------------
  const cardVariants = {
    hidden: { opacity: 0, y: 40 }, // Start hidden
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 }, // Animate each card one by one
    }),
  };

  return (
    <div className="w-full bg-gray-300 dark:bg-gray-900 dark:text-white transition">
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* ------------------------------------ */}
      {/* HERO SECTION (Landing Banner) */}
      {/* ------------------------------------ */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center container mx-auto">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }} // Slide-in from left
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold leading-tight">
              Empowering Your <span className="text-blue-600">Business</span>
            </h1>

            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg text-justify">
              Ours company specializes in providing expert guidance, strategic planning, and customized solutions to help businesses grow, transform, and operate efficiently. By combining industry knowledge, data-driven insights, and innovative problem-solving approaches, consultancy firms support organizations in overcoming challenges, optimizing processes, improving performance, and achieving long-term success. Whether it’s business development, digital transformation, financial planning, market research, or operational management, a consultancy company acts as a trusted partner, delivering tailored strategies that align with the client’s goals and drive measurable results. Through continuous collaboration and professional expertise, consultancy services empower businesses to stay competitive in a rapidly evolving marketplace
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg"
            >
              <Link to="/contactus">Get Started</Link>
            </motion.button>
          </motion.div>

          {/* Hero Image */}
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            className="rounded-2xl shadow-xl"
            alt=""
          />
        </div>
      </section>

      {/* ------------------------------------ */}
      {/* SECTION TITLE */}
      {/* ------------------------------------ */}
      <section className="py-16 text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
          High-impact business + technology solutions
        </p>
      </section>

      {/* ------------------------------------ */}
      {/* CATEGORY FILTER BUTTONS */}
      {/* ------------------------------------ */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {/* ALL BUTTON */}
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2 rounded-full transition ${selectedCategory === "All"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
            }`}
        >
          All
        </button>

        {/* Dynamic category buttons */}
        {servicesData.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setSelectedCategory(cat.category)}
            className={`px-5 py-2 rounded-full transition ${selectedCategory === cat.category
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
              }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* ------------------------------------ */}
      {/* SERVICE CARDS GRID */}
      {/* ------------------------------------ */}
      <section
        ref={ref} // Used to detect when cards enter screen
        className="container mx-auto px-6 grid md:grid-cols-3 gap-10 pb-20"
      >
        {filteredServices.map((service, index) => (
          <TiltCard
          
            key={service.id}
            service={service}
            index={index}
            controls={controls}
            cardVariants={cardVariants}
          />
        ))}
      </section>
      

      {/* ------------------------------------ */}
      {/* ABOUT SECTION */}
      {/* ------------------------------------ */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">

          {/* About Image */}
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
            className="rounded-2xl shadow-lg"
            alt=""
          />

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-4">About Our Company</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              We are a futuristic digital agency building scalable products for
              Ours company specializes in providing expert guidance, strategic planning, and customized solutions to help businesses grow, transform, and operate efficiently. By combining industry knowledge, data-driven insights, and innovative problem-solving approaches, consultancy firms support organizations in overcoming challenges, optimizing processes, improving performance, and achieving long-term success. Whether it’s business development, digital transformation, financial planning, market research, or operational management, a consultancy company acts as a trusted partner, delivering tailored strategies that align with the client’s goals and drive measurable results. Through continuous collaboration and professional expertise, consultancy services empower businesses to stay competitive in a rapidly evolving marketplace
              enterprises and startups worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------ */}
      {/* PORTFOLIO SLIDER */}
      {/* ------------------------------------ */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-4xl text-center font-bold mb-10">Our Portfolio</h2>

        <div className="overflow-x-auto flex gap-6 px-6 no-scrollbar">
          {["AI Tools", "CRM System", "E-Commerce Platform", "Security Dashboard"].map((title, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="min-w-[280px] bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer"
            >
              <img
                src={
                  i === 0
                    ? "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
                    : i === 1
                      ? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
                      : i === 2
                        ? "https://images.unsplash.com/photo-1557804506-669a67965ba0"
                        : "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
                }
                className="rounded-xl mb-4"
                alt=""
              />
              <h3 className="text-xl font-bold">{title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------ */}
      {/* STATISTICS SECTION */}
      {/* ------------------------------------ */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-10">Our Achievements</h2>

        <div className="grid md:grid-cols-4 gap-8 container mx-auto px-6">
          {[
            { number: "500+", label: "Projects Completed" },
            { number: "120+", label: "Happy Clients" },
            { number: "50+", label: "Team Members" },
            { number: "10+", label: "Awards Won" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 bg-gray-100 dark:bg-gray-800 shadow-md rounded-xl"
            >
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-extrabold text-blue-600"
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------ */}
      {/* CONTACT SECTION */}
      {/* ------------------------------------ */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold">Contact Us</h2>
        <p className="mt-4 text-lg">We are ready to build your next big idea.</p>

        <motion.button
          whileHover={{ scale: 1.15 }}
          className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg"
        >
          <Link to="/contactus">Send Message</Link>
        </motion.button>
      </section>
    </div>
  );
};

// -------------------------------------------------------------
// TILTCARD COMPONENT (Separated for cleaner code)
// Handles: 3D tilt + animation + card UI
// -------------------------------------------------------------
const TiltCard = ({ service, index, controls, cardVariants }) => {
  const [style, setStyle] = useState({}); // Dynamic style for tilt effect

  return (
    <Link to={`/service/${service.id}`}>
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        onMouseMove={(e) => cardTilt(e, setStyle)}
        onMouseLeave={() => resetTilt(setStyle)}
        style={style}
        className="p-6 rounded-2xl bg-white/20 dark:bg-gray-800/30
                   backdrop-blur-xl shadow-xl border border-white/20
                   hover:shadow-purple-500/40 transition-all cursor-pointer"
      >
        <div className="rounded-xl overflow-hidden">
          <img src={service.img} className={service.imgClass} alt="" />
        </div>

        <h3 className="text-xl font-bold mt-4">{service.title}</h3>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {service.description}
        </p>
      </motion.div>
    </Link>
  );
};

export default Home;
