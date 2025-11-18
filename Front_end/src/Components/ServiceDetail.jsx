import React from "react";
import { useParams, Link } from "react-router-dom";
import services from "./servicesData";
import { motion } from "framer-motion";

const ServiceDetail = () => {
  const { id } = useParams();

  // Combine all items from all categories
  const allServices = services.flatMap((section) => section.items);
  const service = allServices.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl text-red-500">
        Service not found
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
      >
        {/* Image */}
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-72 object-cover rounded-xl shadow-md"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold mt-6 text-blue-600 dark:text-blue-400">
          {service.title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {service.fullDescription || service.description}
        </p>

        {/* Back button */}
        <Link to="/ourservices">
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md">
            ← Back to Services
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ServiceDetail;
