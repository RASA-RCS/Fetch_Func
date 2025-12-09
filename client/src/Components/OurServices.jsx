// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

import React, { useState } from "react";   // for the react lib useState
import servicesData from "./servicesData"; // import the services data from the servicesdetails page 
import { Link } from "react-router-dom"; // this is used for the navigation 
import { Helmet } from "react-helmet-async"; // this lib used for the Title about the page

const OurServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredList =
    selectedCategory === "All"
      ? servicesData.flatMap((cat) => cat.items)
      : servicesData.find((c) => c.category === selectedCategory)?.items || [];

  return (
    <div className="w-full bg-gray-300 dark:bg-gray-900 dark:text-white min-h-screen pt-28 px-6">

      {/* this is title section */}
      <Helmet>
        <title>Our Services</title>
      </Helmet>


      {/* Header section for the page  */}

      <div className="py-7 text-center text-white bg-gradient-to-r from-blue-800 to-indigo-100">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Our Services
        </h1>
      </div>
      <br></br>
      {/* Filters */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2 rounded-full ${selectedCategory === "All"
            ? "bg-blue-600 text-white"
            : "bg-gray-300 dark:bg-gray-700"
            }`}
        >
          All
        </button>

        {/* this is import the details form the services details page  */}
        {servicesData.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setSelectedCategory(cat.category)}
            className={`px-5 py-2 rounded-full ${selectedCategory === cat.category
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
