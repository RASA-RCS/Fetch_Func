// src/Components/OurServices.jsx
import React, { useState } from "react";
import servicesData from "./servicesData";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const OurServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredList =
    selectedCategory === "All"
      ? servicesData.flatMap((cat) => cat.items)
      : servicesData.find((c) => c.category === selectedCategory)?.items || [];

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen pt-24 px-6">
      <Helmet>
        <title>Our Services</title>
      </Helmet>
      <h1 className="text-5xl text-center font-bold mb-6">Our Services</h1>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2 rounded-full ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700"
          }`}
        >
          All
        </button>

        {servicesData.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setSelectedCategory(cat.category)}
            className={`px-5 py-2 rounded-full ${
              selectedCategory === cat.category
                ? "bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-10 container mx-auto">
        {filteredList.map((service) => (
          <Link to={`/service/${service.id}`} key={service.id}>
            <div className="rounded-xl p-5 bg-white dark:bg-gray-800 shadow-lg hover:shadow-blue-500/40 transition cursor-pointer">
              <img src={service.img} className={service.imgClass} alt="" />
              <h3 className="text-xl font-bold mt-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {service.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
