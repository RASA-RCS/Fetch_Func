import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import services from "./servicesData";

const OurServices = () => {
  return (
    <section className="pt-16">
      {/* SEO Title + Meta */}
      <Helmet>
        <title>Our Services</title>
        <meta
          name="description"
          content="Explore RASA's professional services including web development, software solutions, IT consulting, and more."
        />
      </Helmet>

      {/* Heading */}
      <div className="py-12 text-center text-white bg-gradient-to-r from-blue-800 to-indigo-100">
        <h1 className="text-4xl font-bold md:text-5xl">
          Welcome to Our Services
        </h1>
        
      </div>

      {/* Service Categories */}
      {services.map((section, index) => (
        <div key={index} className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold text-blue-600">
            {section.category}
          </h3>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map((service, i) => (
              <Link key={i} to={`/service/${service.id}`}>
                <div className="transition-all duration-300 transform bg-white shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-2">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="object-cover w-full h-48 rounded-t-xl"
                  />
                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {service.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default OurServices;
